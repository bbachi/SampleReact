import React from 'react'

let AltPhone = props => {

    const { onChangeFieldValue } = props

    return(
      <div className="left">
        <label htmlFor="altPhoneNumber">Alt Phone </label>
        <p className="noformmargin">
          <span className="twotextboxes">
            <input name="altPhoneNumber" maxLength="10" placeholder="(___) xxx-xxxx" onChange={(e) => onChangeFieldValue(e,'altphone')} type="text"/>
          <input name="extxnAlt" maxLength="4" placeholder="xxxx" onChange={(e) => onChangeFieldValue(e,'altextn')} type="text" className="subinput aLM"/>
          </span>
        </p>
      </div>
    )
}

export default AltPhone
