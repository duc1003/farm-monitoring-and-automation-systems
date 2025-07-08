import './MetricCard.scss';

const MetricCard = ({ title, value, unit, type }) => {
  const colorMap = {
    temperature: "#ff7a00",
    light: "#fcc419",
    rain: "#4263eb",
    moisture: "#51cf66",
    humidity: "#00b7eb",
  };

  return (
    <div className="metric-card">
      <div className="card-header">
        <h2 className="card-header-title">{title}</h2>
        <div className="options-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </div>
      </div>
      <div className="card-value">
        <span className="value" style={{ color: colorMap[type] }}>
          {value}
        </span>
        {unit && <span className="unit">{unit}</span>}
      </div>
    </div>
  );
};

export default MetricCard;