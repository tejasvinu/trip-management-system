import { API_BASE_URL } from '../config';

export const tripService = {
  async getAllTrips() {
    const response = await fetch(`${API_BASE_URL}/trips`);
    if (!response.ok) throw new Error('Failed to fetch trips');
    return response.json();
  },

  async createTrip(tripData) {
    const response = await fetch(`${API_BASE_URL}/trips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tripData)
    });
    if (!response.ok) throw new Error('Failed to create trip');
    return response.json();
  },

  async deleteTrip(tripId) {
    const response = await fetch(`${API_BASE_URL}/trips/${tripId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete trip');
    return response.status === 204 ? null : response.json();
  }
};
