import React from 'react'

let CancelSave = (props) => {

    const { cancel, save, fieldName } = props.onUpdate

    return(
      <div className="right movetitledown">
        <a onClick={() => save(fieldName)} className="saveData" data-Field="Fullname">Save</a>
        &nbsp;<span className="verticalseperator">&nbsp;</span>&nbsp;
        <a onClick={() => cancel(fieldName)} className="a-cancel">Cancel</a>
      </div>
    )
}

export default CancelSave
