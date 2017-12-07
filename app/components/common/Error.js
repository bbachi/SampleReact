import React from 'react';

export let ErrorBox = (props) => {

    const { message, isError } = props
    const errorStyle = {display:'none'}
    
    return (
      <div id="headingError" className="status-message blockelement" style={isError?{}:errorStyle}>
        <div id="headingError-H" className="normalText">
            {message}
        </div>
      </div>
    )
}
