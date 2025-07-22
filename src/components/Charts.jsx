import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import '../App.css';

export default function Charts({ data }) {
  // Dummy moon illumination mapping for visualizing moon phase strength
  const phaseToValue = (phase) => {
    const p = phase.toLowerCase();
    if (p.includes("new")) return 0;
    if (p.includes("crescent")) return 0.25;
    if (p.includes("quarter")) return 0.5;
    if (p.includes("gibbous")) return 0.75;
    if (p.includes("full")) return 1;
    return 0.5;
  };

  const chartData = data.map(item => ({
    date: item.date,
    temperature: item.temperature,
    moonPhaseValue: phaseToValue(item.moonPhase)
  }));

  return (
    <div className="cards" style={{ flexDirection: 'column', gap: '2rem' }}>
      <div className="card">
        <h3>🌡 Temperature Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="temperature" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3>🌙 Moon Phase Progression</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 1]} tickFormatter={t => `${Math.round(t * 100)}%`} />
            <Tooltip formatter={(val) => `${Math.round(val * 100)}%`} />
            <Line type="monotone" dataKey="moonPhaseValue" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
