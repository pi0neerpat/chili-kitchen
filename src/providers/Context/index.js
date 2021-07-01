import React from "react";

const Context = React.createContext();

const ContextProvider = ({ children }) => {
    const [state, setState] = React.useState({});

    return <Context.Provider value={state}>{children}</Context.Provider>;
};

export { ContextProvider, Context };
