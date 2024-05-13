import React from "react";
import styles from "./Footer.module.css"

// displays the footer content on each page 
const Footer = () => {

    return (
        <div className={styles["footer"]}>
            <span className={styles["footer_motto"]}>The solar system: the new home</span>
            <span className={styles["footer_emoji"]}>🌎🚀🧑‍🚀🪐</span>
        </div>
    )

}

export default Footer