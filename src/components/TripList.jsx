import TripCard from './TripCard';

const TripList = ({ trips, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {trips.map(trip => (
        <TripCard key={trip._id} trip={trip} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TripList;
