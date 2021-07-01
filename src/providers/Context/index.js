import React, { useState } from "react";

const Context = React.createContext();

const ContextProvider = ({ children }) => {
    const [allCampaigns, setAllCampaigns] = useState({});
    const [campaignsDataLoaded, setCampaignsDataLoaded] = useState(false);
    const [userCampaigns, setUserCampaigns] = useState([]);
    const [userDataLoaded, setUserDataLoaded] = useState(false);
    const [ethData, setEthData] = useState({});
    const [ethDataLoaded, setEthDataLoaded] = useState(false);
    const [rate, setRate] = useState(0);

    const value = {
        allCampaigns,
        setAllCampaigns,
        campaignsDataLoaded,
        setCampaignsDataLoaded,
        userCampaigns,
        setUserCampaigns,
        userDataLoaded,
        setUserDataLoaded,
        ethData,
        setEthData,
        ethDataLoaded,
        setEthDataLoaded,
        rate,
        setRate,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { ContextProvider, Context };
