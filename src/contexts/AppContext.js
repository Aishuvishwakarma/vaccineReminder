import React, { createContext, useState } from "react";
import { getMe } from "../helpers/api/userApi";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async (id) => {
    try {
      if (id) {
        const userInfo = await getMe(id);
        if (userInfo?.response_data) {
          setLoggedInUser(userInfo?.response_data);
          setLoading(true);
        }
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AppContext.Provider
      value={{
        loading,
        fetchUserData: fetchUserData,
        loggedInUser:loggedInUser,
        setLoggedInUser:setLoggedInUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
