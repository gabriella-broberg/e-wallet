import { useState } from 'react';
import Card from '../components/Card';
import '../styles/AddCard.css';
import PropTypes from 'prop-types';

const CardForm = ({ initialCardDetails, submitButtonText, handleSubmitForm }) => {
  const [cardDetails, setCardDetails] = useState(initialCardDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const formattedCardNumber = value
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(.{4})/g, '$1 ')
        .trim();

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

      setCardDetails({ ...cardDetails, [name]: formattedValidThru });
      return;
    }

    if (name === 'ccv') {
      const formattedCCV = value.replace(/\D/g, '').slice(0, 3);
      setCardDetails({ ...cardDetails, [name]: formattedCCV });
      return;
    }

    if (name === 'cardHolder') {
      const formattedCardHolder = value.replace(/[^a-zA-Z\s]/g, '');
      setCardDetails({ ...cardDetails, [name]: formattedCardHolder });
      return;
    }

    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedCardNumber = cardDetails.cardNumber.replace(/\s/g, '');

    if (cleanedCardNumber.length !== 16) {
      alert('The card number must be exactly 16 digits.');
      return;
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;
    const expiryMonth = parseInt(cardDetails.validThru.slice(0, 2), 10);
    const expiryYear = parseInt(cardDetails.validThru.slice(3, 5), 10);

    if (
      isNaN(expiryMonth) ||
      isNaN(expiryYear) ||
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < currentMonth)
    ) {
      alert('The expiration date is invalid or has already passed.');
      return;
    }

    if (cardDetails.ccv.length !== 3) {
      alert('The CCV must be exactly 3 digits.');
      return;
    }

    handleSubmitForm(cardDetails);
  };

  return (
    <div className="card-details-container">
      <Card
        cardNumber={cardDetails.cardNumber}
        cardHolder={cardDetails.cardHolder}
        validThru={cardDetails.validThru}
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
        </div>

        <div className="form-group">
          <label htmlFor="cardHolder">Card Holder Name</label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            value={cardDetails.cardHolder}
            onChange={handleChange}
            placeholder="Name Lastname"
            required
          />
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
            <option value="ICA Banken">ICA Banken</option>
          </select>
        </div>

        <button type="submit" className="submit-button">{submitButtonText}</button>
      </form>
    </div>
  );
};

// PropTypes validation
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
