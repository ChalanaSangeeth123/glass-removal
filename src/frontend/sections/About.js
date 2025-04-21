import React from 'react';
import styled from 'styled-components';
import img1 from '../assets/Images/image1.jpg';

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  width: 80vw;
  overflow: hidden;
  display: flex;
  margin: 0 auto;
  z-index: 1;

  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    flex-direction: column;
    width: 90vw;
    min-height: auto;
    padding: 2rem 0;
  }
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontBig || '5rem'};
  font-family: 'Kaushan Script';
  font-weight: 300;
  position: absolute;
  top: 1rem;
  left: 5%;
  z-index: 5;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    font-size: 3rem;
    position: static;
    text-align: center;
    margin-bottom: 1.5rem;
  }
`;

const Left = styled.div`
  width: 50%;
  font-size: ${props => props.theme.fontlg || '1.5rem'};
  font-weight: 300;
  position: relative;
  z-index: 4;
  margin-top: 20%;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0;
    padding: 0 1rem;
    font-size: 1.2rem;
    text-align: center;
  }
`;

const Right = styled.div`
  width: 50%;
  position: relative;
  overflow: auto;

  img {
    width: 100%;
    height: auto;
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

const About = () => {
  return (
    <Section id="who-we-are">
      <Title data-scroll data-scroll-speed="-2" data-scroll-direction="horizontal">
        Who are We?
      </Title>
      <Left>
        ClearVue is a utility tool built for image enhancement to automatically remove glasses from images. The system is capable of reconstructing facial features beneath glasses while preserving natural details and contours so that users can have clear, unobstructed images of faces for both personal and professional purposes.
        <br />
        <br />
        The technology emerges as an innovative solution to a complex visual challenge, offering a sophisticated approach to revealing facial details hidden behind eyewear. By leveraging advanced computational techniques, ClearVue transforms how we perceive and process images with glasses, presenting a breakthrough in digital image analysis and reconstruction.
        <br />
        <br />
        The system was designed and developed by <b><i>Chalana Sangeeth</i></b>
      </Left>
      <Right>
        <img src={img1} alt="About us" />
      </Right>
    </Section>
  );
};

export default About;