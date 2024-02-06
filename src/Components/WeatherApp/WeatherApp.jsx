import React from 'react'
import './WeatherApp.css'

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity1.png";
import rain_icon from "../Assets/rain.jpg";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind1.png";
import sunny_icon from "../Assets/sunny.jpg";
import cloud_icon from "../Assets/cloud1.png";


const WeatherApp = () =>{
    let api_key="0b719c8e41290dc00d8907b7ed3e67f3";

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
    
            if (humidity.length > 0) humidity[0].innerHTML = data.main.humidity;
            if (wind.length > 0) wind[0].innerHTML = data.wind.speed;
            if (temperature.length > 0) temperature[0].innerHTML = data.main.temp;
            if (location.length > 0) location[0].innerHTML = data.name;
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
                <img src={cloud_icon} alt="" />
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
        </div>
    )
}

export default WeatherApp