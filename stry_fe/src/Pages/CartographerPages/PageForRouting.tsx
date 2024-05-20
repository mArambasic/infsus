import React from 'react';
import NavBar from '../../Components/NavBar';
import MapForRouting from './MapForRouting';


export default function PageForRouting(){

    return (
        <>
            <NavBar/>
            <h2>Path to location</h2>
            <MapForRouting/>

        </>
    );
}
