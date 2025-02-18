from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import tensorflow as tf
from keras import layers
from keras.utils import get_custom_objects
from PIL import Image
import numpy as np
import cv2
from mtcnn import MTCNN  # Import MTCNN for face detection

detector = MTCNN()  # Initialize MTCNN face detector

class InstanceNormalization(layers.Layer):
    def __init__(self, axis=-1, epsilon=1e-5, **kwargs):
        super(InstanceNormalization, self).__init__(**kwargs)
        self.axis = axis
        self.epsilon = epsilon

    def build(self, input_shape):
        shape = input_shape[self.axis]
        self.gamma = self.add_weight(name='gamma', shape=(shape,), initializer='ones', trainable=True)
        self.beta = self.add_weight(name='beta', shape=(shape,), initializer='zeros', trainable=True)

    def call(self, inputs):
        mean, variance = tf.nn.moments(inputs, axes=[self.axis], keepdims=True)
        return self.gamma * (inputs - mean) / tf.sqrt(variance + self.epsilon) + self.beta

get_custom_objects().update({'InstanceNormalization': InstanceNormalization})

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'static/uploads'
RESULT_FOLDER = 'static/results'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

try:
    generator = tf.keras.models.load_model('glasses_to_no_glasses_v2.h5')
    print("CycleGAN model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    generator = None

def is_blank_image(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        return True  # File could not be read
    return np.var(img) < 10  # Low variance suggests a blank image

def has_face(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return False  # File could not be read
    faces = detector.detect_faces(img)
    return len(faces) > 0

def preprocess_image(image_path):
    img = tf.io.read_file(image_path)
    img = tf.image.decode_jpeg(img, channels=3)
    img = tf.image.resize(img, [256, 256])
    img = (img / 127.5) - 1
    return tf.expand_dims(img, axis=0)

def postprocess_image(image):
    image = (image[0] + 1) / 2.0
    return Image.fromarray((image.numpy() * 255).astype(np.uint8))

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify(error="No file uploaded"), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(error="No selected file"), 400
    
    allowed_extensions = {'png', 'jpeg', 'jpg'}
    if file.filename.split('.')[-1].lower() not in allowed_extensions:
        return jsonify(error="Invalid file format. Only PNG and JPEG files are allowed."), 400
    
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    if is_blank_image(filepath):
        return jsonify(error="Uploaded image appears to be blank. Please upload a valid image."), 400
    
    if not has_face(filepath):
        return jsonify(error="No face detected in the uploaded image. Please upload an image containing a face."), 400
    
    if generator is None:
        return jsonify(error="Model is not loaded correctly. Please check the server logs."), 500
    
    input_image = preprocess_image(filepath)
    generated_image = generator(input_image, training=False)
    result_image = postprocess_image(generated_image)
    result_path = os.path.join(RESULT_FOLDER, f'result_{file.filename}')
    result_image.save(result_path, quality=95)
    
    return jsonify(result_url=f"/static/results/{f'result_{file.filename}'}", download_url=f"/download/{f'result_{file.filename}'}")

@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    try:
        return send_from_directory(RESULT_FOLDER, filename, as_attachment=True, mimetype='image/png')
    except FileNotFoundError:
        return jsonify(error="File not found"), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
