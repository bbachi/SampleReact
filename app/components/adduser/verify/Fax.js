import React from 'react'
import CancelSave from './CancelSave'
import CommonUtil from '../../common/Util'

let Fax = (props) => {

    const { forUpdate, fax } = props
    const { update, cancel, save, fieldName, editing } = forUpdate

    const enableEditing = (editing && (fieldName == 'fax'))

    const phoneDisplay = CommonUtil.getPhoneDisplay(fax, undefined)

    return(
      <div className="fullwidth left">
        <div className="status-message"></div>
          <div className="label"><label htmlFor="faxNumber">Fax:</label></div>
          <div className={`left secondcolumndata displayed ${enableEditing?'hide':''}`}>
            <div className="data secondcolumndata" id="faxNumberTxt">
              {phoneDisplay}
            </div>
            <div className="right">
              <a className="editClick editing" onClick={() => update('fax')}>Update</a>
            </div>
          </div>
          <div className={`secondcolumndata left ${enableEditing?'':'editable'}`}>
            <div className="data ">
              <input type="text" maxLength="10" value={fax} id="faxNumber" name="faxN" placeholder="(___) xxx-xxxx" className="validate[custom[phoneNumberDigits]]" />
            </div>
            <CancelSave onUpdate={forUpdate} />
          </div>
      </div>
    )
}

export default Fax
