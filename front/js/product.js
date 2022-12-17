let productId = new URLSearchParams(window.location.search).get("id");
// console.log(productId);

let productImg = document.createElement("img");
productImg.setAttribute("src", "../images/logo.png");
productImg.setAttribute("alt", "Photographie d'un canapé");
let itemImg = document.querySelector(".item__img");
itemImg.appendChild(productImg);

fetch("http://localhost:3000/api/products/" + productId)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then((product) => {
    let productName = document.getElementById("title");
    productName.textContent = product.name;

    let productPrice = document.getElementById("price");
    productPrice.textContent = product.price;

    let productDescription = document.getElementById("description");
    productDescription.textContent = product.description;

    // console.log(product);

    let productColor = document.querySelector("#colors");
    // productColor.

    // console.log(productColor);


    product.colors.forEach((c) => {

      let productOption = document.createElement("option");
      productColor.appendChild(productOption);

      productOption.setAttribute("value", c);
      productOption.textContent = c;

      console.log(productOption);
      // console.log(c);
    });
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