
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Your Cards</h1>
      <Link to="/addcard">Add New Card</Link>
    </div>
  );
};

export default Home;
