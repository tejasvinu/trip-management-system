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
  
  // Replace isEditing state with modal states
  const [activeModal, setActiveModal] = useState(null);

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
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
        console.log(hotelsData);
        console.log(itineraryData);
        console.log(tripData);
      } catch (error) {
        setError(error.message);
      }
    };

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
      console.log(hotelsData);
      console.log(itineraryData);
      console.log(tripData);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSave = async (section, id, data) => {
    try {
      let result;
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
      } else if (section === 'image') {
        // Use the new bulk update method
        result = await tripDetailsService.updateTripImages(tripId, data);
      }
      
      if (section === 'itinerary') {
        setItinerary(result);
      } else if (section === 'image') {
        // Refresh trip data to get updated images
        await fetchTripData();
      }
      
      handleCloseModal();
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) return <div className="error-message">{error}</div>;
  if (!trip) return <div>Loading...</div>;

  return (
    <div className="trip-details p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{trip.destination}</h1>
      
      {/* Basic Trip Info */}
      <section className="trip-info bg-white p-4 rounded shadow mb-6">
        <Tippy content="Edit Trip Details">
          <button
            onClick={() => handleEdit('trip')}
            className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Trip Details
          </button>
        </Tippy>
        <p className="mt-2"><strong>Start Date:</strong> {new Date(trip.startdate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(trip.enddate).toLocaleDateString()}</p>
        <p><strong>Price:</strong> ${trip.price}</p>
        <p><strong>Available Capacity:</strong> {trip.capacity}</p>
        <img src={trip.tripimage} alt={trip.destination} className="mt-4 rounded" />
      </section>

      {/* Itinerary Section */}
      <section className="itinerary bg-white p-4 rounded shadow mb-6">
        <Tippy content="Edit Itinerary">
          <button
            onClick={() => handleEdit('itinerary')}
            className="mb-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Edit Itinerary
          </button>
        </Tippy>
        <h2 className="text-2xl font-semibold mb-2">Itinerary</h2>
        {itinerary && Array.isArray(itinerary) ? (
          // Handle array of itineraries
          itinerary.map((item) => (
            <div key={item._id}>
              {item.paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-2 text-gray-700">{paragraph}</p>
              ))}
            </div>
          ))
        ) : itinerary?.paragraphs ? (
          // Handle single itinerary object
          itinerary.paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-2 text-gray-700">{paragraph}</p>
          ))
        ) : (
          <p>No itinerary available</p>
        )}
      </section>

      {/* Hotels Section */}
      <section className="hotels bg-white p-4 rounded shadow mb-6">
        <h2 className="text-2xl font-semibold mb-2">Hotels</h2>
        <Tippy content="Edit Hotels">
          <button
            onClick={() => handleEdit('hotel')}
            className="mb-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Edit Hotels
          </button>
        </Tippy>
        {hotels?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotels.map((hotel) => (
              hotel.hotels?.map((h, index) => (
                <div key={index} className="hotel-card">
                  <h3>{h.name}</h3>
                  <img src={h.photo} alt={h.name} />
                  <p>{h.location}</p>
                  <p>{h.description}</p>
                  <div className="amenities">
                    {h.amenities.map((amenity, i) => (
                      <span key={i} className="amenity-tag">{amenity}</span>
                    ))}
                  </div>
                  <a href={h.gmapsLocation} target="_blank" rel="noopener noreferrer">
                    View on Google Maps
                  </a>
                </div>
              ))
            ))}
          </div>
        ) : (
          <p>No hotels available</p>
        )}
      </section>

      {/* Gallery Section */}
      <section className="gallery bg-white p-4 rounded shadow mb-6">
        <h2 className="text-2xl font-semibold mb-2">Trip Gallery</h2>
        <Tippy content="Edit Images">
          <button
            onClick={() => handleEdit('image')}
            className="mb-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit Images
          </button>
        </Tippy>
        <div className="image-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="image-card relative">
              <img src={image.imageurl} alt={image.title || 'Trip image'} className="w-full h-48 object-cover rounded" />
              {image.title && (
                <Tippy content={image.title}>
                  <h4 className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">{image.title}</h4>
                </Tippy>
              )}
              {image.description && <p>{image.description}</p>}
              {image.day && <span>Day {image.day}</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Replace inline forms with modals */}
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
  );
};

export default TripDetails;
