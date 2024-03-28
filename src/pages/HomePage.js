import { useContext } from 'react';
import StartingPageContent from '../components/StartingPage/StartingPageContent';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DataContext from '../Context/DataContext';

const HomePage = () => {
  const hist = useHistory();
  const ctx = useContext(DataContext);

  if(ctx.isAuth){
    return <StartingPageContent />
  }
  else{
    hist.push('/auth');
  }
 ;
};

export default HomePage;
