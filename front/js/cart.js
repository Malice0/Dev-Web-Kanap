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
      confirmation(l);
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
function confirmation(l) {
  let form = document.getElementById("cart__order__form");
  let contactSend = [];

  // récupération des donnéees du form
  let orderBtn = document.getElementById("order");

  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let address = document.getElementById("address");
  let city = document.getElementById("city");
  let eMail = document.getElementById("email");

  // Formulaire Error
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

  const reName = /^[A-Z a-zà-ű]{3,20}[^\d]$/;
  const reAdress = /[\wà-ű ']/gi;
  const reMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  firstName.addEventListener("change", (e) => {
    let name = e.target.value;
    if (reName.test(name)) {
      firstNameError.innerText = "";
      return true;
    } else {
      firstNameError.innerText =
        "champs incorrecte, veuillez renseigner votre prénom.";
      return false;
    }
  });

  lastName.addEventListener("change", (e) => {
    let lastName = e.target.value;
    if (reName.test(lastName)) {
      lastNameError.innerText = "";
      return true;
    } else {
      lastNameError.innerText =
        "champs incorrecte, veuillez renseigner votre nom.";
    }
  });

  address.addEventListener("change", (e) => {
    let address = e.target.value;
    if (reAdress.test(address)) {
      addressError.innerText = "";
      return true;
    } else {
      addressError.innerText =
        "champs incorrecte, veuillez renseigner votre addresse.";
    }
  });

  city.addEventListener("change", (e) => {
    let city = e.target.value;
    if (reAdress.test(city)) {
      cityError.innerText = "";
      return true;
    } else {
      cityError.innerText =
        "champs incorrecte, veuillez renseigner votre ville.";
    }
  });

  eMail.addEventListener("change", (e) => {
    let eMail = e.target.value;
    if (reMail.test(eMail)) {
      eMailError.innerText = "";
      return true;
    } else {
      eMailError.innerText =
        "champs incorrecte, veuillez renseigner votre Email.";
    }
  });

  orderBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // regrouper les éléments pour ...
    let contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      eMail: eMail.value,
    };
    contactSend.push(l.id, contact);
    console.log(contactSend);
    // requête POST
    // fetch("http://localhost:3000/api/products/order", {
    //   method: "POST",
    //   headers: {
    //     accept: "application/json",
    //     "content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     contactSend,
    //   }),
    // })
    //   .then(function (response) {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //   })
    //   .then((result) => {
    //     let resultSend = response.json();
    //     let orderId = resultSend.orderId;
    //     alert(result.message);
    //   });
  });
}

// function send() {
//   let cart = JSON.parse(localStorage.getItem("produits"));
//   // => si tout est ok, alors...
//   if (cart !== null &&
//     verifFirstName() &&
//     verifLastName() &&
//     verifAddress() &&
//     verifCity() &&
//     verifEmail()
//   ) {
//     console.log("fonction ok", cart);

//     fetch("http://localhost:3000/api/products/order", {
//       method: "POST",
//       body: JSON.stringify({
//         contact,
//         products: products, //cart.id,
//       }),
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     })
//       // Récupération et stockage de la réponse de l'API (orderId)

//       .then((response) => {
//         return response.json();
//       })
//       .then((server) => {
//         const orderId = server.orderId;

//         if (orderId != "") {
//           // Si l'orderId a bien été récupéré, on redirige l'utilisateur vers la page de Confirmation
//           location.href = "confirmation.html?orderid=" + orderId;
//         }
//       });
//   } //else {
//     //alert(
//       //"Envoie impossible, veuillez bien commander des produits avant l'envoie."
//     //);
//     console.log("fonction non validée");
//  // }
// }
