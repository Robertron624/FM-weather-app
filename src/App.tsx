import WeatherCard from './components/WeatherCard'

import '@/styles/App.scss'

function App() {

  const lat = 4.71;
  const lon = -74.07

  return (
    <>
      <h1>
        Hello World!
      </h1>
      <WeatherCard lat={lat} lon={lon} />
    </>
  )
}

export default App
