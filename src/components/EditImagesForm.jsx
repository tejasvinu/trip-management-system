import React, { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const EditImagesForm = ({ images, onSave, onCancel, tripId }) => {
  const [editedImages, setEditedImages] = useState(images);
  const [hasChanges, setHasChanges] = useState(false);
  const [newImages, setNewImages] = useState([]);

  const handleImageChange = (index, field, value) => {
    const newImages = [...editedImages];
    newImages[index] = { ...newImages[index], [field]: value };
    setEditedImages(newImages);
    setHasChanges(true);
  };

  const handleAddNewImage = () => {
    setNewImages([...newImages, {
      title: '',
      description: '',
      day: '',
      imageurl: '',
      isNew: true
    }]);
    setHasChanges(true);
  };

  const handleNewImageChange = (index, field, value) => {
    const updatedNewImages = [...newImages];
    updatedNewImages[index] = { ...updatedNewImages[index], [field]: value };
    setNewImages(updatedNewImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasChanges) {
      onCancel();
      return;
    }

    // Handle updates for existing images
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
        _id: img._id,
        title: img.title || '',
        description: img.description || '',
        day: img.day || '',
        imageurl: img.imageurl
      }));

    // Include new images
    const allUpdates = {
      updates,
      newImages: newImages.map(img => ({
        title: img.title || '',
        description: img.description || '',
        day: img.day || '',
        imageurl: img.imageurl || ''
      }))
    };

    onSave('image', null, allUpdates);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Existing Images */}
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
      
      {/* New Images */}
      {newImages.map((image, index) => (
        <div key={`new-${index}`} className="border p-4 rounded-lg bg-green-50">
          <div className="mb-4">
            <input
              type="url"
              value={image.imageurl || ''}
              onChange={(e) => handleNewImageChange(index, 'imageurl', e.target.value)}
              placeholder="Image URL"
              className="w-full p-2 border rounded mb-2"
            />
            {image.imageurl && (
              <img 
                src={image.imageurl} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded mb-2"
              />
            )}
          </div>
          <input
            type="text"
            value={image.title || ''}
            onChange={(e) => handleNewImageChange(index, 'title', e.target.value)}
            placeholder="Image title"
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            value={image.description || ''}
            onChange={(e) => handleNewImageChange(index, 'description', e.target.value)}
            placeholder="Image description"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="number"
            value={image.day || ''}
            onChange={(e) => handleNewImageChange(index, 'day', e.target.value)}
            placeholder="Day number"
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
      
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleAddNewImage}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add New Image
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={!hasChanges}
        >
          Save All Changes
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
