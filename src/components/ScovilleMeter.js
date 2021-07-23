import React from "react"
import Img from "gatsby-image"
import GreyScoville from "../images/grey-scoville.png"
import RedScoville from "../images/red-scoville.png"

const ScovilleMeter = ({ value }) => {
  let red = []
  let grey = []
  for (var i = 0; i < value; i++)
    red.push(
      <img
        className="red-scoville-chili"
        src={RedScoville}
        alt="Red Scoville Chili"
      />
    )
  for (var i = 0; i < 5 - value; i++)
    grey.push(
      <img
        className="grey-scoville-chili"
        src={GreyScoville}
        alt="Grey Scoville Chili"
      />
    )

  return (
    <div className="scoville-container">
      {red}
      {grey}
    </div>
  )
}

export default ScovilleMeter
