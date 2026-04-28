document.addEventListener("DOMContentLoaded", () => {
  preRemplirSelect();
});

function preRemplirSelect() {
  const params = new URLSearchParams(window.location.search);
  const origine = params.get("origine");
  const selectModele = document.getElementById("modele");

  if (origine && selectModele) {
    selectModele.value = origine;
  }
}