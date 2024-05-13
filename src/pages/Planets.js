import React, { useState, useEffect, useContext } from "react";
import styles from './Planets.module.css'
import LoadingContext from "../context/LoadingContext"
import SpaceTravelApi from '../services/SpaceTravelApi'

const Planets = () => {

    const [planetsWithSpacecrafts, setPlanetsWithSpacecrafts] = useState([])
    const { isLoading, enableLoading, disableLoading } = useContext(LoadingContext)
    const [selectedPlanetId, setSelectedPlanetId] = useState([])
    const [selectedSpacecraftId, setSelectedSpacecraftId] = useState([])

/*======================================== Put planets with corresponding spacecrafts  =======================================================*/   

//put spacecrafts in the planets array if spacecraft current location is equals to planet Id 
//By default spacecraft is build only on earth.
/* When the spacecraft travels, the spacecraft current location changes and equals to the 
landing planet id, so spacecraft moved to other planet array */

    const getPlanetsWithSpacecrafts = async () => {
        const { data: planets, isError: isErrorPlanets } = await SpaceTravelApi.getPlanets()
        const { data: spacecrafts, isError: isErrorSpacecraft } = await SpaceTravelApi.getSpacecrafts()

        if (!isErrorPlanets && !isErrorSpacecraft) {
            for (let planet of planets) {
                planet.spacecrafts = [];

                for (let spacecraft of spacecrafts) {
                    if (spacecraft.currentLocation === planet.id) {
                        planet.spacecrafts.push(spacecraft);
                    }
                }
            }
        }
        setPlanetsWithSpacecrafts(planets)
    }

    //Enable loading sets isloading to true for 1 second before we get planets with corresponding spacecrafts 

    useEffect(() => {
        const runGetPlanetsWithSpacecrafts = async () => {
            enableLoading()
            await getPlanetsWithSpacecrafts()
            disableLoading()
        }
        runGetPlanetsWithSpacecrafts()
    }, [enableLoading, disableLoading])

/*==================================================== Handle Click of Planet =========================================================*/
//Get planet id by clicking on the avatar 
    
const handlePlanetClick = (event, id) => {
        if (!isLoading) {
            setSelectedPlanetId(id)
        }
    }

/*======================================== Handle Click of Spacecraft to launch =======================================================*/

/*  get spacecraft id by clicking on spacecraft avator  if the below conditions are satisfied 
    1. the page is not under loading 
    2. if the any of the planet is selected first this means "selectedPlanetId" ain't gonna be empty array so Number.isInteger(selectedPlanetId) will be true.
    3. selected planet id should not be the planet that the spacecraft is already landed 
*/

/*if one of this conditions are failed to fulfill, we can't get the spacecraft id by click on it's avator. 
if we can't get the spacecraft id we can't compare the spacecraft current location with planet Id. 
As a result, we can't move the spacecraft from the current planet */


    const spaceTrip = async (event, spacecraftId, planetId) => {

        if (!isLoading && Number.isInteger(selectedPlanetId) && selectedPlanetId !== planetId) {
            setSelectedSpacecraftId(spacecraftId)

            enableLoading()
            const { isError } = await SpaceTravelApi.sendSpacecraftToPlanet({ spacecraftId, targetPlanetId: selectedPlanetId })
            if (!isError) {
                await getPlanetsWithSpacecrafts();
                setSelectedPlanetId(null)
                setSelectedSpacecraftId(null)

            }
            disableLoading()
        }

    }

    return (
        <div >
            {planetsWithSpacecrafts.map((planet, index) =>
                <div key={index} className={styles['planetsWithSpacecrafts']}>
                    <div className={`${styles['planet']} ${selectedPlanetId === planet.id && styles['selected_planet']}`}
                        onClick={event => handlePlanetClick(event, planet.id)}
                    >
                        <img className={styles['planet_pic']} src={planet.pictureUrl} alt={planet.name} />
                        <div className={styles['planet_details']}>
                            <div className={styles['planet_name']}>{planet.name}</div>
                            <div className={styles['planet_popn']}>{planet.currentPopulation}</div>
                        </div>
                    </div>

                    <div className={styles['spacecrafts']}>

                        {planet.spacecrafts.map((spacecraft, index) =>
                            <div key={index}
                                className={`${styles['spacecraft']} ${selectedSpacecraftId === spacecraft.id && styles['selected_spacecraft']}`}
                                onClick={event => spaceTrip(event, spacecraft.id, planet.id)}
                            >
                                <div className={styles['spacecraft_pic_container']}>
                                    {spacecraft.pictureUrl ?
                                        <img className={styles['spacecraft_pic']} src={spacecraft.pictureUrl} alt={spacecraft.name} /> :
                                        <div className={styles['default_spacecraft_pic']}>🚀</div>
                                    }
                                </div>
                                <div className={styles['spacecraft_details']}>
                                    <div className={styles['spacecraft_name']}>{spacecraft.name}</div>
                                    <div className={styles['spacecraft_capacity']}>{spacecraft.capacity}</div>
                                </div>
                            </div>

                        )}

                    </div>
                </div>

            )}
        </div>
    )

}

export default Planets;