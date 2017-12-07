import * as actionTypes from './actionTypes'
import ManageUserService from '../services/manageUserService'
import UserService from '../services/userService'

const searchUsers = (data) => ({type:actionTypes.SEARCH_USERS, userList: data })

export function getUsers(dataIn) {
    return function(dispatch) {
        return ManageUserService.searchUsers(dataIn).then(data => {
            dispatch(searchUsers(data));
        });
    }
}

const userDetails = (data) => ({type:actionTypes.USER_DETAILS, userDtls: data})

export function getUserDetails(dataIn) {
    return function(dispatch) {
        return ManageUserService.getUserDetails(dataIn).then(data => {
            dispatch(userDetails(data));
        });
    }
}

const userUpdate = (data) => ({type:actionTypes.USER_UPDATE, updateUser: data })

export function updateUserDtls(dataIn) {
    return function(dispatch) {
        return ManageUserService.updateUser(dataIn).then(data => {
            dispatch(userUpdate(data));
        });
    }
}

const viewAssociates = (data) => ({type:actionTypes.VIEW_ASSOCIATES, viewAssociates: data})

export function getAssociates(dataIn) {
    return function(dispatch) {
        return UserService.listAdminAssociates(dataIn).then(data => {
            dispatch(viewAssociates(data));
        });
    }
}

const resetPassword = (data) => ({type:actionTypes.RESET_PASSWORD, resetPassword: data})

export function sendResetPassword(dataIn) {
    return function(dispatch) {
        return ManageUserService.sendResetPassword(dataIn).then(data => {
              dispatch(resetPassword(data));
        });
    }
}

const removeUser = (userDetails,data) => ({type:actionTypes.REMOVE_USER, userDetails,removeUser: data})

export function removeUserDetails(dataIn, userName) {
    return function(dispatch) {
        return ManageUserService.removeUser({userName}).then(data => {
              dispatch(removeUser(dataIn, data));
        });
    }
}

const disassociateCustomersFromUser = (data) => ({type:actionTypes.DISASSOCIATE_CUST_FROM_USER, userDetails, payload:data})

export function disassociateCustomersFromUserAPI(dataIn) {
    return function(dispatch) {
        return ManageUserService.disassociateCustomersFromUser(dataIn).then(data => {
              let outData = {bpNumberList:dataIn.bpNumberList, status:data.status}
              dispatch(disassociateCustomersFromUser(outData));
        });
    }
}
