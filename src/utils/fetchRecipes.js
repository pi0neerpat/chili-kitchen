import { useStaticQuery, graphql } from "gatsby";

const fetchRecipes = () => {
    const recipes = useStaticQuery(
        graphql`
            query recipesData {
                recipes: allFile(
                    filter: { relativePath: { regex: "/^recipe/.+/index.js/" } }
                ) {
                    edges {
                        node {
                            fields {
                                name
                                slug
                                content {
                                    name
                                    iconName
                                    impactPerDai
                                    impactText
                                    isPrivate
                                    thresholds
                                    dappyDetails {
                                        foregroundColor
                                        backgroundColor
                                        hat {
                                            recipients
                                            proportions
                                            hatID
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `
    );
    return recipes.recipes;
};

export default fetchRecipes;
