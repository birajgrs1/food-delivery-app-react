import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { assets } from "../../assets/assets";
import { FaSearch } from "react-icons/fa";
import { GrBasket } from "react-icons/gr";
import {Link} from 'react-router-dom'

const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("home");

    return (
        <div className={styles.navbar}>
            <img src={assets.logo} alt="logo not found" className={styles.logo} />
            <ul className={styles.navbarMenu}>
                {/* Menu items */}
                <Link to="/" onClick={()=>setMenu('home')} className={menu === "home" ? styles.active : ""}>home</Link>
                <a href="#all-menus" onClick={()=>setMenu('menu')} className={menu === "menu" ? styles.active : ""}>menu</a>
                <a href= "#app-download" onClick={()=>setMenu('mobile-app')} className={menu === "mobile-app" ? styles.active : ""}>mobile-app</a>
                <a href= "#footer" onClick={()=>setMenu('contact us')} className={menu === "contact us" ? styles.active : ""}>contact us</a>
            </ul>
            <div className={styles.rightSide}>
                {/* Search icon */}
                <FaSearch />
                <div className={styles.search}>
                    {/* Basket icon */}
                    <GrBasket />
                    <div className={styles.dot}></div>
                </div>
                <button onClick={()=>setShowLogin(true)}>Sign in</button>
            </div>
        </div>
    );
};

export default Navbar;
