// // Récupération du formulaire et du paragraphe de message
const form = document.getElementById('formInscription');
const messageParag = document.getElementById('messageFormulaire');

// Fonction pour valider le mot de passe
function validatePassword(pwd) {
    const hasLower = /[a-z]/.test(pwd);          // au moins 1 minuscule
    const hasSymbol = /[^A-Za-z0-9]/.test(pwd);  // au moins 1 symbole
    const hasLength = pwd.length >= 8;           // 8 caractères min
    return hasLower && hasSymbol && hasLength;
}

// Validation prénom/nom : alphabétique + accents + tirets + min 3 caractères
function validateName(str) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\-]{3,}$/;
    return regex.test(str);
}

// Vérification âge >= 18 ans
function isAdult(dateString) {
    if (!dateString) return true; // si non obligatoire, on ignore
    const today = new Date();
    const birthDate = new Date(dateString);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    // Ajustement si l'anniversaire de l'année en cours n'est pas encore passé
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18;
}


// Fonction pour afficher un message d'erreur
function showError(msg) {
    messageParag.style.color = 'red';
    messageParag.innerHTML = "⚠️ " + msg;
}

// Fonction pour afficher un message de succès
function showSuccess(msg) {
    messageParag.style.color = 'green';
    messageParag.textContent = "✅ " + msg;
}

// Fonction pour colorer un champ erroné
function markInvalid(input) {
    if (input) input.style.backgroundColor = '#ffd6dc';
}

// Fonction pour réinitialiser la couleur d'un champ
function resetInputs() {
    const allInputs = form.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => input.style.backgroundColor = 'white');
}

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Empêche l'envoi réel

        resetInputs();

        // 1) Vérification HTML5 des champs requis
        if (!form.checkValidity()) {
            const firstInvalid = form.querySelector(':invalid');
            markInvalid(firstInvalid);
            showError("Vérifiez que tous les champs obligatoires (*) sont remplis correctement.");
            firstInvalid.focus();
            return;
        }

        // 2) Vérification du prénom
        const prenomInput = document.getElementById('prenom');
        if (!validateName(prenomInput.value.trim())) {
            markInvalid(prenomInput);
            showError("Le prénom doit contenir au moins 3 lettres et uniquement des caractères alphabétiques.");
            prenomInput.focus();
            return;
        }

        // 3) Vérification du nom
        const nomInput = document.getElementById('nom');
        if (!validateName(nomInput.value.trim())) {
            markInvalid(nomInput);
            showError("Le nom doit contenir au moins 3 lettres et uniquement des caractères alphabétiques.");
            nomInput.focus();
            return;
        }

        // 4) Vérification âge >= 18 ans
        const dateInput = document.getElementById('dateNaiss');
        if (dateInput.value && !isAdult(dateInput.value)) {
            markInvalid(dateInput);
            showError("Vous devez avoir au moins 18 ans pour créer un compte.");
            dateInput.focus();
            return;
        }

        // 5) Vérification du mot de passe
        const pwdInput = document.getElementById('password');
        const pwd = pwdInput.value;
        if (!validatePassword(pwd)) {
            markInvalid(pwdInput);
            showError(
                "Mot de passe invalide :<br>" +
                "• 1 lettre minuscule obligatoire<br>" +
                "• 1 symbole (ex : ! @ # $ % …)<br>" +
                "• 8 caractères minimum"
            );
            pwdInput.focus();
            return;
        }

        // 6) Vérification du genre
        const genre = form.querySelectorAll('input[name="genre"]');
        let genreChecked = false;
        genre.forEach(r => { if (r.checked) genreChecked = true; });
        if (!genreChecked) {
            genre.forEach(r => markInvalid(r.parentElement));
            showError("Veuillez sélectionner votre genre.");
            genre[0].focus();
            return;
        }

        // 7) Vérification checkbox box
        const boxes = form.querySelectorAll('input[type="checkbox"][name^="box_"]');
        let boxChecked = false;
        boxes.forEach(c => { if (c.checked) boxChecked = true; });
        if (!boxChecked) {
            boxes.forEach(c => markInvalid(c.parentElement));
            showError("Veuillez sélectionner au moins une préférence de box.");
            boxes[0].focus();
            return;
        }

        // 8) Vérification pays
        const paysInput = document.getElementById('pays');
        if (!paysInput.value) {
            markInvalid(paysInput);
            showError("Veuillez sélectionner votre pays.");
            paysInput.focus();
            return;
        }

        // 9) Vérification CGU
        const cgu = document.getElementById('cgu');
        if (!cgu.checked) {
            markInvalid(cgu.parentElement);
            showError("Vous devez accepter les conditions générales.");
            cgu.focus();
            return;
        }

        // Si tout est valide
        showSuccess("Inscription Envoyée Avec succès");

        // Décommenter pour envoyer réellement le formulaire :
        // form.submit();
    });
}
