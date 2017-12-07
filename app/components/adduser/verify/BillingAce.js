import React from 'react'
import CancelSave from './CancelSave'

let BillingAce = (props) => {

    const { forUpdate, selected, isCustomerAdmin } = props
    const { update, cancel, save, fieldName, editing } = forUpdate

    const enableEditing = (editing && (fieldName == 'bace'))

    return(
      <div className="fullwidth left">
        <div className="status-message"></div>
        <div className="label"><label htmlFor="faxNumber">Can pay bills:</label></div>
        <div className={`left secondcolumndata displayed ${enableEditing?'hide':''}`}>
            <div className="data secondcolumndata" id="paybillTxt">
              {selected || isCustomerAdmin?'Yes':'No'}
            </div>
            {!isCustomerAdmin?<div className="right">
              <a className="editClick editing" onClick={() => update('ssace')}>Update</a>
            </div>:''}
        </div>
        <div className={`secondcolumndata left ${enableEditing?'':'editable'}`}>
          <div className="data ">
            <input type="checkbox" id="payBill" name="payBill" />
            <label htmlFor="payBill" className="displayinline">Able to Pay Bills</label>
          </div>
          <CancelSave onUpdate={forUpdate} />
        </div>
      </div>
    )
}

export default BillingAce
