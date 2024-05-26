import React, { useState } from "react";
import { UserContext } from "./Context";

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState
  ({
    username: "",
    password: "",
    auth: false,
  });

  const login = (name: string, password: string) => {
    setUser((user) => ({
      username: name,
      password: password,
      auth: true,
    }));
  }

  const logout = () => {
    setUser((user) => ({
      username: "",
      password: "",
      auth: false,
    }));
  }
 return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
