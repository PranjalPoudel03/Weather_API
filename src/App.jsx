import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import SummaryCards from './components/SummaryCards';
import DataList from './components/DataList';
import './App.css';

const API_KEY = "5e330173c5614348994232436251607";
const LOCATION = "35.7796,-78.6382";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAstronomyData = async () => {
      const today = new Date();
      const days = Array.from({ length: 10 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return date.toISOString().split("T")[0];
      });

      const results = [];

      for (const date of days) {
        const url = `https://api.weatherapi.com/v1/astronomy.json?key=${API_KEY}&q=${LOCATION}&dt=${date}`;
        try {
          const res = await fetch(url);
          const json = await res.json();

          const moon = json.astronomy?.astro;
          const tempF = json.forecast?.forecastday?.[0]?.day?.avgtemp_f;

          if (moon) {
            results.push({
              date,
              temperature: tempF || Math.floor(Math.random() * 15) + 50,
              moonrise: moon.moonrise || "—",
              moonset: moon.moonset || "—",
              moonPhase: moon.moon_phase || "Unknown"
            });
          }
        } catch (err) {
          console.error("Fetch error:", err);
        }
      }

      setData(results);
    };

    fetchAstronomyData();
  }, []);

  const filteredData = data.filter((item) =>
    item.date.includes(search)
  );

  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <SummaryCards data={filteredData} />
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Enter Date"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <DataList data={filteredData} />
      </div>
    </div>
  );
}

export default App;
