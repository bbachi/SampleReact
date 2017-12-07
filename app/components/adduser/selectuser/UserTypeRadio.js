import React from 'react'
import UserTypeModal from './UserTypeModal'
import Modal from '../../common/Modal'

let UserTypeRadio = (props) => {

    const { forModal, userType, value, onUserTypeChange } = props

    return(
      <div>
          <input type="radio" id={value} onClick={onUserTypeChange} className="validate[reqRadio[1]]" name="intCustType" value={value} />
          <label htmlFor={value} className="displayinline">
          <a href="#" onClick={() => forModal.toggleModal(userType)} className="modal1">{userType}</a></label>

      </div>
    )
}

export default UserTypeRadio
