import React from 'react'
import BrokerTable from './BrokerTable'
import CustAdminTable from './CustAdminTable'
import EMATable from './EMATable'
import EMMTable from './EMMTable'
import { ErrorBox } from '../../common/Error'
import Cancel from '../../common/Cancel'

let TableResult = ({tableRsltOptns}) => {

    const { custList, userType, onManagementCBox, onRegionCBox, onPropertyCBox, onContinue, onAgentAssignedLinkClick, onPropAccesspriv } = tableRsltOptns

    let errorMessage = 'No Hierarchy found for this bp.'
    let table;
    let result;

    if(custList.error){
        errorMessage = custList.errorMessage
        result = <div className="left fullwidth">
                    <ErrorBox message={errorMessage} isError={true}/>
                    <div className="handle"><Cancel /></div>
                 </div>
    }else{
        const tableOptns = {mngtList:custList,onManagementCBox,onRegionCBox,onPropertyCBox, onAgentAssignedLinkClick, onPropAccesspriv }
        if(userType == 'EXT_BROKER'){
            table = <BrokerTable tableOptns={tableOptns}/>;
        }else if(userType == 'EXT_CA_PO' || userType == 'EXT_CA_PM' || userType == 'EXT_READ_ONLY'){
            table = <CustAdminTable tableOptns={tableOptns}/>
        }else if(userType == 'INT_AGT_EMM'){
            table = <EMMTable tableOptns={tableOptns}/>
        }else if(userType == 'INT_AGT_EMA'){
            table = <EMATable tableOptns={tableOptns}/>
        }

        result = <div className="left fullwidth">
                    {table}
                    <div className="handle movetitledown">
                        <Cancel />
                      <button className="right controlText-A" onClick={() => onContinue(custList)} type="button">Continue<span></span></button>
                    </div>
                </div>
    }


    return(
      <div id="searchResult">
          <div id="resultarea">
              {result}
            </div>
      </div>
    )
}

export default TableResult
