import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';  // Importera useDispatch från Redux
import Card from '../components/Card';
import '../styles/AddCard.css';
import { addCard } from '../redux/cardsSlice';  // Importera din Redux action
import { v4 as uuidv4 } from 'uuid';



const AddCard = () => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); // För navigation
  
    const [cardDetails, setCardDetails] = useState({
      cardNumber: '',
      cardHolder: '',
      validThru: '',
      ccv: '',
      vendor: 'visa',
      bank: 'Swedbank',
    });
  

  const [errors, setErrors] = useState({
    cardHolder: '',
    cardNumber: '',
    validThru: '',
    ccv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    // Formatering av kortnummer till XXXX XXXX XXXX XXXX och begränsa till 16 siffror
    if (name === 'cardNumber') {
      const formattedCardNumber = value
        .replace(/\D/g, '') // Tar bort allt som inte är siffror
        .slice(0, 16) // Begränsar till 16 siffror
        .replace(/(.{4})/g, '$1 ') // Lägger till ett mellanrum var fjärde siffra
        .trim();

      // Tillåt både siffror och mellanslag (formatterat kortnummer)
      if (value.replace(/\s/g, '').match(/\D/g)) {
        newErrors.cardNumber = 'Only numbers are allowed for the card number.';
      } else {
        newErrors.cardNumber = '';
      }

      setErrors(newErrors);
      setCardDetails({ ...cardDetails, [name]: formattedCardNumber });
      return;
    }

    // Formatering och validering för validThru till MM/YY-format
    if (name === 'validThru') {
        let formattedValidThru = value.replace(/\D/g, ''); // Tar bort allt som inte är siffror
      
        if (formattedValidThru.length >= 2) {
          const month = formattedValidThru.slice(0, 2);
          if (parseInt(month, 10) > 12) {
            formattedValidThru = '12'; // Om användaren försöker mata in en månad större än 12
          } else if (parseInt(month, 10) === 0) {
            formattedValidThru = '01'; // Om användaren försöker mata in 00 som månad
          }
        }
      
        // Formatera till MM/YY
        if (formattedValidThru.length > 2) {
          formattedValidThru = formattedValidThru.slice(0, 4).replace(/(\d{2})(\d{2})/, '$1/$2');
        }
      
        // Validering för att kontrollera om utgångsdatum har passerat
        if (formattedValidThru.length === 5) {
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1; // Månader börjar från 0 i JavaScript, så vi lägger till 1
          const currentYear = currentDate.getFullYear() % 100; // Få de två sista siffrorna av året (YY-format)
      
          const expiryMonth = parseInt(formattedValidThru.slice(0, 2), 10);
          const expiryYear = parseInt(formattedValidThru.slice(3, 5), 10);
      
          // Kontrollera om utgångsdatum är äldre än nuvarande datum
          if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
            newErrors.validThru = 'The expiration date cannot be a date that has already passed.';
          } else {
            newErrors.validThru = '';
          }
        }
      
        setErrors(newErrors);
        setCardDetails({ ...cardDetails, [name]: formattedValidThru });
        return;
      }
      

 

    // Begränsa CCV till endast siffror och max 3 tecken
    if (name === 'ccv') {
      const formattedCCV = value.replace(/\D/g, '').slice(0, 3);

      if (value.match(/\D/g)) {
        newErrors.ccv = 'Only numbers are allowed for the CCV.';
      } else {
        newErrors.ccv = '';
      }

      setErrors(newErrors);
      setCardDetails({ ...cardDetails, [name]: formattedCCV });
      return;
    }

    // Hantera övriga fält (kortinnehavare)
    if (name === 'cardHolder') {
      const formattedCardHolder = value.replace(/[^a-zA-Z\s]/g, ''); // Tar bort allt som inte är bokstäver eller mellanslag
      if (value.match(/[^a-zA-Z\s]/g)) {
        newErrors.cardHolder = 'Only letters are allowed for the cardholder´s name.';
      } else {
        newErrors.cardHolder = '';
      }
      setErrors(newErrors);
      setCardDetails({ ...cardDetails, [name]: formattedCardHolder });
      return;
    }

    setErrors(newErrors);
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const [expireMonth, expireYear] = cardDetails.validThru.split('/');
    
    // Generera nytt kort med ID
    const newCard = { ...cardDetails, id: uuidv4(), expireMonth, expireYear };
  

  
    // Dispatcha det nya kortet till Redux
    dispatch(addCard(newCard));
  
    // Navigera till startsidan
    navigate('/');
  
    console.log("Card added:", newCard);  // Lägg till en console log för att verifiera kortet
  };
  

  return (
    <div className="add-card-container">
      <h1>New Card</h1>

      {/* Dynamisk förhandsvisning av kort */}
      <Card
        cardNumber={cardDetails.cardNumber}
        cardHolder={cardDetails.cardHolder}
        expireMonth={cardDetails.validThru.split('/')[0]}
        expireYear={cardDetails.validThru.split('/')[1]}
        vendor={cardDetails.vendor}
        bank={cardDetails.bank} 
      />

      <form onSubmit={handleSubmit} className="add-card-form">
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleChange}
            placeholder="XXXX XXXX XXXX XXXX"
            maxLength="19" // 16 siffror + 3 mellanslag
            required
          />
          {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="cardHolder">Card Holder Name</label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            value={cardDetails.cardHolder}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
          {errors.cardHolder && <p className="error-message">{errors.cardHolder}</p>}
        </div>

        <div className="form-group small-group">
          <label htmlFor="validThru">Valid Thru</label>
          <input
            type="text"
            id="validThru"
            name="validThru"
            value={cardDetails.validThru}
            onChange={handleChange}
            placeholder="MM/YY"
            maxLength="5"
            required
          />
          {errors.validThru && <p className="error-message">{errors.validThru}</p>}
        </div>

        <div className="form-group small-group">
          <label htmlFor="ccv">CCV</label>
          <input
            type="text"
            id="ccv"
            name="ccv"
            value={cardDetails.ccv}
            onChange={handleChange}
            placeholder="XXX"
            maxLength="3"
            required
          />
          {errors.ccv && <p className="error-message">{errors.ccv}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="vendor">Vendor</label>
          <select
            id="vendor"
            name="vendor"
            value={cardDetails.vendor}
            onChange={handleChange}
            required
          >
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="amex">American Express</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="bank">Bank</label>
          <select
            id="bank"
            name="bank"
            value={cardDetails.bank}
            onChange={handleChange}
            required
          >
            <option value="Swedbank">Swedbank</option>
            <option value="SEB">SEB</option>
            <option value="Handelsbanken">Handelsbanken</option>
            <option value="Nordea">Nordea</option>
            <option value="Danske Bank">Danske Bank</option>
            <option value="ICA Banken">ICA Banken</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Add Card</button>
      </form>
    </div>
  );
};

export default AddCard;
