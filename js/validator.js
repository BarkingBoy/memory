const emailValidator = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/;
  return emailRegex.test(email);
};

const passwordValidator = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{6,}$/;
  return passwordRegex.test(password);
};

const userNameValidator = (name) => {
  const nameRegex = /^.{3,}$/;
  return nameRegex.test(name);
};

const testPasswordForce = (password) => {
  const hasNumber = /\d/;
  const hasSymbol = /[!*_]/;

  if (
    password.length >= 9 &&
    hasNumber.test(password) &&
    hasSymbol.test(password)
  ) {
    return "fort";
  }
  if (password.length < 6) {
    return "faible";
  }
  if (
    password.length >= 6 &&
    (hasNumber.test(password) || hasSymbol.test(password))
  ) {
    return "moyen";
  }

  return "faible"; 
};

export {
  emailValidator,
  passwordValidator,
  userNameValidator,
  testPasswordForce,
};


