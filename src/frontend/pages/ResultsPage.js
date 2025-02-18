import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const imageUrl = location.state?.imageUrl;
  const originalImage = location.state?.originalImage;
  const downloadUrl = location.state?.downloadUrl; // Get the download URL

  React.useEffect(() => {
    if (!imageUrl) {
      navigate('/');
    }
  }, [imageUrl, navigate]);

  if (!imageUrl) {
    return null;
  }

  return (
    <div style={{ paddingTop: "60px" }}>
      <section className="upload-section" style={{ minHeight: "calc(100vh - 120px)" }}>
        <div className="text-center text-white">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h2>Input Image</h2>
              <img
                src={originalImage}
                alt="Original"
                style={{ width: '256px', height: '256px' }}
              />
            </div>
            
            <div className="col-md-6">
              <h2>Output Image</h2>
              <img
                src={`http://localhost:5000${imageUrl}`}
                alt="Generated"
                style={{ width: '256px', height: '256px' }}
              />
            </div>
          </div>

          <div className="mt-3">
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              Upload Another Image
            </button>
          </div>

          {/* Download Button */}
          <div className="mt-3">
            <a href={`http://localhost:5000${downloadUrl}`} className="btn btn-success" download>
              Download Generated Image
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResultPage;
