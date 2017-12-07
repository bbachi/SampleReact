import React from 'react'
import Tooltip from '../../common/Tooltip'

let AccessPriv = (props) => {

    const { isDisabled, onChangeFieldValue } = props

    return(
      <div className={`left fullwidth smallinputinline movetitledown ${isDisabled?'greybox':''}`}>
          <div className="left rightcolumnwrapper" onMouseEnter="">
            <input type="checkbox" name="ableToPayBills" disabled={isDisabled} checked={isDisabled} onChange={(e) => onChangeFieldValue(e,'abletopay')}/>
            <label htmlFor="payBill" className="displayinline tip1">Able to Pay Bills</label>
          </div>
          <div className="left">
            <input type="checkbox" name="ableToStartStopService" disabled={isDisabled} checked={isDisabled} onChange={(e) => onChangeFieldValue(e,'abletoss')}/>
            <label htmlFor="startServ" checked="checked" className="displayinline tip1">Able to Start / Stop Service</label>
          </div>
          <Tooltip />
      </div>
    )
}

export default AccessPriv
