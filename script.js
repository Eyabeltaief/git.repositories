function afficherPortfolio(nom, details) {
    document.getElementById('nom').innerText = "Portfolio de " + nom;
    document.getElementById('details').innerText = details;
    document.getElementById('portfolio').style.display = 'block';
}

function cacherPortfolio() {
    document.getElementById('portfolio').style.display = 'none';
}
