import React, { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const EditTripForm = ({ trip, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...trip });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave('trip', null, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form bg-gray-50 p-4 rounded shadow">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Destination:
          <input
            type="text"
            value={formData.destination}
            onChange={(e) => handleChange('destination', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Start Date:
          <input
            type="date"
            value={formData.startdate}
            onChange={(e) => handleChange('startdate', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          End Date:
          <input
            type="date"
            value={formData.enddate}
            onChange={(e) => handleChange('enddate', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Price:
          <input
            type="number"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Capacity:
          <input
            type="number"
            value={formData.capacity}
            onChange={(e) => handleChange('capacity', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Trip Image URL:
          <input
            type="text"
            value={formData.tripimage}
            onChange={(e) => handleChange('tripimage', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </label>
      </div>
      <div className="form-actions flex justify-end space-x-2">
        <Tippy content="Save Changes">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
        </Tippy>
        <Tippy content="Cancel Editing">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
            Cancel
          </button>
        </Tippy>
      </div>
    </form>
  );
};

export default EditTripForm;
