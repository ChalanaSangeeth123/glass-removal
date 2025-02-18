import tensorflow as tf
from keras import layers
from keras.utils import get_custom_objects

# Define and register custom layers (like InstanceNormalization)
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

# Define a simple CycleGAN model (you may need to adjust this based on your actual architecture)
class CycleGan(tf.keras.Model):
    def __init__(self, **kwargs):
        super(CycleGan, self).__init__(**kwargs)
        # Define layers for the CycleGAN generator (and discriminator if needed)
        self.conv1 = layers.Conv2D(64, 3, padding='same', activation='relu')
        self.conv2 = layers.Conv2D(128, 3, padding='same', activation='relu')
        self.output_layer = layers.Conv2D(3, 3, padding='same', activation='sigmoid')

    def call(self, inputs):
        x = self.conv1(inputs)
        x = self.conv2(x)
        return self.output_layer(x)

# Register CycleGan class if it's not already registered
get_custom_objects().update({'CycleGan': CycleGan})

# Try to load the CycleGAN model
# Assuming CycleGan is defined correctly and includes custom layers like InstanceNormalization
try:
    cycle_gan_model = CycleGan()
    cycle_gan_model.build(input_shape=(None, 256, 256, 3))  # Adjust input shape
    cycle_gan_model.load_weights('cycle_gan_model.h5')
    print("CycleGAN model loaded successfully.")
except Exception as e:
    print(f"Error loading CycleGAN model: {e}")


# Optionally, print out the model summary to check if the architecture is correct
if cycle_gan_model:
    print(cycle_gan_model.summary())
