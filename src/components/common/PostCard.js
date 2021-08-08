import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Img from "gatsby-image"
// import Img from "gatsby-image";
import CookingTime from "../../images/clock-regular.svg"
import Servings from "../../images/user-solid.svg"
import ScovilleMeter from "../ScovilleMeter"

const PostCard = ({ post }) => {
  const url = `${post.slug}/`

  return (
    <div className="nes-container is-rounded">
      <Link to={url} className="post-card">
        <div className="nes-card">
          <header className="post-card-header">
            <h2 className="post-card-title">{post.name}</h2>
            <h5 className="post-card-title">{post.farmName}</h5>
            {post.image ? (
              <Img
                style={{ maxWidth: 500 }}
                className="image"
                fluid={post.image.node.childImageSharp.fluid}
              />
            ) : (
              <div className="post-card-image" />
            )}
          </header>
          <section className="post-card-tags">
            {/*
        // TODO: Number of farmers    
        <div>
          <img className="post-card-tag-icon" alt="Servings" src={Servings} />
          {` `}
          {post.servings}
        </div>*/}

            <ScovilleMeter value={post.scoville} />
          </section>
          <footer className="post-card-footer">
            <div className="post-card-footer-left"></div>
            <div className="post-card-footer-right"></div>
          </footer>
        </div>
      </Link>
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    scoville: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.object,
    description: PropTypes.string.isRequired,
  }).isRequired,
}

export default PostCard
