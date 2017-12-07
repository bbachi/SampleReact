import React from 'react'
import AssociateMore from './AssociateMore'
import CommonUtil from '../../../common/Util'
import AssociateTable from './AssociateTable'


let Associations = (props) => {

    const { securityRole, custList, selAdminAsscList } = props

    const tableOptns = {mngtList:custList, securityRole, selAdminAsscList}

    let result
    if(CommonUtil.isUserBroker(securityRole)){
        result = <div>Customer associations for brokers and broker associates must be managed in the business partner hierarchy within CRM.</div>
    }else{
        result = <AssociateMore />
    }

    return(
        <div>
          {result}
          <div class="left fullwidth movetitledown">
            <AssociateTable tableOptns={tableOptns}/>
          </div>
        </div>
    )
}

export default Associations
