import React from 'react'

let SapId = props => {

    const { verifySapId, onChangeFieldValue } = props

    return(
      <div className="left">
          <div className="fullwidth nomargininherit">
            <div className="left">
              <label htmlFor="sapId">SAP ID</label>
            </div>
            <div className="left">*</div>
          </div>
          <div className="left fullwidth">
              <input name="sapId" maxLength="10" onBlur={verifySapId} onChange={(e) => onChangeFieldValue(e,'sapid')} type="text" className="morewidth size200"/>
          </div>
      </div>
    )
}

export default SapId
