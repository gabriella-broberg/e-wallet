import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/Card';
import { activateCard, deleteCard } from '../redux/cardsSlice';

const CardDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cards = useSelector((state) => state.cards.cards);

  // Hitta kortet baserat på ID
  const card = cards.find((card) => card.id === id);

  if (!card) {
    return <p>Card not found</p>;
  }

  const handleActivate = () => {
    dispatch(activateCard(id));
    navigate('/'); // Gå tillbaka till startsidan efter att kortet har aktiverats
  };

  const handleDelete = () => {
    dispatch(deleteCard(id));
    navigate('/');
  };

  return (
    <div>
        
      <h1>Card Details</h1>
      <button disabled={card.isActive} onClick={handleActivate}>Activate Card</button>
      <button disabled={card.isActive} onClick={handleDelete}>Delete Card</button>
      <Card {...card} />
  
    </div>
  );
};

export default CardDetails;
