// récupération de l'id dans l'url
let orderId = new URLSearchParams(window.location.search).get("id");

// inséré l'id dans numbeOrderID pour le numéro de commande
let numbeOrderID = document.getElementById("orderId");
numbeOrderID.textContent = orderId;