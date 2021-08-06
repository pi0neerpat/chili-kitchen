const path = require(`path`)
const dotenv = require(`dotenv`)
dotenv.config()

/**
 * This is the place where you can tell Gatsby which plugins to use
 * and set them up the way you want.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
 *
 */
module.exports = {
    plugins: [
        /**
         *  Content Plugins
         */
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `pages`),
                name: `pages`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `content`),
                name: `pages`,
            },
        },
        // Setup for optimised images.
        // See https://www.gatsbyjs.org/packages/gatsby-image/
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `images`),
                name: `images`,
            },
        },
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                failOnError: false,
            },
        },
        {
          resolve: `gatsby-plugin-manifest`,
          options: {
            name: `Chili Kitchen`,
            short_name: `Chili Kitchen`,
            start_url: `/`,
            background_color: `#5b7a81`,
            theme_color: `#5b7a81`,
            display: `minimal-ui`,
            icon: `src/images/red-scoville.png`, // This path is relative to the root of the site.
          },
        },
        `gatsby-transformer-sharp`,
        /**
         *  Utility Plugins
         */
        {
            resolve: `gatsby-plugin-alias-imports`,
            options: {
                alias: {
                    src: `src`,
                    "@components": `src/components`,
                    "@utils": `src/utils`,
                    "@content": `content/`,
                    "@providers": `src/providers`,
                },
            },
        },
        `gatsby-plugin-catch-links`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-force-trailing-slashes`,
        `gatsby-plugin-offline`,
    ],
}
