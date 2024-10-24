document.addEventListener("DOMContentLoaded", () => {
  const login = document.getElementById("login");
  const errorMessage = document.getElementById("errorMessage");
  const passwordInput = document.getElementById("password");

  login.addEventListener("submit", ConnexionFormSubmit);

  function ConnexionFormSubmit(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = passwordInput.value;

    const errors = validateForm(email, password);

    if (errors.length > 0) {
      displayErrors(errors);
    } else {
      alert("Connexion réussie !");
      login.reset();
      errorMessage.classList.add("hidden");
    }
  }

  function validateForm(email, password) {
    const errors = [];

    if (!email) {
      errors.push("L'email est requis");
    }

    const existingUsers = JSON.parse(localStorage.getItem("userData") || "[]");
    console.log("Liste des utilisateurs enregistrés : ", existingUsers);

    // Cherche l'utilisateur correspondant à l'email
    const user = existingUsers.find((user) => user.mail === email);

    if (!user) {
      errors.push("Cet email n'est pas enregistré");
      console.log("Email non trouvé");
    } else {
      console.log("Utilisateur trouvé : ", user);

      if (user.pwd !== password) {
        errors.push("Le mot de passe est incorrect");
        console.log("Mot de passe incorrect");
      } else {
        sessionStorage.setItem("idSession", JSON.stringify(user));
        window.location.href =
          "http://127.0.0.1:5500/050projet/memory/compte.html";
        console.log("Connexion réussie, redirection vers le profil");
      }
    }

    return errors;
  }

  function displayErrors(errors) {
    errorMessage.innerHTML = errors.join("<br>");
    errorMessage.style.display = "block";
  }
});
