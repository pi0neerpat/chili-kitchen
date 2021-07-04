import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Logo from '../../images/biggerMetaCartelLogo.jpeg';

// Styles
import '../../styles/app.css'

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
        "title": 'Chili Kitchen',
        'subtitle': 'It is farm and also kitchen.',
        'twitterUrl': 'https://twitter.com/Meta_Cartel',
        'websiteUrl': 'https://www.metacartel.org/',
        'siteUrl': ''
    }

    return (
        <>
            <Helmet>
                <html lang="en" />
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">

                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <header className="site-head">
                        <div className="container">
                            <div className="site-mast">
                                <div className="site-mast-left">
                                    <Link to="/">
                                        <img className="site-logo" src={ Logo } alt="Recipes with Flotiq.com" />
                                    </Link>
                                </div>
                                <div className="site-mast-right">
                                    { site.twitterUrl && <a href={ site.twitterUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Twitter" /></a>}
                                </div>
                            </div>
                            { isHome ?
                                <div className="site-banner">
                                    <h1 className="site-banner-title">{site.title}</h1>
                                    <p className="site-banner-desc">{site.subtitle}</p>
                                </div> :
                                null}
                            <nav className="site-nav">
                                <div className="site-nav-left">
                                </div>
                                <div className="site-nav-right">
                                    <Link className="site-nav-button" to="/about">About</Link>
                                </div>
                            </nav>
                        </div>
                    </header>

                    <main className="site-main">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>

                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <div className="site-foot-nav-left">
                                <Link to="/">🌶️ &nbsp;{site.title} 🌶️ </Link>&nbsp;Brought to you by <a className="site-foot-nav-item" href="metacartel.org" target="_blank" rel="noopener noreferrer">MetaCartel</a>
                            </div>
                            <div className="site-foot-nav-right">
                                <a href="https://app.sushi.com/swap?inputCurrency=0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270&outputCurrency=0x48e1eec032171f871890c86308147032bb246508">Find Chilis on SushiSwap</a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayout
