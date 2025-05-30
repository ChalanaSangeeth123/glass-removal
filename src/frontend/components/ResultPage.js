import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/Nav';

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  width: 80vw;
  overflow: hidden;
  text-align:center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  z-index: 1;
  padding: 2rem 0;
  background: linear-gradient(to bottom, #3a3a3a, #1f1f1f);
  color: #ffffff;

  @media (max-width: 768px) {
    width: 90vw;
    min-height: auto;
    padding: 1rem 0;
  }
`;

const Title = styled(motion.h1)`
  font-size: ${(props) => props.theme.fontBig || '5rem'};
  font-family: 'Kaushan Script';
  font-weight: 300;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  padding-top: 1rem;
  z-index: 5;

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

const ResultContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;

  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const ImageComparison = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    margin: 1rem 0;
  }
`;

const ImageCard = styled.div`
  position: relative;
  width: 300px;
  text-align: center;

  h2 {
    font-size: ${(props) => props.theme.fontlg || '1.5rem'};
    font-weight: 300;
    margin-bottom: 1rem;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;

    h2 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }
`;

const ActionButton = styled(motion.button)`
  padding: 1rem 2.5rem; /* Increased padding for larger size */
  background: linear-gradient(135deg, #333, #555);
  color: #e0e0e0;
  border: 1px solid #444;
  border-radius: 25px;
  font-size: 1.1rem; /* Increased font size */
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px; /* Increased height for larger button */

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #444, #666);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.7);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 2rem; /* Slightly smaller padding for mobile */
    font-size: 1rem; /* Slightly smaller font size for mobile */
    height: 44px; /* Adjusted height for mobile */
    flex: 1 1 45%;
  }
`;

const ErrorMessage = styled(motion.p)`
  color: #ff4d4d;
  font-size: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    text-align: center;
    padding: 0 1rem;
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.1rem;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 1rem;
    height: auto;
    padding: 1rem;
  }
`;

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [imageUrl, setImageUrl] = useState(location.state?.imageUrl || '');
  const [originalImage, setOriginalImage] = useState(location.state?.originalImage || '');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!imageUrl && !location.state?.imageUrl && !originalImage && !location.state?.originalImage) {
      setError('No image uploaded or processed. Please upload an image first.');
      navigate('/try-it');
    }
  }, [imageUrl, originalImage, navigate, location.state]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleUploadChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const localOriginalImageUrl = URL.createObjectURL(file);
    setOriginalImage(localOriginalImageUrl);
    setUploadedFile(file);
    setImageUrl('');
    setError(null);
  };

  const handleProcessImage = async () => {
    if (!uploadedFile) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.result_url) {
        setImageUrl(`http://localhost:5000${data.result_url}`);
      } else if (data.error) {
        setError(data.error);
      } else {
        setError('Failed to process image. Please try again.');
      }
    } catch (error) {
      console.error('Processing failed:', error);
      setError('Error processing image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const downloadUrl = imageUrl.replace('result_url', 'download_url');
      const fullUrl = downloadUrl.includes('/download/')
        ? `http://localhost:5000${downloadUrl}`
        : `http://localhost:5000/download/${downloadUrl.split('/').pop()}`;

      const response = await fetch(fullUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `glass-free-image.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      setError('Failed to download image. Please try again.');
    }
  };

  return (
    <Section id="result">
      <NavBar />
      <Title
        data-scroll
        data-scroll-speed="-2"
        data-scroll-direction="horizontal"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Result
      </Title>
      <ResultContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ImageComparison>
          <ImageCard>
            <h2>Original Image</h2>
            {originalImage ? (
              <img src={originalImage} alt="Original" />
            ) : (
              <div>No image available</div>
            )}
          </ImageCard>
          <ImageCard>
            <h2>Glass-Free Image</h2>
            {isLoading ? (
              <LoadingMessage>Processing image...</LoadingMessage>
            ) : imageUrl ? (
              <img
                src={imageUrl.startsWith('http') ? imageUrl : `http://localhost:5000${imageUrl}`}
                alt="Processed"
              />
            ) : (
              <div>No processed image yet</div>
            )}
          </ImageCard>
        </ImageComparison>

        <ActionButtons>
          <ActionButton
            onClick={handleUploadClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            Upload New Image
          </ActionButton>
          <ActionButton
            onClick={handleProcessImage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!uploadedFile || isLoading}
          >
            {isLoading ? 'Processing...' : 'Remove Glasses'}
          </ActionButton>
          <ActionButton
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!imageUrl || isLoading}
          >
            Download Glass-Free Image
          </ActionButton>
        </ActionButtons>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleUploadChange}
        />

        {error && (
          <ErrorMessage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </ErrorMessage>
        )}
      </ResultContainer>
    </Section>
  );
}

export default ResultPage;