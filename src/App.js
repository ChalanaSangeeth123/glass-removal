import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './frontend/components/Header';
import Nav from './frontend/components/Nav';
import Banner from './frontend/components/Banner';
import Section from './frontend/components/Section';
import ResultPage from './frontend/components/ResultPage';
import Footer from './frontend/components/Footer';
import './frontend/assets/css/main.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div>
        <Header toggleMenu={toggleMenu} />
        <Nav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Section
                  id="one"
                  bgImage="banner8.jpg"
                  title="Who are We?"
                  content={
                    <>
                      ClearVue is a utility tool built for image enhancement to automatically remove glasses from images. The system is capable of reconstructing facial features beneath glasses while preserving natural details and contours so that users can have clear, unobstructed images of faces for both personal and professional purposes.
                      <br />
                      <br />
                      The technology emerges as an innovative solution to a complex visual challenge, offering a sophisticated approach to revealing facial details hidden behind eyewear. By leveraging advanced computational techniques, ClearVue transforms how we perceive and process images with glasses, presenting a breakthrough in digital image analysis and reconstruction.
                      <br />
                      <br />
                      The system was designed and developed by <b><i>Chalana Sangeeth</i></b>
                    </>
                  }
                  nextSection="two"
                />
                <Section
                  id="two"
                  bgImage="banner7.jpg"
                  title="What we do?"
                  content={
                    <>
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
                    </>
                  }
                  nextSection="three"
                />
                <Section
                  id="three"
                  bgImage="banner6.jpg"
                  title="Discover Glass-Free Results"
                />
                <Footer />

              </>
            }
          />
          <Route
            path="/result"
            element={
              <>
                <ResultPage />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;