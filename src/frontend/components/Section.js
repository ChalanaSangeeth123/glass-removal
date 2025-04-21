import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Enhanced ActionButton with centered text and larger size
const ActionButton = styled(motion.button)`
  margin-top: 1rem;
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
  }
`;

// Styled Upload Container with dark theme
const UploadContainer = styled.div`
  margin-top: 2.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease;
`;

// Error Message Component
const ErrorMessage = styled(motion.div)`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(220, 53, 69, 0.2);
  border: 1px solid rgba(220, 53, 69, 0.5);
  border-radius: 8px;
  color: #ff6b6b;
  font-size: 1rem;
  text-align: center;
`;

function Section({ id, bgImage, title, date, content, nextSection }) {
  const imagePath = require(`../assets/images/${bgImage}`);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, triggerOnce: false });
  const [image, setImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setUploadedFile(file);
        setErrorMessage(""); // Clear any previous error messages
      };
      reader.readAsDataURL(file);
    }
    e.target.value = null;
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setUploadedFile(file);
        setErrorMessage(""); // Clear any previous error messages
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();
  
  const removeImage = () => {
    setImage(null);
    setUploadedFile(null);
    setErrorMessage(""); // Clear any error messages when removing image
  };

  const handleScroll = (e) => {
    e.preventDefault();
    if (nextSection) {
      document.getElementById(nextSection)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleProcessImage = async () => {
    if (!uploadedFile) {
      setErrorMessage("Please upload an image first.");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage(""); // Clear any previous error messages
    
    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (data.result_url) {
        navigate('/result', {
          state: {
            originalImage: image,
            imageUrl: `http://localhost:5000${data.result_url}`,
          },
        });
      } else {
        setErrorMessage(data.error || 'Failed to process image. Please try another image.');
      }
    } catch (error) {
      console.error('Processing failed:', error);
      setErrorMessage('Error connecting to server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const isUploadSection = id === "three";

  return (
    <section
      id={id}
      ref={ref}
      className="wrapper post bg-img"
      style={{ backgroundImage: `url(${imagePath})` }}
    >
      <div className="inner">
        <motion.article
          className="box"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <header>
            <h2>{title}</h2>
            <p>{date}</p>
          </header>
          <div className="content">
            <p>{content}</p>
            {isUploadSection && (
              <UploadContainer>
                <motion.div
                  className="upload-box"
                  onClick={triggerFileInput}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: isDragging ? 1.02 : 1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    minHeight: '220px',
                    border: `3px dashed ${isDragging ? '#666' : '#444'}`,
                    borderRadius: '15px',
                    background: isDragging
                      ? 'linear-gradient(135deg, rgba(51, 51, 51, 0.9), rgba(85, 85, 85, 0.9))'
                      : 'linear-gradient(135deg, #222, #333)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    cursor: 'pointer',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  {/* Upload Icon */}
                  <motion.svg
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{ marginBottom: '1rem' }}
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </motion.svg>

                  <motion.h3
                    style={{
                      fontSize: '1.8rem',
                      margin: '0 0 0.5rem 0',
                      color: '#e0e0e0',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: '600',
                    }}
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                  >
                    Upload Your Image
                  </motion.h3>
                  <p
                    style={{
                      fontSize: '1.1rem',
                      color: '#aaa',
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    Drag & drop or click to select
                  </p>
                  <motion.div
                    style={{ marginTop: '1.5rem' }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <ActionButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Browse Files
                    </ActionButton>
                  </motion.div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </motion.div>

                {/* Error message display */}
                {errorMessage && (
                  <ErrorMessage
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errorMessage}
                  </ErrorMessage>
                )}

                {image && (
                  <motion.div
                    className="image-preview-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      marginTop: '2rem',
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '1rem',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '250px',
                        background: '#222',
                        borderRadius: '15px',
                        padding: '1rem',
                        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      <img
                        src={image}
                        alt="Uploaded"
                        style={{
                          width: '100%',
                          height: '250px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          border: '1px solid #444',
                        }}
                      />
                      <motion.button
                        onClick={removeImage}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'rgba(200, 50, 50, 0.9)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ×
                      </motion.button>
                      <ActionButton
                        onClick={handleProcessImage}
                        disabled={isLoading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ width: '100%', marginTop: '1rem' }}
                      >
                        {isLoading ? 'Processing...' : 'Remove Glasses'}
                      </ActionButton>
                    </div>
                  </motion.div>
                )}
              </UploadContainer>
            )}
          </div>
        </motion.article>
      </div>
      {nextSection && (
        <a href={`#${nextSection}`} onClick={handleScroll} className="more current">
          Go to next section
        </a>
      )}
    </section>
  );
}

export default Section;