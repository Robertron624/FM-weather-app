import { useState } from 'react';
import Header from './components/Header/Header';
import WeatherCard from './components/WeatherCard'

import '@/styles/App.scss'
import { SearchBar } from './components/Search/SearchBar';

function App() {

  const lat = 4.71;
  const lon = -74.07

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
      <WeatherCard lat={lat} lon={lon} />
    </>
  )
}

export default App
