import { useState, useEffect } from 'react';
import { carAPI } from '../utils/api';

export function useCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCars = async () => {
    try {
      setLoading(true);
      const response = await carAPI.getAll();
      if (response.data.success) {
        setCars(response.data.data || []);
        setError(null);
      } else {
        setCars([]);
        setError('Failed to load cars');
      }
    } catch (err) {
      console.error('Error loading cars:', err);
      setError('Failed to load cars');
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const addCar = async (carData) => {
    try {
      const response = await carAPI.create(carData);
      if (response.data.success) {
        setCars(prev => [response.data.data, ...prev]);
        return response.data.data;
      }
      throw new Error('Failed to add car');
    } catch (err) {
      console.error('Error adding car:', err);
      if (err.response?.status === 401) {
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(err.response?.data?.error || 'Failed to add car');
    }
  };

  // ============================================
  // DELETE CAR - COMPLETE WITH CLOUDINARY DELETE
  // ============================================
  const deleteCar = async (carId) => {
    try {
      // Backend will handle Cloudinary deletion
      await carAPI.delete(carId);
      
      // Remove from local state
      setCars(prev => prev.filter(c => c.id !== carId));
    } catch (err) {
      console.error('Error deleting car:', err);
      if (err.response?.status === 401) {
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(err.response?.data?.error || 'Failed to delete car');
    }
  };

  // ============================================
  // DELETE SINGLE IMAGE FROM CAR
  // ============================================
  const deleteCarImage = async (carId, imageIndex) => {
    try {
      const response = await carAPI.deleteImage(carId, imageIndex);
      if (response.data.success) {
        // Update local state
        setCars(prev => prev.map(c => 
          c.id === carId ? response.data.data : c
        ));
        return true;
      }
      throw new Error('Failed to delete image');
    } catch (err) {
      console.error('Error deleting image:', err);
      throw new Error(err.response?.data?.error || 'Failed to delete image');
    }
  };

  const updateCar = async (carId, updates) => {
    try {
      const response = await carAPI.update(carId, updates);
      if (response.data.success) {
        setCars(prev => prev.map(c => c.id === carId ? response.data.data : c));
        return response.data.data;
      }
      throw new Error('Failed to update car');
    } catch (err) {
      console.error('Error updating car:', err);
      if (err.response?.status === 401) {
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(err.response?.data?.error || 'Failed to update car');
    }
  };

  const getStats = () => {
    const total = cars.length;
    const brands = [...new Set(cars.map(c => c.brand))];
    const avgPrice = total ? Math.round(cars.reduce((s, c) => s + c.price, 0) / total) : 0;
    const latest = total ? [...cars].sort((a, b) => b.createdAt - a.createdAt)[0] : null;
    return { total, brands: brands.length, avgPrice, latest };
  };

  useEffect(() => {
    loadCars();
  }, []);

  return { 
    cars, 
    loading, 
    error, 
    addCar, 
    deleteCar,
    deleteCarImage,
    updateCar, 
    loadCars, 
    getStats 
  };
}