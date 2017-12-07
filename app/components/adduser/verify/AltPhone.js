import React from 'react'
import CancelSave from './CancelSave'
import CommonUtil from '../../common/Util'

let AltPhone = (props) => {

    const { forUpdate, altPhone, extn } = props
    const { update, cancel, save, fieldName, editing } = forUpdate

    const enableEditing = (editing && (fieldName == 'altphone'))

    const phoneDisplay = CommonUtil.getPhoneDisplay(altPhone,extn)

    return(
      <div className="fullwidth left">
        <div className="status-message"></div>
        <div className="label"><label htmlFor="altPhoneNumber">Alt Phone:</label></div>
        <div className={`left secondcolumndata displayed ${enableEditing?'hide':''}`}>
          <div className="data secondcolumndata" id="altPhoneNumberTxt">
            {phoneDisplay}
          </div>
          <div className="right">
            <a className="editClick editing" onClick={() => update('altphone')}>Update</a>
          </div>
        </div>
        <div className={`widthSixtyFive left ${enableEditing?'':'editable'}`}>
          <div className="data">
            <p className="nomargin">
              <span className="twotextboxes">
                <input type="text" maxLength="10" value={altPhone} id="altPhoneNumber" name="altPhoneN" placeholder="(___) xxx-xxxx" className="validate[custom[phoneNumberDigits]]" />
                <label htmlFor="extnAlt" className="textlabel">extn</label>
              <input type="text" maxLength="4" value={extn}  id="extnAlt" name="extnAlt" className="subinput validate[funcCall[phoneExtnNumber]] confField[altPhoneNumber]" />
              </span>
            </p>
          </div>
          <CancelSave onUpdate={forUpdate} />
        </div>
      </div>
    )
}

export default AltPhone
