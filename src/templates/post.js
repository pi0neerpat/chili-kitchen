import React, { useContext, useState } from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Img from "gatsby-image";

import { Layout } from "../components/common";
import { Context } from "@providers/Context";
import fetchRecipes from "@utils/fetchRecipes";

const Post = ({ pageContext }) => {
    // Step 1. Load this recipe's details
    const recipes = fetchRecipes();
    const post = Object.entries(recipes).find(
        ([, item]) => item.slug === pageContext.slug
    )[1];

    // Step 2. Load this farm's data from Context (DataProvider)
    const [context] = useContext(Context);
    const { allFarmsData } = context;
    const [farmData, setFarmData] = useState({});
    const parseFarmData = () => {
        const data = Object.entries(allFarmsData).find(([, item]) => {
            return item.details.slug === pageContext.slug;
        })[1];
        setFarmData({
            ...data,
        });
    };

    React.useEffect(() => {
        allFarmsData && parseFarmData();
    }, [allFarmsData]);

    return (
        <>
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        {post.image ? (
                            <figure className="post-feature-image">
                                <Img
                                    fluid={
                                        post.image.node.childImageSharp.fluid
                                    }
                                    alt={post.name}
                                />
                            </figure>
                        ) : null}
                        <section className="post-full-content">
                            <h1 className="content-title">{post.name}</h1>
                            <h4>
                                <div>APR: {farmData?.interestRate}%</div>
                                <div>
                                    Tokens Locked:{" "}
                                    {farmData?.lockedAmount?.toLocaleString()}
                                </div>
                                <div>Servings: {post.servings} meals</div>
                                <div>
                                    Cooking time: {post.cookingTime} minutes
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
                                    {post.ingredients.map(
                                        (ingredient, index) => (
                                            <label
                                                key="index"
                                                className="recipe-ingredients"
                                            >
                                                <span>
                                                    <strong>
                                                        {" "}
                                                        {
                                                            ingredient.product
                                                        }{" "}
                                                    </strong>
                                                    (
                                                    {`${ingredient.amount} ${ingredient.unit}`}
                                                    )
                                                </span>
                                                <input type="checkbox" />
                                            </label>
                                        )
                                    )}
                                    <p />
                                </section>
                            ) : (
                                <section className="content-body" />
                            )}

                            <h2 className="content-title">Steps</h2>
                            {post.steps !== null ? (
                                <section className="content-body">
                                    {post.steps.map((step, index) => (
                                        <div
                                            className="recipe-step"
                                            key={index}
                                        >
                                            <div className="recipe-step-index">
                                                <div>{index + 1}</div>
                                            </div>
                                            <div className="recipe-step-data">
                                                <p>{step.step}</p>

                                                {step.image && step.image[0] ? (
                                                    <img
                                                        src={`https://api.flotiq.com/image/1280x0/${step.image[0].id}.${step.image[0].extension}`}
                                                        alt={post.name}
                                                    />
                                                ) : (
                                                    ""
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
    );
};

export default Post;

// export const recipeQuery = graphql`
//       query getRecipeImage($recipeGroupName: String!) {
//
//       }
// `;
