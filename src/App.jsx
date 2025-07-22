import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import SummaryCards from './components/SummaryCards';
import DataList from './components/DataList';
import Charts from './components/Charts';
import './App.css';

const API_KEY = "5e330173c5614348994232436251607";
const LOCATION = "35.7796,-78.6382";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [sliderValue, setSliderValue] = useState(0); // moon phase 0.0 - 1.0
  const [filteredData, setFilteredData] = useState([]);

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
              moonPhase: moon.moon_phase || "Unknown",
              moonValue: getPhaseValue(moon.moon_phase)
            });
          }
        } catch (err) {
          console.error("Fetch error:", err);
        }
      }

      setData(results);
      setFilteredData(results);
    };

    fetchAstronomyData();
  }, []);

  const getPhaseValue = (phase) => {
    const p = phase.toLowerCase();
    if (p.includes("new")) return 0;
    if (p.includes("crescent")) return 0.25;
    if (p.includes("quarter")) return 0.5;
    if (p.includes("gibbous")) return 0.75;
    if (p.includes("full")) return 1;
    return 0.5;
  };

  const handleSearch = () => {
    const result = data.filter(item => {
      const dateMatch = item.date.includes(search);
      const phaseMatch = item.moonValue >= sliderValue;
      return dateMatch && phaseMatch;
    });
    setFilteredData(result);
  };

  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <SummaryCards data={filteredData} />

        <div className="dashboard-main">
          <div className="left-panel">
            <div className="filter-bar">
              <input
                type="text"
                placeholder="Enter Date"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <label style={{ marginTop: '0.5rem', display: 'block' }}>
                Moon Phase:
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={sliderValue}
                onChange={(e) => setSliderValue(parseFloat(e.target.value))}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
            <DataList data={filteredData} />
          </div>

          <div className="right-panel">
            <Charts data={filteredData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
