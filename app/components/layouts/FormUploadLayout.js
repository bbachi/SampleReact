import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from '../common/header'
import FormUploadPage from '../formupload/FormUploadPage';
import UploadConfirmationPage from '../formupload/UploadConfirmationPage';


const FormUploadLayout = ({ match }) => {
    //console.log("path in formupload layout:::"+match.path);
    return(
        <div className="">
            <Switch>
                <Route exact path={`${match.path}/upload`} component={FormUploadPage} />
                <Route path={`${match.path}/confirm`} component={UploadConfirmationPage} />
            </Switch>
        </div>
    )}

export default FormUploadLayout
