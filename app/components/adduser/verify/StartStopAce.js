import React from 'react'
import CancelSave from './CancelSave'

let StartStopAce = (props) => {

    const { forUpdate,selected,isCustomerAdmin } = props
    const { update, cancel, save, fieldName, editing } = forUpdate

    const enableEditing = (editing && (fieldName == 'ssace'))

    return(
      <div className="fullwidth left">
        <div className="status-message"></div>
        <div className="label"><label htmlFor="faxNumber">Can Start / Stop Service:</label></div>
        <div className={`left secondcolumndata displayed ${enableEditing?'hide':''}`}>
            <div className="data secondcolumndata" id="stopServiceTxt">
              {selected || isCustomerAdmin?'Yes':'No'}
            </div>
            {!isCustomerAdmin?<div className="right">
              <a className="editClick editing" onClick={() => update('ssace')}>Update</a>
              </div>:''}
        </div>
        <div className={`secondcolumndata left ${enableEditing?'':'editable'}`}>
          <div className="data ">
            <input type="checkbox" id="startServ" name="startServ" />
            <label htmlFor="startServ" className="displayinline">Able to Start / Stop Service</label>
          </div>
          <CancelSave onUpdate={forUpdate} />
        </div>
      </div>
    )
}

export default StartStopAce
