import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(location.state?.imageUrl || '');
  const [originalImage, setOriginalImage] = useState(location.state?.originalImage || '');
  const [error, setError] = useState(null);

  // Redirect to homepage if no image is uploaded or processed
  useEffect(() => {
    if (!imageUrl) {
      setError("No image uploaded or processed. Please upload an image first.");
      navigate('/');
    }
  }, [imageUrl, navigate]);

  // Display an error if imageUrl is not found
  if (error) {
    return (
      <div className="text-center text-white" style={{ paddingTop: "60px" }}>
        <h2>{error}</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Go back to Home
        </button>
      </div>
    );
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
            <a
              href={`http://localhost:5000${imageUrl}`} // The URL to download the image
              download={`result_image${imageUrl.split('/').pop()}`} // Set the download file name
              className="btn btn-success"
            >
              Download Image
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResultPage;
