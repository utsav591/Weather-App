import React, { useState } from "react";
import Axios from 'axios';
import "./App.css";

function App() {

  const [data,setData] = useState({})
  const [location,setLocation] = useState('')

  const apikey = '702aa8dc53cca4fab53040d6349571b3';
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apikey}`;

  
  const searchLocation =(event)=>{
 if(event.key==="Enter"){
  Axios.get(url).then((response)=>{
    setData(response.data)
    
    setLocation('')
    console.log(response)
  }) 
    
}   
  }

  const datebuilder = (d) => {

    let months = ["january", "February", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}

  return (
    <div className="app">
      <div className="search">
        <input
        value={location}
        onChange={event =>setLocation(event.target.value)}
        onKeyUp={searchLocation}
        placeholder="Enter Location" 
        type="text"/>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
          {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
          <div className="date">{datebuilder(new Date())}</div>
        </div>
        {data.name !== undefined &&
        <div className="bottom">
        <div className="precipitation">
        {data.main ? <p className="bold">{data.main.feels_like.toFixed()}%</p> : null}
          <p>Feels Like</p>
        </div>
        <div className="humidity">
        {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
          <p>Humidity</p>
        </div>
        <div className="wind">
        {data.wind ? <p className="bold">{data.wind.speed.toFixed()}MPH</p> : null}
          <p>Wind Speed</p>
        </div>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
