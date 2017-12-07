import React from 'react'

let ReadOnlyField = (props) => {

    const { label, value } = props

    return(
      <div className="left fullwidth contenttitleseperator">
          <div className="label">
            <label htmlFor="usernameform">{label}:</label>
          </div>
          <div className="left secondcolumndata">
              <div className="data secondcolumndata">{value}</div>
          </div>
      </div>
    )
}

export default ReadOnlyField
