import React, { useContext } from "react";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { Context } from "@providers/Context";

import fetchRecipes from "@utils/fetchRecipes";

const Index = ({ pageContext }) => {
    // Step 1. Load all recipe details
    const recipes = fetchRecipes();

    // Step 2. Load all farm data from Context (DataProvider)
    const [context] = useContext(Context);
    const { allFarmsData } = context;
    const [farmsData, setFarmsData] = React.useState({});
    const loadFarmData = () => {
        // TODO: Parse allFarmsData to inject the interest rate here too
        // const data = Object.entries(allFarmsData).find(([, item]) => {
        //     return item.details.slug === pageContext.slug;
        // })[1];
        // setFarmData({
        //     ...data,
        // });
    };

    React.useEffect(() => {
        allFarmsData && loadFarmData();
    }, [allFarmsData]);

    return (
        <>
            <Layout isHome={true}>
                <div className="container">
                    <section className="post-feed">
                        {recipes.map((recipe) => (
                            <PostCard key={recipe.id} post={recipe} />
                        ))}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    );
};

// export const pageQuery = graphql`
//     query indexPageQuery {
//     }
// `;

export default Index;
