import { Context } from "@providers/Context";
import { InfuraProvider } from "@ethersproject/providers";

import fetchRecipes from "@utils/fetchRecipes";

const DataProvider = () => {
    const recipes = fetchRecipes();
    const [contex, setContext] = React.useContext(Context);

    const load = async () => {
        const allFarmsData = await Promise.all(
            recipes.edges.map(async (recipe) => {
                const details = recipe.node.fields;
                return {
                    [recipe.node.fields.slug]: {
                        interestRate: 10,
                        details,
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
