import { API_BASE_URL } from '../config';

export const tripDetailsService = {
  async getTripDetails(tripId) {
    const response = await fetch(`${API_BASE_URL}/trips/${tripId}`);

    if (!response.ok) throw new Error('Failed to fetch trip details');
    return response.json();
  },

  async getTripItinerary(tripId) {
    const response = await fetch(`${API_BASE_URL}/itineraries/trip/${tripId}`);
    if (!response.ok) throw new Error('Failed to fetch itinerary');
    return response.json();
  },

  async getTripHotels(tripId) {
    const response = await fetch(`${API_BASE_URL}/hotels/trip/${tripId}`);
    if (!response.ok) throw new Error('Failed to fetch hotels');
    return response.json();
  },

  async getTripImages(tripId) {
    const response = await fetch(`${API_BASE_URL}/tripimages/trip/${tripId}`);
    if (!response.ok) throw new Error('Failed to fetch images');
    return response.json();
  },

  async updateTripDetails(tripId, data) {
    const response = await fetch(`${API_BASE_URL}/trips/${tripId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update trip details');
    return response.json();
  },

  async updateItinerary(tripId, data) {
    const response = await fetch(`${API_BASE_URL}/itineraries/trip/${tripId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update itinerary');
    return response.json();
  },

  async updateHotel(tripId, hotelId, data) {
    const response = await fetch(`${API_BASE_URL}/hotels/trip/${tripId}/${hotelId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update hotel');
    return response.json();
  },

  async updateImage(tripId, imageId, data) {
    const response = await fetch(`${API_BASE_URL}/tripimages/trip/${tripId}/${imageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update image');
    return response.json();
  },

  async editTripDetails(tripId, data) {
    const response = await fetch(`${API_BASE_URL}/trips/${tripId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to edit trip details');
    return response.json();
  },

  async editItinerary(tripId, data) {
    const response = await fetch(`${API_BASE_URL}/itineraries/trip/${tripId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to edit itinerary');
    return response.json();
  },

  async editHotel(tripId, hotelId, data) {
    const response = await fetch(`${API_BASE_URL}/hotels/trip/${tripId}/${hotelId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to edit hotel');
    return response.json();
  },

  async editImage(tripId, imageId, data) {
    const response = await fetch(`${API_BASE_URL}/tripimages/trip/${tripId}/${imageId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to edit image');
    return response.json();
  },
};
