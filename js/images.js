function imageGeneration() {
  const dossier = sessionStorage.getItem("ChoixImages");

  let randomIndex = Math.floor(Math.random() * 22) + 1;
  let img = new Image();
  img.src = "ressources/" + dossier + "/" + randomIndex + ".webp";

  return img;
}

export { imageGeneration };
