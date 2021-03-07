import React, { useState } from "react";
import "./weather.css";
import {
  WiDaySunny,
  WiThermometer,
  WiThermometerExterior,
} from "react-icons/wi";

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
     // Fetching the data into the json
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=c952342796f0cdae6ec4e2619fb1317f`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const date = (d) => {
    let months = [
      "January",
      "Fabruary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Octomber",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thusday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };
  const myStyle = {
    marginTop: "3px",
    fontSize: "2rem",
    color: "orange",
  };
 

  return (
    <>
      <div
        className={
          typeof weather.main != "undefined"
            ? weather.main.temp > 16
              ? "app warm"
              : "app"
            : "app"
        }
      >
        <div className="container">
          <main>
            <div className="search-box">
              <input
                type="text"
                className="search-bar"
                placeholder="Search... Place or City "
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
              />
            </div>
            {typeof weather.main != "undefined" ? (
              <div className="location-box">
                <WiDaySunny style={myStyle} />
                <div className="location">
                  {weather.name},{weather.sys.country}
                </div>

                <div className="date">{date(new Date())}</div>
                <div className="temp">
                <p>{Math.round(weather.main.temp)}
                  {"\u00b0"} C</p> 
                  {/* <WiThermometer style={tempStyle} /> */}
                  <div className="min-max-temp">
                    <div className="min-temp">
                      <WiThermometerExterior />
                      Min-Temp
                      <div>
                        {weather.main.temp_min} {"\u00b0"} C
                      </div>
                    </div>
                    <div className="max-temp">
                      <WiThermometer />
                      Max-Temp
                      <div>
                        {weather.main.temp_max} {"\u00b0"} C
                      </div>
                    </div>
                  </div>
                </div>
                <div className="weather">
                  {weather.weather[0].main}
                  <div className="weather-icon">
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt=''
                    />
                  </div>
                </div>
                <div>
                  Wind Speed : {weather.wind.speed} km/h
                </div>
                <div className="lat-lon">
                  <div className='lon'>Lon:{weather.coord.lon}</div>
                  <div className='lat'>Lat:{weather.coord.lat}</div>
                </div>
              </div>
            ) : (
              ""
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Weather;
