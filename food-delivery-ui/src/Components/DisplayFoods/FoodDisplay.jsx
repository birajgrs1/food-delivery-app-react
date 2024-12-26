import React, { useContext } from "react";
import styles from "./FoodDisplay.module.css";
import { StoreContext } from "../../Store/Contexts/StoreContext";
import FoodItem from "./FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className={styles.displayFoods} id="food-display">
      <h2>Top dishes near you</h2>
      <div className={styles.foodDisplayList}>
        {food_list.map((item, index) => {
          if ((category ==="All" || category === item.category)) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
