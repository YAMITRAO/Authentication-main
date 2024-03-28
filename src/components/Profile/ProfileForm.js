import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import DataContext from '../../Context/DataContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ProfileForm = () => {
  const changePasswordRef = useRef();
  const ctx = useContext(DataContext);
  const hist = useHistory();

  
  const submitHandler = (e) => {
    e.preventDefault();
    let newUpdatedPassword = changePasswordRef.current.value;
    let token = ctx.userAuthDetails.idToken;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCTtOX2Di6R4YAhCh2Lnm63plJ7z5rYEr8',{
      method:'POST',
      body: JSON.stringify({
        idToken: token,
        password: newUpdatedPassword,
        returnSecureToken: false,
      }),
      headers:{
        'Content-type':"application/json"
      }
    }).then( res => {
      if(res.ok){
        hist.push("/");
      }
      return res.json().then( data => console.log(data))
    })

  }
  return (
    <form className={classes.form} onSubmit={ submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={changePasswordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
