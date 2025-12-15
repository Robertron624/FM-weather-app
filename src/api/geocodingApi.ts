import { maxSearchResults } from "@/constants";
import type { GeocodingData, LocationSearchResult } from "@/types";


export const searchLocations = async (query: string): Promise<LocationSearchResult[]> => {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=${maxSearchResults}&language=en&format=json`
    );
    const data = await response.json();
    
    if (!data.results) return [];
    
    return data.results.map((item: LocationSearchResult) => ({
      id: item.id,
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
      country: item.country,
      admin1: item.admin1,
    }));
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
};

export const getCityName = async (lat: number, lon: number): Promise<GeocodingData> => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    const data = await response.json();
    return {
      city: data.city || data.locality || 'Unknown Location',
      country: data.countryName || '',
    };
  } catch (error) {
    console.error('Error fetching city name:', error);
    return { city: 'Unknown Location', country: '' };
  }
};
