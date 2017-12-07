import * as actionTypes from '../actions/actionTypes';

export default function resetPasswordReducer(state = [], action) {

    switch(action.type) {
        case actionTypes.RESET_PASSWORD: return action.resetPassword
        default: return state;
    }
}
