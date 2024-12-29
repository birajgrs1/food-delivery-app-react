import React from "react";
import styles from "./Footer.module.css";
import { assets } from "../../assets/assets";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.footer} id="footer">
      <div className={styles["footer-content"]}>
        <div className={styles["left-side-content"]}>
          <img src={assets.logo} alt="Logo" />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis,
            veritatis optio. Quos expedita nam cupiditate, placeat alias aut.
            Aliquid officiis laborum veritatis dolorem hic quia ducimus
            voluptatem ipsum beatae delectus praesentium, in temporibus nam
            error ullam qui rem magni deserunt fugit autem aut aspernatur. 
          </p>
          <div className={styles["footer-social-icons"]}>
            <FaFacebook />
            <FaTwitter />
            <FaLinkedin />
          </div>
        </div>
        <div className={styles["center-content"]}>
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className={styles["right-side-content"]}>
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+977-985-557-3738</li>
                <li>contact@bhojanyatra.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <div className={styles.copyright}>copyright 2024 &copy; bhojanyatra.com - All Right Reserved. </div>
    </div>
  );
};

export default Footer;
