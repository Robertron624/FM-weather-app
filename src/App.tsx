import { useEffect, useState } from 'react';
import { DEFAULT_LOCATION } from './utils/constants';
import Header from './components/Header/Header';
import WeatherCard from './components/WeatherCard'

import '@/styles/App.scss'
import { SearchBar } from './components/Search/SearchBar';

function App() {

  // Get lat and lon from browser

  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);

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

  return (
    <>
      <Header/>
      <main>
        <h1>
          {headingText}
        </h1>
        <SearchBar />
      </main>
      {lat && lon && <WeatherCard lat={lat} lon={lon} />}
    </>
  )
}

export default App
