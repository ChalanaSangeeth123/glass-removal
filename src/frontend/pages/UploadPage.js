// src/pages/UploadPage.js
import React, { useState } from "react";
import "./UploadPage.css"; // Add the specific styles for this page

const UploadPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <section className="upload-page">
      <div className="text-center text-white">
        <h1>Upload Your Image</h1>
        <p>Upload an image and let AI remove glasses for you!</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
        {selectedImage && (
          <div className="preview-container">
            <h3>Image Preview:</h3>
            <img src={selectedImage} alt="Selected" className="preview-img" />
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadPage;
