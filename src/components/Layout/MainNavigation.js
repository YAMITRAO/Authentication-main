import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import DataContext from '../../Context/DataContext';

const MainNavigation = () => {

  const ctx = useContext(DataContext);
  
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            {!ctx.isAuth && <Link to='/auth'>Login</Link>}
          </li>
          <li>
            {ctx.isAuth && <Link to='/profile'>Profile</Link>}
          </li>
          <li>
            {ctx.isAuth && <button onClick={ () => {
              ctx.authHandler({type:"LOG_OUT", data:"set IsAuth to false and authDetails removed"})
            }}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
