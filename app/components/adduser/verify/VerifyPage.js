import React from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as addUserActions from '../../../actions/addUserActions';
import ReadOnlyField from './ReadOnlyField'
import Name from './Name'
import UserName from './UserName'
import Email from './Email'
import Phone from './Phone'
import AltPhone from './AltPhone'
import Fax from './Fax'
import BillingAce from './BillingAce'
import StartStopAce from './StartStopAce'
import Cancel from '../../common/Cancel'
import CommonUtil from '../../common/Util'
import Associations from './associations/Associations'
import * as _ from 'lodash'

class VerifyPage extends React.Component {

    constructor(props) {
        super(props)

        let user = Object.assign({}, this.props.addUserObj.user)
        this.state = {
            user:user,
            editing:false,
            fieldName:"",
            updateSuccess: false,
            securityRole:user.selection.subUserType,
            custList: user.customerList,
            selAdminCustList: user.selAdminAsscList
        }

        this.onCancel = this.onCancel.bind(this)
        this.onUpdateField = this.onUpdateField.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onFinish = this.onFinish.bind(this)
        this.onDiassociateCustomers = this.onDiassociateCustomers.bind(this)
        this.onManagementCBox = this.onManagementCBox.bind(this)
        this.onRegionCBox = this.onRegionCBox.bind(this)
        this.onPropertyCBox = this.onPropertyCBox.bind(this)
        this.onAssociateMoreCustomers = this.onAssociateMoreCustomers.bind(this)
        this.onPropAccesspriv = this.onPropAccesspriv.bind(this)
        this.onFieldChange = this.onFieldChange.bind(this)
    }


    onUpdateField(field) {
      if(field == 'email'){

      }
      this.setState({editing:true,fieldName:field,updateClicked:true});
    }

    onFieldChange(e, field){
        let user = _.cloneDeep(this.state.user);
        if(field == 'email'){user.userInfo.email = e.target.value;}
        this.setState({user})
    }

    onSave(field){
      console.log('cancel field:::clicked::'+field);
      this.setState({editing:false,saveClicked:true});
    }

    onCancel(field){
      console.log('cancel field:::clicked::'+field);
      this.setState({editing:false,cancelClicked:true});
    }

    onFinish(){
        let user = _.cloneDeep(this.state.user);
        if(this.state.securityRole == 'EXT_BRK_ASC'){
            user.selAdminAsscList = this.state.selAdminCustList
        }else{
            user.customerList = this.state.custList
        }
        this.props.actions.saveUserInfoToDB(user);
        this.props.history.push('/admin/adduser/confirm');
    }

    onManagementCBox(e){
        let custList = _.cloneDeep(this.state.custList);
        this.setState({custList:CommonUtil.onManagementCBoxOnVerify(custList,e.target.value)})
    }

    onRegionCBox(e){
        let custList = _.cloneDeep(this.state.custList);
        this.setState({custList:CommonUtil.onRegionCBoxOnVerify(custList,e.target.value)})
    }

    onPropertyCBox(e){
        let custList = _.cloneDeep(this.state.custList);
        let securityRole = this.state.securityRole
        this.setState({custList:CommonUtil.onPropertyCBoxOnVerify(custList,e.target.value,securityRole)})
    }

    onAssociateMoreCustomers(){
        this.props.actions.saveCustomerListForAssociteMore(this.state.custList);
        this.props.history.push("/admin/adduser/associate")
    }

    onDiassociateCustomers(){
        let custList = _.cloneDeep(this.state.custList);
        custList.forEach(mng => {
            mng.selected = (mng.verifySelected)?(!mng.verifySelected):mng.selected
            mng.regionList.forEach(rgn => {
                rgn.selected = (rgn.verifySelected)?(!rgn.verifySelected):rgn.selected
                rgn.propertyList.forEach(prop => {
                    prop.selected = (prop.verifySelected)?(!prop.verifySelected):prop.selected
                })
            })
        })
        this.setState({custList})
        if(!CommonUtil.isCustomerSelected(custList)){
            this.props.history.push("/admin/adduser/associate")
        }
    }

    /*
      This method only for Borker and Broker associates.
     */
    onPropAccesspriv(privType, e){
        let securityRole = this.state.securityRole;
        console.log(securityRole)
        if(securityRole == 'EXT_BRK_ASC'){
            let selAdminList = _.cloneDeep(this.state.selAdminCustList)
            selAdminList.forEach(mng => {
              mng.regionList.forEach(rgn => {
                  rgn.propertyList.forEach(prop => {
                      if(prop.bpNumber == e.target.value){
                          prop.startStopAce = (privType == 'S')?(e.target.checked?'Y':'N'):prop.startStopAce;
                          prop.billingAce = (privType == 'B')?(e.target.checked?'Y':'N'):prop.billingAce;
                      }
                  })
              })
            })
            this.setState({selAdminCustList:selAdminList})
        }else{
          let customerList = _.cloneDeep(this.state.custList);
          customerList.forEach(mng => {
              mng.regionList.forEach(rgn => {
                  rgn.propertyList.forEach(prop => {
                      if(prop.bpNumber == e.target.value){
                          prop.startStopAce = (privType == 'S')?(e.target.checked?'Y':'N'):prop.startStopAce;
                          prop.billingAce = (privType == 'B')?(e.target.checked?'Y':'N'):prop.billingAce;
                      }
                  })
              })
          })
          this.setState({custList:customerList})
        }


    }

    render(){

        if(!this.state.user){
          return <div></div>
        }

        const heading = <h1>Add User - Verification</h1>

        const updateFields = {update:this.onUpdateField,save:this.onSave,cancel:this.onCancel,onFieldChange:this.onFieldChange,
                              fieldName:this.state.fieldName,editing:this.state.editing,updateSuccess:this.state.updateSuccess}

        const user = this.state.user
        let userInfo = user.userInfo
        let selection = user.selection
        let custList = this.state.custList
        let selAdminAsscList = this.state.selAdminCustList

        const intOrExt = selection.userType == 'internal'?'Internal':'External';
        const securityRole = selection.subUserType;
        const isUserHasAssoications = CommonUtil.isUserHasAssociations(securityRole)
        const isAssociatesAdding = CommonUtil.isAssociatesAdding(securityRole)
        const isCustomerAdmin = CommonUtil.isUserCustomerAdmin(securityRole)

        const tableRsltOptns = {custList:custList,securityRole:securityRole,onManagementCBox:this.onManagementCBox,onRegionCBox:this.onRegionCBox,
                              onPropertyCBox:this.onPropertyCBox, selAdminAsscList:selAdminAsscList, onAssociateMoreCustomers: this.onAssociateMoreCustomers, onPropAccesspriv: this.onPropAccesspriv}

        return(
        <div>
            <div className="pageHeader">
                     {heading}
            </div>
          <div className="box">
            <form name="verifyInfo" id="verifyInfo" className="contenttitleseperator">

                <div className="boxtitleseperator">&nbsp;</div>
                <ReadOnlyField label="Internal/External" value={intOrExt}/>
                <ReadOnlyField label="Security Role" value={CommonUtil.getSecurityRoleDisplayName(securityRole)}/>
                {CommonUtil.showUserType(securityRole)?<ReadOnlyField label="User Type" value={CommonUtil.getUserTypeDisplayName(selection.subUserType)}/>:""}
                <Name forUpdate={updateFields} firstName={userInfo.firstName} lastName={userInfo.lastName}/>
                <UserName forUpdate={updateFields} userName={userInfo.userName}/>
                <Email forUpdate={updateFields} email={userInfo.email}/>
                <Phone forUpdate={updateFields} phone={userInfo.phoneNumber} extn={userInfo.extxn}/>
                <AltPhone forUpdate={updateFields} altPhone={userInfo.altPhoneNumber} extn={userInfo.extxnAlt}/>
                <Fax forUpdate={updateFields} fax={userInfo.faxNumber}/>
                {CommonUtil.ableToAccessPriv(securityRole)?
                  [<BillingAce forUpdate={updateFields} isCustomerAdmin={isCustomerAdmin} selected={userInfo.ableToPayBills}/>,
                  <StartStopAce forUpdate={updateFields} isCustomerAdmin={isCustomerAdmin} selected={userInfo.ableToStartStopService}/>]:''}
            </form>
            <div className="hr">&nbsp;</div>
            {isUserHasAssoications?<Associations tableRsltOptns={tableRsltOptns} />:''}
            <div className="handle">
					      <Cancel />
                {isUserHasAssoications && !CommonUtil.isUserBroker(securityRole) && !isAssociatesAdding?<button name="disAsstUserBtn" onClick={this.onDiassociateCustomers} className="left controlText-B modal1 moreLeftSpace" type="button">Disassociate Customers</button>:''}
                <button type="button" id="userinfoctnbtn" onClick={this.onFinish} className="right controlText-A">Finish<span></span></button>
				    </div>
          </div>
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({addUserObj: state.addUser})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(addUserActions, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPage);
