import { createContext } from "react";

const DataContext = createContext({
    isAuth: true,
    authHandler: "",
    userAuthDetails: {},
    authDetails: "",
});

export default DataContext;