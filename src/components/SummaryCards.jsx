export default function SummaryCards({ data }) {
  if (!data.length) return null;

  const { temperature, sunrise, weather } = data[0];

  return (
    <div className="cards">
      <div className="card">
        <h2>{temperature}°C</h2>
        <p>Current Temp</p>
      </div>
      <div className="card">
        <h2>{sunrise}</h2>
        <p>Sunrise</p>
      </div>
      <div className="card">
        <h2>{weather}</h2>
        <p>Condition</p>
      </div>
    </div>
  );
}
