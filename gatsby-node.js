const path = require(`path`)
const { postsPerPage } = require(`./src/utils/siteConfig`)
const { paginate } = require(`gatsby-awesome-pagination`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // ###### RECIPES ########
  if (node.internal.type === `File`) {
    const value = createFilePath({ node, getNode }).replace(/\/$/, ``)
    // .replace(/\s/, `-`)
    const slug = value.toLowerCase()
    const name = value.replace(/\/recipe\//, ``).replace(/-/, ` `)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    createNodeField({
      node,
      name: `name`,
      value: name,
    })
    if (/^recipe\/.+\/index.js/.test(node.relativePath)) {
      const content = require(`./content/${node.relativeDirectory}`)
      createNodeField({
        node,
        name: `name`,
        value: content.name,
      })
      createNodeField({
        name: `content`,
        node,
        value: content,
      })
    }
  }
}

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, pages and authors that we fetched from the Ghost site.
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      recipes: allFile(
        filter: { relativePath: { regex: "/^recipe/.+/index.js/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            relativeDirectory
          }
        }
      }
    }
  `)

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors)
  }

  // Load templates
  const indexTemplate = path.resolve(`./src/templates/index.js`)
  const postTemplate = path.resolve(`./src/templates/post.js`)

  const recipes = result.data.recipes.edges

  recipes.forEach(({ node }) => {
    const details = require(`./content/${node.relativeDirectory}`)
    createPage({
      path: `${node.fields.slug}/`,
      component: postTemplate,
      context: {
        slug: node.fields.slug,
        ...details,
        recipeGroupName: node.fields.slug.replace(/^\//, ``),
      },
    })
  })

  // Create pagination
  paginate({
    createPage,
    items: recipes,
    itemsPerPage: postsPerPage,
    component: indexTemplate,
    pathPrefix: ({ pageNumber }) => {
      if (pageNumber === 0) {
        return `/`
      } else {
        return `/page`
      }
    },
  })
}

// Load missing Node polyfill for Webpack 5
// https://stackoverflow.com/questions/67333737/add-crypto-browserify-to-gatsby-project
exports.onCreateWebpackConfig = ({ stage, actions, loaders }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /@pi0neerpat\/dappy/,
          use: loaders.null(),
        },
      ],
    },
    resolve: {
      fallback: {
        util: require.resolve(`util/`),
        crypto: require.resolve(`crypto-browserify`),
        os: require.resolve(`os-browserify/browser`),
        https: require.resolve(`https-browserify`),
        http: require.resolve(`stream-http`),
        assert: require.resolve(`assert/`),
        stream: require.resolve(`stream-browserify`),
      },
    },
  })
}
