export default function DataList({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Temp (°C)</th>
          <th>Feels Like (°C)</th>
          <th>Sunrise</th>
          <th>Sunset</th>
          <th>Condition</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            <td>{item.date}</td>
            <td>{item.temperature}°C</td>
            <td>{item.appTemp}°C</td>
            <td>{item.sunrise}</td>
            <td>{item.sunset}</td>
            <td>{item.weather}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
