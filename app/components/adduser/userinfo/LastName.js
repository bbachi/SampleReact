import React from 'react'

let LastName = props => {

    const { onChangeFieldValue } = props

    return(
      <div className="left">
          <div className="fullwidth nomargininherit">
            <div className="left">
              <label htmlFor="lastName">Last Name</label></div>
            <div className="left">*</div>
          </div>
          <div className="left fullwidth">
            <input name="lastName" maxLength="50" onChange={(e) => onChangeFieldValue(e,'lname')} type="text"/>
          </div>
       </div>
    )
}

export default LastName
