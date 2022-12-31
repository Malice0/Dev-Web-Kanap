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
    console.log("Le chargement des produits a rencontré un problème" + error);
    let errorMessage = document.createElement("h2");
    errorMessage.textContent =
      "Nous avons rencontrez des difficultés techniques et ne pouvons pas présenter les articles pour le moment. Nos équipes à l'oeuvre pour résoudre ce problème dans les plus brefs délais. Nous vous invitons à réessayer ultérieurement et nous nous excusons pour la gène occasionnée.";
    errorMessage.style.padding = "15px";
    productsList.appendChild(errorMessage);
  });
