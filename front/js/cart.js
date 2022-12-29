const localcart = JSON.parse(localStorage.getItem("cart"));
if (localcart == [] || localcart === null) {
  document.querySelector("#cartAndFormContainer > h1").textContent =
    "Votre panier est vide";
  document.querySelector("#totalQuantity").textc = "0";
  document.querySelector("#totalPrice").innerText = "0";
} else {
  localcart.forEach((l) => {
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
    qteInput.setAttribute("value", l.quantity);

    let divSettingsDelete = document.createElement("div");
    divSettings.appendChild(divSettingsDelete);
    divSettingsDelete.classList.add("cart__item__content__settings__delete");

    let deleteItem = document.createElement("p");
    divSettingsDelete.appendChild(deleteItem);
    deleteItem.classList.add("deleteItem");
    deleteItem.textContent = "Supprimer";

    const kanapId = deleteItem.closest(".cart__item").dataset.id;
    const kanapColor = deleteItem.closest(".cart__item").dataset.color;

    deleteItem.addEventListener("click", () => {
      deleteKanap(kanapId, kanapColor);
    });
  }

  // Afficher la quantité total des produits
  function totalQte() {
    const totalKanap = document.getElementById("totalQuantity");
    const localcart = JSON.parse(localStorage.getItem("cart"));
    // initialisation du tableau totaleQty
    let totalQte = [];
    let totaleQty = 0;
    // pour chaque produit dans le localStorage
    localcart.forEach((q) => {
      // ajoute la quantité et est égale à totaleQty
      totaleQty += parseInt(q.quantity);
    });
    // ajout du nombre obtenu (totaleQty) à tatoleQte
    totalQte.push(totaleQty);
    // le texte de tatolKanap est tatoleQty
    totalKanap.textContent = totaleQty;
  }

  // Afficher le prix total des produits
  function totalPrice() {
    // sélectionne les éléments nécessaire, le prix et la quantité de chaque produit, le prix total.
    const price = document.getElementById("totalPrice");
    let qte = document.querySelectorAll(".itemQuantity");
    let getPrice = document.querySelectorAll(
      ".cart__item__content__description "
    );
    // initialisation du prix total
    let totalPrice = 0;
    for (let i = 0; i < getPrice.length; i++) {
      // récupération des prix sur la page( mis en nombre), pour multiplier par la quantité
      totalPrice +=
        parseInt(getPrice[i].lastElementChild.textContent) * qte[i].value;
    }
    price.textContent = totalPrice;
  }

  // Afficher le changement de la quantité des produits
  function changeQte() {
    const qteItem = document.querySelectorAll(".itemQuantity");
    qteItem.forEach((qteItem) => {
      qteItem.addEventListener("change", () => {
        // nouvelle constance pour donner sa valeur à l'input
        const newQte = qteItem.value;
        qteItem.textContent = newQte;
        // sélectionne l'article ou il y a le changement
        let article = qteItem.closest("article");
        const localcart = JSON.parse(localStorage.getItem("cart"));
        // récupération de l'id et de la couleur de l'article
        let kanapId = article.getAttribute("data-id");
        let kanapColor = article.getAttribute("data-color");
        // pour chaque produit dans le localStorage
        localcart.forEach((lCart) => {
          const productLs = lCart;
          // La quantité dans le localStorage prends la valeur de l'input
          if (kanapId === productLs.id && kanapColor === productLs.color) {
            productLs.quantity = newQte;
            // enregistre les changement dans le localStorage
            localStorage.setItem("cart", JSON.stringify(localcart));
          }
        });
        // rechargement de la page pour actualiser la quantité
        location.reload();
      });
    });
  }

  // supprimer un article du panier
  function deleteKanap(kanapId, kanapColor) {
    const localcart = JSON.parse(localStorage.getItem("cart"));
    const cartFilter = localcart.filter(
      (p) =>
        (p.id !== kanapId && p.color !== kanapColor) ||
        (p.id === kanapId && p.color !== kanapColor)
    );
    let newCart = cartFilter;
    localStorage.setItem("cart", JSON.stringify(newCart));
    location.reload();
  }

  // confirmation de la commande
  function confirmation(l) {
    let products = [];
    localcart.forEach((id) => {
      // console.log(id);
      products.push(id.id);
    });
    // console.log(products);
    // récupération des donnéees du form
    let orderBtn = document.getElementById("order");

    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let eMail = document.getElementById("email");

    // Formulaire message d'erreur
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

    // regex pour la validation des données entrées dans le formulaire
    const reName = /^[A-Z a-zà-ű]{3,20}[^\d]$/;
    const reAdress = /[\wà-ű ']/gi;
    const reMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    // Si input non validé par le regex alors un message s'affiche
    firstName.addEventListener("change", (e) => {
      let name = e.target.value;
      if (reName.test(name)) {
        firstNameError.innerText = "";
        return true;
      } else {
        firstNameError.innerText =
          "champs incorrecte, veuillez renseigner votre prénom. Exemple : Roberto";
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
          "champs incorrecte, veuillez renseigner votre nom. Exemple : DUPONT";
      }
    });

    address.addEventListener("change", (e) => {
      let address = e.target.value;
      if (reAdress.test(address)) {
        addressError.innerText = "";
        return true;
      } else {
        addressError.innerText =
          "champs incorrecte, veuillez renseigner votre addresse. Exemple : 20 avenue Marine LEPEN";
      }
    });

    city.addEventListener("change", (e) => {
      let city = e.target.value;
      if (reAdress.test(city)) {
        cityError.innerText = "";
        return true;
      } else {
        cityError.innerText =
          "champs incorrecte, veuillez renseigner votre ville. Exemple : Paris";
      }
    });

    eMail.addEventListener("change", (e) => {
      let eMail = e.target.value;
      if (reMail.test(eMail)) {
        eMailError.innerText = "";
        return true;
      } else {
        eMailError.innerText =
          "champs incorrecte, veuillez renseigner votre Email. Exemple : test@gmail.com";
      }
    });

    // envoie des du tableau products et contact au back avec fetch POST
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
      products.push(l.id);
      // requête POST
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          products: products,
          contact: contact,
        }),
      })
        .then((response) => response.json())
        .then((id) => {
          try {
            const orderId = products;
            // nettoyer le localStorage et redirection vers la page confirmation avec id des products
            localStorage.clear();
            location.href = "confirmation.html?id=" + orderId;
          } catch (e) {
            console.log(e);
          }
        });
    });
  }
}
