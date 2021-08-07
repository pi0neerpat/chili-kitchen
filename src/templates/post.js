import React, { useContext, useState } from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import Img from "gatsby-image"

import { Layout } from "../components/common"
import { Context } from "@providers/Context"
import fetchRecipes from "@utils/fetchRecipes"
import { truncateAddress } from "@utils/helpers"

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
    <div className="content">
      <Helmet>
        <style type="text/css">{`${post.codeinjection_styles}`}</style>
      </Helmet>
      <Layout>
        <div className="content">
          <div className="container">
            <section>
              <div className="iframe-wrapper">
                <iframe
                  src={post.oneClickDappSrc}
                  frameBorder="0"
                  className="iframe"
                />
              </div>
              <div className="nes-container is-rounded">
                <div className="post-title-container">
                  <h1 className="title is-1" style={{ marginBottom: 0 }}>{post.name}</h1>
                  {/* <Img
                    className="post-image"
                    fluid={post.image.node.childImageSharp.fluid}
                  /> */}
                </div>
                <section
                  className="content-body"
                  dangerouslySetInnerHTML={{
                    __html: post.description,
                  }}
                />

                <div className="columns is-gapless" style={{ marginTop: 20 }}>
                  <div className="column">
                    <h3 className="title is-3">Details</h3>
                    <span href="#" class="nes-badge is-splited">
                      <span class="is-primary">Servings</span>
                      <span class="is-dark">{post.servings}</span>
                    </span> <br />
                    <span href="#" class="nes-badge is-splited">
                      <span class="is-primary">Network</span>
                      <span class="is-dark">{post.web3.NETWORK}</span>
                    </span> <br />
                    <span href="#" class="nes-badge is-splited">
                      <span class="is-primary">Farm Contract</span>
                      <span class="is-dark">
                        <a
                          href={
                            post.web3.EXPLORER_BASE_URL +
                            post.web3.STAKING_TOKEN_ADDRESS
                          }
                        >
                          {truncateAddress(post.web3.POOL_ADDRESS)}
                        </a></span>
                    </span> <br />
                    <span href="#" class="nes-badge is-splited">
                      <span class="is-primary">Reward Token</span>
                      <span class="is-dark">
                        <a
                          href={
                            post.web3.EXPLORER_BASE_URL +
                            post.web3.STAKING_TOKEN_ADDRESS
                          }
                        >
                          {truncateAddress(post.web3.REWARD_TOKEN_ADDRESS)}
                        </a></span>
                    </span> <br />
                    <span href="#" class="nes-badge is-splited">
                      <span class="is-primary">Staking Token</span>
                      <span class="is-dark">
                        <a
                          href={
                            post.web3.EXPLORER_BASE_URL +
                            post.web3.STAKING_TOKEN_ADDRESS
                          }
                        >
                          {truncateAddress(post.web3.STAKING_TOKEN_ADDRESS)}
                        </a></span>
                    </span> <br />
                  </div>
                  <div className="column">
                    <h3 className="title is-3">Ingredients</h3>
                    {post.ingredients.map((ingredient) => <><b>{ingredient.product}</b> ({ingredient.amount} {ingredient.unit}) <hr /></>)}
                  </div>
                </div>

                <hr />

                <h2 className="content-title">Steps</h2>
                {post.steps !== null ? (
                  <section className="recipe-steps-container">
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
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Post

// export const recipeQuery = graphql`
//       query getRecipeImage($recipeGroupName: String!) {
//
//       }
// `;