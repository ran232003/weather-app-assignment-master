import React, { useState } from "react";
import "./WeatherCard.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { days } from "../days";
import { weatherActions } from "../store/weatherSlice";
import { apiKey } from "../api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {MdOutlineRemoveCircleOutline} from "react-icons/md"

const WeatherCard = (props)=>{
  let  {header,temperature,city,date,icon,currentKey,fromFavorites} = props;
  const [image, setImage] = useState(null)
    date = new Date(date);
    const dispatch = useDispatch()
    const navigate  = useNavigate();
    const day = days[date.getDay()];
    let fileName = icon + ".svg";
   
    const fetchImage = async () => {
        try {
            const response = await import(`../myIcons/${fileName}`) // change relative path to suit your needs
            setImage(response.default)
            
        } catch (err) {
           
        } finally {
            
        }
    }
    fetchImage();
    const handleClick =async ()=>{
        if(currentKey){
            dispatch(weatherActions.setKey(currentKey));
            dispatch(weatherActions.setCity(city))
            const res2 = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${currentKey}?apikey=${apiKey}&language=en-us&details=true`)
    const data2 =  await res2.json();
     dispatch(weatherActions.setCurrentWeather(data2[0]));
     const res = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${currentKey}?apikey=${apiKey}&language=en-us&details=false&metric=true`)
    const data =  await res.json();
     dispatch(weatherActions.setWeatherOfTheWeek(data));
     navigate("/");
        }
    }
    const handleRemove = ()=>{
        console.log("in remove");
        dispatch(weatherActions.removeFavorite(currentKey))
    }
    return (
    <div className="WeatherCard">
       <Card sx={{ maxWidth: 245 }}>
           {fromFavorites === true?<MdOutlineRemoveCircleOutline onClick={handleRemove} className="removeIcon" size= "2rem"/>:null}
      <CardActionArea  onClick={handleClick}>
        <CardMedia className="WeatherCard"
          component="img"
          height="115"
          image={image}
          alt="image"
         
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {city}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {day}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {temperature}<span>&#176;</span> C
          </Typography>
          <Typography variant="body2" color="text.secondary" >
          {header}
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
    </div>
    )
}
export default WeatherCard;