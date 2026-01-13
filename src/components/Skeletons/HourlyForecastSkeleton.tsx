import './Skeletons.scss';

export const HourlyForecastSkeleton = () => {
  return (
    <div className="hourly-forecast-skeleton">
      {Array.from({ length: 24 }).map((_, index) => (
        <div key={`skeleton-item-${index.toLocaleString()}`} className="skeleton-item"></div>
      ))}
    </div>
  );
};
