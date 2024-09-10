'use client'
import React, { useState } from 'react';
import { CldImage } from 'next-cloudinary';

export function ImageUploader() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      if (data.success) {
        setImageUrl(data.result.secure_url);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} accept="image/*" />
      {imageUrl && (
        <CldImage
          width="400"
          height="300"
          src={imageUrl}
          alt="Uploaded image"
        />
      )}
    </div>
  );
}