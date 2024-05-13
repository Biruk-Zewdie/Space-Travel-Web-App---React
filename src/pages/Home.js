import React from "react";
import styles from "./Home.module.css"

const Home = () => {
    return (
        <div className={styles["home"]}>
            <div className={styles["home-main_header"]}>
                <h1>Space Travel: Expanding Horizons Beyond Earth</h1>
            </div>

            <div className={styles["home-general_info"]}>
            <h2>🌌 Journey into the Future</h2>
            <p>Embark on a space odyssey like no other as we venture beyond the confines of Earth. This interstellar journey promises breathtaking vistas of distant galaxies, encounters with alien worlds, and the thrill of exploring the unknown. Join us as we chart a course through the cosmos, forging a path toward humanity's next frontier.</p>

            </div>

            <div className={styles["home-general_info"]}>
            <h2>🌍 From Neglect to Innovation</h2>
            <p>Witness the transformative journey of space exploration as we rise from neglect to pioneering innovation. Through perseverance and dedication, we've turned distant dreams into tangible realities, pushing the boundaries of human understanding and technological prowess. Join us on this remarkable voyage as we continue to unlock the mysteries of the cosmos and inspire future generations to reach for the stars.</p>

            </div>

            <div className={styles["home-general_info"]}>
            <h2>🚀 Enter Space Travel: Where Dreams Take Flight</h2>
            <p>Unveils the gateway to boundless possibilities, where imagination fuels our journey beyond the stars. Embark on an odyssey where the cosmos becomes our playground, and aspirations soar amidst the vast expanse of the universe. Join us as we navigate through celestial wonders, turning dreams into reality one cosmic leap at a time.</p>

            </div>

            <div className={styles["home-general_info"]}>
            <h2>🔧 Engineer, Explorer, Leader</h2>
            <p>Engineer, Explorer, Leader celebrates the triumvirate of ingenuity, curiosity, and vision that propels spacecraft into the cosmos. Engineers craft the vessels that breach the final frontier, explorers chart the uncharted, and leaders guide humanity's odyssey into the unknown. Together, they shape the future of space exploration, inspiring generations to reach for the stars and beyond.</p>

            </div>

            <div className={styles["home-general_info"]}>
            <h2>🌠 A Universe of Possibilities Awaits</h2>
            <p>A Universe of Possibilities Awaits invites humanity to gaze skyward and embrace the boundless opportunities of space exploration. With each celestial discovery, we unlock the door to a myriad of possibilities, from new worlds to groundbreaking technologies. Let curiosity be our compass as we embark on a journey that promises to redefine our understanding of the cosmos and inspire generations to reach for the stars.</p>

            </div>
          
        </div>
    )

}

export default Home;