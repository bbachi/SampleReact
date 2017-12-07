import * as actionTypes from './actionTypes';
import UserService from '../services/userService';

export function userLogin(user) {
    return { type:actionTypes.USER_LOGIN, userDetails: user };
}

export function getUserDetails(sapId) {
    return function(dispatch) {
        return UserService.getUserDetails({sapId:sapId}).then(data => {
            dispatch(userLogin(data));
        });
    }
}
