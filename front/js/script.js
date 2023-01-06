// requêter l'API pour afficher les produits sur la page d'accueil
fetch("http://localhost:3000/api/products")
  // récupération de la réponse au format json
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  // récupération de la vrai réponse
  .then((products) => {
    // pour chaque produit
    // création d'un lien dans lequel il y aura l'image le nom et la description.
    products.forEach((p) => {
      let productLink = document.createElement("a");
      productLink.setAttribute("href", `product.html?id=${p._id}`);
      let items = document.getElementById("items");
      items.appendChild(productLink);

      let productArticle = document.createElement("article");
      productLink.appendChild(productArticle);

      let productImg = document.createElement("img");
      productImg.setAttribute("src", p.imageUrl);
      productImg.setAttribute("alt", p.altTxt);
      productArticle.appendChild(productImg);

      let productName = document.createElement("h3");
      productName.classList.add("productName");
      productName.textContent = p.name;
      productArticle.appendChild(productName);

      let productDescription = document.createElement("p");
      productArticle.appendChild(productDescription);
      productDescription.classList.add("productDescription");
      productDescription.textContent = p.description;
    });
  })
  // Si erreur afficher un message d'erreur
  .catch((error) => {
    let errorMessage = items;
    errorMessage.textContent =
      "Nous avons rencontrez des difficultés techniques. Nous vous invitons à réessayer ultérieurement et nous nous excusons pour la gène occasionnée.";
    errorMessage.style.fontSize = "30px";
    errorMessage.style.textAlign = "center";
  });
