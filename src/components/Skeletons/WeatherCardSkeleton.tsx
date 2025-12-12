import './Skeletons.scss';

export const WeatherCardSkeleton = () => {
  return (
    <div className="weather-card-skeleton">
      <div className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};
