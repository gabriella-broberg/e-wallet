import { useState } from 'react';
import Card from '../components/Card';
import '../styles/AddCard.css';
import PropTypes from 'prop-types';  // Importera PropTypes


const CardForm = ({ initialCardDetails, submitButtonText, handleSubmitForm }) => {
  const [cardDetails, setCardDetails] = useState(initialCardDetails);
  const [errors, setErrors] = useState({
    cardHolder: '',
    cardNumber: '',
    validThru: '',
    ccv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (name === 'cardNumber') {
      const formattedCardNumber = value
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(.{4})/g, '$1 ')
        .trim();

      if (value.replace(/\s/g, '').match(/\D/g)) {
        newErrors.cardNumber = 'Only numbers are allowed for the card number.';
      } else {
        newErrors.cardNumber = '';
      }

      setErrors(newErrors);
      setCardDetails({ ...cardDetails, [name]: formattedCardNumber });
      return;
    }

    if (name === 'validThru') {
      let formattedValidThru = value.replace(/\D/g, '');

      if (formattedValidThru.length >= 2) {
        const month = formattedValidThru.slice(0, 2);
        if (parseInt(month, 10) > 12) {
          formattedValidThru = '12';
        } else if (parseInt(month, 10) === 0) {
          formattedValidThru = '01';
        }
      }

      if (formattedValidThru.length > 2) {
        formattedValidThru = formattedValidThru.slice(0, 4).replace(/(\d{2})(\d{2})/, '$1/$2');
      }

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear() % 100;

      const expiryMonth = parseInt(formattedValidThru.slice(0, 2), 10);
      const expiryYear = parseInt(formattedValidThru.slice(3, 5), 10);

      if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
        newErrors.validThru = 'The expiration date cannot be a date that has already passed.';
      } else {
        newErrors.validThru = '';
      }

      setErrors(newErrors);
      setCardDetails({ ...cardDetails, [name]: formattedValidThru });
      return;
    }

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

    if (name === 'cardHolder') {
      const formattedCardHolder = value.replace(/[^a-zA-Z\s]/g, '');
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
    handleSubmitForm(cardDetails);  // Callback till föräldrakomponenten
  };

  return (
    <div className="add-card-container">
      <h1>{submitButtonText}</h1>

      {/* Dynamisk förhandsvisning av kort */}
      <Card
  cardNumber={cardDetails.cardNumber}
  cardHolder={cardDetails.cardHolder}
  validThru={cardDetails.validThru}  // Skicka hela validThru
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
            maxLength="19"
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

        <button type="submit" className="submit-button">{submitButtonText}</button>
      </form>
    </div>
  );
};


// Lägg till PropTypes-validering för props
CardForm.propTypes = {
    initialCardDetails: PropTypes.shape({
      cardNumber: PropTypes.string.isRequired,
      cardHolder: PropTypes.string.isRequired,
      validThru: PropTypes.string.isRequired,
      ccv: PropTypes.string.isRequired,
      vendor: PropTypes.string.isRequired,
      bank: PropTypes.string.isRequired,
    }).isRequired,
    submitButtonText: PropTypes.string.isRequired,
    handleSubmitForm: PropTypes.func.isRequired,
  };

export default CardForm;
