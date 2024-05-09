// ImageGenerator.jsx
import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/Assets.webp';
import { createClient } from 'pexels';
const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState(default_image);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const apikey = import.meta.env.VITE_PEXELS_API_KEY
  const client = createClient(apikey
  )
  const generateImage = async () => {
    const query = inputRef.current.value.trim();
    if (!query) {
      setError('Input query cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await client.photos.search({
        query
      })
    
      setImageUrl(response.photos[0].src.original);
    } catch (error) {
      console.log(error);
      console.error('Error generating image:', error);
      setError('An error occurred while fetching the image.');
    } finally {
      setLoading(false);
    }
  };

  const resetImage = () => {
    setImageUrl(default_image);
    setError(null);
    inputRef.current.value = '';
  };

  return (
    <div className='ai-image-generator'>
      <div className='header'>
        AI Image <span>Generator</span>
      </div>
      {error && <div className='error-message'>{error}</div>}
      <div className='img-loading'>
        {loading ? (
          <div className='spinner'></div>
        ) : (
          <div className='image'>
            <img src={imageUrl} loading='lazy' width='500' height='350' alt='Generated image' />
          </div>
        )}
      </div>
      <div className='search-box'>
        <input type='text' ref={inputRef} className='search-bar' placeholder='Search...' />
        <div className='generate-btn' onClick={generateImage}>
          Generate
        </div>
        <div className='reset-btn' onClick={resetImage}>
          Reset
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;