import React from 'react'
import CancelSave from './CancelSave'

let Email = (props) => {

    const { forUpdate, email } = props
    const { update, cancel, save, fieldName, editing, onFieldChange } = forUpdate

    const enableEditing = (editing && (fieldName == 'email'))

    return(
      <div className="fullwidth left">
        <div className="status-message"></div>
        <div className="label"><label htmlFor="email">Email:</label></div>
       <div className={`left secondcolumndata displayed ${enableEditing?'hide':''}`}>
         <div className="data secondcolumndata" id="emailTxt">{email}</div>
         <div className="right">
           <a className="editClick editing" onClick={() => update('email')}>Update</a>
         </div>
       </div>
       <div className={`secondcolumndata left ${enableEditing?'':'editable'}`}>
         <div className="data ">
           <input type="text" maxLength="80" value={email} onChange={(e) => onFieldChange(e,'email')} className="validate[required,custom[email]]" id="email" name="emailId" />
         </div>
         <CancelSave onUpdate={forUpdate} />
       </div>
     </div>
    )
}

export default Email
