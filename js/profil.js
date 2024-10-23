document.addEventListener("DOMContentLoaded", () => {
  // Récupérer les informations de session
  const sessionData = sessionStorage.getItem("idSession");
  const tailleMemory = document.querySelector("#choix-taille-memory")
  const nombreDeCartes = parseInt(tailleMemory.value)
  sessionStorage.setItem("Taille memory", JSON.stringify(nombreDeCartes))

  if (sessionData) {
    // Parse les données JSON en objet
    const user = JSON.parse(sessionData);

    // Récupérer la section profile du DOM
    const profileSection = document.getElementById("profile");

    // Vérifier si l'élément profile existe
    if (profileSection) {
      profileSection.innerHTML = `
                <div>Bienvenue, ${user.pseudo} !</div>
                <div>Ton identifiant : ${user.mail}</div>`;
    } else {
      console.error("L'élément avec l'ID 'profile' est introuvable dans le DOM.");
    }

    // Afficher l'image exemple par défaut ou la première sélection
    affichageImageExemple();

    // Ajouter un écouteur d'événements sur le choix d'image
    const choixImageSelect = document.getElementById("choix-image");
    choixImageSelect.addEventListener("change", affichageImageExemple);
  } else {
    console.error("Aucun utilisateur connecté.");
  }

  function affichageImageExemple() {
    const choosedImage = document.querySelector("#choix-image").value; // récupère la valeur ici
    let choosedImageSrc;

    if (choosedImage === "chien") {
      choosedImageSrc = "./ressources/chiens/memory_details_chiens.png";
    } else if (choosedImage === "animal") {
      choosedImageSrc = "./ressources/animaux/memory_detail_animaux.png";
    }

    sessionStorage.setItem("ChoixImages", choosedImage)

    // Vérifier que l'image source est définie avant de l'afficher
    const imgExempleDiv = document.getElementById("img-exemple");
    imgExempleDiv.innerHTML = ""; // Effacer le contenu précédent

    if (choosedImageSrc) {
      // Créer l'élément image
      let imageExemple = document.createElement("img");
      imageExemple.src = choosedImageSrc;
      imageExemple.className = "image-exemple";

      // Ajouter l'image au div
      imgExempleDiv.appendChild(imageExemple);
    }
  }

  
    


});
