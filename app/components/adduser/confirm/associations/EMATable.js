import React from 'react'

let EMATable = ({tableOptns}) => {

    const { mngtList, onManagementCBox, onRegionCBox, onPropertyCBox } = tableOptns

    console.log(mngtList)
    const TableHeader = <thead>
        									<tr>
          										<th className="unst">Business Name or DBA</th>
          										<th className="unst">BP#</th>
          										<th className="unst">Address</th>
        									</tr>
								        </thead>


    const ManagementRow = (mngt,index) => mngt.regionList.map((rgn,index) => RegionRow(mngt,rgn,index))
    const RegionRow = (mng,rgn,index) => rgn.propertyList.map((prop,index) => PropertyRow(rgn,prop,index))

    const PropertyRow = (rgn,prop,index) => {
          let propList = [];
          if(!prop.EMAAssigned && prop.selected){
              let propRow = <tr key={rgn.bpNumber}>
                          <td className="padLFifty">{prop.propertyName}</td>
                          <td>{prop.bpNumber}</td>
                          <td><span>{prop.strBPAddress}</span></td>
                        </tr>
              propList.push(propRow)
          }
          return(propList)
    }

    const EMATable = mngtList.map((mngt,index) => ManagementRow(mngt,index))

    return(
      <table id="brkTable" className="tdsn dottedtdsn tablesorter">
          {TableHeader}
          <tbody id="transTbody">
              {EMATable}
          </tbody>
      </table>
    )
}

export default EMATable
