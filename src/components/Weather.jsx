import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CircleLoader from "react-spinners/CircleLoader";
import VideoBack from "../img/video.mp4";
import ImgBack from "../img/clouds-5481190_960_720.jpg";


const Weather = () => {
const [weather,setweather]=useState({});
const [degrees, setDegrees]=useState(true);  
const [loading, setLoading]=useState(false);

useEffect(()=>{
  /*-------llamando a la api--------*/ 
   const success=pos=>{
    const lat=pos.coords.latitude
    const lon=pos.coords.longitude
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8f5f8489b7c2031b2227201d998dc8a2&units=metric`)
    .then((res)=>setweather(res.data))
   }
   navigator.geolocation.getCurrentPosition(success);
/*--------Loader------*/ 
setLoading(true)
setTimeout(()=>{
  setLoading(false)
},5000);
},[])

console.log(weather);
const Cel=weather.main?.temp+" "+"°C"
console.log(Cel);
const fa=((weather.main?.temp*9/5)+32)+" "+"°F"
console.log(fa);



    return (
      <> 
       {
              loading ?
              <div className="loader">
                    <CircleLoader
              color={"#36d7b7"}
              loading={loading}
             
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
              </div>
          

              :
              <div>
              <video autoPlay loop muted>
                <source src={VideoBack} type="video/mp4" />
              </video>
              <div className="App">
              <h1 className='tittle item1'>Weather App</h1>
              <h2 className='item2'> {weather.name}{" "}{weather.sys?.country}</h2>
              <div className="item3">
              <img  className='img ' src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
              <h3  className='temp '>{degrees ? Cel : fa} </h3>
                </div>  
              <div className="item4">
              <p  className='items '><i class="fa-solid fa-wind"></i>{" "}<b>Wind Speed:{" "}</b>{weather.wind?.speed}{" "} m/s</p>
             <p  className='items 5'><i class="fa-solid fa-cloud"></i>{" "}<b>Clouds:{" "}</b>{weather.clouds?.all}{" "} %</p>
             <p  className='items '><i class="fa-solid fa-temperature-three-quarters"></i>{" "}<b>pressure:{" "}</b>{weather.main?.pressure}{" "} mb</p>
              </div>
             <button  className='button item5' onClick={()=>setDegrees(!degrees)}>Degrees °F/°C</button>


             
            </div>
           </div>
          }
         
        </>
    );
};

export default Weather;