import Header from './components/Header/Header';
import WeatherCard from './components/WeatherCard'

import '@/styles/App.scss'

function App() {

  const lat = 4.71;
  const lon = -74.07

  return (
    <>
      <Header/>
      <WeatherCard lat={lat} lon={lon} />
    </>
  )
}

export default App
