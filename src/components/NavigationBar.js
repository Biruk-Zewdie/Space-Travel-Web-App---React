import React from "react";
import styles from "./NavigationBar.module.css"
import { NavLink } from "react-router-dom";

//Enables the user to navigate through home, spacecrafts and planets page.

const NavigationBar = () => {

    return (

        <nav className={styles["navbar"]}>
            <NavLink to="/"
                className={({ isActive }) => isActive ? styles['nav_link-active'] : styles['nav_link']} >
                🌍 Home
            </NavLink>
            <NavLink to="/spacecrafts"
                className={({ isActive }) => isActive ? styles['nav_link-active'] : styles['nav_link']}>
                🚀 Spacecrafts
            </NavLink>
            <NavLink to="/planets"
                className={({ isActive }) => isActive ? styles['nav_link-active'] : styles['nav_link']}>
                🪐 planets
            </NavLink>
        </nav>
    )

}

export default NavigationBar;