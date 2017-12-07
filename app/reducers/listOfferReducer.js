import * as actionTypes from '../actions/actionTypes';

export default function listOfferReducer(state = [], action) {

    switch(action.type) {
        case actionTypes.LIST_OFFERS :return action.listOfferDtls
        default:return state;
    }
}
