import * as actionTypes from '../actions/actionTypes';

const initialState = {mrktgagrm:{agreement:{}}}

export default function marketingAgreementReducer(state = initialState, action) {

  switch(action.type) {
        case actionTypes.SEARCH_MRKTG_AGREEMENT : return action.searchAgreement
        case actionTypes.UPDATE_MRKTG_AGREEMENT : return action.updateAgreement
        case actionTypes.CREATE_MRKTG_AGREEMENT :
            return Object.assign({}, state, {mrktgagrm:{agreement:state.mrktgagrm.agreement,paymentInfo:state.mrktgagrm.paymentInfo, confirm:action.createAgreement}});
        case actionTypes.SAVE_MRKTG_AGREEMENT:
            return Object.assign({}, state, {mrktgagrm:{agreement:action.agreementInfo}});
        case actionTypes.SAVE_AGRM_FROM_ENTER_PAGE:
            return Object.assign({}, state, {mrktgagrm:{agreement:action.agreementInfo}});
        case actionTypes.SAVE_AGRM_FROM_PAY_PAGE:
            return Object.assign({}, state, {mrktgagrm:{agreement:state.mrktgagrm.agreement,paymentInfo:action.paymentInfo}});
        default: return state;
    }
}
