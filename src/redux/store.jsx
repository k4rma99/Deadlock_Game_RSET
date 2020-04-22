import { createStore, combineReducers, applyMiddleware,compose } from "redux";


import "./actions";
var Cookie = require('js-cookie');



const initialState = {
    username:localStorage.getItem('username')?localStorage.getItem('username'):null,
    LoggedIn:localStorage.getItem('LoggedIn')?localStorage.getItem('LoggedIn'):false,
    isDetailsSet:localStorage.getItem('isDetailsSet')?localStorage.getItem('isDetailsSet'):false,
    uid:localStorage.getItem('uid')?localStorage.getItem('uid'):null
}


const gameState ={
    prevhash:localStorage.getItem('prevhash')?localStorage.getItem('prevhash'):null,
    level:localStorage.getItem('level')?localStorage.getItem('level'):null
}

console.log(initialState)

const rootReducer = (state = initialState,action) => {
    switch(action.type){
        case "LOGIN_SUCCESS":{
            localStorage.setItem('LoggedIn','true');
            localStorage.setItem('username',action.payload.username?action.payload.username:localStorage.getItem('username'));
            localStorage.setItem('isDetailsSet',action.payload.isDetailsSet?action.payload.isDetailsSet:localStorage.getItem('isDetailsSet'));
            localStorage.setItem('uid',action.payload.uid?action.payload.uid:localStorage.getItem('uid'));
            return Object.assign({},state,{
                username:action.payload.username?action.payload.username:localStorage.getItem('username'),
                LoggedIn:'true',
                isDetailsSet:action.payload.isDetailsSet,
                uid:action.payload.uid?action.payload.uid:localStorage.getItem('uid')
            });
        }
        case "LOGOUT":{
            localStorage.removeItem('LoggedIn');
            localStorage.removeItem('username');
            localStorage.removeItem('isDetailsSet');
            localStorage.removeItem('uid');
            return Object.assign({},state,{
                username:null,
                LoggedIn:false,
                isDetailsSet:false,
                uid:null
            });
        }
        case "UPDATE_PROFILE":{
            localStorage.setItem('isDetailsSet','true');
            return Object.assign({},state,{
                username:state.username,
                LoggedIn:state.LoggedIn,
                isDetailsSet:'true',
                uid:state.uid
            });
        }
        default:
            return state;
    }
}

const gameReducer = (state=gameState,action)=>{
    switch(action.type){
        case "UPDATE_ITEMS":{
            localStorage.setItem('prevhash',action.payload.prevhash?action.payload.prevhash:localStorage.getItem('prevhash'));
            localStorage.setItem('level',action.payload.level?action.payload.level:localStorage.getItem('level'));
            return Object.assign({},state,{
                prevhash:action.payload.prevhash?action.payload.prevhash:localStorage.getItem('prevhash'),
                level:action.payload.level?action.payload.level:localStorage.getItem('level')
            });
        }
        default:{
            return state;
        }
    }
}

export const store =  createStore(combineReducers({
    rootReducer:rootReducer,
    gameReducer:gameReducer
  }));