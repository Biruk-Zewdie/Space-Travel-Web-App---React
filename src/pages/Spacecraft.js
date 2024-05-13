import React from "react";
import styles from "./Spacecraft.module.css"
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi";
import LoadingContext from "../context/LoadingContext";

const Spacecraft = () => {
    const [spacecraft, setSpacecraft] = useState()
    const { id } = useParams()
    const navigate = useNavigate()
    const { enableLoading, disableLoading } = useContext(LoadingContext)


/*=========================================== Get a spacecraft by it's Id ========================================================*/
//get the spacecraft Id from the url using useParams hook
// display the spacecraft image and its details on it's own page.

    useEffect(() => {
        const getSpacecraftById = async () => {
            enableLoading()

            const { data: spacecraft, isError } = await SpaceTravelApi.getSpacecraftById({ id })
            if (!isError) {
                setSpacecraft(spacecraft)
            }
            disableLoading()
        }
        getSpacecraftById()

    }, [enableLoading, disableLoading, id])


    const HandleBackButton = () => {
        navigate("/spacecrafts")

    }



    return (
        //Handle initial state for spacecraft: Since spacecraft is initialized as undefined, you should handle this case in your JSX to prevent errors. 
        //For example, you could conditionally render content based on whether spacecraft is defined.
        spacecraft &&
        <>
            <button className= {styles['back_button']}onClick={HandleBackButton}>Back 👈🏽</button>
            <div className={styles['spacecraft']}>
                <div className={styles['spacecraft_pic_container']}>
                    {
                        spacecraft.pictureUrl ?
                            <img className={styles['spacecraft_pic']} src={spacecraft.pictureUrl} alt={spacecraft.name} /> :
                            <div className={styles['default_spacecraft_pic']}>🚀</div>
                    }
                </div>

                <div className={styles['details_container']}>
                    <div className={styles['spacecraft_details']}>
                        <div className={styles['spacecraft_name']}>Name: {spacecraft.name}</div>
                        <div className={styles['spacecraft_capacity']}>Capacity: {spacecraft.capacity}</div>
                        <div className={styles['spacecraft_currentLocation']}>Current Location: {spacecraft.currentLocation}</div>
                    </div>
                    <div className={styles['description_container']}>
                        <div>Description: </div>
                        <div className={styles['spacecraft_description']}>{spacecraft.description}</div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Spacecraft 