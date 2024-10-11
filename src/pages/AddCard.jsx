import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CardForm from '../components/CardForm';  // Import CardForm
import { addCard } from '../redux/cardsSlice';
import { v4 as uuidv4 } from 'uuid';

const AddCard = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  const initialCardDetails = {
    cardNumber: '',
    cardHolder: '',
    validThru: '',
    ccv: '',
    vendor: 'visa',
    bank: 'Swedbank',
  };

  const handleSubmitForm = (cardDetails) => {
    const [expireMonth, expireYear] = cardDetails.validThru.split('/');
    const newCard = { ...cardDetails, id: uuidv4(), expireMonth, expireYear };
    dispatch(addCard(newCard));
    navigate('/');
  };

  return (
    <CardForm
      initialCardDetails={initialCardDetails}
      submitButtonText="Add Card"
      handleSubmitForm={handleSubmitForm}
    />
  );
};

export default AddCard;
