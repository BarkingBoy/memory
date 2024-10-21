function imageChien() {
  // Sélectionner une image aléatoire du dossier ressources/chien

  let randomIndex = Math.floor(Math.random() * 22) + 1;
  let img = new Image();
  img.src = "ressources/chiens/" + randomIndex + ".webp";
  img.setAttribute("class", "chien");
  img.setAttribute("alt", "chien");

  return img;
}

export { imageChien };
