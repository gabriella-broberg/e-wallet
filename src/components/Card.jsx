import PropTypes from 'prop-types';
import '../styles/Card.css'; // Importera CSS-fil för styling

const Card = ({ cardNumber, cardHolder, expireMonth, expireYear, vendor }) => {
  // Visa endast de 4 sista siffrorna i kortnumret
  const maskedCardNumber = cardNumber
    ? '**** **** **** ' + cardNumber.slice(-4)  // Tar de sista 4 siffrorna
    : '**** **** **** ****';

  return (
    <div className={`card-container ${vendor}`}>
      <h2 className="card-number">{maskedCardNumber}</h2>
      <div className="card-info">
        <div>
          <p className="card-label">Cardholder</p>
          <h3 className="card-holder">{cardHolder || 'John Doe'}</h3>
        </div>
        <div>
          <p className="card-label">Expires</p>
          <h3 className="card-expiry">{expireMonth || 'MM'}/{expireYear || 'YY'}</h3>
        </div>
      </div>
      <div className="card-vendor">{vendor || 'VISA'}</div>
    </div>
  );
};

Card.propTypes = {
  cardNumber: PropTypes.string,
  cardHolder: PropTypes.string,
  expireMonth: PropTypes.string,
  expireYear: PropTypes.string,
  vendor: PropTypes.string.isRequired,
};

export default Card;
