import React from 'react'

let FirstName = props => {

    const { onChangeFieldValue } = props

    return(
      <div className="left rightcolumnwrapper">
          <div className="fullwidth nomargininherit">
            <div className="left">
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="left">*</div>
          </div>
          <div className="left fullwidth">
              <input name="firstName" maxLength="50" onChange={(e) => onChangeFieldValue(e,'fname')} type="text"/>
          </div>
      </div>
    )
}

export default FirstName
