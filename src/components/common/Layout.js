import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Logo from '../../images/chili-kitchen-logo.png';

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
        "title": 'CHILI Kitchen',
        'subtitle': 'Recipes with Flotiq',
        'twitterUrl': 'https://twitter.com/flotiq',
        'facebookUrl': 'https://www.facebook.com/Flotiq-104200727751200/',
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
                        <div className="site-mast">
                            <div className="site-mast-left">
                                <Link to="/">
                                    <img className="site-logo" src={Logo} alt="Chili Kitchen Logo" />
                                </Link>
                            </div>
                            <div className="site-mast-right">
                                <a href="/about" className="site-banner-title">Connect</a>
                            </div>
                        </div>
                        <div className="container">

                            {isHome ?
                                <div><div className="button-container"></div>
                                    <div className="site-banner">
                                        {/* empty div for space */}
                                    </div>
                                    <div className="site-banner">
                                        <a href="/about" className="site-banner-title">About the project</a>
                                    </div>
                                </div>

                                :
                                null}
                            <nav className="site-nav">
                                <div className="site-nav-left">
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
                                <Link to="/">{site.title}</Link>
                            </div>
                            <div className="site-foot-nav-right">
                                <a href="https://metacartel.org">MetaCartel.org</a>
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
