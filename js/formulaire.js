import {
  emailValidator,
  userNameValidator,
  passwordValidator,
} from "./validator.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  const errorMessage = document.getElementById;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;

    const errors = [];

    if (!emailValidator(email)) {
      errors.push("Erreur d'email");
    }
    if (!passwordValidator(password)) {
      errors.push("Erreur de mot de passe");
    }
    if (!userNameValidator(name)) {
      errors.push("Erreur de pseudo");
    }

    if (errors.length > 0) {
      errorMessage.textContent = errors.join("<br>");
      errorMessage.classList.remove("hidden");
    } else {
      const userData = {
        mail: email,
        pwd: password,
        pseudo: name,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      alert("Inscription réussie ! ");
      form.reset();
      errorMessage.classList.add("hidden");
    }
  });
});
