import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Nav = ({ isMenuOpen, toggleMenu }) => {
  const navigate = useNavigate();
  const location = useLocation(); // To check the current route
  const menuRef = useRef(null);

  // Handle navigation and scrolling
  const handleNavigation = (sectionId, event) => {
    event.preventDefault();
    if (toggleMenu) toggleMenu(); // Close the menu after clicking

    // If not on the home page, navigate to it first
    if (location.pathname !== '/') {
      navigate('/'); // Redirect to home page
      // Use a slight delay to ensure the page loads before scrolling
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // Adjust delay as needed (100ms should suffice)
    } else {
      // If already on home page, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (isMenuOpen && toggleMenu) {
          toggleMenu();
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, toggleMenu]);

  return (
    <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
      <button onClick={toggleMenu}>Close Menu</button>
      <ul>
        <li>
          <a href="#one" onClick={(e) => handleNavigation('one', e)}>
            Who are we
          </a>
        </li>
        <li>
          <a href="#two" onClick={(e) => handleNavigation('two', e)}>
            What we do
          </a>
        </li>
        <li>
          <a href="#three" onClick={(e) => handleNavigation('three', e)}>
            Try It
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;