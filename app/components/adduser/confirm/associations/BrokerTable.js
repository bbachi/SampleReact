import React from 'react'

let BrokerTable = ({tableOptns}) => {

    const { mngtList, onManagementCBox, onRegionCBox, onPropertyCBox } = tableOptns

    const TableHeader = <thead>
        									<tr>
        										<th className="unst">Business Name or DBA</th>
        										<th className="unst">BP#</th>
        										<th className="unst">Address</th>
        										<th class="unst">Can Pay</th>
                            <th class="unst">Can Start / Stop Service</th>
        									</tr>
								        </thead>

      const ManagementRow = (mngt,index) => {

          return([
              <tr key = {mngt.bpNumber} className={index%2 == 0?'odd':'even'}>
                  <td><span className="collapsedLink linkToOpen rootLevel" data-show={mngt.bpNumber}>&nbsp;</span>{mngt.managementName}</td>
                  <td>{mngt.bpNumber}</td>
                  <td className="">{mngt.strBPAddress}</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
              </tr>,
              mngt.regionList.map((rgn,index) => RegionRow(mngt,rgn,index))
            ]
          )
      }

      const RegionRow = (mng,rgn,index) => {

        return([
              (rgn.bokerAssigned && rgn.bpNumber != 'NO_REGN')?
                <tr className={mng.bpNumber}>
                    <td className="padLTwentyFive"><span className="collapsedLink linkToOpen" data-show={rgn.bpNumber}>&nbsp;</span>{rgn.regionName}</td>
                    <td>{rgn.bpNumber}</td>
                    <td className="">{rgn.strBPAddress}</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                :"",
                rgn.propertyList.map((prop,index) => PropertyRow(rgn,prop,index))
            ])
      }

      const PropertyRow = (rgn,prop,index) => {

            return(
                prop.bokerAssigned?
                    <tr className="">
                        <td className="padLFifty">{prop.propertyName}</td>
                        <td>{prop.bpNumber}</td>
                        <td className="">{prop.strBPAddress}</td>
                        <td><span>{prop.billingAce == 'Y'?'Yes':'No'}</span></td>
                        <td><span>{prop.startStopAce == 'Y'?'Yes':'No'}</span></td>
                      </tr>:""
                  )
      }

      const brokerTable = mngtList.map((mngt,index) => ManagementRow(mngt,index))


    return(
        <table id="brkTable" className="tdsn dottedtdsn tablesorter">
            {TableHeader}
            <tbody id="transTbody">
                {brokerTable}
            </tbody>
        </table>
    );
}

export default BrokerTable
