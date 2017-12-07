import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from '../common/header'
import ErrorPage from '../error/ErrorPage'


const ErrorLayout = ({ match }) => {
    //console.log("path in formupload layout:::"+match.path);
    return(
        <div className="">
            <Header fromErrorLayout={true}/>
            <Switch>
                <Route exact path={`${match.path}/invalidSapid/:msgType`} component={ErrorPage} />
            </Switch>
        </div>
    )}

export default ErrorLayout
