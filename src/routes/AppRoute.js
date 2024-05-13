import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Spacecrafts from "../pages/Spacecrafts";
import Planets from "../pages/Planets";
import BuildSpacecraft from "../pages/BulidSpacecraft";
import Spacecraft from "../pages/Spacecraft"


const AppRoute = () => {
    return (
        <div>
                <Routes>
                    <Route path= "/" element={<Home/>}/>
                    <Route path ="/spacecrafts" element={<Spacecrafts/>}/>
                    <Route path ="/planets" element={<Planets/>}/>
                    <Route path = "/spacecraft/build" element = {<BuildSpacecraft/>}  />
                    <Route path = "/spacecraft/:id" element = {<Spacecraft/>}/>
                    <Route path="*" element={<Navigate to = "/"/>}/>
                </Routes>
        </div>
    )
}

export default AppRoute; 