import React from 'react';
import styled from 'styled-components';
import img1 from '../assets/Images/img6.jpg';

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  width: 80vw;
  overflow: hidden;
  display: flex;
  flex-direction: row-reverse;
  margin: 0 auto;
  z-index: 1;
  background: linear-gradient(to bottom, #3a3a3a, #1f1f1f);
  color: white;
  padding: 5rem 0 0 0;

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
  right: 5%;
  z-index: 5;
  color: white;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    font-size: 3rem;
    position: static;
    text-align: center;
    margin-bottom: 1.5rem;
  }
`;

const Right = styled.div`
  width: 50%;
  font-size: ${props => props.theme.fontlg || '1.5rem'};
  font-weight: 300;
  position: relative;
  z-index: 4;
  margin-top: 20%;
  padding: 2rem;
  color: white;

  /* Mobile adjustments */
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0;
    padding: 1rem;
    font-size: 1.2rem;
    text-align: center;
  }
`;

const Left = styled.div`
  width: 50%;
  position: relative;
  overflow: auto;
  
  img {
    width: 100%;
    height: auto;
    margin-bottom: 1.5rem;
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

const WhatWeDo = () => {
  return (
    <Section id="what-we-do">
      <Title data-scroll data-scroll-speed="2" data-scroll-direction="horizontal">
        What We Do
      </Title>
      <Right>
        ClearVue is a powerful utility tool designed to remove glasses from images instantly. 
        Our technology allows you to upload any image with glasses and receive a clean, 
        glasses-free version in just seconds.
        <br />
        <br />
        We specialize in maintaining the original image quality while seamlessly 
        reconstructing facial features hidden behind eyewear. The process is simple: 
        upload, process, and get your transformed image immediately.
        <br />
        <br />
        Whether you need professional headshots, personal photos, or ID images without 
        glasses, ClearVue provides a fast, efficient solution that preserves the 
        natural look and details of your original image.
      </Right>
      <Left>
        <img src={img1} alt="Our Work" />
      </Left>
    </Section>
  );
};

export default WhatWeDo;