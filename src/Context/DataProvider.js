import React, { useReducer } from 'react'
import DataContext from './DataContext'

const reducer = (state, action) => {
    if(action.type === "LOGIN_DONE"){
        state.isAuth = true;
        return {
            ...state
        };
    }
    if(action.type === "LOG_OUT"){
        state.isAuth = false;
        state.userAuthDetails = {};
        return {
            ...state
        };
    }
    if(action.type === "USER_DATA"){
        state.userAuthDetails = action.data;
        return {
            ...state
        }
    }
    return state
}

const DataProvider = (props) => {

  const changeAuthState = (data) =>{
    dispatchFun(data);
  }
  const authDetailshandler = ( data) => {
    dispatchFun(data);
  }

  const [state, dispatchFun] = useReducer( reducer, {
    isAuth: false,
    userAuthDetails: {}
  })


    let data = {
            isAuth: state.isAuth,
            authHandler: changeAuthState,
            userAuthDetails: state.userAuthDetails,
            authDetails: authDetailshandler,
        }
    
  return (
    <DataContext.Provider value={data}>
        {props.children}
    </DataContext.Provider>
  )
}

export default DataProvider