import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import drizzle_icon from "../Assets/drizzle1.png";
import humidity_icon from "../Assets/humidity1.png";
import rain_icon from "../Assets/rain1.png";
import snow_icon from "../Assets/snow1.png";
import wind_icon from "../Assets/wind1.png";
import cloud_icon from "../Assets/cloud1.png";
import Feelslike_icon from "../Assets/feelslike.png";
import airpressure_icon from "../Assets/pressure.png";

const WeatherApp = () =>{
    let api_key="0b719c8e41290dc00d8907b7ed3e67f3";
    const [wicon,setWicon]=useState(rain_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityinput");
        if (element.length === 0 || element[0].value === "") {
            return 0;
        }
    
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
            let response = await fetch(url);
            let data = await response.json();
    
            const humidity = document.getElementsByClassName("humidity-percentage");
            const wind = document.getElementsByClassName("wind-rate");
            const temperature = document.getElementsByClassName("weather-temp");
            const location = document.getElementsByClassName("weather-location");
            const feels=document.getElementsByClassName("feels-like");
            const pressure=document.getElementsByClassName("air-pressure");
    
            if (humidity.length > 0) humidity[0].innerHTML = data.main.humidity+"%";
            if (wind.length > 0) wind[0].innerHTML = Math.floor(data.wind.speed)+"Kmph";
            if (temperature.length > 0) temperature[0].innerHTML = Math.floor(data.main.temp)+"°C";
            if (location.length > 0) location[0].innerHTML = data.name;
            if (feels.length > 0) feels[0].innerHTML = Math.floor(data.main.feels_like)+"°C";
            if (pressure.length > 0) pressure[0].innerHTML = data.main.pressure+"hPa";

            if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
                setWicon(clear_icon);
            }
            else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
                setWicon(cloud_icon);
            }
            else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
                setWicon(drizzle_icon);
            }
            else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
                setWicon(snow_icon);
            }
            else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
                setWicon(rain_icon);
            }
            else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
                setWicon(rain_icon);
            }
            else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
                setWicon(snow_icon);
            }
            else{
                setWicon(clear_icon);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };
    
    return(
        <div className='container'>
            <div className="top-bar">
                <input type="text" className='cityinput' placeholder='Search'/>
                <div className='search-icon' onClick={()=>{search()}}>
                    <img src={search_icon} alt="loading" />
                </div>
            </div>
            <div className='weather-image'>
                <img src={wicon} alt="image loading....." />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">Delhi</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className='icon'/>
                    <div className="data">
                        <div className="humidity-percentage">70%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className='icon'/>
                    <div className="data">
                        <div className="wind-speed">40Km/H</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
            <div className="data-container1">
                <div className="element">
                    <img src={Feelslike_icon} alt="" className='icon'/>
                    <div className="data">
                        <div className="feels-like">26°C</div>
                        <div className="text">Feels like</div>
                    </div>
                </div>
                <div className="element">
                    <img src={airpressure_icon} alt="" className='icon'/>
                    <div className="data">
                        <div className="air-pressure">1017hPa</div>
                        <div className="text">Air pressure</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp