import React from 'react'

let Email = props => {

    const { onChangeFieldValue } = props

    return(
      <div className="left fullwidth">
        <div className="left rightcolumnwrapper">
          <div className="fullwidth nomargininherit">
            <div className="left">
              <label htmlFor="email">Email</label>
            </div>
            <div className="left">*</div>
          </div>
          <div className="left fullwidth">
              <input name="email" maxLength="80" placeholder="smith@email.com" onChange={(e) => onChangeFieldValue(e,'email')} type="text" className="morewidth size200"/>
          </div>
        </div>
        <div className="left ">
          <div className="fullwidth nomargininherit">
            <div className="left">
              <label htmlFor="reemail">Retype Email</label></div>
            <div className="left">*</div>
          </div>
          <div className="left fullwidth">
              <input name="reemail" maxLength="80" placeholder="smith@email.com" onChange={(e) => onChangeFieldValue(e,'reemail')} autoComplete="off" type="text" className="morewidth size200"/>
          </div>
        </div>
    </div>
    )
}

export default Email
