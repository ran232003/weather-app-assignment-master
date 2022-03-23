import React from "react";
import FavoriteCard from "../components/FavoriteCard";
import "./Favorites.css"
const Favorites = ()=>{

    return (
        <div>
            <div className="center-text">
                <h2>
                    Favorite Places
                </h2>

            </div>
                <FavoriteCard/>
        </div>
    )
}

export default Favorites;