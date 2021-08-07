import React, { useContext } from "react"
import { graphql } from "gatsby"

import Chili from '../images/chili.png';

import { Layout, PostCard, Pagination } from "../components/common"
import { Context } from "@providers/Context"

import fetchRecipes from "@utils/fetchRecipes"

const Index = ({ pageContext }) => {
  // Step 1. Load all recipe details
  const recipes = fetchRecipes()

  // Step 2. Load all farm data from Context (DataProvider)
  const [context] = useContext(Context)
  const { allFarmsData } = context
  const [farmsData, setFarmsData] = React.useState({})
  const loadFarmData = () => {
    // TODO: Parse allFarmsData to inject the interest rate here too
    // const data = Object.entries(allFarmsData).find(([, item]) => {
    //     return item.details.slug === pageContext.slug;
    // })[1];
    // setFarmData({
    //     ...data,
    // });
  }

  React.useEffect(() => {
    allFarmsData && loadFarmData()
  }, [allFarmsData])

  return (
    <>
      <Layout isHome={true}>
        <div className="container">
          <div className="columns">


            <div className="column is-one-third">
              <div class="nes-balloon from-left">
                <p>Welcome to the Chili Kitchen</p>
              </div>
              <img className="chili-character" src={Chili} />
            </div>

            <div className="column">
              {/* <div className="nes-container is-rounded"> */}
              <div class="nes-container with-title is-centered is-rounded">
                <p class="title">Choose your recipe</p>
                <section className="post-feed">
                  {recipes.map((recipe) => (
                    <PostCard key={recipe.id} post={recipe} />
                  ))}
                </section>
              </div>
              <Pagination pageContext={pageContext} />
              {/* </div> */}
            </div>
          </div>

        </div>
      </Layout>
    </>
  )
}

// export const pageQuery = graphql`
//     query indexPageQuery {
//     }
// `;

export default Index
