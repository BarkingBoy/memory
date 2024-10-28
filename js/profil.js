document.addEventListener("DOMContentLoaded", () => {
  const sessionData = sessionStorage.getItem("idSession");
  const buttonDeconnexion = document.querySelector(".deconnexion");
  const profileSection = document.getElementById("profile");
  const imgExempleDiv = document.getElementById("img-exemple");
  const choixImageSelect = document.getElementById("choix-image");

  if (sessionData) {
    const { pseudo, mail } = JSON.parse(sessionData);
    buttonDeconnexion.style.display = "block";
    profileSection.innerHTML = `<div>Bienvenue, ${pseudo} !</div><div>Ton identifiant : ${mail}</div>`;

    buttonDeconnexion.addEventListener("click", () => {
      sessionStorage.clear();
      window.location.href = "index.html";
    });

    
  } else {
    buttonDeconnexion.style.display = "none";
  }

  choixImageSelect.addEventListener("change", affichageImageExemple);
  affichageImageExemple();

  function affichageImageExemple() {
    const choosedImage = choixImageSelect.value;
    const imageSources = {
      chiens: "./ressources/chiens/memory_details_chiens.png",
      animaux: "./ressources/animaux/memory_detail_animaux.png",
    };

    sessionStorage.setItem("ChoixImages", choosedImage);
    imgExempleDiv.innerHTML = "";
    const choosedImageSrc = imageSources[choosedImage];

    if (choosedImageSrc) {
      const img = document.createElement("img");
      img.src = choosedImageSrc;
      img.className = "image-exemple";
      imgExempleDiv.appendChild(img);
    }
  }
});
