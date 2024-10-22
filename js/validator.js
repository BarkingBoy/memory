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
    return nameRegex.test(name)
};


export { emailValidator, passwordValidator, userNameValidator };

/**
 * Mettre en place les vérifications sur chaque champ du formulaire d'inscription :
Le Nom d'utilisateur doit vérifier 3 caractères minimum.
L'email doit être un email valide.
Le mot de passe doit correspondre à la vérification du mot de passe et il doit faire au moins 6 caractères. Il doit posséder un symbole,un chiffre et des lettres.
 */