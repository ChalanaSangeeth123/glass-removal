import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocomotiveScroll } from 'react-locomotive-scroll';

const FooterContainer = styled(motion.footer)`
  width: 100vw;
  background: linear-gradient(to top, #1f1f1f, #3a3a3a);
  color: #ffffff;
  padding: 2rem 0;
  z-index: 1000;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    padding: 1.5rem 0;
  }
`;

const FooterContent = styled.div`
  width: 80vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    width: 90vw;
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const LogoText = styled(motion.h3)`
  font-family: 'Kaushan Script';
  font-size: ${(props) => props.theme.fontxl || '2rem'};
  font-weight: 300;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    gap: 1.5rem;
    justify-content: center;
  }
`;

const SocialIcon = styled(motion.a)`
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  
  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.2);
    fill: #4a90e2;
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    width: 35px;
    height: 35px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const Copyright = styled.p`
  font-size: ${(props) => props.theme.fontsm || '0.875rem'};
  font-weight: 300;
  opacity: 0.7;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

function Footer() {
  const { scroll } = useLocomotiveScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!scroll) return;

    const handleScroll = () => {
      const scrollHeight = scroll?.scroll?.instance?.limit?.y || 0;
      const scrollPosition = scroll?.scroll?.instance?.scroll?.y || 0;
      const windowHeight = window.innerHeight;

      const nearBottom = scrollPosition + windowHeight >= scrollHeight - 100;
      setIsVisible(nearBottom);
    };

    scroll.on('scroll', handleScroll);
    return () => {
      scroll.off('scroll', handleScroll);
    };
  }, [scroll]);

  const socialMediaLinks = [
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
        </svg>
      ),
      href: 'https://facebook.com/chalana.sangeeth.58', 
      label: 'Facebook' 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
        </svg>
      ),
      href: 'https://x.com/PasanChalana', 
      label: 'Twitter' 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.608-11.018-3.731v-2.869z"/>
        </svg>
      ),
      href: 'https://lk.linkedin.com/in/chalana-sangeeth-84628b223', 
      label: 'LinkedIn' 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.76-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      href: 'https://instagram.com/chalana_02?igsh=ZjVyZGhtMnkyb3gO', 
      label: 'Instagram' 
    }
  ];

  return (
    <FooterContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.5 }}
    >
      <FooterContent>
        <LogoText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          ClearVue
        </LogoText>
        
        <SocialLinks>
          {socialMediaLinks.map(({ icon, href, label }) => (
            <SocialIcon
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={label}
            >
              {icon}
            </SocialIcon>
          ))}
        </SocialLinks>

        <Copyright>© {new Date().getFullYear()} ClearVue. All rights reserved.</Copyright>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;