export interface GeocodingData {
  city: string;
  country: string;
}

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
