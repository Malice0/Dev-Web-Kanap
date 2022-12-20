let cartItems = document.getElementById("cart__items");
let cartItem = document.createElement("article");
cartItem.classList.add("cart__item");
cartItems.appendChild(cartItem);
// cartItem.setAttribute("data-id", `${i.id}`);
// cartItem.setAttribute("data-color", `${i.}`);
// faut récupérer les données selectionné

console.log(cartItem);

let divImg = document.createElement("div");
cartItem.appendChild(divImg);
divImg.classList.add("cart__item__img");

let itemImg = document.createElement("img");
// itemImg.setAttribute("src", p.imageUrl);
// itemImg.setAttribute("alt", p.altTxt);
divImg.appendChild(itemImg);

let divContent = document.createElement("div");
cartItem.appendChild(divContent);
divContent.classList.add("cart__item__content");

let divDescription = document.createElement("div");
divContent.appendChild(divDescription);
divDescription.classList.add("cart__item__content__description");

let itemTitle = document.createElement("h2");
let itemColor = document.createElement("p");
let itemPrice = document.createElement("p");
divDescription.appendChild(itemTitle);
divDescription.appendChild(itemColor);
divDescription.appendChild(itemPrice);

let divSettings = document.createElement("div");
divContent.appendChild(divSettings);
divSettings.classList.add("cart__item__content__settings");

let divSettingsQuantity = document.createElement("div");
divSettings.appendChild(divSettingsQuantity);
divSettingsQuantity.classList.add("cart__item__content__settings__quantity");

let qte = document.createElement("p");
divSettingsQuantity.appendChild(qte);
let qteInput = document.createElement("input");
divSettingsQuantity.appendChild(qteInput);
qteInput.classList.add("itemQuantity")

let divSettingsDelete = document.createElement("div");
divSettings.appendChild(divSettingsDelete);
divSettingsDelete.classList.add("cart__item__content__settings__delete");

let deleteItem = document.createElement("p");
divSettingsDelete.appendChild(deleteItem);
deleteItem.classList.add("deleteItem");
deleteItem.textContent = "Supprimer";

// -------------
// Il me faut terminer d'attribuer les attribute pour l'article et l'input
// Je dois compléter les champs avec les données product