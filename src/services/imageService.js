import { API_BASE_URL } from '../config';

export const imageService = {
  async getAllImages() {
    const response = await fetch(`${API_BASE_URL}/tripImages`);
    if (!response.ok) throw new Error('Failed to fetch images');
    return response.json();
  },

  async getImageById(id) {
    const response = await fetch(`${API_BASE_URL}/tripImages/${id}`);
    if (!response.ok) throw new Error('Failed to fetch image');
    return response.json();
  },

  async createImage(imageData) {
    const response = await fetch(`${API_BASE_URL}/tripImages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(imageData)
    });
    if (!response.ok) throw new Error('Failed to create image');
    return response.json();
  },

  async updateImage(id, imageData) {
    const response = await fetch(`${API_BASE_URL}/tripImages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(imageData)
    });
    if (!response.ok) throw new Error('Failed to update image');
    return response.json();
  },

  async deleteImage(id) {
    const response = await fetch(`${API_BASE_URL}/tripImages/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete image');
    return null;
  }
};
