import React from 'react'

let Fax = props => {

    const { onChangeFieldValue } = props

    return(
      <div className="left fullwidth">
          <label htmlFor="faxNumber">Fax</label>
        <input name="faxNumber" maxLength="10" placeholder="(___) xxx-xxxx" onChange={(e) => onChangeFieldValue(e,'fax')} type="text"/>
      </div>
    )
}

export default Fax
