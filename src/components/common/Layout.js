import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { Link, StaticQuery, graphql } from "gatsby"
import Logo from "../../images/logo.svg"
import SeoBanner from "../../images/seo-banner.png"
import ImageMeta from "./meta/ImageMeta"
import config from "../../utils/siteConfig"

// Styles
import "../../styles/app.scss"

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ children, bodyClass, isHome }) => {
  const site = {
    title: `CHILI Kitchen`,
    subtitle: `Brought to you by MetaCartel`,
    twitterUrl: `https://twitter.com/Meta_Cartel`,
    siteUrl: `https://chilikitchen.com`,
  }

  return (
    <div className="content">
      {/* <Particles /> */}
      <Helmet>
        <html lang="en" />
        <body className={bodyClass} />
        <meta name="description" content={config.siteDescriptionMeta} />
        <meta property="og:title" content={config.siteTitleMeta} />
        <meta property="og:url" content={config.siteUrl} />
        <meta property="og:description" content={config.siteDescriptionMeta} />
        <meta data-react-helmet="true" property="og:type" content="website" />
      </Helmet>
      <ImageMeta image={SeoBanner} />
      <div className="viewport">
        <div className="viewport-top">
          {/* The main header section on top of the screen */}
          <div className="container">
            <nav class="navbar" role="navigation" aria-label="main navigation">
              <div class="navbar-brand">
                <Link to="/" className='navbar-brand'>
                  <img
                    className="site-logo"
                    src={Logo}
                    alt="Chili Kitchen Logo"
                  />
                </Link>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>

              <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-end">
                  <div class="navbar-item">
                    <div class="buttons">
                      <a href="/about" className="nes-btn is-error">
                        About
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>



          <header className="site-head">
            <div className="container">
              {isHome ? (
                <div>
                  <div className="button-container"></div>
                  <div className="site-banner">{/* empty div for space */}</div>
                </div>
              ) : null}
            </div>
          </header>

          <main className="site-main">{children}</main>
        </div>

        {/* The footer at the very bottom of the screen */}
        <footer className="footer">
          <Link to="/">{site.title}</Link>
          <a href="https://metacartel.org">MetaCartel.org</a>
        </footer>
      </div>
    </div>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  bodyClass: PropTypes.string,
  isHome: PropTypes.bool,
}

const DefaultLayoutSettingsQuery = (props) => (
  <StaticQuery
    query={graphql`
      query GhostSettings {
        file(relativePath: { eq: "ghost-icon.png" }) {
          childImageSharp {
            fixed(width: 30, height: 30) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={(data) => <DefaultLayout data={data} {...props} />}
  />
)

export default DefaultLayout
