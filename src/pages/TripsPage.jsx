import { useState, useEffect } from 'react';
import { tripService } from '../services/tripService';
import TripList from '../components/TripList';

const TripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const data = await tripService.getAllTrips();
      setTrips(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrip = async () => {
    const newTrip = {
      destination: "Paris",
      startdate: "2024-06-01",
      enddate: "2024-06-07",
      price: 1500,
      fullprice: 2000,
      capacity: 20,
      tripimage: "https://example.com/paris.jpg",
      weeknumber: 22
    };

    try {
      await tripService.createTrip(newTrip);
      loadTrips();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await tripService.deleteTrip(tripId);
      loadTrips();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center">Loading trips...</div>
      ) : (
        <TripList trips={trips} onDelete={handleDeleteTrip} />
      )}

      <button
        onClick={handleCreateTrip}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Create New Trip
      </button>
    </div>
  );
};

export default TripsPage;
