import { API_BASE_URL } from '../config';

export const hotelService = {
  async getAllHotels() {
    const response = await fetch(`${API_BASE_URL}/hotels`);
    if (!response.ok) throw new Error('Failed to fetch hotels');
    return response.json();
  },

  async getHotelById(id) {
    const response = await fetch(`${API_BASE_URL}/hotels/${id}`);
    if (!response.ok) throw new Error('Failed to fetch hotel');
    return response.json();
  },

  async createHotel(hotelData) {
    const response = await fetch(`${API_BASE_URL}/hotels`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hotelData)
    });
    if (!response.ok) throw new Error('Failed to create hotel');
    return response.json();
  },

  async updateHotel(id, hotelData) {
    const response = await fetch(`${API_BASE_URL}/hotels/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hotelData)
    });
    if (!response.ok) throw new Error('Failed to update hotel');
    return response.json();
  },

  async deleteHotel(id) {
    const response = await fetch(`${API_BASE_URL}/hotels/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete hotel');
    return null;
  }
};
