import React from 'react'

let AssociatesModal = (props) => {


    const { asscList, userType } = props

    if(undefined == asscList && asscList.length == 0){
        return <div></div>
    }

    const heading = (userType == 'EXT_BRK_ASC')?<h3>Associated Broker Associates</h3>:<h3>Associated Customer Associates</h3>


    const TableHeader = <thead>
                          <tr>
                            <th className="unst">First Name</th>
                            <th className="unst">Last Name</th>
                            <th className="unst">Username</th>
                          </tr>
                        </thead>

    const AssociateRow = (assc,index) => {

                          return(
                              <tr key = {assc.userName} className={index%2 == 0?'odd':'even'}>
                                <td><label htmlFor="broker1" className="textlabel">{assc.firstName}</label></td>
                                <td>{assc.lastName}</td>
                                <td>{assc.userName}</td>
                              </tr>
                          )
                      }

    const AssociateTable = asscList.map((associate,index) => AssociateRow(associate,index))

    return(
        <div>
            <div className="M-heading">{heading}</div>
            <div className="M-content">
                <div className="left fullwidth movetitledown">
                <div className="left fullwidth contenttitleseperator"></div>
                <div className="left fullwidth movetitledown">
                  <table id="esitable" className="tdsn dottedtdsn tablepagination tablesorter">
                      {TableHeader}
                      <tbody id="transTbody">
                        {AssociateTable}
                      </tbody>
                  </table>
               </div>
               <div className="left fullwidth"></div>
              </div>
            </div>
        </div>
    )
}

export default AssociatesModal
