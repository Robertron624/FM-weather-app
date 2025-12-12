import './Skeletons.scss';

export const DailyForecastSkeleton = () => {
  return (
    <div className="daily-forecast-skeleton">
      {[...Array(7)].map((_, index) => (
        <div key={index} className="skeleton-item"></div>
      ))}
    </div>
  );
};
