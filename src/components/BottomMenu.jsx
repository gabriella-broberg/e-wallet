import { Link } from 'react-router-dom';
import { FaHome, FaCog } from 'react-icons/fa'; 
import './BottomMenu.css';


const BottomMenu = () => {
  return (
    <footer className="bottom-menu">
      <nav>
        <ul>
        
          <li>
            <Link to="/">
              <FaHome size={32} /> {/* Hem-ikon */}
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FaCog size={32} /> {/* Inställnings-ikon */}
            </Link>
          </li>

         

        </ul>
      </nav>
    </footer>
  );
};

export default BottomMenu;
