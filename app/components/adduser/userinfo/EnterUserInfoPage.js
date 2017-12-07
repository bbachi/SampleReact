import React from 'react';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import * as addUserActions from '../../../actions/addUserActions';
import { ErrorBox } from '../../common/Error'
import HeadingInfo from './HeadingInfo'
import UserInfo  from './UserInfo'
import AccessPriv from './AccessPriv'
import CommonUtil from '../../common/Util'
import Cancel from '../../common/Cancel'
import FirstName from './FirstName'
import LastName from './LastName'
import UserName from './UserName'
import SapId from './SapId'
import Email from './Email'
import Phone from './Phone'
import AltPhone from './AltPhone'
import Fax from './Fax'

class EnterUserInfoPage extends React.Component {

    constructor(props){
          super(props)

          this.state= {
             user:this.props.addUserObj.user,
             userInfo:{},
             isFormInvalid: undefined,
             errorMessage: "",
             isSapExistError:false,
             isUserExistError:false
          }

          this.verifySapId = this.verifySapId.bind(this)
          this.verifyUsername = this.verifyUsername.bind(this)
          this.onChangeFieldValue = this.onChangeFieldValue.bind(this)
          this.onUserInfoSubmit = this.onUserInfoSubmit.bind(this)
    }

    verifySapId(event){
        console.log(event.target.value)
        this.props.actions.isSapIdExistInSystem(event.target.value)
    }

    verifyUsername(event){
        console.log(event.target.value)
        this.props.actions.isUsernameExistInSystem(event.target.value)
        this.setState({errorMessage:"This username is not available. Please select another user name."})
    }

    onUserInfoSubmit(){
        console.log("on user submit::")
        console.log(this.state.userInfo)
        let userInfo = this.state.userInfo
        if(this.validateUserForm()){
            this.setState({isFormInvalid:false})
            this.props.actions.saveUserInfo(userInfo);
            let userType = this.props.match.params.userType
            const isUserHasAssc = CommonUtil.isUserHasAssociations(userType)
            const isAssociatesAdding = CommonUtil.isAssociatesAdding(userType)
            let toLink = "/admin/adduser/verify"
            if(isAssociatesAdding){
                toLink = "/admin/adduser/verify"
            }else if(isUserHasAssc){
                this.props.actions.deleteCustomerListForAssociteMore();
                toLink = "/admin/adduser/associate"
            }
            this.props.history.push(toLink);
        }else{
            this.setState({isFormInvalid:true})
        }
    }

    validateUserForm(){

        let userInfo = this.state.userInfo
        const showSapId = CommonUtil.showSapId(this.state.user.selection.subUserType)
        if(userInfo.firstName == undefined)return false;
        if(userInfo.lastName == undefined)return false;
        if(userInfo.userName == undefined)return false;
        if(showSapId && userInfo.sapId == undefined)return false;
        if(userInfo.email == undefined)return false;
        if(userInfo.reemail == undefined)return false;
        if(this.state.isSapExistError || this.state.isUserExistError) return false;
        return true;
    }

    onChangeFieldValue(event, name){
        let userInfo = this.state.userInfo
        let val = event.target.value
        if(name == 'fname'){userInfo.firstName = val}
        if(name == 'lname'){userInfo.lastName = val}
        if(name == 'uname'){userInfo.userName = val}
        if(name == 'sapid'){userInfo.sapId = val}
        if(name == 'email'){userInfo.email = val}
        if(name == 'reemail'){userInfo.reemail = val}
        if(name == 'phone'){userInfo.phoneNumber = val}
        if(name == 'extn'){userInfo.extxn = val}
        if(name == 'altphone'){userInfo.altPhoneNumber = val}
        if(name == 'altextn'){userInfo.extxnAlt = val}
        if(name == 'fax'){userInfo.faxNumber = val}
        if(name == 'abletopay'){userInfo.ableToPayBills = val}
        if(name == 'abletoss'){userInfo.ableToStartStopService = val}
        this.setState({userInfo})
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps::"+JSON.stringify(nextProps.isUser))
        console.log(nextProps.isUser.sapId)
        console.log(nextProps.isUser.username)
        if(undefined != nextProps.isUser.sapId) {
            let errMsg = "This SAP ID is asscociated with another user. Please try with a different SAP ID."
            this.setState({isSapExistError:nextProps.isUser.sapId,sapUserExistErrMsg:errMsg})
        }
        if(undefined != nextProps.isUser.username) {
            let errMsg = "This username is not available. Please select another user name."
            this.setState({isUserExistError:!nextProps.isUser.username, userExistErrMsg:errMsg})
        }
    }

    render(){

        const { handleSubmit, addUserObj } = this.props
        let user = addUserObj.user;

        console.log(addUserObj)

        if(!user.selection){
            return <div></div>
        }

        //console.log(fields);
        const showSapId = CommonUtil.showSapId(user.selection.subUserType)
        const ableToAccessPriv = CommonUtil.ableToAccessPriv(user.selection.subUserType)
        const disabledAccessPriv = CommonUtil.disabledAccessPriv(user.selection.subUserType)
        const heading = <h1>User Information</h1>


        return(
            <div>
            <div className="pageHeader">
                {heading}
            </div>
            <div className="box">

            	<div className="boxtitleseperator">&nbsp;</div>
            	<div className="left fullwidth textr hint">*Required Fields</div>
              <ErrorBox message="Please complete required fields." isError={this.state.isFormInvalid}/>
              <HeadingInfo />
              <form>
                  <div className="left fullwidth formBG">
                			<div className="movetitledown left fullwidth mT20">
                        <FirstName onChangeFieldValue={this.onChangeFieldValue}/>
                        <LastName onChangeFieldValue={this.onChangeFieldValue}/>
                      </div>
                      <div className="left fullwidth mT20">
                        <ErrorBox message={this.state.userExistErrMsg} isError={this.state.isUserExistError}/>
                        <ErrorBox message={this.state.sapUserExistErrMsg} isError={this.state.isSapExistError}/>
                        <UserName verifyUsername={this.verifyUsername} onChangeFieldValue={this.onChangeFieldValue}/>
                        {showSapId?<SapId verifySapId={this.verifySapId} onChangeFieldValue={this.onChangeFieldValue}/>:""}
                      </div>
                      <div className="left fullwidth mT20">
                      <Email onChangeFieldValue={this.onChangeFieldValue}/>
                      </div>
                      <div className="left fullwidth smallinputinline mT20">
                          <Phone onChangeFieldValue={this.onChangeFieldValue}/>
                          <AltPhone onChangeFieldValue={this.onChangeFieldValue}/>
                      </div>
                      <div className="left fullwidth smallinputinline mT20">
                          <div className="pL20">
                              <Fax onChangeFieldValue={this.onChangeFieldValue}/>
                          </div>
                      </div>
                      {ableToAccessPriv?<AccessPriv onChangeFieldValue={this.onChangeFieldValue} isDisabled={disabledAccessPriv}/>:''}
                  </div>

                  <div className="handle">
            			    <Cancel />
                    <button className="right controlText-A" type="button" onClick={this.onUserInfoSubmit}>Continue<span></span></button>
                  </div>
                </form>
            </div>
          </div>
        );
      }
}


const submitAndRedirect = (dispatch,values, ownProps) => {
      let userType = ownProps.match.params.userType
      const isUserHasAssc = CommonUtil.isUserHasAssociations(userType)
      const toLink = isUserHasAssc?"/admin/adduser/associate":"/admin/adduser/verify"
      dispatch(addUserActions.saveUserInfo(values));
      ownProps.history.push(toLink);
}

const mapStateToProps = (state, ownProps) => ({addUserObj: state.addUser, isUser: state.isUser})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(addUserActions, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(EnterUserInfoPage);
