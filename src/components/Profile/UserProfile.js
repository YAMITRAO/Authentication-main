import { useContext } from 'react';
import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';
import DataContext from '../../Context/DataContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const UserProfile = () => {
  const hist = useHistory();
  const ctx = useContext(DataContext);
  if(ctx.isAuth){
    return (
      <section className={classes.profile}>
        <h1>Your User Profile</h1>
        <ProfileForm />
      </section>
    );
  }
  else{
    hist.push('/')
  }
  
};

export default UserProfile;
