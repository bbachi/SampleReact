import * as actionTypes from '../actions/actionTypes';

export default function viewAssociatesReducer(state = [], action){

  switch(action.type) {
      case actionTypes.VIEW_ASSOCIATES: return action.viewAssociates
      default: return state;
  }
}
