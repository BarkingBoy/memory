import {
  emailValidator,
  testPasswordForce,
  userNameValidator,
  passwordValidator,
} from "./validator.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  const errorMessage = document.getElementById("errorMessage");
  const passwordInput = document.getElementById("password");
  const passwordForce = document.getElementById("passwordForce");

  // Écouteur pour la saisie du mot de passe, mise à jour de la force en direct
  passwordInput.addEventListener("input", updatePasswordStrength);

  form.addEventListener("submit", handleFormSubmit);

  function updatePasswordStrength() {
    const password = passwordInput.value;
    const force = testPasswordForce(password);

    console.log("Force du mot de passe:", force);
    passwordForce.textContent = `Niveau de sécurité : ${force}`;

    passwordForce.classList.remove("force-faible", "force-moyen", "force-fort");
    passwordForce.classList.add(`force-${force}`);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = passwordInput.value;
    const name = document.getElementById("name").value;
    const passwordConfirm = document.getElementById("password-confirm").value;

    const errors = validateForm(email, password, name, passwordConfirm);

    if (errors.length > 0) {
      displayErrors(errors);
    } else {
      saveUserData(email, password, name);
      alert("Inscription réussie !");
      window.location.href =
        "http://127.0.0.1:5500/050projet/memory/connexion.html";
      form.reset();
      errorMessage.classList.add("hidden");
    }
  }

  function validateForm(email, password, name, passwordConfirm) {
    const errors = [];
    if (!emailValidator(email)) errors.push("L'email est requis");

    const existingUsers = JSON.parse(localStorage.getItem("userData") || "[]");
    const emailExists = existingUsers.some((user) => user.mail === email);
    if (emailExists) {
      errors.push("Cet email est déjà enregistré");
    }
    if (!passwordValidator(password)) errors.push("Le mot de passe est requis");
    if (!userNameValidator(name)) errors.push("Le pseudo est requis");
    if (passwordConfirm !== password)
      errors.push("Les deux mots de passe ne correspondent pas");
    console.log(errors);

    return errors;
  }

  function displayErrors(errors) {
    errorMessage.innerHTML = errors.join("<br>");
    errorMessage.style.display = "block";
  }

  function saveUserData(email, password, name) {
    const userData = { mail: email, pwd: password, pseudo: name };
    console.log(userData);

    const existingUsers = JSON.parse(localStorage.getItem("userData") || "[]");

    existingUsers.push(userData);

    localStorage.setItem("userData", JSON.stringify(existingUsers));
    console.log(existingUsers);
  }
});
