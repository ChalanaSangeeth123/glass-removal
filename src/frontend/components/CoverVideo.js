import React from 'react';
import styled from 'styled-components';
import MainVideo from "../assets/sunset.mp4";
import { motion } from 'framer-motion';

const VideoContainer = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;

  video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }

  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    height: auto;
    min-height: 50vh; /* Ensure it has some minimum height */
    
    video {
      height: auto;
      min-height: 50vh;
    }
  }
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Title = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.text};

  div {
    display: flex;
    flex-direction: row;
  }

  h1 {
    font-family: 'Kaushan Script';
    font-size: ${props => props.theme.fontBig};
    text-shadow: 1px 1px 1px ${props => props.theme.Body};
  }

  h2 {
    font-family: 'Sirin Stencil';
    font-size: ${props => props.theme.fontlg};
    text-shadow: 1px 1px 1px ${props => props.theme.Body};
    font-weight: 300;
    text-transform: capitalize;
  }

  h3 {
    font-family: 'Sirin Stencil';
    font-size: ${props => props.theme.fontxl};
    text-shadow: 1px 1px 1px ${props => props.theme.Body};
    margin-top: 1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    padding: 1rem;

    h1 {
      font-size: 2.5rem; /* Reduced from theme.fontBig */
    }

    h2 {
      font-size: 1rem; /* Reduced from theme.fontlg */
      margin-top: 0.5rem;
      text-align: center;
    }

    h3 {
      font-size: 0.9rem; /* Reduced from theme.fontxl */
      margin-top: 0.5rem;
      text-align: center;
      letter-spacing: 1px;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 0.8rem;
    }

    h3 {
      font-size: 0.7rem;
    }
  }
`;

const container = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 2,
      ease: 'easeInOut'
    }
  }
};

const CoverVideo = () => {
  return (
    <VideoContainer>
      <DarkOverlay />
      <Title variants={container} initial="hidden" animate="show">
        <div>
          <h1 data-scroll data-scroll-delay='0.18' data-scroll-speed="4">C</h1>
          <h1 data-scroll data-scroll-delay='0.16' data-scroll-speed="4">l</h1>
          <h1 data-scroll data-scroll-delay='0.14' data-scroll-speed="4">e</h1>
          <h1 data-scroll data-scroll-delay='0.12' data-scroll-speed="4">a</h1>
          <h1 data-scroll data-scroll-delay='0.10' data-scroll-speed="4">r</h1>
          <h1 data-scroll data-scroll-delay='0.08' data-scroll-speed="4">V</h1>
          <h1 data-scroll data-scroll-delay='0.06' data-scroll-speed="4">u</h1>
          <h1 data-scroll data-scroll-delay='0.04' data-scroll-speed="4">e</h1>
        </div>
        <h3 data-scroll data-scroll-delay='0.20' data-scroll-speed="4">
          Realistic Glass Removal in Facial Images
        </h3>
        <h2 data-scroll data-scroll-delay='0.18' data-scroll-speed="4">
          Powered by Computer Vision & Generative Adversarial Networks (GANs)
        </h2>
      </Title>
      <video src={MainVideo} type="video/mp4" autoPlay loop muted />
    </VideoContainer>
  );
};

export default CoverVideo;