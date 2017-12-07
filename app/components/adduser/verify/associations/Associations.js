import React from 'react'
import AssociateMore from './AssociateMore'
import CommonUtil from '../../../common/Util'
import AssociateTable from './AssociateTable'


let Associations = ({tableRsltOptns}) => {

    const { securityRole, custList, selAdminAsscList, onManagementCBox, onRegionCBox, onPropertyCBox, onAssociateMoreCustomers, onPropAccesspriv } = tableRsltOptns

    const isAssociatesAdding = CommonUtil.isAssociatesAdding(securityRole)
    let result
    if(CommonUtil.isUserBroker(securityRole)){
        result = <div>Customer associations for brokers and broker associates must be managed in the business partner hierarchy within CRM.</div>
    }else{
        result = isAssociatesAdding?'':<AssociateMore onAssociateMoreCustomers={onAssociateMoreCustomers}/>
    }

    return(
        <div>
          {result}
          <div class="left fullwidth movetitledown">
            <AssociateTable tableOptns={tableRsltOptns}/>
          </div>
        </div>
    )
}

export default Associations
