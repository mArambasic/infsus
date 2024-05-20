import React, { useState } from "react";
import { UserContext } from "./Context";

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState
  ({
    username: "",
    password: "",
    auth: false,
  });

//==========================================================================================FUNKCIJE==============================================================================
  // Login updates the user data with a name parameter
  const login = (name: string, password: string) => {
    setUser((user) => ({
      username: name,
      password: password,
      auth: true,
    }));
  }

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      username: "",
      password: "",
      auth: false,
    }));
  }
//==========================================================================================FUNKCIJE END==============================================================================
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
