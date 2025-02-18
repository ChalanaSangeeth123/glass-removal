import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";  // Using React Router Link for navigation
import { scroller } from "react-scroll";  // Import scroller for smooth scrolling

const Header = () => {
  const navigate = useNavigate(); // Use navigate hook for programmatic navigation

  // Function to handle redirect to the home page and scroll to the top
  const handleScrollToSection = (sectionId) => {
    navigate("/"); // Always navigate to home page
    scroller.scrollTo(sectionId, { // Scroll to the section based on the sectionId
      smooth: true,
      offset: -70,  // Adjust for the navbar height
      duration: 500  // Scroll duration
    });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        {/* Brand name aligned to the left */}
        <Navbar.Brand
          href="#"
          style={{ color: "#58a6ff", fontWeight: "bold", fontSize: "1.5rem" }}
          onClick={() => handleScrollToSection("hero")} // Scroll to top on brand click
        >
          ClearVue
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navigation items aligned to the right */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto" style={{ marginLeft: "auto", marginRight: "0" }}>
            {/* Navigate to home page and scroll to the top */}
            <Nav.Link as={Link} to="/" onClick={() => handleScrollToSection("hero")}>
              Home
            </Nav.Link>
            {/* Scroll to About Us section */}
            <Nav.Link onClick={() => handleScrollToSection("about-us")}>
              About Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
