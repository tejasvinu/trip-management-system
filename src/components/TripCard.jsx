const TripCard = ({ trip, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{trip.destination}</h3>
      <p className="text-gray-600">Price: ${trip.price}</p>
      <p className="text-gray-600">Capacity: {trip.capacity}</p>
      <button 
        onClick={() => onDelete(trip._id)}
        className="mt-4 bg-red-50 text-red-600 px-4 py-2 rounded hover:bg-red-100"
      >
        Delete
      </button>
    </div>
  );
};

export default TripCard;
