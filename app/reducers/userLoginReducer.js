import * as actionTypes from '../actions/actionTypes';

export default function userLoginReducer(state = [], action) {

    switch(action.type) {
        case actionTypes.USER_LOGIN : return action.userDetails
        default:
            return state;
    }
}
