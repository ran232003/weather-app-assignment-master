import React, { useEffect, useRef, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./HomePage.css"
import FavoriteComponent from "../components/FavoriteComponent";
import Card from "../components/Card";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { weatherActions } from "../store/weatherSlice";
import { apiKey } from "../api";
const HomePage = ()=>{
    const [myLocation, setMyLocation] = useState({})
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      const dispatch = useDispatch();
      
      function success(pos) {
        var crd = pos.coords;
      
       
        let obj = {latitude:crd.latitude,longitude:crd.longitude}
        
        //props.checkLocation(obj)
        checkLocation(obj)
       // setMyLocation(obj);
      }
      
      function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
     const geoLocation = ()=>{
      if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
              //If granted then you can directly call your function here
              navigator.geolocation.getCurrentPosition(success);
            } else if (result.state === "prompt") {
              navigator.geolocation.getCurrentPosition(success, errors, options);
            } else if (result.state === "denied") {
              //If denied then you have to show instructions to enable location
            }
            result.onchange = function () {
            };
          });
      } else {
        alert("Sorry Not available!");
      }
    }

    const checkLocation = async(obj)=>{
        if(!obj){
          obj = {
           longitude:34.781769,
           latitude:32.085300
         }
       }
     
         const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${obj.latitude}%2C${obj.longitude}&language=en-us&details=false&toplevel=true`,{})
         const data =  await response.json();
         let name = data.EnglishName;
         let code = data.Key;
         const res2 = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${code}?apikey=${apiKey}&language=en-us&details=true`)
         const data2 =  await res2.json();
          dispatch(weatherActions.setCurrentWeather(data2[0]));
          const res = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${code}?apikey=${apiKey}&language=en-us&details=false&metric=true`)
          const data3 =  await res.json();
           dispatch(weatherActions.setWeatherOfTheWeek(data3));
          dispatch(weatherActions.setKey(code));
          dispatch(weatherActions.setCity(name))
       }
       const weather = useSelector((state)=>{
           return state.weather;
       })
       if(weather.currentKey === 0){
        geoLocation();
       }
       
       
useEffect(()=>{
  
},[])
    return (
        <div>
           <Input/>
        <Card/>
   
        </div>
    )
}

export default HomePage;