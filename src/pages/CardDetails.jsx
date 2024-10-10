import { useParams } from 'react-router-dom';
import Card from '../components/Card';

const CardDetails = () => {
  const { id } = useParams(); // Hämta kortets ID från URL

  // Dummy-data för kort, du kan ersätta detta med data från Redux eller en databas
  const card = {
    id: id,
    cardNumber: '4539 031X XXXX 5926',
    cardHolder: 'John Doe',
    expireMonth: '09',
    expireYear: '27',
    vendor: 'visa',
    isActive: false, // Visa om kortet är aktivt eller inte
  };

  return (
    <div>
      <h1>Card Details</h1>
      <Card {...card} />
      <button disabled={card.isActive}>Activate Card</button>
      <button disabled={card.isActive}>Edit Card</button>
      <button disabled={card.isActive}>Delete Card</button>
    </div>
  );
};

export default CardDetails;
