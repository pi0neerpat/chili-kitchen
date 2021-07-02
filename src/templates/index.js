import React from "react";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";

import fetchRecipes from "@utils/fetchRecipes";
/**
 * Main index page (home page)
 * Loads all posts
 *
 */
const Index = ({ data, pageContext }) => {
    const { heroes } = data;
    const recipes = fetchRecipes();

    const recipesWithImages = recipes.map((recipe) => {
        const image = heroes.edges.find(
            (img) =>
                img.node.name === "hero" &&
                img.node.fields.slug.includes(
                    recipe.slug.replace(/\/recipe\//, "")
                )
        );
        return { ...recipe, image };
    });

    console.log(recipesWithImages);

    return (
        <>
            <Layout isHome={true}>
                <div className="container">
                    <section className="post-feed">
                        {recipesWithImages.map((recipe) => (
                            <PostCard key={recipe.id} post={recipe} />
                        ))}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    );
};

export const pageQuery = graphql`
    query indexPageQuery {
        heroes: allFile(
            filter: {
                relativePath: { regex: "/^recipes/" }
                name: { regex: "/^hero/" }
            }
        ) {
            edges {
                node {
                    name
                    publicURL
                    fields {
                        slug
                    }
                    childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;

export default Index;
