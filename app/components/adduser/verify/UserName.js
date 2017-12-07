import React from 'react'
import CancelSave from './CancelSave'

let UserName = (props) => {

    const { forUpdate, userName } = props
    const { update, cancel, save, fieldName, editing } = forUpdate

    const enableEditing = (editing && (fieldName == 'username'))

    return(
      <div className="left fullwidth">
        <div className="label">
          <label htmlFor="usernameform">UserName:</label>
        </div>
        <div className={`left secondcolumndata displayed ${enableEditing?'hide':''}`}>
            <div className="data secondcolumndata" id="userNameTxt">{userName}</div>
            <div className="right">
              <a className="editClick editing" onClick={() => update('username')}>Update</a>
            </div>
        </div>
        <div className={`secondcolumndata left ${enableEditing?'':'editable'}`}>
            <div className="data">
              <div className="left">
                <label className="normallabel hide" htmlFor="userName">Username</label>
              <input type="text" maxLength="50" value={userName} className="validate[required]" id="userName" name="userN" />
              </div>
            </div>
            <CancelSave onUpdate={forUpdate} />
        </div>
      </div>
    )
}

export default UserName
