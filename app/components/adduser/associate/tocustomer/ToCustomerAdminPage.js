import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as addUserActions from '../../../../actions/addUserActions';
import Search from './Search'
import { ErrorBox } from '../../../common/Error'
import Processing from '../../../common/Processing'
import SearchResult from './SearchResult'

class ToCustomerAdminPage extends React.Component {

      constructor(props){
          super(props)

          this.state= {
              selection:{searchCriteria:"LN", searchString:""},
              isSearchStrErr: false,
              isProcessing:false,
              showCustAdminTable:false,
              isCustModalOpen:false,
              selectedCustAdmin:undefined,
              errorMessage:"",
              isRadioNotSelected:false
          }

          this.onSearch = this.onSearch.bind(this)
          this.onChangeSearchString = this.onChangeSearchString.bind(this)
          this.onChangeSearchCriteria = this.onChangeSearchCriteria.bind(this)
          this.onCustomerLinkClick = this.onCustomerLinkClick.bind(this)
          this.onCustAdminRadioChange = this.onCustAdminRadioChange.bind(this)
          this.onAssociateToCustAdminBtn = this.onAssociateToCustAdminBtn.bind(this)
          this.toggleModal = this.toggleModal.bind(this)
      }

      onSearch(){
          let selection = this.state.selection
          console.log(selection)
          if(selection.searchString == '' || selection.searchString == undefined){
              this.setState({isSearchStrErr:true,errorMessage:"Please enter search criteria."})
          }else{
              this.setState({isSearchStrErr:false,isProcessing:true,showCustAdminTable:false,errorMessage:""})
              this.props.actions.listCustomers(selection)
          }

      }

      onChangeSearchString(event) {
          let selection = this.state.selection
          selection.searchString = event.target.value
          this.setState({selection})
      }

      onChangeSearchCriteria(event){
          let selection = this.state.selection
          selection.searchCriteria = event.target.value
          this.setState({selection})
          this.setState({showCustAdminTable:false})
      }

      onCustomerLinkClick(admin){
          console.log("admin:::"+admin.userName)
          this.props.actions.listAdminAssociatesCall({userName:admin.userName})
          this.setState({isCustModalOpen:true})
      }

      componentWillReceiveProps(nextProps) {
          this.setState({isProcessing:false,showCustAdminTable:true})
      }

      toggleModal(){
        this.setState({
          isCustModalOpen: !this.state.isCustModalOpen
        });
      }

      onCustAdminRadioChange(e){
          this.setState({selectedCustAdmin:e.target.value, isRadioNotSelected:false})
      }

      onAssociateToCustAdminBtn(userType){
          let selectedCustAdmin = this.state.selectedCustAdmin
          if(selectedCustAdmin == undefined){
              this.setState({isRadioNotSelected:true,errorMessage:"Please Select atleast one Customer Admin."})
          }else{
              this.setState({isRadioNotSelected:false,errorMessage:""})
              console.log(this.state.selectedCustAdmin)
              this.props.actions.saveSelectedAdmin(this.state.selectedCustAdmin);
              this.props.actions.getSelAdminCustomersCall({userName:this.state.selectedCustAdmin})
              this.props.history.push('/admin/adduser/enteruserinfo/'+'EXT_CUS_ASC')
          }
      }

      render(){

          let user = this.props.addUserObj.user

          if(!user){
            return <div></div>
          }

          let selection = user.selection

          const searchOptions = {onSearch:this.onSearch, onChangeSearchCriteria:this.onChangeSearchCriteria, onChangeSearchString:this.onChangeSearchString
                                  ,searchString:this.state.searchString}

          const searchRsltOptions = {searchCriteria:this.state.selection.searchCriteria, custDetails:user.custList, onCustomerLinkClick:this.onCustomerLinkClick,
                                      isCustModalOpen:this.state.isCustModalOpen, toggleModal:this.toggleModal, asscList:this.props.adminAssociates, userType:selection.subUserType,onCustAdminRadioChange:this.onCustAdminRadioChange,
                                        onAssociateToCustAdminBtn:this.onAssociateToCustAdminBtn}

          return(
            <div>
              <div className="pageHeader">
                   <h1>Associate to Customer Admin</h1>
              </div>
            <div className="box">
               
                <div className="boxtitleseperator"></div>
                <ErrorBox message={this.state.errorMessage} isError={this.state.isSearchStrErr || this.state.isRadioNotSelected}/>
                <Search searchOptions={searchOptions}/>
                {this.state.isProcessing?<Processing />:''}
                {this.state.showCustAdminTable?<SearchResult searchRsltOptions={searchRsltOptions} />:''}
            </div>
          </div>
          )
      }
}

const mapStateToProps = (state, ownProps) => ({addUserObj: state.addUser, adminAssociates: state.adminAssociates})
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(addUserActions, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(ToCustomerAdminPage);
