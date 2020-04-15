import { createStore, combineReducers, applyMiddleware,compose } from "redux";

import { firebaseReducer } from "react-redux-firebase";

import "./actions";
var Cookie = require('js-cookie');


const rootState ={
    username:null,
    LoggedIn:false,
    token:null,
    error:false,
    error_msg:null
};

const rootReducer = (state = rootState,action) => {
    switch(action.type){
        case "LOGIN_SUCCESS":{
            Cookie.set('LoggedIn','true', { expires: 30 });
            Cookie.set('UserName',action.payload.username?action.payload.username:Cookie.get('UserName'), { expires: 30 });
            Cookie.set('Token',action.payload.username?action.payload.username:Cookie.get('Token'), { expires: 30 });
            return Object.assign({},state,{
                username:action.payload.username?action.payload.username:Cookie.get('UserName'),
                LoggedIn:true,
                token:action.payload.token?action.payload.token:Cookie.get('Token')
            });
        }
        case "LOGIN_FAILURE":{
            return Object.assign({},state,{
                username:null,
                LoggedIn:false,
                token:null,
                error:true,
                error_msg:action.payload.message
            });
        }
        default:
            return state;
    }
}

export const store =  createStore(combineReducers({
    rootReducer:rootReducer,
    fireBaseReducer:firebaseReducer
})
);