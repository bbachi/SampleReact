import * as actionTypes from '../actions/actionTypes';

export default function manageUserReducer(state = [], action) {

    switch(action.type) {
        case actionTypes.SEARCH_USERS : return action.userList
        case actionTypes.USER_DETAILS: return action.userDtls
        default: return state;
    }
}
