import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { useNavigate, useLocation } from 'react-router-dom';

const NavContainer = styled.div`
  width: 100vw;
  z-index: 6;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  overflow: visible;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    justify-content: flex-end;
    padding: 0 1rem;
  }
`;

const MenuBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 4rem;
  background-color: #1a1a1a;
  width: 100%;
  opacity: ${(props) => (props.isMenuOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    height: ${(props) => (props.isMenuOpen ? '100vh' : '3rem')};
  }
`;

const MenuBtn = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.7);
  width: 15rem;
  height: 2.5rem;
  clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
  position: absolute;
  top: ${(props) => (props.isMenuOpen ? '4rem' : '0')};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #000000;
  cursor: pointer;
  z-index: 7;
  transition: top 0.5s ease-in-out;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
    clip-path: none;
    border-radius: 50%;
    top: 0.5rem;
    left: auto;
    right: 1rem;
    transform: none;
    font-size: 0;
    background-color: rgba(255, 255, 255, 0.9);

    &::before {
      content: ${(props) => (props.isMenuOpen ? '"✕"' : '"☰"')};
      font-size: 1.5rem;
      color: #000000;
    }
  }
`;

const MenuItems = styled(motion.ul)`
  position: relative;
  height: 4rem;
  color: #ffffff;
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0 2rem;
  margin: 0;
  box-sizing: border-box;
  overflow: visible;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
    padding: 5rem 1rem 1rem;
    justify-content: flex-start;
  }
`;

const MenuItemContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  gap: 10rem;
  width: auto;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    height: auto;
    width: 100%;
  }
`;

const MenuItem = styled(motion.li)`
  text-transform: uppercase;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.5rem 0;
  }
`;

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { scroll } = useLocomotiveScroll();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const navigateAndScroll = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else if (scroll) {
      scroll.scrollTo(`#${sectionId}`, {
        duration: 1000,
        easing: [0.25, 0.0, 0.35, 1.0],
      });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo && scroll) {
      scroll.scrollTo(`#${location.state.scrollTo}`, {
        duration: 1000,
        easing: [0.25, 0.0, 0.35, 1.0],
      });
    }
  }, [location, scroll]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navContainer = document.querySelector('nav');
      if (navContainer && !navContainer.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={{ overflow: 'visible' }}>
      <NavContainer isVisible={isVisible}>
        <MenuBackground isMenuOpen={isMenuOpen} />
        <MenuBtn
          isMenuOpen={isMenuOpen}
          onClick={handleToggle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </MenuBtn>
        <MenuItems>
          <AnimatePresence>
            {isMenuOpen && (
              <MenuItemContainer
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MenuItem
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9, y: 0 }}
                  onClick={() => navigateAndScroll('home')}
                >
                  Home
                </MenuItem>
                <MenuItem
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9, y: 0 }}
                  onClick={() => navigateAndScroll('who-we-are')}
                >
                  Who Are We
                </MenuItem>
                <MenuItem
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9, y: 0 }}
                  onClick={() => navigateAndScroll('what-we-do')}
                >
                  What We Do
                </MenuItem>
                <MenuItem
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9, y: 0 }}
                  onClick={() => navigateAndScroll('try-it')}
                >
                  Try It
                </MenuItem>
              </MenuItemContainer>
            )}
          </AnimatePresence>
        </MenuItems>
      </NavContainer>
    </nav>
  );
};

export default NavBar;