import * as actionTypes from '../actions/actionTypes';

export default function incentiveOfferReducer(state = [], action) {

    switch(action.type) {
        case actionTypes.SAVE_OFFER : return action.offerDtls
        case actionTypes.EDIT_OFFER :return action.editOfferDtls
        default:return state;
    }
}
