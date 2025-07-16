import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import SummaryCards from './components/SummaryCards';
import DataList from './components/DataList';
import './App.css';

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const LAT = 35.7796;
const LON = -78.6382;

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.weatherbit.io/v2.0/current?lat=${LAT}&lon=${LON}&key=${API_KEY}&include=minutely`;

      try {
        const res = await fetch(url);
        const json = await res.json();

        if (json.data && json.data.length > 0) {
          const item = json.data[0];
          const today = new Date().toISOString().slice(0, 10);

          const formatted = [{
            date: today,
            temperature: item.temp,
            appTemp: item.app_temp,
            sunrise: item.sunrise,
            sunset: item.sunset,
            weather: item.weather.description
          }];

          setData(formatted);
        } else {
          console.warn("No data returned from Weatherbit.");
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(item =>
    item.date.includes(search)
  );

  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <SummaryCards data={data} />
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search by Date"
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
