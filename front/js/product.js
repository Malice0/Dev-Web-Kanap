// Récupération de l'id du produit dans l'url
let productId = new URLSearchParams(window.location.search).get("id");

// requêter l'API pour afficher les produits sur la page d'accueil
fetch("http://localhost:3000/api/products/" + productId)
  // récupération de la réponse au format json
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  // récupération de la vrai réponse
  .then((product) => {
    // Affichage de l'image le nom, le prix, la description, le choix de couleur et de quantité.
    let productImg = document.createElement("img");
    productImg.setAttribute("src", product.imageUrl);
    productImg.setAttribute("alt", product.altTxt);
    let itemImg = document.querySelector(".item__img");
    itemImg.appendChild(productImg);

    let productName = document.getElementById("title");
    productName.textContent = product.name;

    let productPrice = document.getElementById("price");
    productPrice.textContent = product.price;

    let productDescription = document.getElementById("description");
    productDescription.textContent = product.description;

    let productColor = document.querySelector("#colors");

    // Créer une option pour chaque couleur stocker dans l'API.
    product.colors.forEach((c) => {
      let productOption = document.createElement("option");
      productColor.appendChild(productOption);

      productOption.setAttribute("value", c);
      productOption.textContent = c;
    });
  });

// L'ajout au panier
let addToCart = document.getElementById("addToCart");
/** Au click
 * création d'un nouveau produit en récupérant son id, sa couleur et sa quantité,
 * Le produit est stocker dans le localStorage.
 * Si un produit est ajouter avec le même id et la même couleur, le produit n'est pas dupliquer et la quantité est ajouter
 * enregistrement du panier et redirection vers la page panier  */
addToCart.addEventListener("click", (e) => {
  let colorKanap = document.getElementById("colors").value;
  let quantityKanap = document.getElementById("quantity").value;

  const newProduct = {
    id: productId,
    quantity: Number(quantityKanap),
    color: colorKanap,
  };

  // Si quantité ou couleur ne sont pas défini alors message s'affiche
  if (
    quantityKanap == undefined ||
    quantityKanap == null ||
    quantityKanap < 1 ||
    quantityKanap > 100 ||
    colorKanap === "" ||
    colorKanap == null ||
    colorKanap == undefined
  ) {
    alert(
      "Veuillez sélectionner la couleur et la quantité (entre 1 et 100) du produit"
    );
  } else {
    const localcart = localStorage.getItem("cart");
    let cart = [];

    if (localcart != null) {
      cart = JSON.parse(localcart);
    }

    let foundKanap = cart.find(
      (c) => c.id == newProduct.id && c.color == newProduct.color
    );
    if (foundKanap != undefined) {
      let totalqte =
        parseInt(foundKanap.quantity) + parseInt(newProduct.quantity);
      foundKanap.quantity = totalqte;
    } else {
      cart.push(newProduct);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "./cart.html";
  }
});
