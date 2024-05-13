import React, { useState, useEffect, useContext } from "react";
import styles from "./Spacecrafts.module.css"
import { useNavigate } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi";
import LoadingContext from "../context/LoadingContext";

const Spacecrafts = () => {
    const [spacecrafts, setSpacecrafts] = useState([])
    const {enableLoading, disableLoading} = useContext (LoadingContext)
    const navigate = useNavigate()

    const handleBuildSpacecraft = () => {
        navigate("/spacecraft/build")
    }

    const getSpacecrafts = async () => {
        const { data: spacecrafts, isError } = await SpaceTravelApi.getSpacecrafts()
        if (!isError) {
            setSpacecrafts(spacecrafts)
        }
    }

    useEffect(() => {
        const runGetSpacecraft = async () => {
           
            enableLoading()
            await getSpacecrafts()
            disableLoading()
           
        }
        runGetSpacecraft ();
       
    }, [enableLoading, disableLoading])

    const destroySpacecraft = async (event, id) => {
        enableLoading()
        const {isError} = await SpaceTravelApi.destroySpacecraftById ({id}) 
        if (!isError){
           await getSpacecrafts();
        } 
        disableLoading ()
    }

    const goToSpacecraftPage = async (event, id) => {
            navigate (`/spacecraft/${id}`)
    }
    

    return (
        <div>
            <button className={styles['build_spacecraft']} onClick={handleBuildSpacecraft}>Build Spacecraft</button>
            <div>
                {
                    spacecrafts.map((spacecraft, index) =>
                        <div key={spacecraft.id} className={styles["spacecraft"]}>
                            <div className={styles["spacecraft_picture_container"]}
                            onClick={(event) => goToSpacecraftPage (event, spacecraft.id)}>
                                {spacecraft.pictureUrl ?
                                    <img className={styles["spacecraft_picture"]}src={spacecraft.pictureUrl} alt={spacecraft.name} /> :
                                    <div className={styles["spacecraft_default_picture"]}>🚀</div>
                                }
                            </div>
                            <div className={styles["spacecraft_details"]}>
                                <div className={styles["spacecraft_name"]}>Name: {spacecraft.name}</div>
                                <div className={styles["spacecraft_capacity"]}>Capacity: {spacecraft.capacity}</div>
                            </div>
                            <div className={styles["spacecraft_destroy"]}>
                                <button onClick= {(event) => destroySpacecraft(event, spacecraft.id)}>💥 Destroy</button>
                            </div>

                        </div>
                    )
                }

            </div>
        </div>
    )

}

export default Spacecrafts;