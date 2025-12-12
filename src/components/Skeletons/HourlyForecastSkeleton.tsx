import './Skeletons.scss';

export const HourlyForecastSkeleton = () => {
  return (
    <div className="hourly-forecast-skeleton">
      {[...Array(24)].map((_, index) => (
        <div key={index} className="skeleton-item"></div>
      ))}
    </div>
  );
};
