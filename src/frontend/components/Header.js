import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import LogoImage from '../assets/images/image3.jpg';

// Styled Components
const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: top 0.3s;
  background: transparent;
`;

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.1) brightness(0.9);
`;

const LogoText = styled(motion.span)`
  font-size: ${(props) => props.theme.fontlg || '1.5rem'};
  color: ${(props) => props.theme.text || '#e0e0e0'};
  font-weight: bold;
  margin-left: 10px;
`;

const MenuLink = styled(motion.a)`
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #333, #555);
  color: #e0e0e0;
  border: 1px solid #444;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  text-decoration: none;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #444, #666);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.7);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    height: 44px;
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 2rem;
  margin-top: 10px;
  background: #222;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  z-index: 999;
  color: white;
`;

function Header({ toggleMenu }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Scroll hide/show effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <HeaderContainer style={{ top: isVisible ? '0' : '-100px' }}>
      <LogoWrapper to="/">
        <LogoContainer
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <LogoImg src={LogoImage} alt="ClearVue Logo" />
        </LogoContainer>
        <LogoText
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          ClearVue
        </LogoText>
      </LogoWrapper>

      <div ref={menuRef}>
        <MenuLink
          href="#menu"
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(!menuOpen);
            if (toggleMenu) toggleMenu();
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </motion.svg>
        </MenuLink>

        {menuOpen && (
          <MenuDropdown>
            <p>Menu Item 1</p>
            <p>Menu Item 2</p>
            <p>Menu Item 3</p>
          </MenuDropdown>
        )}
      </div>
    </HeaderContainer>
  );
}

export default Header;
