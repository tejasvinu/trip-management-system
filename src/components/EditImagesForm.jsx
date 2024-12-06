import React, { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const EditImagesForm = ({ images, onSave, onCancel }) => {
  const [editedImages, setEditedImages] = useState([...images]);

  const handleChange = (index, field, value) => {
    const updatedImages = [...editedImages];
    updatedImages[index] = { ...updatedImages[index], [field]: value };
    setEditedImages(updatedImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave('image', null, editedImages);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form bg-gray-50 p-4 rounded shadow">
      {editedImages.map((image, index) => (
        <div key={index} className="form-group mb-6">
          <h4 className="text-lg font-medium mb-2">Image {index + 1}</h4>
          <label>
            Image URL:
            <input
              type="text"
              value={image.imageurl}
              onChange={(e) => handleChange(index, 'imageurl', e.target.value)}
              className="border p-2 rounded w-full"
            />
          </label>
          <label>
            Title:
            <input
              type="text"
              value={image.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              className="border p-2 rounded w-full"
            />
          </label>
          <label>
            Description:
            <textarea
              value={image.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              className="border p-2 rounded w-full"
            />
          </label>
          <label>
            Day:
            <input
              type="number"
              value={image.day}
              onChange={(e) => handleChange(index, 'day', e.target.value)}
              className="border p-2 rounded w-full"
            />
          </label>
        </div>
      ))}
      <div className="form-actions">
        <Tippy content="Save Image">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
        </Tippy>
        <Tippy content="Cancel Editing">
          <button type="button" onClick={onCancel} className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
            Cancel
          </button>
        </Tippy>
      </div>
    </form>
  );
};

export default EditImagesForm;
