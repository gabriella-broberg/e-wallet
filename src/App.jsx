import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddCard from './pages/AddCard';
import CardDetails from './pages/CardDetails';
import Settings from './pages/Settings';
import Header from './components/Header';
import './styles/Global.css'; 



const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addcard" element={<AddCard />} />
          <Route path="/card/:id" element={<CardDetails />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
