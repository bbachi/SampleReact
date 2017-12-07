import React from 'react'
import CancelSave from './CancelSave'

let Name = (props) => {

    const { forUpdate, firstName, lastName } = props
    const { update, cancel, save, fieldName, editing } = forUpdate

    const enableEditing = (editing && (fieldName == 'name'))

    return(
      <div className="left fullwidth">
          <div className="label">
            <label htmlFor="firstnameDisplay">Name:</label>
          </div>
          <div className={`left secondcolumndata displayed ${enableEditing?'hide':''}`}>
            <div className="data secondcolumndata" id="fullname">{firstName}  {lastName}</div>
            <div className="right">
              <a className="editClick editing" onClick={() => update('name')}>Update</a>
            </div>
          </div>
          <div className={`secondcolumndata left ${enableEditing?'':'editable'}`}>
            <div className="data">
              <div className="left fullwidth">
                <div className="left fullwidth">
                  <label className="textlabel" htmlFor="firstName">First Name</label><span>*</span>
                </div>
                <div className="left fullwidth">
                  <input type="text" maxLength="50" value={firstName} className="validate[required] filterAlpha" id="firstName" name="firstN" />
                </div>
              </div>
              <div className="left">
                <div className="left fullwidth">
                  <label className="textlabel" htmlFor="lastName">Last Name</label><span>*</span>
                </div>
                <div className="left fullwidth">
                  <input type="text" maxLength="50" value={lastName} className="validate[required] filterAlpha" id="lastName" name="lastN" />
                </div>
              </div>
            </div>
            <CancelSave onUpdate={forUpdate} />
          </div>
      </div>
    )
}

export default Name
