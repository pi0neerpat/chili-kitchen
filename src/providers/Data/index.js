import { Context } from "@providers/Context";
import { InfuraProvider } from "@ethersproject/providers";

import fetchRecipes from "@utils/fetchRecipes";

const DataProvider = () => {
    const recipes = fetchRecipes();
    console.log(recipes);
    // const { farmData } = React.useContext(Context);
    //
    // React.useEffect(() => {
    //     loadFarms();
    // }, []);

    return null;
};

export default DataProvider;
