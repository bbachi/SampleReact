import * as actionTypes from '../actions/actionTypes';

export default function adminAssociateReducer(state = [], action) {

    switch(action.type) {
        case actionTypes.LIST_ADMIN_ASSOCIATES :return action.admindata
        default:return state;
    }
}
