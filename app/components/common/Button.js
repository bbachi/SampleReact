import React from 'react'
import { Redirect } from 'react-router-dom'

export default function CustomButton(props) {

    const { link, name, handleSubmit, formValidated, from, disabled } = props.buttonAttributes

    return (
        <div className="right movetitledown">
            <button type="button" onClick={handleSubmit} disabled={disabled} className="controlText-A myaccount-btn b_submit1">{name}<span></span></button>
            {formValidated && (<Redirect to={from || link}/>)}
       </div>
    )
}
