import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import classes from './AuthForm.module.css';
import DataContext from '../../Context/DataContext';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignUpOk, setIsSignUpOk] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const hist = useHistory();

  const ctx = useContext(DataContext);


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const entredEmail = emailInputRef.current.value;
    const entredPassword = passwordInputRef.current.value;
    let url = "";
    if(isLogin){
      url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTtOX2Di6R4YAhCh2Lnm63plJ7z5rYEr8"
    }
    else{
      url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTtOX2Di6R4YAhCh2Lnm63plJ7z5rYEr8"
      setIsSignUpOk(true);
    }

    fetch( url , {
      method:"POST",
      body: JSON.stringify({
          email: entredEmail,
          password: entredPassword,
          returnSecureToken: true,
      }),
      headers:{
        'Content-type':"application/json"
      }
    }).then( res => {
      if(res.ok){
        setIsSignUpOk(false);
        if(isLogin){
          hist.push("/");
          ctx.authHandler( {type:"LOGIN_DONE", data:"Set isAuth to true"});
        }
        return res.json().then( data => {
          ctx.authDetails({type:"USER_DATA", data: data});
        });

      }
      else{
        setIsSignUpOk(false);
        return res.json().then( data => {
          let errorMsg = "Auth Failed";
          if(data && data.error && data.error.message){
            errorMsg = data.error.message
          }
          alert(errorMsg);  
        }) 
      }
    })
  }


  
   
    

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : (isSignUpOk) ? 'Sening Request...':'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
