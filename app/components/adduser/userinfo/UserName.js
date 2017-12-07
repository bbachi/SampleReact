import React from 'react'
import { Field } from 'redux-form'

let UserName = props => {

    const { verifyUsername, onChangeFieldValue } = props

    return(
      <div>
        <div id="validateusernameerrormessage" className="status-message hide"></div>
        <div id="sapiderrormessage" className="status-message hide"></div>
        <div className="left rightcolumnwrapper">
          <div className="fullwidth nomargininherit">
              <div className="left">
                <label htmlFor="userName">Username</label>
              </div>
              <div className="left">*</div>
            </div>
            <div className="left fullwidth">
                <input name="userName" maxLength="50" onBlur={verifyUsername} onChange={(e) => onChangeFieldValue(e,'uname')} type="text"/>
            </div>
        </div>
      </div>
    )
}

export default UserName
