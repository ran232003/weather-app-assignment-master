import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {AiFillHeart} from "react-icons/ai"; 
import { useDispatch, useSelector } from "react-redux";
import { weatherActions } from "../store/weatherSlice";

import "./FavoriteComponent.css"
const FavoriteComponent = (props)=>{
 
    let  {header,temperature,city,date,icon,currentKey,favorite} = props;
    const dispatch = useDispatch();
    const[iconState,setIconState] = useState(favorite)
   

    const weather = useSelector((state)=>{
      return  state.weather.isFavorite;
    })
    const addToFavorite = (event)=>{
       
        const obj = {header,temperature,city,date,icon,currentKey,favorite}
        
        if(iconState){
                dispatch(weatherActions.removeFavorite(currentKey))
                dispatch(weatherActions.changeFavorite(false))
                //setIconState(false); 
        }
        else{
            dispatch(weatherActions.addToFavorites(obj))
            dispatch(weatherActions.changeFavorite(true))
        setIconState(true);    
        }

       


    }
   
    useEffect(()=>{
        setIconState(favorite)
    },[favorite])
    return(
        <div>
            <div className="favDiv">
            <AiFillHeart size= "4rem" className={iconState === false?"icon green":"icon red"} onClick = {addToFavorite}/>
            
        
        </div>
        </div>
    )
}
export default FavoriteComponent;