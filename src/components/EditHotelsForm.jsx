import React, { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const EditHotelsForm = ({ hotels, onSave, onCancel }) => {
  const [editedHotels, setEditedHotels] = useState(hotels);

  const handleChange = (index, field, value) => {
    const updatedHotels = [...editedHotels];
    updatedHotels[index] = { ...updatedHotels[index], [field]: value };
    setEditedHotels(updatedHotels);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave('hotel', null, editedHotels);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form bg-gray-50 p-4 rounded shadow">
      {editedHotels.map((hotel, index) => (
        <div key={index} className="form-group mb-6">
          <h4 className="text-lg font-medium mb-2">Hotel {index + 1}</h4>
          <label>
            Name:
            <input
              type="text"
              value={hotel.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
            />
          </label>
          <label>
            Photo URL:
            <input
              type="text"
              value={hotel.photo}
              onChange={(e) => handleChange(index, 'photo', e.target.value)}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              value={hotel.location}
              onChange={(e) => handleChange(index, 'location', e.target.value)}
            />
          </label>
          <label>
            Description:
            <textarea
              value={hotel.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
            />
          </label>
          <label>
            Amenities (comma separated):
            <input
              type="text"
              value={hotel.amenities.join(', ')}
              onChange={(e) =>
                handleChange(
                  index,
                  'amenities',
                  e.target.value.split(',').map((amenity) => amenity.trim())
                )
              }
            />
          </label>
          <label>
            Google Maps URL:
            <input
              type="text"
              value={hotel.gmapsLocation}
              onChange={(e) => handleChange(index, 'gmapsLocation', e.target.value)}
            />
          </label>
        </div>
      ))}
      <div className="form-actions">
        <Tippy content="Save Hotel">
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

export default EditHotelsForm;
