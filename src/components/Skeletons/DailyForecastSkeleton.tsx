import './Skeletons.scss';

export const DailyForecastSkeleton = () => {
  return (
    <div className="daily-forecast-skeleton">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={`${index.toLocaleString()}`} className="skeleton-item"></div>
      ))}
    </div>
  );
};
