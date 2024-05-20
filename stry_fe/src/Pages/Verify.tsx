import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Verify(props :any) 
{
    
    
    return (
        <>
            <h1>
                Bravo, uspješno ste potvrdili svoj mail!
            </h1>
            <div>
                Ne preostaje vam ništa više nego da zaigrate!
                Što još čekaš?
            </div>
            <Link to="/">Zaigrajmo!</Link>
        </>
    );



}