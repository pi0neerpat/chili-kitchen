import React from "react";

import { Context } from "@providers/Context";
import { InfuraProvider } from "@ethersproject/providers";

import fetchRecipes from "@utils/fetchRecipes";

const DataProvider = () => {
    const recipes = fetchRecipes();
    const [context, setContext] = React.useContext(Context);

    const load = async () => {
        const allFarmsData = await Promise.all(
            recipes.map(async (recipe) => {
                return {
                    [recipe.slug]: {
                        interestRate: 10,
                        details: recipe,
                    },
                };
            })
        );
        setContext({ allFarmsData, ...context });
    };

    React.useEffect(() => {
        load();
    }, []);

    return null;
};

export default DataProvider;
