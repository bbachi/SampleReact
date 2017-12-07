import React from 'react'

let SubTypeRadio = (props) => {

    const { enableSubType, onSubUserTypeChange, forModal } = props
    const disabled = enableSubType?'':'disabled'

    return(
      <div>
          <input type="radio" id={props.value} className="agntClass" id="emm" onClick={onSubUserTypeChange} name="intCustType" value={props.value} disabled={disabled} />
          <label htmlFor={props.value} className="displayinline agntClass">
            <a href="#" onClick={() => forModal.toggleModal(props.userType)} className="modal3">{props.userType}</a>
          </label>
      </div>
    );
}

export default SubTypeRadio
