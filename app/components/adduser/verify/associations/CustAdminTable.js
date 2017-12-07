import React from 'react'

let CustAdminTable = ({tableOptns}) => {

    const { custList, onManagementCBox, onRegionCBox, onPropertyCBox } = tableOptns

    const TableHeader = <thead>
        									<tr>
                              <td className="unst"><input type="checkbox" name="selectAll"/></td>
          										<th className="unst">Business Name or DBA</th>
          										<th className="unst">BP#</th>
          										<th className="unst">Address</th>
        									</tr>
								        </thead>

    const ManagementRow = (mngt,index) => {

        let mngmtRow;
        if(mngt.selected){
            mngmtRow = <tr key = {mngt.bpNumber} className={index%2 == 0?'odd':'even'}>
                          <td><input type="checkbox" onChange={onManagementCBox} checked={mngt.verifySelected} value={mngt.bpNumber} name="managementBP"/></td>
                          <td><span className="" data-show={mngt.bpNumber}>&nbsp;</span>{mngt.managementName}</td>
                          <td>{mngt.bpNumber}</td>
                          <td className="">{mngt.strBPAddress}</td>
                      </tr>
        }
        return([
            mngmtRow,
            mngt.regionList.map((rgn,index) => RegionRow(mngt,rgn,index))
          ]
        )
    }

    const RegionRow = (mng,rgn,index) => {

      let rgnList = [];
      let regionRow;
      if(rgn.selected){
          regionRow = <tr key={rgn.bpNumber} className={mng.bpNumber}>
                          <td><input type="checkbox" onChange={onRegionCBox} checked={rgn.verifySelected} value={rgn.bpNumber} name="regionBP"/></td>
                          <td className="padLTwentyFive"><span className="">&nbsp;</span>{rgn.regionName}</td>
                          <td>{rgn.bpNumber}</td>
                          <td className="">{rgn.strBPAddress}</td>
                      </tr>
          rgnList.push(regionRow)
      }
      return([
            (rgn.bpNumber != 'NO_REGN')?rgnList:"",
            rgn.propertyList.map((prop,index) => PropertyRow(rgn,prop,index))
          ])
    }

    const PropertyRow = (rgn,prop,index) => {

      let propList = [];
      let propRow;
      if(prop.selected){
          propRow = <tr key={prop.bpNumber}>
                        <td><input type="checkbox" onChange={onPropertyCBox} checked={prop.verifySelected} className="" name="propertyBP" value={prop.bpNumber}/></td>
                        <td className="padLFifty">{prop.propertyName}</td>
                        <td>{prop.bpNumber}</td>
                        <td className="">{prop.strBPAddress}</td>
                    </tr>
          propList.push(propRow)
      }
      return(propList)
    }

    const customerAdminTable = custList.map((mngt,index) => ManagementRow(mngt,index))


    return(
        <table id="brkTable" className="tdsn dottedtdsn tablesorter">
            {TableHeader}
            <tbody id="transTbody">
                {customerAdminTable}
            </tbody>
        </table>
    );
}

export default CustAdminTable
