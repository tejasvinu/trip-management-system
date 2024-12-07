import React, { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const EditTripForm = ({ trip, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    destination: trip.destination || '',
    startdate: trip.startdate || '',
    enddate: trip.enddate || '',
    price: trip.price || 0,
    fullprice: trip.fullprice || 0,
    capacity: trip.capacity || 0,
    tripimage: trip.tripimage || '',
    weeknumber: trip.weeknumber || 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'price' || name === 'fullprice' || name === 'capacity' || name === 'weeknumber'
      ? parseInt(value, 10)
      : value;
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave('trip', null, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Destination</label>
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startdate"
            value={formData.startdate.split('T')[0]}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="enddate"
            value={formData.enddate.split('T')[0]}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Full Price</label>
          <input
            type="number"
            name="fullprice"
            value={formData.fullprice}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Week Number</label>
          <input
            type="number"
            name="weeknumber"
            value={formData.weeknumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="1"
            max="52"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Trip Image URL</label>
        <input
          type="url"
          name="tripimage"
          value={formData.tripimage}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Tippy content="Save Changes">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </Tippy>
        <Tippy content="Cancel Editing">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </Tippy>
      </div>
    </form>
  );
};

export default EditTripForm;
