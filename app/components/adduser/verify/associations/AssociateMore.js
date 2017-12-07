import React from 'react'

let AssociateMore = ({onAssociateMoreCustomers}) => {

    const aStyle = {cursor:'pointer'}

    return(
      <div className="left fullwidth contenttitleseperator">
          <div className="label">Associated Customers</div>
          <div className="left">
              <a className="ctrls colorblue" style={aStyle} id="asscmorecustomers" onClick={onAssociateMoreCustomers}>
                Associate More Customers<span></span>
              </a>
          </div>
      </div>
    )
}

export default AssociateMore
