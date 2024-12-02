const TripManagementPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Trip Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Trip Management</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Create and manage trips</li>
            <li>Set destinations and dates</li>
            <li>Manage capacity and pricing</li>
            <li>Upload trip images</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking System</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Process bookings</li>
            <li>Track available seats</li>
            <li>Manage user reservations</li>
            <li>View booking history</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Itinerary Planning</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Create detailed itineraries</li>
            <li>Day-by-day planning</li>
            <li>Hotel management</li>
            <li>Image galleries</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TripManagementPage;
