let orderId = new URLSearchParams(window.location.search).get("id");

let numbeOrderID = document.getElementById("orderId");
numbeOrderID.textContent = orderId;