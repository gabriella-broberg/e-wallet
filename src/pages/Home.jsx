import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Home = () => {
  const cards = useSelector((state) => state.cards.cards); // Hämta kort från Redux store
  const activeCard = cards.find(card => card.isActive); // Hitta det aktiva kortet
  const inactiveCards = cards.filter(card => !card.isActive); // Filtrera inaktiva kort

  return (
    <div className="home-container">
      <h2>Your Cards</h2>

      {/* Visa ingen kort-meddelande om det inte finns några kort */}
      {cards.length === 0 ? (
        <p>You have no cards yet.</p>
      ) : (
        <div>
          {/* Visa aktiva kort om de finns */}
          {activeCard && (
            <div>
              <h3>Active Card</h3>
              <Card {...activeCard} />
            </div>
          )}

          {/* Visa inaktiva kort om de finns */}
          {inactiveCards.length > 0 && (
  <div>
    <h3 className="inactive-cards-title">Inactive Cards</h3> {/* Flyttad rubrik */}
    <div className="inactive-cards-container">
      {inactiveCards.map((card, index) => (
        <Link key={card.id} to={`/card/${card.id}`} className="inactive-card" style={{ '--index': index }}>
          <Card {...card} />
        </Link>
      ))}
    </div>
  </div>
)}

        </div>
      )}

     {/* Visa meddelande eller knapp beroende på antal kort */}
     {cards.length < 4 ? (
        <Link to="/addcard" className="add-card-button">Add New Card</Link>
      ) : (
        <p className="max-cards-message">Max number of cards reached. Remove a card to add a new one.</p>
      )}
    </div>
  );
};

export default Home;
