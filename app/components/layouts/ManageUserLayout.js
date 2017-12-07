import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from '../common/header'
import SearchUsersPage from '../manageusers/search/SearchUsersPage'
import UpdateUserPage from '../manageusers/update/UpdateUserPage'
import ConfirmationPage from '../manageusers/remove/ConfirmationPage'


const ManageUserLayout = ({ match }) => {
    //console.log("path in formupload layout:::"+match.path);
    return(
        <div className="">
            <Switch>
                <Route exact path={`${match.path}/searchusers`} component={SearchUsersPage} />
                <Route exact path={`${match.path}/updateuser/:userName`} component={UpdateUserPage} />
                <Route exact path={`${match.path}/removeuser/confirm`} component={ConfirmationPage} />
            </Switch>
        </div>
    )}

export default ManageUserLayout
