fetch("http://localhost:3000/api/products")
    .then (function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then ((products) => {
        products.forEach((p) => { console.log(p)
            let productLink = document.createElement("a");
            productLink.setAttribute("href", `product.html?id=${(p)._id}`);
            let item = document.getElementById("items");
            items.appendChild(productLink);
            
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            let productImg = document.createElement("img");
            productImg.setAttribute("src", (p).imageUrl);
            productImg.setAttribute("alt", (p).altTxt);
            productArticle.appendChild(productImg);
            
            let productName = document.createElement("h3");
            productName.classList.add("productName");
            productName.textContent = (p).name;
            productArticle.appendChild(productName);

            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productDescription");
            productDescription.textContent = (p).description;
        });
    })
    .catch((error) => {
        console.log("Le chargement des produits a rencontré un problème" + error);
        let errorMessage = document.createElement("h2");
        errorMessage.textContent = "Nous avons rencontrez des difficultés techniques et ne pouvons pas présenter les articles pour le moment. Nos équipes à l'oeuvre pour résoudre ce problème dans les plus brefs délais. Nous vous invitons à réessayer ultérieurement et nous nous excusons pour la gène occasionnée."
        errorMessage.style.padding = "15px";
        console.log (productsList)
        productsList.appendChild(errorMessage);
    })

// const productsList = document.getElementById("items")
// console.log (productsList)
// fetch("http://localhost:3000/api/products")
//     .then(function(res) {
//         if (res.ok) {
//             return res.json();
//         }
//     })
//     .then ((products) => {

//         for (let i = 0; i < products.length; i++) {
//             let productLink = document.createElement("a");
//             productLink.setAttribute("href", 'product.html?id=${products[i]._id}');
//             productsList.appendChild(productLink);

//             let productArticle = document.createElement("article");
//             productLink.appendChild(productArticle);

//             let productImg = document.createElement("img");
//             productImg.setAttribute("src", products[i].imageUrl);
//             productImg.setAttribute("alt", products[i].altTxt);
//             productArticle.appendChild(productImg);

//             let productName = document.createElement("h3");
//             productName.classList.add("productName");
//             productName.textContent = products[i].name;
//             productArticle.appendChild(productName);

//             let productDescription = document.createElement("p");
//             productDescription.classList.add("productDescription");
//             productDescription.textContent = product[i].description;
//             productArticle.appendChild(productDescription);
//         }
//     })

//     .catch((error) => {
//         console.log("Le chargement des produits a rencontré un problème" + error);
//         let errorMessage = document.createElement("h2");
//         errorMessage.textContent = "Problème technique, patientez un instant.";
//         errorMessage.style.textAlign = "center";

//     });