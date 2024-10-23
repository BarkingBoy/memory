function imageChien() {
  // Sélectionner une image aléatoire du dossier ressources/chien

  let randomIndex = Math.floor(Math.random() * 22) + 1;
  let img = new Image();
  img.src = "ressources/chiens/" + randomIndex + ".webp";
  img.setAttribute("class", "animal");
  img.setAttribute("alt", "animal");

  return img;
}

function imageAnimaux() {
  let randomIndex = Math.floor(Math.random() * 28) + 1;
  let img = new Image();
  img.src = "ressources/animaux/" + randomIndex + ".webp";
  img.setAttribute("class", "animal");
  img.setAttribute("alt", "animal");

  return img;
}

export { imageChien };
