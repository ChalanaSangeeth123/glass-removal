import React, { useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ResultPage from './components/ResultPage';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const uploadRef = useRef(null);
  const navigate = useNavigate();

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.result_url) {
        // Navigate to the result page with the image URL
        navigate("/result", { 
          state: { 
            imageUrl: data.result_url,
            originalImage: URL.createObjectURL(image)
          }
        });
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      
      <Routes>
        <Route path="/" element={
          <div className="main-content">
            <section className="hero">
              <div className="text-center text-white">
                <h1>See Yourself Without Glasses</h1>
                <p>Transform your photo with just a click and get a glasses-free version.</p>
                <button className="btn btn-primary" onClick={scrollToUpload}>
                  Get Started
                </button>
              </div>
            </section>

            <section id="about-us" className="about-us">
              <div className="text-center text-white">
                <h2>About Us</h2>
                <p>At ClearVue, we specialize in leveraging Generative Adversarial Networks (GANs) to enhance images by removing glasses. Glasses often obscure facial features in photos, but with our cutting-edge GAN-based solution, we reconstruct the face beneath the glasses, preserving all natural details and contours. By training our models on extensive datasets of faces both with and without glasses, ClearVue learns to recognize and generate highly realistic images. Whether you're looking to improve personal photos or enhance image clarity for identity verification, ClearVue provides a fast, seamless, and highly accurate glasses removal solution.</p>
              </div>
            </section>

            <section ref={uploadRef} className="upload-section">
              <div className="text-center text-white">
                <h2>Upload your Image</h2>
                <input 
                  type="file" 
                  className="upload-button" 
                  onChange={handleFileChange}
                  accept="image/*"
                />
                
                <div className="mt-3">
                  {image && (
                    <button 
                      className="btn btn-primary" 
                      onClick={handleUpload}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Remove Glasses"}
                    </button>
                  )}
                </div>

                {error && (
                  <div className="mt-3 text-danger">
                    <p>{error}</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        } />
        <Route path="/result" element={<ResultPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;