// import e, { response } from 'express'
import React, { useState } from 'react'
import './App.css'
function App() {

  const apiKey="676136cd0baeb3ae6f8646642b41a1f5"
const [wartherData, setwartherData] = useState([{}])
const [city, setcity] = useState("")

const getWeather=(event)=>{
  if(event.key=="Enter"){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then(response=>response.json()
    ).then(
      data=>{
        setwartherData(data)
      }
    )
  }
}

const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}




return (
  <div className={(typeof wartherData.main != "undefined") ? ((wartherData.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
    <main>
      <div className="search-box">
        <input 
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setcity(e.target.value)}
          value={city}
          onKeyPress={getWeather}
        />
      </div>
      {(typeof wartherData.main != "undefined") ? (
      <div>
        <div className="location-box">
          <div className="location">{wartherData.name}, {wartherData.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(wartherData.main.temp)}°c
          </div>
          <div className="weather">{wartherData.weather[0].main}</div>
        </div>
      </div>
      ) : ('')}
    </main>
  </div>
);
}

export default App
