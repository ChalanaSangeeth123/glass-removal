import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "../assets/Svgs/image3.jpg"; // Ensure the correct path
import { motion } from "framer-motion";

const Container = styled.div`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
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

const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontlg || "1.5rem"};
  color: ${(props) => props.theme.text || "black"};
  font-weight: bold;
  margin-left: 10px; /* Adds space between logo and text */
`;

const Logo = () => {
  return (
    <Container>
      <LogoWrapper to="/">
        <LogoContainer
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <LogoImg src={LogoImage} alt="Logo" />
        </LogoContainer>

        <Text
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          ClearVue
        </Text>
      </LogoWrapper>
    </Container>
  );
};

export default Logo;
