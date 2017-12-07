import * as actionTypes from '../actions/actionTypes';

const initialState = {result:{displayName:"",promocode:"", fileName:""}}
export default function formUploadReducer(state = initialState, action) {

    switch(action.type) {
        case actionTypes.FORM_UPLOAD :
              return Object.assign({}, state, {
                  result:{displayName:action.result.displayName,promocode:action.result.promoCode,fileName:action.result.fileName}
              });
        default:return state;
    }



}
