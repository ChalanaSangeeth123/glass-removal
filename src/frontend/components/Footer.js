import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FooterContainer = styled(motion.footer)`
  width: 100%;
  background: linear-gradient(to top, #1f1f1f, #3a3a3a);
  color: #ffffff;
  padding: 1.5rem 0;
  z-index: 1000;
  overflow-x: hidden;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const FooterContent = styled.div`
  width: 80vw;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap; /* Changed from wrap to nowrap to keep items on the same line */
  box-sizing: border-box;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    width: 90vw;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const LogoText = styled(motion.h3)`
  font-family: 'Kaushan Script';
  font-size: 1.75rem;
  font-weight: 300;
  margin: 0; /* Remove default margin from h3 to align with others */

  /* Mobile adjustments */
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const HomeLink = styled(motion(Link))`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 300;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #4a90e2;
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const ContactEmail = styled(motion.a)`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 300;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #4a90e2;
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Copyright = styled.p`
  font-size: 0.75rem;
  font-weight: 300;
  opacity: 0.7;
  margin: 0; /* Remove default margin from p to align with others */

  /* Mobile adjustments */
  @media (max-width: 768px) {
    font-size: 0.65rem;
  }
`;

function Footer() {
  return (
    <FooterContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FooterContent>
        <LogoText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ClearVue
        </LogoText>

        <Copyright>© {new Date().getFullYear()} ClearVue. All rights reserved.</Copyright>

        <ContactEmail
          href="mailto:support@clearvue.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us: chalanasangeeth002@gmail.com
        </ContactEmail>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;