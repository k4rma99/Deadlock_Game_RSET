export const APIError = () =>{
    return {type:"APIError"};
}

export const loginSuccess = (payload) =>{
    return {type:"LOGIN_SUCCESS",payload:payload};
}

export const loginFailure = (payload) =>{
    return {type:"LOGIN_FAILURE",payload:payload};
}

export const fireBaseInit = (payload) =>{

}