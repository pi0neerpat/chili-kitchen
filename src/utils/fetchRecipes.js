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
                                    description
                                    ingredients {
                                        amount
                                        unit
                                        product
                                    }
                                    steps {
                                        step
                                    }
                                    cookingTime
                                    servings
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
