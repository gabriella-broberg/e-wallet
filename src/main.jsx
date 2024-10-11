import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  // Importera Provider från react-redux
import store from './redux/store';  // Importera din Redux store
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* Omslut hela appen med Provider och anslut till store */}
      <App />
    </Provider>
  </StrictMode>
);
