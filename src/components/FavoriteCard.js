import React from "react";
import { useSelector } from "react-redux";
import WeatherCard from "./WeatherCard";
import "./FavoriteCard.css"
const FavoriteCard = ()=>{
const weather = useSelector((state)=>{
   return state.weather;
}) 
const handleClick = (event)=>{
    
}

    return(
        <div>
            <div className="scroll">
            <div className="card2">
            <div className="list">
               <ul className="list2">
                   {weather.favorites.map((obj)=>{
                   
                       return(
                       <li className="list-item2" >
                           <WeatherCard 
                           key = {obj.currentKey}                  
                           currentKey={obj.currentKey}
                           fromFavorites = {true}
                           header = {obj.header}
                           city = {obj.city}
                           date = {obj.date}
                           icon = {obj.icon}
                           temperature = {obj.temperature}                          
                           />
                       </li>
                       )
                   })}
               </ul>
             </div>
            </div>
            </div>
        </div>
    )
}
export default FavoriteCard;