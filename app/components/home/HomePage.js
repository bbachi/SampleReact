import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as loginActions from '../../actions/loginActions';
import { bindActionCreators } from 'redux';
import { ErrorBox } from '../common/Error'

class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user:{empSapID: "932323",bpNumber:"6017131546",isValid:false},
            isBackendCalled:false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEmpSapIdChange = this.onEmpSapIdChange.bind(this);
        this.onBPNumberChange = this.onBPNumberChange.bind(this);
    }

    handleSubmit(){
        let user = Object.assign({}, this.state.user);
        if(user.empSapID != ''){
            this.props.actions.getUserDetails(this.state.user.empSapID);
        }else{
            this.setState({isError:true})
        }
    }

    onEmpSapIdChange(event){
        const user = this.state.user;
        user.empSapID = event.target.value;
        this.setState({user:user});
    }

    onBPNumberChange(event){
        const user = this.state.user;
        user.bpNumber = event.target.value;
        this.setState({user:user});
    }

    componentWillReceiveProps(nextProps) {
        console.log("{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}")
        console.log(nextProps.validUser)
        if(this.props.validUser != nextProps.validUser){
            let userValidated  = nextProps.validUser.isUserValid
            let redirectLink = (userValidated)?'/admin/overview':'/error/invalidSapid/' + "invalidSapId"
            this.props.history.push(redirectLink)
        }else{
            console.log("NOT A VALID REQUEST::::"+nextProps)
        }
  	}


    render(){

        return (
            <div className="loginbox">
              <h1>Simplesource Admin</h1>
                <form>
                    <ErrorBox message="Please enter valid sap id." isError={this.state.isError}/>
                    <label htmlFor="SAP_ID" >EMP SAP ID</label>
                    <input type="text" maxLength="10" name="empSapId" onChange={this.onEmpSapIdChange} value={this.state.user.empSapID}/><br/>
                    <label htmlFor="BP NUMBER">BP NUMBER</label>
                    <input type="text" maxLength="10" name="bpNumber" onChange={this.onBPNumberChange} value={this.state.user.bpNumber}/>
                    <div id="continuebtn">
                        <button onClick={this.handleSubmit} className="boxmarginright myaccount-btn" type="button">Submit</button>
                    </div>
                </form>
	        </div>
        );
    }
}

HomePage.prototypes = {
    actions: PropTypes.object.isRequired,
    validUser: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({validUser: state.userLogin})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(loginActions, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
