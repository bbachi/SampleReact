import React from 'react'

let EMATable = ({tableOptns}) => {

    const { custList, onManagementCBox, onRegionCBox, onPropertyCBox } = tableOptns

    const TableHeader = <thead>
        									<tr>
                              <td className="unst"><input type="checkbox" name="selectAll"/></td>
          										<th className="unst">Business Name or DBA</th>
          										<th className="unst">BP#</th>
          										<th className="unst">Address</th>
        									</tr>
								        </thead>


    const ManagementRow = (mngt,index) => mngt.regionList.map((rgn,index) => RegionRow(mngt,rgn,index))
    const RegionRow = (mng,rgn,index) => rgn.propertyList.map((prop,index) => PropertyRow(rgn,prop,index))



    const PropertyRow = (rgn,prop,index) => {

          let propList = [];
          let propRow;
          if(!prop.EMAAssigned && prop.selected){
              propRow = <tr key={rgn.bpNumber}>
                          <td><input type="checkbox" onChange={onPropertyCBox} checked={prop.selected} className="" name="propertyBP" checked={prop.verifySelected} value={prop.bpNumber}/></td>
                          <td className="padLFifty"><span>{prop.propertyName}</span></td>
                          <td>{prop.bpNumber}</td>
                          <td><span>{prop.strBPAddress}</span></td>
                        </tr>
              propList.push(propRow)
          }
          return(propList)
    }

    const EMATable = custList.map((mngt,index) => ManagementRow(mngt,index))

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
