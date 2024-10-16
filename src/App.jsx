import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddCard from './pages/AddCard';
import CardDetails from './pages/CardDetails';
import Settings from './pages/Settings';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './styles/Global.css';
import BottomMenu from './components/BottomMenu';


const App = () => {
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.style.setProperty('--background-color', 'rgba(255, 255, 255, 0.2)'); 
      root.style.setProperty('--text-color', '#fff');
      root.style.setProperty('--button-background', '#555');
    } else if (theme === 'green') {
      root.style.setProperty('--background-color', 'rgba(255, 255, 255, 0.2)'); 
      root.style.setProperty('--text-color', '#fff');
      root.style.setProperty('--button-background', '#00b09b');
    } else {
      root.style.setProperty('--background-color', 'rgba(255, 255, 255, 0.2)'); 
      root.style.setProperty('--text-color', '#fff');
      root.style.setProperty('--button-background', '#1a1f71');
    }
    
  }, [theme]);

  return (
    <div className="app-container">
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addcard" element={<AddCard />} />
            <Route path="/card/:id" element={<CardDetails />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <BottomMenu/>
        </main>
     
      </Router>
    </div>
  );
};

export default App;
