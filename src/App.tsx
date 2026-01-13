import { useEffect, useState } from 'react';
import { DEFAULT_LOCATION } from './constants';
import Header from './components/Header/Header';
import WeatherCard from './components/WeatherCard'

import '@/styles/App.scss'
import { SearchBar } from './components/Search/SearchBar';
import { CurrentStats } from './components/CurrentStats/CurrentStats';
import { DailyForecast } from './components/DailyForecast/DailyForecast';

import { HourlyForecast } from './components/HourlyForecast/HourlyForecast';
import { useWeather } from './hooks/useWeather';
import ErrorView from './components/ErrorView/ErrorView';

function App() {

  // Get lat and lon from browser

  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);

  const { error: weatherError } = useWeather(lat ?? 0, lon ?? 0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (err) => {
          console.error(err.message);
          setLat(DEFAULT_LOCATION.lat);
          setLon(DEFAULT_LOCATION.lon);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
      setLat(DEFAULT_LOCATION.lat);
      setLon(DEFAULT_LOCATION.lon);
    }
  }, []);


  const [headingText] = useState('How\'s the sky looking today?');
  const [searchError, setSearchError] = useState(false);

  const handleLocationSelect = (lat: number, lon: number) => {
    setLat(lat);
    setLon(lon);
    setSearchError(false);
  };

  if (weatherError) {
    return (
      <>
        <Header />
        <ErrorView />
      </>
    );
  }

  return (
    <>
      <Header/>
      <main>
        <h1>
          {headingText}
        </h1>
        <SearchBar onLocationSelect={handleLocationSelect} onSearchError={setSearchError} />
      {searchError ? (
        <div className="search-error">
          <p>No search result found!</p>
        </div>
      ) : (
        <div className="weather-content">
          <div className="desktop-left">
            {lat && lon && <WeatherCard lat={lat} lon={lon} />}
            {lat && lon && <CurrentStats lat={lat} lon={lon} />}
            {lat && lon && <DailyForecast lat={lat} lon={lon} />}
          </div>
          <div className="desktop-right">
            {lat && lon && <HourlyForecast lat={lat} lon={lon} />}
          </div>
        </div>
      )}
      </main>
    </>
  )
}

export default App
