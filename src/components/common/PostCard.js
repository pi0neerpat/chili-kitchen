import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Img from "gatsby-image"
// import Img from "gatsby-image";
import CookingTime from "../../images/clock-regular.svg";
import Servings from "../../images/user-solid.svg";
import ScovilleMeter from "../ScovilleMeter";


const PostCard = ({ post }) => {
    const url = `${post.slug}/`

    return (
        <Link to={url} className="post-card">
            <header className="post-card-header">
                {post.image ? (
                    <Img
                        className="post-card-image"
                        fluid={post.image.node.childImageSharp.fluid}
                    />
                ) : (
                    <div className="post-card-image" />
                )}
                <h2 className="post-card-title">{post.name}</h2>
            </header>
            <section className="post-card-tags">
                <div>
                    <img
                        className="post-card-tag-icon"
                        alt="Servings"
                        src={Servings}
                    />{` `}
                    {post.servings}
                </div>
                <div>
                    <img
                        className="post-card-tag-icon"
                        alt="Cooking time"
                        src={CookingTime}
                    />{` `}
                    {post.cookingTime}{` `}
                </div>
                <div>
                    <ScovilleMeter />
                </div>
            </section>
            <footer className="post-card-footer">
                <div className="post-card-footer-left"></div>
                <div className="post-card-footer-right"></div>
            </footer>
        </Link>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.object,
        description: PropTypes.string.isRequired,
    }).isRequired,
}

export default PostCard
