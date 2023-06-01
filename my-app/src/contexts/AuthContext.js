import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
const [isAuth, setIsAuth] = useState(!!localStorage.getItem("access_token"));

useEffect(() => {
setIsAuth(!!localStorage.getItem("access_token"));
}, []);

return (
<AuthContext.Provider value={{ isAuth, setIsAuth }}>
    {props.children}
</AuthContext.Provider>
);
};
