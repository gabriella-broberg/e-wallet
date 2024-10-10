import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddCard from './pages/AddCard';
import CardDetails from './pages/CardDetails';
import Settings from './pages/Settings';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addcard" element={<AddCard />} />
        <Route path="/card/:id" element={<CardDetails />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
