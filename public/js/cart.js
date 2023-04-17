// Gestion du panier.
// récupération des données du localStorage.
const localcart = JSON.parse(localStorage.getItem("cart"));
// Si le localStorage est vide afficher que le panier est vide.
if (localcart == 0 || localcart === null) {
  document.querySelector("#cartAndFormContainer > h1").textContent =
    "Votre panier est vide";
  document.querySelector("#totalQuantity").innerText = "0";
  document.querySelector("#totalPrice").innerText = "0";
} else {
  /** Pour chaque élément dans le localStorage
   * Je requête l'API pour récupérer les données.
   * récupération de la réponse au format json.
   * récupération de la vrai réponse :
   * excécute les functions suivantes.
   */
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
        validForm();
      })
      .catch((error) => {
        let errorMessage = document.getElementById("cart__items");
        errorMessage.textContent =
          "Nous avons rencontrez des difficultés techniques. Nous vous invitons à réessayer ultérieurement et nous nous excusons pour la gène occasionnée.";
        errorMessage.style.fontSize = "30px";
        errorMessage.style.textAlign = "center";
      });
  });

  /** Création de article dans le panier avec image, nom, la couleur, le pirx, la quantité et l'option supprimer.
   * exmple dans la page cart.html
   */
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

    // récupération de l'id et de la couleur pour la fontion supprimer
    const kanapId = deleteItem.closest(".cart__item").dataset.id;
    const kanapColor = deleteItem.closest(".cart__item").dataset.color;
    const deleteArticle = deleteItem.closest("article");

    // évènement, au click sur l'option supprimer excécuter la fonction supprimer
    deleteItem.addEventListener("click", () => {
      deleteKanap(kanapId, kanapColor, deleteArticle);
      const localcart = JSON.parse(localStorage.getItem("cart"));
      if (localcart == 0 || localcart === null) {
        document.querySelector("#cartAndFormContainer > h1").textContent =
          "Votre panier est vide";
      }
    });
  }

  /** Afficher la quantité total des produits.
   * Initialisation du tableau totaleQte,
   * pour chaque produit dans le localStorage
   * ajoute la quantité à totaleQty
   * ajout du nombre obtenu (totaleQty) à tatoleQte
   * le texte de tatolKanap est tatoleQty.
   */
  function totalQte() {
    const totalKanap = document.getElementById("totalQuantity");
    const localcart = JSON.parse(localStorage.getItem("cart"));
    let totalQte = [];
    let totaleQty = 0;
    localcart.forEach((q) => {
      totaleQty += parseInt(q.quantity);
    });
    totalQte.push(totaleQty);
    totalKanap.textContent = totaleQty;
  }

  /** Afficher le prix total des produits.
   * Sélectionne les éléments nécessaire, le prix et la quantité de chaque produit, le prix total.
   * initialisation du prix total
   * récupération des prix sur la page( mis en nombre), pour multiplier par la quantité
   * le texte de price est totalPrice.
   */
  function totalPrice() {
    const price = document.getElementById("totalPrice");
    let qte = document.querySelectorAll(".itemQuantity");
    let getPrice = document.querySelectorAll(
      ".cart__item__content__description "
    );
    let totalPrice = 0;
    for (let i = 0; i < getPrice.length; i++) {
      totalPrice +=
        parseInt(getPrice[i].lastElementChild.textContent) * qte[i].value;
    }
    price.textContent = totalPrice;
  }

  /** Afficher le changement de la quantité des produits.
   * Nouvelle constance pour donner sa valeur à l'input.
   * Sélectionne l'article ou il y a le changement,
   * récupération de l'id et de la couleur
   * pour chaque produit dans le localStorage.
   * La quantité dans le localStorage prends la valeur de l'input.
   * Enregistre les changement dans le localStorage,
   * rechargement de la page pour actualiser la quantité.
   */
  function changeQte() {
    const qteItem = document.querySelectorAll(".itemQuantity");
    qteItem.forEach((qteItem) => {
      qteItem.addEventListener("change", () => {
        const newQte = qteItem.value;
        qteItem.textContent = newQte;
        let article = qteItem.closest("article");
        const localcart = JSON.parse(localStorage.getItem("cart"));
        let kanapId = article.getAttribute("data-id");
        let kanapColor = article.getAttribute("data-color");
        localcart.forEach((lCart) => {
          const productLs = lCart;
          if (kanapId === productLs.id && kanapColor === productLs.color) {
            productLs.quantity = newQte;
            localStorage.setItem("cart", JSON.stringify(localcart));
          }
        });
        totalQte();
      });
    });
  }

  /** supprimer un article du panier.
   * Constance pour filtrer la selection pour la suppression du produit,
   * initialisation de newCart.
   * Enregistrement de newCart dans le localStorage,
   * rechagement de la page.
   */
  function deleteKanap(kanapId, kanapColor, deleteArticle) {
    const localcart = JSON.parse(localStorage.getItem("cart"));

    const cartFilter = localcart.filter(
      (p) =>
        (p.id !== kanapId && p.color !== kanapColor) ||
        (p.id === kanapId && p.color !== kanapColor)
    );
    let newCart = cartFilter;
    localStorage.setItem("cart", JSON.stringify(newCart));
    deleteArticle.remove();
    totalPrice();
    totalQte();
  }

  /** Validation du formulaire avant l'envoie au back.
   * récupération des éléments nécessaire pour vérifier et valider.
   * regex pour la validation des données entrées dans le formulaire,
   * Si input non validé par le regex alors un message d'erreur s'affiche.
   */
  function validForm() {
    let form = document.querySelector(".cart__order__form");
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let eMail = document.getElementById("email");

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
    const reMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

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
        return false;
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
        return false;
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
        return false;
      }
    });
    eMail.addEventListener("change", (e) => {
      let eMail = e.target.value;
      // console.log(reMail.test(eMail));
      // console.log(reMail.test(eMail));
      if (reMail.test(eMail)) {
        eMailError.innerText = "";
        return true;
      } else {
        eMailError.innerText =
          "champs incorrecte, veuillez renseigner votre Email. Exemple : test@gmail.com";
        return false;
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (
        reName.test(firstName.value) &&
        reName.test(lastName.value) &&
        reAdress.test(address.value) &&
        reAdress.test(city.value) &&
        reMail.test(eMail.value)
      ) {
        confirmation();
      }
    });
  }

  /** Confirmation de la commande.
   * Récupération de tout les id du panier dans un tableau products.
   * Au click du bouton "Commander",
   * création de "contact",
   * envoie du tableau products et contact au back avec fetch POST.
   * Nettoyage du localStorage et redirection vers la page confirmation avec id des products.
   */
  function confirmation() {
    let orderBtn = document.getElementById("order");
    let eMail = document.getElementById("email");

    let products = [];
    localcart.forEach((prod) => {
      products.push(prod.id);
    });

    let contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      eMail: eMail.value,
    };
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
      .then(() => {
        try {
          const orderId = products;
          localStorage.clear();
          location.href = "confirmation.html?id=" + orderId;
        } catch (e) {
          console.log(e);
        }
      });
  }
}
