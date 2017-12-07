import React from 'react'

let RightButton = (props) => {

    const { text, onClickFunc } = props

    return(
      <div className="handle">
           <button className="right controlText-A" onClick={onClickFunc} type="button">{text}<span></span></button>
      </div>
    )
}

export default RightButton
