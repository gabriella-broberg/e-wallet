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

// Dynamiska färger baserat på bank med mörkare blå toner för Handelsbanken och Nordea
const bankStyles = {
    "ICA Banken": {
      backgroundImage: 'linear-gradient(135deg, #ff512f, #dd2476)', // Gradient från rött till mörkrött/rosa
    },
    Nordea: {
      backgroundImage: 'linear-gradient(135deg, #27496d, #142850)', // Mörkblå gradient
    },
    Handelsbanken: {
      backgroundImage: 'linear-gradient(135deg, #005c97, #00274d)', // Djupare blå toner
    },
    Swedbank: {
      backgroundImage: 'linear-gradient(135deg, #f2994a, #f2c94c)', // Gradient från orange till guld
    },
    SEB: {
      backgroundImage: 'linear-gradient(135deg, #434343, #000000)', // Gradient från mörkgrå till svart
    },
  };
  


  // Logotyper för vendor
  const vendorLogos = {
    visa: visaLogo,           // Importerad SVG
    mastercard: mastercardLogo, // Importerad SVG
    amex: amexLogo            // Importerad SVG
  };

  return (
    <div className="card-container" style={bankStyles[bank] || { backgroundColor: '#9688b5' }}>
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
