// getcarts()
const localcart = JSON.parse(localStorage.getItem("cart"));
if (localcart === null) {
  document.querySelector("#cartAndFormContainer > h1").textContent =
    "Votre panier est vide";
}

localcart.forEach((l) => {
  fetch("http://localhost:3000/api/products/" + l.id)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then((p) => {
      console.log(p);
      const cartItems = document.getElementById("cart__items");
      let cartItem = document.createElement("article");
      cartItems.appendChild(cartItem);
      cartItem.classList.add("cart__item");

      cartItem.dataset.id = l.id; // source ?
      cartItem.dataset.color = l.color; // source ?
      // faut récupérer les données selectionné

      let divImg = document.createElement("div");
      cartItem.appendChild(divImg);
      divImg.classList.add("cart__item__img");

      let itemImg = document.createElement("img");
      divImg.appendChild(itemImg);
      itemImg.setAttribute("src", p.imageUrl); // source ?
      itemImg.setAttribute("alt", p.altTxt); // source ?

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
      itemTitle.textContent = p.name; // source ?
      itemColor.textContent = l.color; // source ?
      itemPrice.textContent = `${p.price} €`; // source ?

      let divSettings = document.createElement("div");
      divContent.appendChild(divSettings);
      divSettings.classList.add("cart__item__content__settings");

      let divSettingsQuantity = document.createElement("div");
      divSettings.appendChild(divSettingsQuantity);
      divSettingsQuantity.classList.add(
        "cart__item__content__settings__quantity"
      );

      let qte = document.createElement("p");
      divSettingsQuantity.appendChild(qte);
      qte.textContent = "Qté : ";

      let qteInput = document.createElement("input");
      divSettingsQuantity.appendChild(qteInput);
      qteInput.setAttribute("type", "number");
      qteInput.classList.add("itemQuantity");
      qteInput.setAttribute("name", "itemQuantity");
      qteInput.setAttribute("min", "1");
      qteInput.setAttribute("max", "100");
      qteInput.setAttribute("value", l.quantity); // source ?

      let divSettingsDelete = document.createElement("div");
      divSettings.appendChild(divSettingsDelete);
      divSettingsDelete.classList.add("cart__item__content__settings__delete");

      let deleteItem = document.createElement("p");
      divSettingsDelete.appendChild(deleteItem);
      deleteItem.classList.add("deleteItem");
      deleteItem.textContent = "Supprimer";
    });
});
// -------------
// ajouter les fonctions supprimer le kanap et modifier les quantity
// addEventlistener("change", => {})
// element.closet()
// modification dans le localStorage et DOM
// Viser data-id et data-color pour effectuer les modifications
