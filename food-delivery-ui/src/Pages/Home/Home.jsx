import React, { useState } from "react";
import "./Home.css"
import Header from "../../Components/Header/Header";
import ExploreMenu from "../../Components/MenuItems/ExploreMenu";
import FoodDisplay from "../../Components/DisplayFoods/FoodDisplay";

const Home = () =>{

   const [category, setCategory] = useState("All");

    return(
        <>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        </>
    );

}
export default Home;