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
  // e.preventDefault();

  let colorKanap = document.getElementById("colors").value;
  let quantityKanap = document.getElementById("quantity").value;

  const newProduct = {
    id: productId,
    quantity: Number(quantityKanap),
    color: colorKanap,
  };

  console.log(newProduct);
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
  }

  // sauvegarde du produit dans le panier

  // recupère le kanap dans le panier
  const localcart = localStorage.getItem("cart");
  let cart = [];

  if (localcart != null) {
    cart = JSON.parse(localcart);
  }

  console.log(cart);

  // cart.push(newProduct);

  // ajout au panier
  let foundKanap = cart.find(
    (c) => c.id == newProduct.id && c.color == newProduct.color
  );
  if (foundKanap != undefined) {
    let totalqte = foundKanap.quantity + newProduct.quantity;
    foundKanap.quantity = totalqte;
  } else {
  cart.push(newProduct);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
});

// _id
// .querySelector("#quantity")
// .querySelector("#colors")
// !use localStorage!
// ++ dans le panier, il faut que la value = 0 += product
// += dans le panier si _id + #colors on joute juste la quantité
// Je pense direct à switch car if else il ya aura trop de condition

//  !Attention multiplication inutile des products!
//
//