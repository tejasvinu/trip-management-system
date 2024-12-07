import React, { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const EditImagesForm = ({ images, onSave, onCancel }) => {
  const [editedImages, setEditedImages] = useState(images);
  const [hasChanges, setHasChanges] = useState(false);

  const handleImageChange = (index, field, value) => {
    const newImages = [...editedImages];
    newImages[index] = { ...newImages[index], [field]: value };
    setEditedImages(newImages);
    setHasChanges(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasChanges) {
      onCancel();
      return;
    }

    // Only include images that have been modified
    const updates = editedImages
      .filter((img, index) => {
        const originalImg = images[index];
        return (
          img.title !== originalImg.title ||
          img.description !== originalImg.description ||
          img.day !== originalImg.day ||
          img.imageurl !== originalImg.imageurl
        );
      })
      .map(img => ({
        _id: img._id, // Include the image ID
        title: img.title || '',
        description: img.description || '',
        day: img.day || '',
        imageurl: img.imageurl
      }));

    if (updates.length > 0) {
      onSave('image', null, { updates });
    } else {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {editedImages.map((image, index) => (
        <div key={image._id} className="border p-4 rounded-lg">
          <img 
            src={image.imageurl} 
            alt={image.title || 'Trip image'} 
            className="w-full h-48 object-cover rounded mb-2"
          />
          <input
            type="text"
            value={image.title || ''}
            onChange={(e) => handleImageChange(index, 'title', e.target.value)}
            placeholder="Image title"
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            value={image.description || ''}
            onChange={(e) => handleImageChange(index, 'description', e.target.value)}
            placeholder="Image description"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="number"
            value={image.day || ''}
            onChange={(e) => handleImageChange(index, 'day', e.target.value)}
            placeholder="Day number"
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
      
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={!hasChanges}
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditImagesForm;
