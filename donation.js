const organ = document.getElementById("organ");
organ.addEventListener("change", (e) => {
  const imgElement = document.getElementById("organ-image");
  const organImages = {
    Kidney: "img/kidney.png",
    Heart: "img/heart.png",
    Lungs: "img/lungs.png",
    Stomach: "img/stomach.png",
  };
  imgElement.src = organImages[e.target.value];
  imgElement.style.display = "block";
});