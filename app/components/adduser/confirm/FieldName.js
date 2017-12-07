import React from 'react'

let FieldName = (props) => {

    const { label, value } = props

    return(
      <div className="left fullwidth contenttitleseperator">
          <div className="label">
            <label>{label}:</label>
          </div>
          <div className="left secondcolumndata">
            {value}
          </div>
      </div>
    )
}

export default FieldName
