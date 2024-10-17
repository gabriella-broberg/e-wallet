
import { Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa'; // Lägg till Info-ikon
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <nav className="nav-container">
        
        <div className="logo">ewa11et.</div> 
        <ul className="nav-links">


          <li>
            <Link to="/info">
              <FaInfoCircle size={28} /> 
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
