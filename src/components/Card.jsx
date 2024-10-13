import PropTypes from 'prop-types';
import '../styles/Card.css'; // Importera CSS-fil för styling
import visaLogo from '../assets/visa.svg';
import mastercardLogo from '../assets/mastercard.svg';
import amexLogo from '../assets/amex.svg';

const Card = ({ cardNumber, cardHolder, validThru, vendor, bank }) => {
  const maskedCardNumber = cardNumber
    ? '**** **** **** ' + cardNumber.slice(-4)
    : '**** **** **** ****';

  // Dela upp validThru i månad och år
  const [expireMonth, expireYear] = validThru ? validThru.split('/') : ['MM', 'YY'];

  // Dynamiska färger baserat på bank
  const bankStyles = {
    "ICA Banken": { backgroundColor: 'red' },
    Nordea: { backgroundColor: '#0057b5' },
    Handelsbanken: { backgroundColor: '#006aa7' },
    Swedbank: { backgroundColor: '#f15a22' }
  };

  // Logotyper för vendor
  const vendorLogos = {
    visa: visaLogo,           // Importerad SVG
    mastercard: mastercardLogo, // Importerad SVG
    amex: amexLogo            // Importerad SVG
  };

  return (
    <div className="card-container" style={bankStyles[bank] || { backgroundColor: '#1c1f71' }}>
      <div className="card-logo">
        <img src={vendorLogos[vendor]} alt={`${vendor} logo`} className="vendor-logo" />
      </div>
      <h2 className="card-number">{maskedCardNumber}</h2>
      <div className="card-info">
        <div>
          <p className="card-label">Cardholder</p>
          <h3 className="card-holder">{cardHolder || 'Name'}</h3>
        </div>
        <div>
          <p className="card-label">Expires</p>
          <h3 className="card-expiry">{expireMonth}/{expireYear}</h3> {/* Visa MM/YY */}
        </div>
      </div>
      <div className="card-bank">{bank || 'Unknown Bank'}</div>
    </div>
  );
};

Card.propTypes = {
  cardNumber: PropTypes.string,
  cardHolder: PropTypes.string,
  validThru: PropTypes.string.isRequired, 
  vendor: PropTypes.string.isRequired,
  bank: PropTypes.string.isRequired,
};

export default Card;
