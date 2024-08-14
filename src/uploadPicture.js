import React, { useState } from 'react';
import axios from 'axios';

function UploadPicture() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:4000/pictures/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadStatus('Image uploaded successfully!');
      setPictureUrl(`http://localhost:4000/${response.data.filename}`);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('Failed to upload image.');
    }
  };

  return (
    <div>
      <h1>Upload Picture</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {uploadStatus && <p>{uploadStatus}</p>}
      {pictureUrl && <img src={pictureUrl} alt="Uploaded" style={{ maxWidth: '300px', marginTop: '10px' }} />}
    </div>
  );
}

export default UploadPicture;
