import React from 'react';
import styled from 'styled-components';
import CoverVideo from '../components/CoverVideo';
import Logo from '../components/Logo';
import NavBar from '../components/NavBar';

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    min-height: auto;
    height: auto; /* Allow height to adjust based on content */
    padding: 1rem 0; /* Add some padding for mobile */
  }
`;

const Home = () => {
  return (
    <Section>
      <CoverVideo />
      <Logo />
      <NavBar />
    </Section>
  );
};

export default Home;