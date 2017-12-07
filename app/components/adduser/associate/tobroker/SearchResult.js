import React from 'react'
import Modal from '../../../common/Modal'
import AssociatesModal from '../../../common/AssociatesModal'
import RightButton from '../../../common/RightButton'
import { ErrorBox } from '../../../common/Error'

let SearchResult = (props) => {

      const { searchRsltOptions } = props
      const { brkrDetails, errorMessage, searchCriteria, onBrokerLinkClick, toggleModal, isBrokerModalOpen,
            asscList, userType, onBrokerRadioChange, onAssociateToBrokerBtn } = searchRsltOptions

      if(undefined == brkrDetails.adminList || brkrDetails.adminList.length == 0){
          const errorMessage = (searchCriteria == 'BP')?"Broker admin with entered BP number doesn't exist. Please try with a different BP Number."
                      :"Broker admin with entered last name doesn't exist. Please try with a different last name."
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
                                {searchCriteria != 'BP'?<th className="unst">Broker</th>:''}
                            </tr>
                        </thead>


      const CustomerRow = (user,index) => {

                            return(
                                <tr key={user.userName} className={index%2 == 0?'odd':'even'}>
                                    <td className="textc"><input type="radio" value={user.userName} onChange={onBrokerRadioChange} name="selAdmin"/></td>
                                    <td><label className="textlabel">{user.firstName}</label></td>
                                    <td>{user.lastName}</td>
                                    <td><a href="#" onClick={() => onBrokerLinkClick(user)} className="modal1">{user.userName}</a></td>
                                    {searchCriteria != 'BP'?<td>{user.businessName}</td>:''}
                                </tr>
                            )
                        }

      const customerTable = brkrDetails.adminList.map((user,index) => CustomerRow(user,index))

      return(
          <div className="left fullwidth" id="userTbl" >
              <div className="left fullwidth contenttitleseperator"></div>
              <Modal show={isBrokerModalOpen} onClose={toggleModal}>
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
              <RightButton text="Associate to Broker" onClickFunc={onAssociateToBrokerBtn}/>
            </div>
      )
}

export default SearchResult
