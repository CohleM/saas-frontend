'use client'
// pages/index.tsx
import React, { useState } from 'react';
import FileUploader from '@/components/FileUploader';

const Home: React.FC = () => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/uploadfile/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedFileName(data.filename);
        console.log('File uploaded successfully:', data.filename);
      } else {
        console.error('File upload failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  };

  return (
    <div>
      <h1>File Upload Example</h1>
      <FileUploader />
      {uploadedFileName && <p>Uploaded File: {uploadedFileName}</p>}
    </div>
  );
};

export default Home;
