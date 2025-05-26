// import axios from 'axios';
// import SensorData from '../models/sensor_data/SensorData.model.js';
// import { Op } from 'sequelize';

// export const predictGrowth = async (req, res) => {
//   try {
//     // Lấy bản ghi hợp lệ mới nhất
//     const validDataList = await SensorData.findAll({
//       attributes: ['humidity', 'light', 'rain', 'soil_moisture', 'temperature'],
//       where: {
//         humidity: { [Op.not]: null },
//         light: { [Op.not]: null },
//         rain: { [Op.not]: null },
//         soil_moisture: { [Op.not]: null },
//         temperature: { [Op.not]: null },
//       },
//       order: [['timestamp', 'DESC']],
//       limit: 1,
//     });

//     if (validDataList.length === 0) {
//       return res.status(404).json({ error: 'No valid sensor data found' });
//     }

//     const latestData = validDataList[0].dataValues;
//     console.log('Latest valid data:', latestData);

//     // Gửi tới Flask
//     const flaskResponse = await axios.post('http://127.0.0.1:5000/predict', latestData);
//     const { prediction } = flaskResponse.data;

//     res.json({
//       prediction,
//       suggest: getSuggestion(prediction),
//     });

//   } catch (err) {
//     console.error('Prediction error:', err.message);
//     res.status(400).json({
//       error: err.response?.data?.error || err.message
//     });
//   }
// };

// const getSuggestion = (label) => {
//   if (label === 'kém') return 'Cải thiện độ ẩm đất và giảm ánh sáng trực tiếp.';
//   if (label === 'trung bình') return 'Theo dõi thêm độ ẩm và nhiệt độ.';
//   return 'Cây đang phát triển tốt, duy trì điều kiện hiện tại.';
// };
import axios from 'axios';
import SensorData from '../models/sensor_data/SensorData.model.js';

export const predictGrowth = async (req, res) => {
  try {
    // Lấy dữ liệu mới nhất từ DB
    const latestData = await SensorData.findOne({
      attributes: ['humidity', 'light', 'rain', 'soil_moisture', 'temperature'],
      order: [['timestamp', 'DESC']],
    });

    if (!latestData) {
      return res.status(404).json({ error: 'No sensor data found' });
    }
    console.log('Latest data:', latestData.dataValues);

    // Gửi dữ liệu tới Flask server
    const flaskResponse = await axios.post('http://127.0.0.1:5000/predict', latestData.dataValues);
    const { prediction } = flaskResponse.data;

    res.json({
      prediction,
      suggest: getSuggestion(prediction),
    });

  } catch (err) {
    console.error('Prediction error:', err.message);
    res.status(400).json({
      error: err.response?.data?.error || err.message
    });
  }
};

const getSuggestion = (label) => {
  if (label === 'kém') {
    return 'Cây đang gặp điều kiện không thuận lợi. Hãy kiểm tra lại hệ thống tưới tiêu, che chắn ánh nắng gay gắt và đảm bảo đất không quá khô hay úng.';
  }
  if (label === 'trung bình') {
    return 'Cây phát triển ở mức tạm ổn. Hãy duy trì độ ẩm ổn định, theo dõi nhiệt độ thường xuyên và bón phân nhẹ để thúc đẩy tăng trưởng.';
  }
  return 'Cây đang phát triển rất tốt! Hãy tiếp tục duy trì chế độ chăm sóc hiện tại và kiểm tra định kỳ để đảm bảo điều kiện luôn ổn định.';
};
