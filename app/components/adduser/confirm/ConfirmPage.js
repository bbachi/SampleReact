import React from 'react';
import { connect } from 'react-redux'
import FieldName from './FieldName'
import CommonUtil from '../../common/Util'
import { ErrorBox } from '../../common/Error'
import Associations from './associations/Associations'

class ConfirmPage extends React.Component {

    constructor(props){
        super(props)
    }

    render(){

        if(!this.props.addUserObj.user.confirmation){
          return <div></div>
        }

        const user = this.props.addUserObj.user
        let userInfo = user.userInfo
        let custList = user.customerList
        let selection = user.selection
        let selAdminAsscList = user.selAdminAsscList
        let confirmation = user.confirmation

        const intOrExt = selection.userType == 'internal'?'Internal':'External';
        const securityRole = selection.subUserType;
        const isUserHasAssoications = CommonUtil.isUserHasAssociations(securityRole)
        const isCustomerAdmin = CommonUtil.isUserCustomerAdmin(securityRole)
        const name = userInfo.firstName+' '+userInfo.lastName
        const phone = CommonUtil.getPhoneDisplay(userInfo.phoneNumber,userInfo.extxn)
        const altPhone = CommonUtil.getPhoneDisplay(userInfo.altPhoneNumber,userInfo.extxnAlt)
        const fax = CommonUtil.getPhoneDisplay(userInfo.faxNumber,undefined)

        const heading = <h1>Add User - Confirmation</h1>

        const userSuccess = (confirmation) => {

            if(!confirmation.error){
               return(
                   <div>
                     <div className="boxtitleseperator">&nbsp;</div>
                     <div>
                       <p>The user was successfully added to the system. Please print this page for your records. An email has been sent to the user that contains their username and a link to create a password to log onto the system.</p>
                     </div>
                     <div className="movetitledown"><h3>Request Details</h3></div>
                     <FieldName label="Submitted on" value={confirmation.transDateAndTime}/>
                     <FieldName label="Transaction number" value={confirmation.transactionNumber}/>
                   </div>
               )
            }else{
              console.log("in erro")
               return(
                  <ErrorBox message="Unable to add user at this time. please try again." isError={true}/>
               )
            }
        }


        return(
        <div>
                <div className="pageHeader">
                        {heading}
                </div>
          <div className="box">

            {userSuccess(confirmation)}
            <FieldName label="Internal/External" value={intOrExt}/>
            <FieldName label="Security Role" value={CommonUtil.getSecurityRoleDisplayName(securityRole)}/>
            {CommonUtil.showUserType(securityRole)?<FieldName label="User Type" value={CommonUtil.getUserTypeDisplayName(selection.subUserType)}/>:""}
            <FieldName label="Name" value={name}/>
            <FieldName label="Username" value={userInfo.userName}/>
            <FieldName label="Email" value={userInfo.email}/>
            <FieldName label="Phone Number" value={phone}/>
            <FieldName label="Alt Phone Number" value={altPhone}/>
            <FieldName label="Fax Number" value={fax} />
            {!CommonUtil.isUserBroker(securityRole)?
              [<FieldName label="Can pay bills" value={userInfo.ableToPayBills || isCustomerAdmin?'Yes':'No'}/>,
              <FieldName label="Can Start / Stop Service" value={userInfo.ableToStartStopService || isCustomerAdmin?'Yes':'No'}/>]
              :''}
            <div className="hr">&nbsp;</div>
            {isUserHasAssoications?<Associations securityRole={securityRole} custList={custList} selAdminAsscList={selAdminAsscList}/>:''}
          </div>
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({addUserObj: state.addUser})
export default connect(mapStateToProps, null)(ConfirmPage);
