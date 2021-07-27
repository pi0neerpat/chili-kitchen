import React, { useContext, useState } from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import Img from "gatsby-image"

import { Layout } from "../components/common"
import { Context } from "@providers/Context"
import fetchRecipes from "@utils/fetchRecipes"

const Post = ({ pageContext }) => {
  // Step 1. Load this recipe's details
  const recipes = fetchRecipes()
  const post = Object.entries(recipes).find(
    ([, item]) => item.slug === pageContext.slug
  )[1]

  // Step 2. Load this specific farm's data from Context (DataProvider)
  const [context] = useContext(Context)
  const { allFarmsData } = context
  const [farmData, setFarmData] = useState({})
  const parseFarmData = () => {
    const data = Object.entries(allFarmsData).find(
      ([, item]) => item.details.slug === pageContext.slug
    )[1]
    setFarmData({
      ...data,
    })
  }

  React.useEffect(() => {
    allFarmsData && parseFarmData()
  }, [allFarmsData])

  return (
    <>
      <Helmet>
        <style type="text/css">{`${post.codeinjection_styles}`}</style>
      </Helmet>
      <Layout>
        <div className="container">
          <article className="content">
            <section className="post-full-content">
              <h1 className="content-title">{post.name}</h1>
              <div className="iframe-wrapper">
                <iframe
                  src={post.oneClickDappSrc}
                  frameBorder="0"
                  className="iframe"
                />
              </div>
              <h4>
                <div>Servings: {post.servings} meals</div>
                <div>Cooking time: {post.cookingTime} minutes</div>
                <div>Network: {post.web3.NETWORK}</div>
                <div>
                  Farm:{` `}
                  <a
                    href={
                      post.web3.EXPLORER_BASE_URL +
                      post.web3.STAKING_TOKEN_ADDRESS
                    }
                  >
                    {post.web3.POOL_ADDRESS}
                  </a>
                </div>
                <div>
                  Reward token:{` `}
                  <a
                    href={
                      post.web3.EXPLORER_BASE_URL +
                      post.web3.REWARD_TOKEN_ADDRESS
                    }
                  >
                    {post.web3.REWARD_TOKEN_ADDRESS}
                  </a>
                </div>
                <div>
                  Staking token:{` `}
                  <a
                    href={
                      post.web3.EXPLORER_BASE_URL +
                      post.web3.STAKING_TOKEN_ADDRESS
                    }
                  >
                    {post.web3.STAKING_TOKEN_ADDRESS}
                  </a>
                </div>
              </h4>

              <hr />

              <section
                className="content-body"
                dangerouslySetInnerHTML={{
                  __html: post.description,
                }}
              />
              <h2 className="content-title">Ingredients</h2>

              {post.ingredients !== null ? (
                <section className="content-body">
                  {post.ingredients.map((ingredient, index) => (
                    <label key="index" className="recipe-ingredients">
                      <span>
                        <strong>
                          {` `}
                          {ingredient.product}
                          {` `}
                        </strong>
                        ({`${ingredient.amount} ${ingredient.unit}`})
                      </span>
                      <input type="checkbox" />
                    </label>
                  ))}
                  <p />
                </section>
              ) : (
                <section className="content-body" />
              )}

              <h2 className="content-title">Steps</h2>
              {post.steps !== null ? (
                <section className="content-body">
                  {post.steps.map((step, index) => (
                    <div className="recipe-step" key={index}>
                      <div className="recipe-step-index">
                        <div>{index + 1}</div>
                      </div>
                      <div className="recipe-step-data">
                        <p>{step.step}</p>
                        {step.imageSrc ? (
                          <img src={step.imageSrc} alt={step.imageAlt} />
                        ) : (
                          ``
                        )}
                      </div>
                    </div>
                  ))}
                </section>
              ) : (
                <section className="content-body" />
              )}
            </section>
          </article>
        </div>
      </Layout>
    </>
  )
}

export default Post

// export const recipeQuery = graphql`
//       query getRecipeImage($recipeGroupName: String!) {
//
//       }
// `;
