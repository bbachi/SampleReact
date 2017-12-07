import React from 'react'

let EMMTable = ({tableOptns}) => {

    const { mngtList, onManagementCBox, onRegionCBox, onPropertyCBox } = tableOptns

    console.log(mngtList)
    const TableHeader = <thead>
        									<tr>
          										<th className="unst">Business Name or DBA</th>
          										<th className="unst">BP#</th>
          										<th className="unst">Address</th>
        									</tr>
								        </thead>


    const ManagementRow = (mngt,index) => {

        let mngmtRow;
        if(!mngt.EMMAssigned && mngt.selected){
            mngmtRow = <tr>
                        <td><span className="">&nbsp; {mngt.managementName}</span></td>
                        <td>{mngt.bpNumber}</td>
                        <td><span>{mngt.strBPAddress}</span></td>
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
        if(!rgn.EMMAssigned && rgn.selected){
            regionRow = <tr key={mng.bpNumber}>
                            <td className="padLTwentyFive"><span className="">&nbsp;</span>{rgn.regionName}</td>
                            <td>{rgn.bpNumber}</td>
                            <td><span>{rgn.strBPAddress}</span></td>
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
        if(!prop.EMAAssigned && prop.selected){
            propRow = <tr key={rgn.bpNumber}>
                        <td className="padLFifty">{prop.propertyName}</td>
                        <td>{prop.bpNumber}</td>
                        <td><span>{prop.strBPAddress}</span></td>
                      </tr>
            propList.push(propRow)
        }
        return(propList)
    }

    const EMMTable = mngtList.map((mngt,index) => ManagementRow(mngt,index))

    return(
      <table id="brkTable" className="tdsn dottedtdsn tablesorter">
          {TableHeader}
          <tbody id="transTbody">
              {EMMTable}
          </tbody>
      </table>
    )
}

export default EMMTable
