import React from 'react'
import Modal from '../../../common/Modal'
import AssociatesModal from '../../../common/AssociatesModal'
import RightButton from '../../../common/RightButton'
import { ErrorBox } from '../../../common/Error'
import BPInfo from './BPInfo'

let SearchResult = (props) => {

      const { searchRsltOptions } = props
      const { custDetails, errorMessage, searchCriteria, onCustomerLinkClick, toggleModal, isCustModalOpen,
              asscList, userType, onCustAdminRadioChange, onAssociateToCustAdminBtn } = searchRsltOptions


      if(undefined == custDetails.adminList || custDetails.adminList.length == 0){
          const errorMessage = (searchCriteria == 'BP')?"Customer admin with entered BP number doesn't exist. Please try with a different BP Number."
                      :"Customer admin with entered last name doesn't exist. Please try with a different last name."
          return(
            <ErrorBox message={errorMessage} isError={true}/>
          )
      }

      const TableHeader = <thead>
                            <tr>
                                <th className="unst"></th>
                                <th className="unst">First Name</th>
                                <th className="unst">Last Name</th>
                                <th className="unst">Username</th>
                              {searchCriteria != 'BP'?<th className="unst">Customer</th>:''}
                            </tr>
                        </thead>


      const CustomerRow = (user,index) => {

                            return(
                                <tr key={user.userName} className={index%2 == 0?'odd':'even'}>
                                    <td className="textc"><input type="radio" onChange={onCustAdminRadioChange} name="selAdmin" value={user.userName}/></td>
                                    <td><label className="textlabel">{user.firstName}</label></td>
                                    <td>{user.lastName}</td>
                                  <td><a href="#" onClick={() => onCustomerLinkClick(user)} className="modal1">{user.userName}</a></td>
                                    {searchCriteria != 'BP'?<td>{user.businessName}</td>:''}
                                </tr>
                            )
                        }

      const customerTable = custDetails.adminList.map((user,index) => CustomerRow(user,index))

      return(
          <div>
              {searchCriteria == 'BP'?<BPInfo bpName={custDetails.bpName} bpAddress={custDetails.bpAddress}/>:''}
              <div className="left fullwidth" id="userTbl" >
                  <div className="left fullwidth contenttitleseperator"></div>
                  <Modal show={isCustModalOpen} onClose={toggleModal}>
                      <AssociatesModal asscList={asscList} userType={userType}/>
                  </Modal>
                  <div className="left fullwidth movetitledown">
                      <table id="esitable" className="tdsn dottedtdsn tablepagination tablesorter">
                          {TableHeader}
                          <tbody id="transTbody">
                              {customerTable}
                          </tbody>
                      </table>
                  </div>
                  <RightButton text="Associate to Customer Admin" onClickFunc={onAssociateToCustAdminBtn}/>
              </div>
          </div>
      )
}

export default SearchResult
