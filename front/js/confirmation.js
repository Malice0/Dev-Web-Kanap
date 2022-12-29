// récupération de l'id dans l'url
let orderId = new URLSearchParams(window.location.search).get("id");

// inséré l'id dans numbeOrderID
let numbeOrderID = document.getElementById("orderId");
numbeOrderID.textContent = orderId;