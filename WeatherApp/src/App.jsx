/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css'; // Import custom CSS file for styling

const API_KEY = '8b0790f632ce002826708c2e528f4b89'; // Replace with your OpenWeatherMap API key

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [isMetric, setIsMetric] = useState(true); // Default to Celsius

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const units = isMetric ? 'metric' : 'imperial';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${units}`;
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (err) {
      setError('Error fetching weather data. Please try again.');
    }
  };

  const toggleUnit = () => setIsMetric(!isMetric);

  useEffect(() => {
    const animation = () => {
      const weatherInfo = document.getElementById('weather-info');
      weatherInfo.classList.add('animate__fadeInUp');
    };

    if (weather) {
      animation();
    }
  }, [weather]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <form onSubmit={handleSearch} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter location..."
            className="px-4 py-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit" className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700 text-white">
            Search
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {weather && (
          <div id="weather-info" className="mt-8 animate__animated animate__fadeInUp">
            <h2 className="text-2xl font-bold">{weather.name}</h2>
            <p className="text-lg mt-2">
              {weather.weather[0].main} - {weather.weather[0].description}
            </p>
            <div className="flex items-center justify-between mt-4">
              <p className="text-4xl">
                {isMetric
                  ? Math.round(weather.main.temp)
                  : Math.round((weather.main.temp * 9) / 5 + 32)}
                <span className="text-xl">°{isMetric ? 'C' : 'F'}</span>
              </p>
              <button onClick={toggleUnit} className="text-blue-500 hover:text-blue-700 focus:outline-none">
                <svg
                  className="h-8 w-8 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 13c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-7 0c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                  />
                </svg>
              </button>
            </div>
            <p className="mt-2">Humidity: {weather.main.humidity}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;







//   return (
//     <div className="flex flex-col min-h-screen bg-gray-800 text-white">
//       <div className="container mx-auto px-4 py-16 flex items-center justify-center">
//         <form onSubmit={handleSearch} className="flex flex-col space-y-4">
//           <input
//             type="text"
//             placeholder="Enter location..."
//             className="px-4 py-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//           <button type="submit" className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700 text-white">
//             Search
//           </button>
//         </form>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//         {weather && (
//           <div id="weather-info" className="mt-8 animate__animated animate__fadeInUp">
//             <h2 className="text-2xl font-bold">{weather.name}</h2>
//             <p className="text-lg mt-2">
//               {weather.weather[0].main} - {weather.weather[0].description}
//             </p>
//             <div className="flex items-center justify-between mt-4">
//               <p className="text-4xl">
//                 {isMetric
//                   ? Math.round(weather.main.temp)
//                   : Math.round((weather.main.temp * 9) / 5 + 32)}
//                 <span className="text-xl">°{isMetric ? 'C' : 'F'}</span>
//               </p>
//               <button onClick={toggleUnit} className="text-blue-500 hover:text-blue-700 focus:outline-none">
//                 <svg
//                   className="h-8 w-8 fill-current"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M19 13c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-7 0c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <p className="mt-2">Humidity: {weather.main.humidity}%</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );