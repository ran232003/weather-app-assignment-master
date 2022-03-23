
import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
    name:"weather",
    initialState:{currentWeather:{},weatherOfTheWeek:{},favorites:[],currentKey:0,city:"",isFavorite:false},
    reducers:{
        setCurrentWeather(state,action){
            state.currentWeather = action.payload;
        },
        setWeatherOfTheWeek(state,action){
            state.weatherOfTheWeek = action.payload;
        },
        addToFavorites(state,action){
            state.favorites.push(action.payload);
        },
        setCity(state,action){
            state.city =action.payload;
        },
        setKey(state,action){
            state.currentKey =action.payload;
        },
        changeFavorite(state,action){
            state.isFavorite = action.payload;
        },
        checkFavorite(state,action){
            let obj = state.favorites.find((fav)=>{
              return  fav.currentKey === action.payload
            })
            if(obj){
                state.isFavorite = true
            }
            else{
                state.isFavorite = false
            }
        },
        removeFavorite(state,action){
            const newFavorites = state.favorites.filter((fav)=>{
                return fav.currentKey !== action.payload;
               
            })
            state.favorites = newFavorites;
        }
        
    }
    
})
export default weatherSlice;
export const weatherActions = weatherSlice.actions;