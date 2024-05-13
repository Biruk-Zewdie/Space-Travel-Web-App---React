import React, { useState, useEffect } from 'react';
import styles from "./Loading.module.css"

/* Loading component is displayed during await time of 
    - opening spacecrafts page 
    - building spacecraft 
    - destroying spacecraft
    - opening spacecraft page 
    - opening planets page 
    - space trip of a spacecraft to other planet
*/
const Loading = () => {
    const [dots, setDots] = useState([]);

    useEffect(() => {
        setTimeout (() => {
            if (dots.length < 5){
                setDots (dots=> [...dots, '.'])
            }
        }, 200)

    }, [dots])

    return (
        <div className={styles["loading"]}>
            <div className={styles['shooting_spacecraft']}>🚀</div>
            {dots.map((dot, index) => <div key={index}>
                {dot}
            </div>)}
        </div>
    )
}

export default Loading;