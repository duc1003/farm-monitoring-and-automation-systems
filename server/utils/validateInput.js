export const validateInput = (data) => {
  const requiredFields = ['humidity', 'light', 'rain', 'soil_moisture', 'temperature'];

  for (const field of requiredFields) {
    if (!(field in data)) {
      return { valid: false, message: `Thiếu trường ${field}` };
    }

    if (typeof data[field] !== 'number' || isNaN(data[field])) {
      return { valid: false, message: `Trường ${field} phải là một số` };
    }

    // Optional: Kiểm tra phạm vi giá trị
    if (data[field] < 0 || data[field] > 10000) {
      return { valid: false, message: `${field} vượt quá giới hạn hợp lý` };
    }
  }

  return { valid: true };
};
