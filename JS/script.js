document.addEventListener("DOMContentLoaded", () => {
  preRemplirSelect();
  chargerDemarches();
});

function preRemplirSelect() {
  const params = new URLSearchParams(window.location.search);
  const origine = params.get("origine");
  const selectModele = document.getElementById("modele");

  if (origine && selectModele) {
    selectModele.value = origine;
  }
}

// Charger et afficher les demandes en cours dans le tableau
function chargerDemarches() {
  const tbody = document.querySelector(".profile-table tbody");
  if (!tbody) return;

  const demarches = getDemarchesFromStorage();
  
  if (demarches.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #999; padding: 2rem;">Aucune demande en cours</td></tr>';
    return;
  }

  tbody.innerHTML = '';
  demarches.forEach((demarche, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${demarche.type}</td>
      <td>${demarche.voiture}</td>
      <td>${demarche.nom}</td>
      <td>${demarche.email}</td>
      <td>${demarche.telephone}</td>
      <td>${demarche.date}</td>
      <td><button class="btn-small delete" onclick="supprimerDemarche(${index})">Supprimer</button></td>
    `;
    tbody.appendChild(row);
  });
}

// Récupérer les demandes du localStorage
function getDemarchesFromStorage() {
  const demarches = localStorage.getItem('demarches');
  return demarches ? JSON.parse(demarches) : [];
}

// Sauvegarder les demandes dans le localStorage
function saveDemarchesStorage(demarches) {
  localStorage.setItem('demarches', JSON.stringify(demarches));
}

// Ajouter une nouvelle demande (depuis formulaire contact ou devis)
function ajouterDemarche(type, voiture, nom, email, telephone) {
  const demarches = getDemarchesFromStorage();
  const date = new Date().toLocaleDateString('fr-FR');
  
  const nouvelleDemarche = {
    type: type,
    voiture: voiture,
    nom: nom,
    email: email,
    telephone: telephone,
    date: date
  };
  
  demarches.push(nouvelleDemarche);
  saveDemarchesStorage(demarches);
  
  alert('Demande enregistrée ! Vous pouvez la consulter dans votre profil.');
}

// Supprimer une demande
function supprimerDemarche(index) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
    const demarches = getDemarchesFromStorage();
    demarches.splice(index, 1);
    saveDemarchesStorage(demarches);
    chargerDemarches();
  }
}

// Soumettre le formulaire de contact
function soumettreContact(event) {
  event.preventDefault();
  
  const nom = document.getElementById('name') ? document.getElementById('name').value : '';
  const email = document.getElementById('email') ? document.getElementById('email').value : '';
  const tel = document.getElementById('tel') ? document.getElementById('tel').value : '';
  
  if (nom && email && tel) {
    ajouterDemarche('Contact', 'Pas de voiture spécifiée', nom, email, tel);
    event.target.reset();
  }
}

// Soumettre le formulaire de devis
function soumettreDevis(event) {
  event.preventDefault();
  
  const nom = document.getElementById('name') ? document.getElementById('name').value : '';
  const email = document.getElementById('email') ? document.getElementById('email').value : '';
  const tel = document.getElementById('tel') ? document.getElementById('tel').value : '';
  const modele = document.getElementById('modele') ? document.getElementById('modele').value : 'Modèle non spécifié';
  
  if (nom && email && tel) {
    ajouterDemarche('Devis', modele, nom, email, tel);
    event.target.reset();
  }
}