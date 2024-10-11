
export const validateCardDetails = (name, value, errors) => {
    const newErrors = { ...errors };
  
    if (name === 'cardNumber') {
      const formattedCardNumber = value
        .replace(/\D/g, '') // Remove non-digit characters
        .slice(0, 16) // Limit to 16 digits
        .replace(/(.{4})/g, '$1 ') // Add a space every four digits
        .trim();
  
      if (value.replace(/\s/g, '').match(/\D/g)) {
        newErrors.cardNumber = 'Only numbers are allowed for the card number.';
      } else {
        newErrors.cardNumber = '';
      }
      return { newValue: formattedCardNumber, newErrors };
    }
  
    if (name === 'validThru') {
      let formattedValidThru = value.replace(/\D/g, ''); // Remove non-digit characters
  
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
  
      if (formattedValidThru.length === 5) {
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
      }
  
      return { newValue: formattedValidThru, newErrors };
    }
  
    if (name === 'ccv') {
      const formattedCCV = value.replace(/\D/g, '').slice(0, 3);
      if (value.match(/\D/g)) {
        newErrors.ccv = 'Only numbers are allowed for the CCV.';
      } else {
        newErrors.ccv = '';
      }
      return { newValue: formattedCCV, newErrors };
    }
  
    if (name === 'cardHolder') {
      const formattedCardHolder = value.replace(/[^a-zA-Z\s]/g, '');
      if (value.match(/[^a-zA-Z\s]/g)) {
        newErrors.cardHolder = 'Only letters are allowed for the cardholder´s name.';
      } else {
        newErrors.cardHolder = '';
      }
      return { newValue: formattedCardHolder, newErrors };
    }
  
    // Default case if no specific validation is needed
    return { newValue: value, newErrors };
  };
  