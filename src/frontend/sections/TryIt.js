import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  width: 80vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  z-index: 1;
  padding: 2rem 0;

  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    width: 90vw;
    min-height: auto;
    padding: 1rem 0;
  }
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontBig || '5rem'};
  font-family: 'Kaushan Script';
  font-weight: 300;
  position: absolute;
  top: 1rem;
  left: 5%;
  z-index: 5;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    font-size: 3rem;
    position: static;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const UploadContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10rem;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    margin-top: 4rem;
  }
`;

const UploadBox = styled(motion.div)`
  width: 60%;
  height: 300px;
  border: 3px dashed #1a1a1a;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;

  &:hover {
    background-color: grey;
    border-color: #666;
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
    padding: 1rem;
    h2 {
      font-size: 1.5rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const ImagePreview = styled.div`
  position: relative;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }

  .delete-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(255, 0, 0, 0.9);
    }
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    padding: 0.5rem;

    img {
      height: 150px;
    }
  }
`;

const ActionButton = styled(motion.button)`
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(to top, #1f1f1f, #3a3a3a);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const TryIt = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (image && image.original && image.original.startsWith('blob:')) {
        URL.revokeObjectURL(image.original);
      }
    };
  }, [image]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (image && image.original && image.original.startsWith('blob:')) {
        URL.revokeObjectURL(image.original);
      }
  
      const newImage = {
        original: URL.createObjectURL(file),
        file,
      };
      setImage(newImage);
      setError(null);
    }
  
    event.target.value = null;
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      if (image && image.original && image.original.startsWith('blob:')) {
        URL.revokeObjectURL(image.original);
      }

      const newImage = {
        original: URL.createObjectURL(file),
        file,
      };
      setImage(newImage);
      setError(null);
    }
  };

  const removeImage = () => {
    if (image && image.original && image.original.startsWith('blob:')) {
      URL.revokeObjectURL(image.original);
    }
    setImage(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleRemoveGlasses = async () => {
    if (!image || !image.file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', image.file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.result_url) {
        const processedUrl = `http://localhost:5000${data.result_url}`;
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          navigate('/result', {
            state: { originalImage: base64String, imageUrl: processedUrl },
          });
        };
        reader.readAsDataURL(image.file);
      } else {
        setError(data.error || 'Failed to process image.');
      }
    } catch (err) {
      console.error('Error processing image:', err);
      setError('Failed to remove glasses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="try-it">
      <Title data-scroll data-scroll-speed="-2" data-scroll-direction="horizontal">
        Try It
      </Title>
      <UploadContainer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <UploadBox onClick={triggerFileInput} onDragOver={handleDragOver} onDrop={handleDrop}>
          <h2>Upload Your Image</h2>
          <p>Drag and drop or click to select a file</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </UploadBox>

        {image && (
          <ImagePreviewContainer>
            <ImagePreview>
              <img src={image.original} alt="Uploaded" />
              <button className="delete-btn" onClick={removeImage}>
                ×
              </button>
              <ActionButton
                onClick={handleRemoveGlasses}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? 'Processing...' : 'Remove Glasses'}
              </ActionButton>
            </ImagePreview>
          </ImagePreviewContainer>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: 'red', marginTop: '1rem' }}
          >
            {error}
          </motion.p>
        )}
      </UploadContainer>
    </Section>
  );
};

export default TryIt;