import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { assets } from "../../assets/assets";
import { FaSearch } from "react-icons/fa";
import { GrBasket } from "react-icons/gr";

const Navbar = () => {
    const [menu, setMenu] = useState("home");

    return (
        <div className={styles.navbar}>
            <img src={assets.logo} alt="logo not found" className={styles.logo} />
            <ul className={styles.navbarMenu}>
                {/* Menu items */}
                <li onClick={()=>setMenu('home')} className={menu === "home" ? styles.active : ""}>home</li>
                <li onClick={()=>setMenu('menu')} className={menu === "menu" ? styles.active : ""}>menu</li>
                <li onClick={()=>setMenu('mobile-app')} className={menu === "mobile-app" ? styles.active : ""}>mobile-app</li>
                <li onClick={()=>setMenu('contact us')} className={menu === "contact us" ? styles.active : ""}>contact us</li>
            </ul>
            <div className={styles.rightSide}>
                {/* Search icon */}
                <FaSearch />
                <div className={styles.search}>
                    {/* Basket icon */}
                    <GrBasket />
                    <div className={styles.dot}></div>
                </div>
                <button>Sign in</button>
            </div>
        </div>
    );
};

export default Navbar;
