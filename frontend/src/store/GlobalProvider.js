import React, { useState } from "react";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [userTab, setUserTab] = useState(0)
    return (
        <GlobalContext.Provider value={{ userTab, setUserTab }}>
            {children}
        </GlobalContext.Provider>
    )
}