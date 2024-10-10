import { useState } from 'react';
import Card from '../components/Card';
import '../styles/AddCard.css';

const AddCard = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    validThru: '',
    ccv: '',
    vendor: 'visa',
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
        newErrors.cardNumber = 'Endast siffror tillåts för kortnummer.';
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

      setCardDetails({ ...cardDetails, [name]: formattedValidThru });
      return;
    }

    // Begränsa CCV till endast siffror och max 3 tecken
    if (name === 'ccv') {
      const formattedCCV = value.replace(/\D/g, '').slice(0, 3);

      if (value.match(/\D/g)) {
        newErrors.ccv = 'Endast siffror tillåts för CCV.';
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
        newErrors.cardHolder = 'Endast bokstäver tillåts för kortinnehavarens namn.';
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
    // Form-submission logik här
    console.log(cardDetails);
  };

  return (
    <div className="add-card-container">
      <h1>Add a New Card</h1>

      {/* Dynamisk förhandsvisning av kort */}
      <Card
        cardNumber={cardDetails.cardNumber}
        cardHolder={cardDetails.cardHolder}
        expireMonth={cardDetails.validThru.split('/')[0]}
        expireYear={cardDetails.validThru.split('/')[1]}
        vendor={cardDetails.vendor}
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

        <button type="submit" className="submit-button">Add Card</button>
      </form>
    </div>
  );
};

export default AddCard;
