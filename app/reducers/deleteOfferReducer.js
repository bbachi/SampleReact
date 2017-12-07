import * as actionTypes from '../actions/actionTypes';

export default function deleteOfferReducer(state = [], action) {

    switch(action.type) {
        case actionTypes.DELETE_OFFER: return action.deleteStatus
        default:return state;
    }
}
