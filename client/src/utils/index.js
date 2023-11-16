const isNumber = (value) => {
  const regex = /^[0-9\b]+$/;
  return value === "" || regex.test(value);
};

const isValidEmail = (email) => {
  // Regular expression for validating an Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export { isNumber, isValidEmail };
