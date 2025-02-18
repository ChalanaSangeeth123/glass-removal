import tensorflow as tf
from keras import layers
from keras.utils import get_custom_objects

# Define and register custom layers (if any, like InstanceNormalization)
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

# Register custom layers
get_custom_objects().update({'InstanceNormalization': InstanceNormalization})

# Define the model architecture (ensure it matches the one used during training)
generator = tf.keras.Sequential([
    # Example architecture (adjust this to match your saved model)
    tf.keras.layers.InputLayer(input_shape=(256, 256, 3)),
    tf.keras.layers.Conv2D(64, 3, padding='same', activation='relu'),
    InstanceNormalization(),
    tf.keras.layers.Conv2D(128, 3, padding='same', activation='relu'),
    InstanceNormalization(),
    # Add other layers as necessary
    tf.keras.layers.Conv2D(3, 3, padding='same', activation='sigmoid')  # Assuming output has 3 channels
])

# Try to load the model and weights
try:
    generator = tf.keras.models.load_model("glasses_to_no_glasses_v2.h5")
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")

# Optionally, print out the model summary to check if the architecture is correct
print(generator.summary())

