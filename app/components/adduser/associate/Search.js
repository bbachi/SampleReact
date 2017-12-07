import React from 'react'
import CommonUtil from '../../common/Util'
import Cancel from '../../common/Cancel'

let Search = ({searchOptions}) => {

    const { onSearch, bpNumber, onBPNumberChange, userType, showCustomerTable } = searchOptions
    const isBroker = CommonUtil.isUserBroker(userType)

    return(
      <form name="serachUsrFrm" id="searchUsrFrm" method="post" action="">
          <div className="left fullwidth movetitledown">
            <div className="left">
              <label htmlFor="bpNumb">{isBroker?'Broker BP#':'BP#'}</label>
            <input type="text" pattern="[0-9]*" className="validate[required] widefield"  onChange={onBPNumberChange} name="bpNumb" id="bpNumb" value={bpNumber} maxLength="10"/>
            </div>
            <div className="left marginlefttwenty movetitledown">
              <button className="left controlText-B" id="serachButton" onClick={onSearch} type="button">Search</button>
            </div>
          </div>
          {!showCustomerTable?
            <div className="mT2p">
              <Cancel />
          </div>:''}
      </form>
    )
}

export default Search
