import React from 'react'
import UserTypeRadio from './UserTypeRadio'
import SubTypeRadio from './SubTypeRadio'

let UserTypes = (props) => {

  const { typeUsers,forModal, onUserTypeChange, onSubUserTypeChange, enableSubType,dontShowExtReadOnly } = props

  let types = typeUsers.map((userType,index) => {
    if(userType.subTypes.length == 0){
        if(userType.value == 'EXT_READ_ONLY'){
            if(dontShowExtReadOnly) return '';
        }
        return(<UserTypeRadio key={userType.value} forModal={forModal} value={userType.value} userType={userType.userType} onUserTypeChange={onUserTypeChange}/>)
      }else{
        return(
            <div key={userType.value}>
                <UserTypeRadio forModal={forModal} key={userType.value} value={userType.value} userType={userType.userType} onUserTypeChange={onUserTypeChange}/>
                <div id="agentTypes" className="marginlefttwenty">
                    {userType.subTypes.map((subType, index) => <SubTypeRadio key={subType.value} forModal={forModal} value={subType.value} userType={subType.userType} onSubUserTypeChange={onSubUserTypeChange} enableSubType={enableSubType}/>)}
                </div>
            </div>
          )
      }
    });
    return(
        <div id="internalTypes"  className="marginlefttwenty">
            {types}
        </div>
    );
}

export default UserTypes
