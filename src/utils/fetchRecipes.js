import { useStaticQuery, graphql } from "gatsby"

const fetchRecipes = () => {
  const recipeDetails = useStaticQuery(
    graphql`
      query recipeDetails {
        recipes: allFile(
          filter: { relativePath: { regex: "/^recipe/.+/index.js/" } }
        ) {
          edges {
            node {
              fields {
                name
                slug
                content {
                  dappyConfig {
                    NETWORK
                    POOL_ADDRESS
                    STAKING_TOKEN_ADDRESS
                    REWARD_TOKEN_ADDRESS
                    IMPACT_TEXT
                    BACKGROUND_COLOR
                    FOREGROUND_COLOR
                  }
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
        heroes: allFile(
          filter: {
            relativePath: { regex: "/^recipe/" }
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
    `
  )
  return recipeDetails.recipes.edges.map((recipe) => {
    const image = recipeDetails.heroes.edges.find(
      (img) =>
        img.node.name === `hero` &&
        img.node.fields.slug.includes(
          recipe.node.fields.slug.replace(/\/recipe\//, ``)
        )
    )
    return {
      name: recipe.node.fields.name,
      slug: recipe.node.fields.slug,
      image,
      ...recipe.node.fields.content,
    }
  })
}

export default fetchRecipes
