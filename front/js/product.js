let productId = new URLSearchParams(window.location.search).get("id");

fetch("http://localhost:3000/api/products/" + productId)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then((product) => {
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

    product.colors.forEach((c) => {
      let productOption = document.createElement("option");
      productColor.appendChild(productOption);

      productOption.setAttribute("value", c);
      productOption.textContent = c;
    });
  });

// --------------------

// console.log(localStorage);
let addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", (e) => {
  let colorKanap = document.getElementById("colors").value;
  let quantityKanap = document.getElementById("quantity").value;

  const newProduct = {
    id: productId,
    quantity: Number(quantityKanap),
    color: colorKanap,
  };

  // console.log(newProduct);
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
    // recupère le kanap dans le panier
    const localcart = localStorage.getItem("cart");
    let cart = [];

    if (localcart != null) {
      cart = JSON.parse(localcart);
    }

    // ajout au panier et ne pas dupliquer le kanap
    let foundKanap = cart.find(
      (c) => c.id == newProduct.id && c.color == newProduct.color
    );
    if (foundKanap != undefined) {
      let totalqte = parseInt(foundKanap.quantity) + parseInt(newProduct.quantity);
      foundKanap.quantity = totalqte;
    } else {
      cart.push(newProduct);
    }

  // sauvegarde du produit dans le panier
  localStorage.setItem("cart", JSON.stringify(cart));
  // redirection vers le panier
  window.location.href = "./cart.html";
  }
});