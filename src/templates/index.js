import React from "react";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";

import fetchRecipes from "@utils/fetchRecipes";

const Index = ({ pageContext }) => {
    const recipes = fetchRecipes();

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
