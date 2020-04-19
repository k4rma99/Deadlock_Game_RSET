export const APIError = () =>{
    return {type:"APIError"};
}

export const loginSuccess = (payload) =>{
    return {type:"LOGIN_SUCCESS",payload:payload};
}

export const logout = () =>{
    return {type:"LOGOUT"};
}

export const updateProfile = ()=>{
    return {type:"UPDATE_PROFILE"}
}

export const updateLevel = (payload)=>{
    return {type:"UPDATE_ITEMS",payload:payload}
}