
import React, {createContext} from 'react';


export const UserContext = createContext({
    user : { username: "", password:"", auth: false },
    login : (username : string, password : string)=>{},
    logout : ()=>{}});
