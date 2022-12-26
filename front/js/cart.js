// getcarts()
const localcart = JSON.parse(localStorage.getItem("cart"));

// console.log(localcart.quantity);
localcart.forEach((l) => {
  // console.log(l);
  fetch("http://localhost:3000/api/products/" + l.id)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then((p) => {
      displayProduct(p, l);
      totalQte();
      totalPrice();
      changeQte();
      deleteKanap();
    });
});
function displayProduct(p, l) {
  const cartItems = document.getElementById("cart__items");

  let cartItem = document.createElement("article");
  cartItems.appendChild(cartItem);
  cartItem.classList.add("cart__item");
  cartItem.dataset.id = l.id;
  cartItem.dataset.color = l.color;

  let divImg = document.createElement("div");
  cartItem.appendChild(divImg);
  divImg.classList.add("cart__item__img");

  let itemImg = document.createElement("img");
  divImg.appendChild(itemImg);
  itemImg.setAttribute("src", p.imageUrl);
  itemImg.setAttribute("alt", p.altTxt);

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
  itemTitle.textContent = p.name;
  itemColor.textContent = l.color;
  itemPrice.textContent = `${p.price} €`;

  let divSettings = document.createElement("div");
  divContent.appendChild(divSettings);
  divSettings.classList.add("cart__item__content__settings");

  let divSettingsQuantity = document.createElement("div");
  divSettings.appendChild(divSettingsQuantity);
  divSettingsQuantity.classList.add("cart__item__content__settings__quantity");

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
  qteInput.setAttribute("value", l.quantity);
  // console.log(l);

  let divSettingsDelete = document.createElement("div");
  divSettings.appendChild(divSettingsDelete);
  divSettingsDelete.classList.add("cart__item__content__settings__delete");

  let deleteItem = document.createElement("p");
  divSettingsDelete.appendChild(deleteItem);
  deleteItem.classList.add("deleteItem");
  deleteItem.textContent = "Supprimer";
  totalQte();
}

function totalQte() {
  const totalKanap = document.getElementById("totalQuantity");
  const localcart = JSON.parse(localStorage.getItem("cart"));
  let totalQte = [];
  let totaleQty = 0;

  localcart.forEach((q) => {
    totaleQty += q.quantity;
  });

  totalQte.push(totaleQty);
  totalKanap.textContent = totaleQty;
}

function totalPrice() {
  // A revoir
  const price = document.getElementById("totalPrice");
  let qte = document.querySelectorAll(".itemQuantity");
  let getPrice = document.querySelectorAll(".cart__item__content__description");
  let totalPrice = 0;

  for (let i = 0; i < getPrice.length; i++) {
    // récupération du prix sur la page( mis en number)
    totalPrice +=
      parseInt(getPrice[i].lastElementChild.textContent) * qte[i].value;
  }

  price.textContent = totalPrice;
}

// changement quantité
function changeQte() {
  const qteItem = document.querySelectorAll(".itemQuantity");
  // console.log();
  qteItem.forEach((qteItem) => {
    // console.log(qteItem);
    qteItem.addEventListener("change", () => {
      const newQte = qteItem.value;
      console.log(newQte);
      qteItem.textContent = newQte;
      let article = qteItem.closest("article");
      const localcart = JSON.parse(localStorage.getItem("cart"));
      let kanapId = article.getAttribute("data-id");
      let kanapColor = article.getAttribute("data-color");
      for (let i = 0; i < localcart.length; i++) {
        const productLs = localcart[i];
        if (kanapId === productLs.id && kanapColor === productLs.color) {
          productLs.quantity = newQte;
          localStorage.setItem("cart", JSON.stringify(localcart));
        }
      }
      // totalQte();
      location.reload();
    });
  });
}
// supprimer un article
function deleteKanap() {
  let deleteItem = document.querySelectorAll(".cart__item .deleteItem");
  deleteItem.forEach((d) => {
    d.addEventListener("click", () => {
      let article = d.closest("article");
      const localcart = JSON.parse(localStorage.getItem("cart"));
      let kanapId = article.getAttribute("data-id");
      let kanapColor = article.getAttribute("data-color");
      localcart.forEach((l) => {
        const cart = localcart.filter(
          (p) => p.id !== l.id && p.color !== l.color
        );
        localStorage.setItem("cart", JSON.stringify(cart));
        article.remove();
        if (localcart === null || localcart == []) {
          document.querySelector("h1").textContent = "Votre panier est vide";
          document.getElementById("totalQuantity").innerText = "0";
          document.getElementById("totalPrice").innerText = "0";
        } else {
          document.querySelector("h1").textContent = "Votre panier est vide";
          totalQte();
          totalPrice();
        }
      });
    });
  });
}

// -------------
// confirmation

// récupération des donnéees du form
let orderBtn = document.getElementById("order");

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let eMail = document.getElementById("email");

// Formulaire Error querySelector
let firstNameError = document.getElementById("firstNameErrorMsg");
firstNameError.style.color = "red";

let lastNameError = document.getElementById("lastNameErrorMsg");
lastNameError.style.color = "red";

let addressError = document.getElementById("addressErrorMsg");
addressError.style.color = "red";

let cityError = document.getElementById("cityErrorMsg");
cityError.style.color = "red";

let eMailError = document.getElementById("emailErrorMsg");
eMailError.style.color = "red";

// regrouper les éléments pour ...
let contact = {
  firstName: firstName.value,
  lastName: lastName.value,
  address: address.value,
  city: city.value,
  eMail: eMail.value,
};
// console.log(contact);

orderBtn.addEventListener("click", (e) => {
  e.preventDefault;
});
