import React, { useReducer } from 'react'
import DataContext from './DataContext'

const reducer = (state, action) => {
    if(action.type === "LOGIN_DONE"){
        state.isAuth = true;
        localStorage.setItem("userdetails", JSON.stringify(state));

        return {
            ...state
        };
    }
    if(action.type === "LOG_OUT"){
        state.isAuth = false;
        state.userAuthDetails = {};
        localStorage.setItem("userdetails", JSON.stringify(state));
        return {
            ...state
        };
    }
    if(action.type === "USER_DATA"){
        state.userAuthDetails = action.data;
        localStorage.setItem("userdetails", JSON.stringify(state));
        return {
            ...state
        }
    }
    localStorage.setItem("userdetails", JSON.stringify(state));
    return state
}

const DataProvider = (props) => {

  const changeAuthState = (data) =>{
    dispatchFun(data);
    setTimeout( () => {
      console.log("Auto logout is clicked");
      dispatchFun({type:"LOG_OUT"});
    }, 300000);
  }
  const authDetailshandler = ( data) => {
    dispatchFun(data);
  }

  let initialState = {
    isAuth: false,
    userAuthDetails: {}
  }

  if( localStorage.getItem("userdetails")){
    console.log("data is present");
    initialState={ ...JSON.parse(localStorage.getItem('userdetails')) }
  }
  else{
    localStorage.setItem("userdetails", JSON.stringify(initialState));
    console.log("No data is here");
  }

  

  const [state, dispatchFun] = useReducer( reducer, initialState);


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