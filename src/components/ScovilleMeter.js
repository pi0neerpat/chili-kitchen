import React from "react"
import Img from "gatsby-image";
import GreyScoville from "../images/grey-scoville.png"
import RedScoville from "../images/red-scoville.png"

const ScovilleMeter = () => (
	<div className="scoville-container">
		<img className="red-scoville-chili" src={RedScoville} alt="Red Scoville Chili" />
		<img className="red-scoville-chili" src={RedScoville} alt="Red Scoville Chili" />
		<img className="red-scoville-chili" src={RedScoville} alt="Red Scoville Chili" />
		<img className="red-scoville-chili" src={RedScoville} alt="Red Scoville Chili" />
		<img className="grey-scoville-chili" src={GreyScoville} alt="Grey Scoville Chili" />
	</div>
)

export default ScovilleMeter;