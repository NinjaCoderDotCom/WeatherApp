import React, { useState } from 'react';
// import { useEffect } from 'react';

const api = {
  key: '97f2310ad387ae2eef69b41f1da620f8',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [condition, setCondition] = useState('');
  // const [today, setToday] = useState(new Date());

  // const time = () => {
  //   let time = null;
  //   const timer = setInterval(() =>
  //     time = (new Date().toLocaleTimeString(weather.sys.country))
  //     , 1000);
  //   return function cleanup() {
  //     clearInterval(timer);
  //   }
  // }


  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          console.log(result);
          setCondition(result.weather[0].main)
          setCity('');
        });
    }

  }

  // const time = () => {
  //   let time = new Date().toLocaleTimeString('en-US',{timeZone:weather.timezone});
  //   console.log(time)
  //   console.log(weather.sys.country)
  //   // return time;
  //   // console.log(time)
  // }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`
  }

  const getClass = () => {
    switch (condition) {
      case 'Clear':
        return 'clear';
      case 'Clouds':
        return 'cloudy';
      case 'Haze':
        return 'haze';
      case 'Rain':
        return 'rain';
      case 'Snow':
        return 'snow';
      case 'Sunny':
        return 'sunny';
      default:
        return 'app';
    }
  }

  return (
    <div className={getClass()}>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search'
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
          />
        </div>
        <div className="bottom-text">
          <p className="bottom-left">*Search by City name or ZIP Code</p>
          <p className="bottom-right">Weather by ThatMediocreCoder</p>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
              {/* <div className="date">{time()}</div> */}
            </div>
            <div className="weather-box">
              <div className="temp">
                <div>
                  {Math.round(weather.main.temp)}°c
                </div>
                <div className="minMax">
                  {Math.round(weather.main.temp_min)}/{Math.round(weather.main.temp_max)} °c
                </div>
              </div>
              <div className="weather">
                Condition: {weather.weather[0].main}
              </div>
              <div className="weather">
                Feels Like: {Math.round(weather.main.feels_like)}°c
              </div>
              <div className="weather">
                Visibility: {(weather.visibility / 1000)} KM/s
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div >
  );
}

export default App;
