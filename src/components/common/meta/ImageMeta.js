import React from "react"
import Helmet from "react-helmet"
import PropTypes from "prop-types"
import config from "../../../utils/siteConfig"

const ImageMeta = ({ image }) => {
  if (!image) {
    return null
  }

  return (
    <Helmet>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:title" content={config.siteTitleMeta} />
      <meta property="og:image" content={image} />
      <meta
        data-react-helmet="true"
        name="twitter:description"
        content={config.siteDescriptionMeta}
      />
    </Helmet>
  )
}

ImageMeta.propTypes = {
  image: PropTypes.string,
}

export default ImageMeta
