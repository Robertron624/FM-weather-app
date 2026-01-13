import "./ErrorView.scss";

export default function ErrorView() {
  return (
    <div className="container">
      <div className="error-icon">
        <img className="mx-auto" src="/images/icon-error.svg" alt="a circle with a diagonal line" />
      </div>
      <div className="error-texts">
        <h1>Something went wrong</h1>
        <p>
            We couldn't connect to the server (API error). Please try again in a few moments.
        </p>
        <button type="button" onClick={() => globalThis.location.reload()}>
            <img  src="/images/icon-retry.svg" alt="retry icon" /> 
          <span>
            Retry
          </span>
        </button>
      </div>
    </div>
  );
}
