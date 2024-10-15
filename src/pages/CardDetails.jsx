import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CardForm from '../components/CardForm';  // Import CardForm
import { activateCard, deleteCard, updateCard } from '../redux/cardsSlice';

const CardDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cards = useSelector((state) => state.cards.cards);

  const card = cards.find((card) => card.id === id);
  const initialCardDetails = {
    cardNumber: card?.cardNumber || '',
    cardHolder: card?.cardHolder || '',
    validThru: card?.validThru || '',
    ccv: card?.ccv || '',
    vendor: card?.vendor || 'visa',
    bank: card?.bank || 'Swedbank',
  };

const handleSubmitForm = (updatedCardDetails) => {
  console.log("Submitting updated card details:", updatedCardDetails.validThru); // Kontrollera validThru-värdet
  dispatch(updateCard({ ...updatedCardDetails, id }));
  navigate('/');
};


  const handleActivate = () => {
    dispatch(activateCard(id));
    navigate('/');  // Gå tillbaka till startsidan efter aktivering
  };

  const handleDelete = () => {
    dispatch(deleteCard(id));
    navigate('/');
  };

  return (
    <div className="card-details-container">

      {/* Placera knapparna efter kortdetaljerna men före formuläret */}
      <div className="button-container">
        <button className="activate-button" disabled={card.isActive} onClick={handleActivate}>
          Activate Card
        </button>
        <button className="delete-button" disabled={card.isActive} onClick={handleDelete}>
          Delete Card
        </button>
      </div>

      <CardForm
        initialCardDetails={initialCardDetails}
        submitButtonText="Save Changes"
        handleSubmitForm={handleSubmitForm}
      />
    </div>
  );
};

export default CardDetails;