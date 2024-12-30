import React, { useState } from "react";
import "./Home.css"
import Header from "../../Components/Header/Header";
import ExploreMenu from "../../Components/MenuItems/ExploreMenu";
import FoodDisplay from "../../Components/DisplayFoods/FoodDisplay";
import AppDownload from "../../Components/MobileAppDownload/AppDownload";

const Home = () =>{

   const [category, setCategory] = useState("All");

    return(
        <>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <AppDownload/>
        </>
    );

}
export default Home;