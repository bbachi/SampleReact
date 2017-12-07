import React from 'react'

let Phone = props => {

    const { onChangeFieldValue } = props

    return(
      <div className="left rightcolumnwrapper">
          <label htmlFor="phoneNumber">Phone</label>
          <p className="noformmargin">
            <span className="twotextboxes">
                <input name="phoneNumber" maxLength="10" placeholder="(___) xxx-xxxx" onChange={(e) => onChangeFieldValue(e,'phone')} type="text"/>
                <input name="extxn" maxLength="4" placeholder="xxxx" onChange={(e) => onChangeFieldValue(e,'extn')} type="text" className="subinput aLM"/>
            </span>
          </p>
        </div>
    )
}

export default Phone
