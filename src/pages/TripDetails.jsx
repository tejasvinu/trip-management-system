import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { tripDetailsService } from '../services/tripDetailsService';
import EditTripForm from '../components/EditTripForm';
import EditItineraryForm from '../components/EditItineraryForm';
import EditHotelsForm from '../components/EditHotelsForm';
import EditImagesForm from '../components/EditImagesForm';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Modal from '../components/Modal';

const TripDetails = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    fetchTripData();
  }, [tripId]);

  const handleEdit = (section) => {
    setActiveModal(section);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const fetchTripData = async () => {
    try {
      const [tripData, itineraryData, hotelsData, imagesData] = await Promise.all([
        tripDetailsService.getTripDetails(tripId),
        tripDetailsService.getTripItinerary(tripId),
        tripDetailsService.getTripHotels(tripId),
        tripDetailsService.getTripImages(tripId)
      ]);

      setTrip(tripData);
      setItinerary(itineraryData);
      setHotels(hotelsData);
      setImages(imagesData);
      console.log(imagesData);
      console.log(tripData);
      console.log(itineraryData);
      console.log(hotelsData);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSave = async (section, id, data) => {
    try {
      let result;
      if (section === 'image') {
        // Handle existing image updates
        if (data.updates && data.updates.length > 0) {
          result = await tripDetailsService.updateTripImages(tripId, { updates: data.updates });
        }
        
        // Handle new images
        if (data.newImages && data.newImages.length > 0) {
          for (const newImage of data.newImages) {
            await tripDetailsService.createTripImage(tripId, newImage);
          }
        }
        
        await fetchTripData();
      } else {
        if (section === 'trip') {
          result = await tripDetailsService.editTripDetails(tripId, data);
        } else if (section === 'itinerary') {
          const itineraryId = Array.isArray(itinerary) 
            ? itinerary[0]?._id 
            : itinerary?._id;
          
          result = await tripDetailsService.editItinerary(itineraryId, {
            paragraphs: data.paragraphs
          });
        } else if (section === 'hotel') {
          result = await tripDetailsService.editHotel(tripId, id, data);
        }
      }
      
      if (section === 'itinerary') {
        setItinerary(result);
      } else if (section === 'image') {
        await fetchTripData();
      }
      
      handleCloseModal();
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) return <div className="error-message text-red-600">{error}</div>;
  if (!trip) return <div className="text-center">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{trip.destination}</h1>

        {/* Basic Trip Info */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong className="text-gray-900">Start Date:</strong> {new Date(trip.startdate).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">End Date:</strong> {new Date(trip.enddate).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Price:</strong> ₹{trip.price.toLocaleString()}
                {trip.fullprice && (
                  <span className="ml-2 line-through text-gray-500">
                    ₹{trip.fullprice.toLocaleString()}
                  </span>
                )}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Available Capacity:</strong> {trip.capacity}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Week Number:</strong> {trip.weeknumber}
              </p>
            </div>
            <Tippy content="Edit Trip Details">
              <button
                onClick={() => handleEdit('trip')}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Edit
              </button>
            </Tippy>
          </div>
          <img src={trip.tripimage} alt={trip.destination} className="mt-4 w-full h-64 object-cover rounded-lg" />
        </section>

        {/* Itinerary Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Itinerary</h2>
            <Tippy content="Edit Itinerary">
              <button
                onClick={() => handleEdit('itinerary')}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Edit
              </button>
            </Tippy>
          </div>
          {itinerary && Array.isArray(itinerary) ? (
            itinerary.map((item) => (
              <div key={item._id} className="mb-4">
                {item.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-2">{paragraph}</p>
                ))}
              </div>
            ))
          ) : itinerary?.paragraphs ? (
            itinerary.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-2">{paragraph}</p>
            ))
          ) : (
            <p className="text-gray-700">No itinerary available</p>
          )}
        </section>

        {/* Hotels Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Hotels</h2>
            <Tippy content="Edit Hotels">
              <button
                onClick={() => handleEdit('hotel')}
                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                Edit
              </button>
            </Tippy>
          </div>
          {hotels?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                hotel.hotels?.map((h, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition duration-300">
                    <img src={h.photo} alt={h.name} className="w-full h-48 object-cover rounded-t-lg" />
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{h.name}</h3>
                      <p className="text-gray-700 mb-2">{h.location}</p>
                      <p className="text-gray-700 mb-4">{h.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {h.amenities.map((amenity, i) => (
                          <span key={i} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">{amenity}</span>
                        ))}
                      </div>
                      <a href={h.gmapsLocation} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        View on Google Maps
                      </a>
                    </div>
                  </div>
                ))
              ))}
            </div>
          ) : (
            <p className="text-gray-700">No hotels available</p>
          )}
        </section>

        {/* Gallery Section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Trip Gallery</h2>
            <Tippy content="Edit Images">
              <button
                onClick={() => handleEdit('image')}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                Edit
              </button>
            </Tippy>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img src={image.imageurl} alt={image.title || 'Trip image'} className="w-full h-48 object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition duration-300">
                  {image.title && (
                    <Tippy content={image.title}>
                        <h4 className="text-white text-center px-4 py-2">{image.title}</h4>
                    </Tippy>
                  )}
                </div>
                <div className="mt-2">
                  {image.description && <p className="text-gray-700">{image.description}</p>}
                  {image.day && <span className="text-gray-600">Day {image.day}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modals */}
        <Modal
          isOpen={activeModal === 'trip'}
          onClose={handleCloseModal}
          title="Edit Trip Details"
        >
          <EditTripForm
            trip={{
              ...trip,
              startdate: formatDateForInput(trip.startdate),
              enddate: formatDateForInput(trip.enddate)
            }}
            onSave={handleSave}
            onCancel={handleCloseModal}
          />
        </Modal>

        <Modal
          isOpen={activeModal === 'itinerary'}
          onClose={handleCloseModal}
          title="Edit Itinerary"
        >
          <EditItineraryForm
            itinerary={Array.isArray(itinerary) ? itinerary[0] : itinerary}
            onSave={handleSave}
            onCancel={handleCloseModal}
          />
        </Modal>

        <Modal
          isOpen={activeModal === 'hotel'}
          onClose={handleCloseModal}
          title="Edit Hotels"
        >
          <EditHotelsForm
            hotels={hotels}
            onSave={handleSave}
            onCancel={handleCloseModal}
          />
        </Modal>

        <Modal
          isOpen={activeModal === 'image'}
          onClose={handleCloseModal}
          title="Edit Images"
        >
          <EditImagesForm
            images={images}
            onSave={handleSave}
            onCancel={handleCloseModal}
          />
        </Modal>
      </div>
    </div>
  );
};

export default TripDetails;