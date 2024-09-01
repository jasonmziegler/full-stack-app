import React, { createContext, useState } from "react";

// Create Context
// https://teamtreehouse.com/library/react-authentication-2/provide-authuser-to-entire-app-with-context
export const UserContext = createContext();

// Create provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signInUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{user, signInUser}}>
      {children}
    </UserContext.Provider>
  );
}