import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { apiKey } from "../api";
import { weatherActions } from "../store/weatherSlice";
const Input = (props)=>{
    const[cityArray,setCityArray] = useState([])
    const dispatch =  useDispatch()
        const changeInput = async(event)=>{
           
            const val = event.target.value
            const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${val}&language=en-us`)
           const data = await response.json();
           let cities = data.map((city)=>{
                let fullName = city.LocalizedName + " (" +city.Country.ID + ")"
               return {lable:fullName ,id:city.Key}
           })
          
           setCityArray(cities)
        }  
        const getInput = async(event,value)=>{

            let {lable,id} = value;
            dispatch(weatherActions.setKey(id));
            dispatch(weatherActions.setCity(lable))
            dispatch(weatherActions.checkFavorite(id))
            const res2 = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${apiKey}&language=en-us&details=true`)
    const data2 =  await res2.json();
     dispatch(weatherActions.setCurrentWeather(data2[0]));
     const res = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}?apikey=${apiKey}&language=en-us&details=false&metric=true`)
    const data =  await res.json();
     dispatch(weatherActions.setWeatherOfTheWeek(data));
        }  
    return(

            <div className="searchBar">
            <Autocomplete
             getOptionLabel={option => option.lable}
            className = "auto"
            onChange={getInput}
      disablePortal
      id="combo-box-demo"
      options={cityArray}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField  {...params} label="Location" onChange={changeInput} />}
    />
    </div>
)

}
export default Input;