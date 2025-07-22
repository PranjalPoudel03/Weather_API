import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import '../App.css';

const API_KEY = "5e330173c5614348994232436251607";
const LOCATION = "35.7796,-78.6382";

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

export default function DetailView() {
  const { date } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const url = `https://api.weatherapi.com/v1/astronomy.json?key=${API_KEY}&q=${LOCATION}&dt=${date}`;
        const res = await fetch(url);
        const json = await res.json();
        const moon = json.astronomy?.astro;

        const item = {
          date,
          moonrise: moon.moonrise || "—",
          moonset: moon.moonset || "—",
          moonPhase: moon.moon_phase || "Unknown",
          moonIllumination: moon.moon_illumination || "N/A",
        };

        setDetails(item);
      } catch (err) {
        console.error("Failed to fetch detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [date]);

  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <Link to="/" style={{ color: '#90caf9' }}>← Back to Dashboard</Link>
        <h2 style={{ marginTop: '1rem' }}>Details for {date}</h2>

        {loading ? (
          <p>Loading...</p>
        ) : details ? (
          <div className="cards">
            <div className="card">
              <h2>{details.moonrise}</h2>
              <p>Moonrise</p>
            </div>
            <div className="card">
              <h2>{details.moonset}</h2>
              <p>Moonset</p>
            </div>
            <div className="card">
              <h2>{getMoonEmoji(details.moonPhase)}</h2>
              <p>{details.moonPhase}</p>
            </div>
            <div className="card">
              <h2>{details.moonIllumination}%</h2>
              <p>Illumination</p>
            </div>
          </div>
        ) : (
          <p>No data found for {date}</p>
        )}
      </div>
    </div>
  );
}
