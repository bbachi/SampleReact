import React from 'react';

export let CustomRadio = (props) => {
    return (
        <div className={props.divClassName}>
            <input type="radio"  id={props.value} checked={props.checked}
            className={props.inputClassName}	name={props.name} value={props.value}
            onClick={props.onUserRadioChange}/>
            <label htmlFor={props.value} className={props.labelClassName}>{props.text}</label>
        </div>
    )
}
