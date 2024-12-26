import React from "react";
import styles from "./ExploreMenu.module.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className={styles.myMenus} id="all-menus">
      <h1>Explore Our Delicious Menu and Find Your Favorite Meal!</h1>
      <p className={styles.exploreMenuText}>
        From traditional dishes to new favorites, discover a variety of
        mouth-watering options, all ready to be delivered straight to your door.
        Start your food journey with us today!
      </p>
      <div className={styles.exploreMenuList}>
        {menu_list.map((item) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))
              }
              key={item.menu_name} // Using menu_name as a more unique key
              className={styles.exploreMenuListItems}
            >
              <img
                className={category === item.menu_name ? styles.active : ""}
                src={item.menu_image}
                alt={item.menu_name || "Menu image not found"}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
