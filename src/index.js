import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import DataProvider from './Context/DataProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <DataProvider>
  <App />
  </DataProvider>
  </BrowserRouter>
);
