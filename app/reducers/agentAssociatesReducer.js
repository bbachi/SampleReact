import * as actionTypes from '../actions/actionTypes';

export default function agentAssociatesReducer(state = [], action) {

    switch(action.type) {
        case actionTypes.LIST_EMM_ASSOCIATES :return action.emmdata
        case actionTypes.LIST_EMA_ASSOCIATES :return action.emadata
        default:return state;
    }
}
