import { useState } from 'react';

const CreateTripModal = ({ isOpen, onClose, onSubmit }) => {
  const [tripData, setTripData] = useState({
    destination: '',
    startdate: '',
    enddate: '',
    price: '',
    fullprice: '',
    capacity: '',
    tripimage: '',
    weeknumber: ''
  });

  const handleChange = (e) => {
    setTripData({
      ...tripData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tripData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Trip</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Destination</label>
            <input
              type="text"
              name="destination"
              value={tripData.destination}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">Start Date</label>
              <input
                type="date"
                name="startdate"
                value={tripData.startdate}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">End Date</label>
              <input
                type="date"
                name="enddate"
                value={tripData.enddate}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={tripData.price}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Full Price</label>
              <input
                type="number"
                name="fullprice"
                value={tripData.fullprice}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={tripData.capacity}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Week Number</label>
              <input
                type="number"
                name="weeknumber"
                value={tripData.weeknumber}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Image URL</label>
            <input
              type="url"
              name="tripimage"
              value={tripData.tripimage}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTripModal;
