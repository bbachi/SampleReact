import React from 'react'
import CancelSave from './CancelSave'
import CommonUtil from '../../common/Util'

let Phone = (props) => {

    const { forUpdate, extn, phone } = props
    const { update, cancel, save, fieldName, editing } = forUpdate

    const enableEditing = (editing && (fieldName == 'phone'))

    const phoneDisplay = CommonUtil.getPhoneDisplay(phone,extn)

    return(
      <div className="fullwidth left">
        <div className="status-message"></div>
        <div className="label"><label htmlFor="phoneNumber">Phone:</label></div>
        <div className={`left secondcolumndata displayed ${enableEditing?'hide':''}`}>
          <div className="data secondcolumndata" id="phoneNumberTxt">
              {phoneDisplay}
          </div>
          <div className="right">
            <a className="editClick editing" onClick={() => update('phone')}>Update</a>
          </div>
        </div>
        <div className={`widthSixtyFive left ${enableEditing?'':'editable'}`}>
          <div className="data ">
            <p className="nomargin">
              <span className="twotextboxes">
                <input type="text" maxLength="10" value={phone} className="validate[custom[phoneNumberDigits]]" id="phoneNumber" name="phoneN" placeholder="(___) xxx-xxxx" />
                <label htmlFor="extn" className="textlabel">extn</label>
                <input type="text" maxLength="4" value={extn}  id="extn" name="extn" className="subinput validate[funcCall[phoneExtnNumber]] confField[phoneNumber]" />
              </span>
            </p>
          </div>
          <CancelSave onUpdate={forUpdate} />
        </div>
    </div>
    )
}

export default Phone
