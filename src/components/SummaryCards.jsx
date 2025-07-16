const getMoonEmoji = (phase) => {
  const p = phase.toLowerCase();
  if (p.includes("new")) return "🌑";
  if (p.includes("waxing crescent")) return "🌒";
  if (p.includes("first quarter")) return "🌓";
  if (p.includes("waxing gibbous")) return "🌔";
  if (p.includes("full")) return "🌕";
  if (p.includes("waning gibbous")) return "🌖";
  if (p.includes("last quarter")) return "🌗";
  if (p.includes("waning crescent")) return "🌘";
  return "🌚";
};

export default function SummaryCards({ data }) {
  if (!data.length) return null;

  const { moonrise, moonPhase } = data[0];
  const minTemp = Math.min(...data.map(d => d.temperature || 0));

  return (
    <div className="cards">
      <div className="card">
        <h2>{minTemp}°F</h2>
        <p>Low Temp</p>
      </div>
      <div className="card">
        <h2>{moonrise}</h2>
        <p>Moon Rise</p>
      </div>
      <div className="card">
        <h2>{getMoonEmoji(moonPhase)}</h2>
        <p>{moonPhase}</p>
      </div>
    </div>
  );
}
