import os
import joblib
from flask import Flask, request, jsonify

app = Flask(__name__)

# Lấy đường dẫn tuyệt đối tới file model.h5
base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.abspath(os.path.join(base_dir, '..', '..', 'model.h5'))

# Load mô hình
model = joblib.load(model_path)

# Các feature đúng thứ tự như khi train
features = ['humidity', 'light', 'rain', 'soil_moisture', 'temperature']
labels = ['kém', 'trung bình', 'tốt']  # class 0,1,2

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    try:
        input_data = [float(data[feature]) for feature in features]
    except Exception as e:
        return jsonify({"error": f"Lỗi dữ liệu đầu vào: {str(e)}"}), 400

    prediction = model.predict([input_data])[0]
    predicted_label = labels[prediction]

    return jsonify({
        "input": dict(zip(features, input_data)),
        "prediction": predicted_label
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)