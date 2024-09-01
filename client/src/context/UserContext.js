import React, { createContext, useState } from "react";
import axios from "axios";

// Create Context
// https://teamtreehouse.com/library/react-authentication-2/provide-authuser-to-entire-app-with-context
export const UserContext = createContext();

// Create provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signInUser = async (credentials) => {
    const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

    const options = {
      url: "http://localhost:5000/api/users",
      method: "GET",
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
      }
    }
    const response = await axios(options);
      //console.log(response);
      if(response.status === 200) {
        console.log(`${credentials.username} is successfully signed in.`);
        const user = response.data;
        setUser(user);
        console.log(user);
        return user;
      } else {
        return null;
      }
    
  };

  const signOutUser = () => {
      // Sign Out User Function
  };

  return (
    <UserContext.Provider value={{
      user, 
      actions: {
        signInUser
      }
    }}>
      {children}
    </UserContext.Provider>
  );
}