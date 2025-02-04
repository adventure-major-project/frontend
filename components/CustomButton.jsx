'use client'
import Image from "next/image"
import PropTypes from "prop-types"
const CustomButton = ({title,containerStyles,handleClick}) => {
  return (
<button 
disabled={false}
type={"button"}
className={`custom-btn ${containerStyles}`}
onClick={
  handleClick
}
>
    <span className={`flex-1`}>
{title}
    </span>

</button>
  )
}
CustomButton.protoTypes={
  title:PropTypes.string.isRequired,
  containerStyles:PropTypes.string,
  handleClick:PropTypes.func
}

export default CustomButton
