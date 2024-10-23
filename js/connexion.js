document.addEventListener("DOMContentLoaded", () => {

  const login = document.getElementById("login");  // Changement de 'form' à 'login'
  const errorMessage = document.getElementById("errorMessage");
  const passwordInput = document.getElementById("password");

  login.addEventListener("submit", ConnexionFormSubmit);  // Utilisation de 'login' pour l'écouteur d'événements

  // Fonction pour gérer la soumission du formulaire
  function ConnexionFormSubmit(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = passwordInput.value;
 
    const errors = validateForm(email, password);

    if (errors.length > 0) {
      displayErrors(errors);
    } else {
      alert("Connexion réussie !");
      login.reset();  // Utilisation de 'login' pour réinitialiser le formulaire
      errorMessage.classList.add("hidden");
    }
  }

  // Fonction pour valider le formulaire
  function validateForm(email, password) {
    const errors = [];

    // Vérifie que l'email est renseigné
    if (!email) {
      errors.push("L'email est requis");
    }

    // Récupère les utilisateurs enregistrés dans le localStorage
    const existingUsers = JSON.parse(localStorage.getItem("userData") || "[]");

    // Vérifie que l'email existe
    const user = existingUsers.find(user => user.mail === email);
    if (!user) {
      errors.push("Cet email n'est pas enregistré");
    } else {
      // Vérifie que le mot de passe correspond à l'email
      if (user.pwd !== password) {
        errors.push("Le mot de passe est incorrect");
      }
      sessionStorage.setItem("idSession", JSON.stringify(user))
      window.location.href = "http://127.0.0.1:5500/050projet/memory/compte.html";
    }

    return errors;
  }

  // Fonction pour afficher les erreurs
  function displayErrors(errors) {
    errorMessage.innerHTML = errors.join("<br>");
    errorMessage.classList.remove("hidden");
  }

});
