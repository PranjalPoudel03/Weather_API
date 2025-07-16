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

export default function DataList({ data }) {
  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>Date</th>
          <th>Temperature</th>
          <th>Moon Rise</th>
          <th>Moon Set</th>
          <th>Moon Phase</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            <td>{item.date}</td>
            <td>{item.temperature}°F</td>
            <td>{item.moonrise}</td>
            <td>{item.moonset}</td>
            <td>{getMoonEmoji(item.moonPhase)} {item.moonPhase}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
