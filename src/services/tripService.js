import { API_BASE_URL } from '../config';

export const tripService = {
  async getAllTrips() {
    const response = await fetch(`${API_BASE_URL}/trips`);
    if (!response.ok) throw new Error('Failed to fetch trips');
    return response.json();
  },

  async getTripById(id) {
    const response = await fetch(`${API_BASE_URL}/trips/${id}`);
    if (!response.ok) throw new Error('Failed to fetch trip');
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

  async updateTrip(id, tripData) {
    const response = await fetch(`${API_BASE_URL}/trips/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tripData)
    });
    if (!response.ok) throw new Error('Failed to update trip');
    return response.json();
  },

  async deleteTrip(id) {
    const response = await fetch(`${API_BASE_URL}/trips/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete trip');
    return null;
  }
};
