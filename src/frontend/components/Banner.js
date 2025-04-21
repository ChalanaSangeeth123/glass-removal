import React from 'react';
import styled from 'styled-components';
import bannerImage from '../assets/images/banner10.jpg';
import { motion } from 'framer-motion';

// Assuming a theme similar to the video component
const theme = {
  fontBig: '12rem',    // Very large for ClearVue
  fontxl: '2.5rem',   // Medium for Realistic...
  fontlg: '1rem',     // Small for Powered by...
  text: '#fff',
  Body: '#000'
};

const BannerContainer = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  background-image: url(${bannerImage});
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    height: 70vh;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Content = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.text};
  z-index: 1;

  h1 {
    font-family: 'Kaushan Script';  // Matching video component
    font-size: ${props => props.theme.fontBig};
    text-shadow: 1px 1px 1px ${props => props.theme.Body};
    font-weight: 700;
    margin: 0;
    line-height: 1;
  }

  h3 {
    font-family: 'Sirin Stencil';  // Matching video component
    font-size: ${props => props.theme.fontxl};
    text-shadow: 1px 1px 1px ${props => props.theme.Body};
    font-weight: 400;
    margin: 0.5rem 0;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  h2 {
    font-family: 'Sirin Stencil';  // Matching video component
    font-size: ${props => props.theme.fontlg};
    text-shadow: 1px 1px 1px ${props => props.theme.Body};
    font-weight: 300;
    margin: 0.5rem 0;
    text-transform: capitalize;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    h1 {
      font-size: 6rem;  // Adjusted from fontBig
    }
    h3 {
      font-size: 1.5rem;  // Adjusted from fontxl
    }
    h2 {
      font-size: 0.8rem;  // Adjusted from fontlg
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 4rem;
    }
    h3 {
      font-size: 1.2rem;
    }
    h2 {
      font-size: 0.6rem;
    }
  }
`;

const MoreLink = styled(motion.a)`
  position: absolute;
  bottom: 2rem;
  color: ${props => props.theme.text};
  text-decoration: none;
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
  border: 2px solid ${props => props.theme.text};
  border-radius: 50px;
  z-index: 2;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    text-decoration: none;
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 2,
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

// Smooth scroll function
const scrollToNextSection = (e) => {
  e.preventDefault();
  const nextSection = document.getElementById('one');
  if (nextSection) {
    nextSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

function Banner() {
  return (
    <BannerContainer id="banner" className="wrapper post bg-img">
      <Overlay />
      <Content
        theme={theme}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants}>ClearVue</motion.h1>
        <motion.h3 variants={itemVariants}>
          Realistic Glass Removal in Facial Images
        </motion.h3>
        <motion.h2 variants={itemVariants}>
          Powered by Computer Vision & Generative Adversarial Networks (GANs)
        </motion.h2>
      </Content>
      <MoreLink
        theme={theme}
        href="#one"
        className="more current"
        variants={linkVariants}
        initial="hidden"
        animate="visible"
        onClick={scrollToNextSection}
      >
        Learn More
      </MoreLink>
    </BannerContainer>
  );
}

export default Banner;