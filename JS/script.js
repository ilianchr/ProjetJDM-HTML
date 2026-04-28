document.addEventListener("DOMContentLoaded", () => {
  preRemplirSelect();
});

function preRemplirSelect() {
  const params = new URLSearchParams(window.location.search);
  const origine = params.get("origine");

  if (origine) {
    document.getElementById("modele").value = origine;
  }
}