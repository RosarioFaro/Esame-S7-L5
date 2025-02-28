const URL = "https://striveschool-api.herokuapp.com/api/product/";

function loadProducts(URL) {
  fetch(URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNThhMGI3NDcwMTAwMTU4YjJhZWMiLCJpYXQiOjE3Mzc3MDk3MjgsImV4cCI6MTczODkxOTMyOH0.1vDYZZ-wvBd_Oj1eDmTDdFLVHiLt2MgGRwBnKfBoVU0",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Fallito a caricare il prodotti");
      }
      return response.json();
    })
    .then((products) => {
      console.log("Data received:", products);

      products.forEach((product) => {
        const row = document.getElementById("product-grid");

        const col = document.createElement("div");
        col.classList.add("col-md-4", "col-lg-3", "my-2");

        const card = document.createElement("div");
        card.classList.add("card", "h-100", "mb-4", "shadow-sm", "border", "border-3", "border-warning", "rounded-3");

        const img = document.createElement("img");
        img.classList.add("bd-placeholder-img", "card-img-top");
        img.alt = product.name;
        img.src = product.imageUrl;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "d-flex", "flex-column");

        const h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.innerText = product.name;

        const btnAndPrice = document.createElement("div");
        btnAndPrice.classList.add("mt-auto", "d-flex", "justify-content-between", "align-items-center");

        const btnGroup = document.createElement("div");
        btnGroup.classList.add("btn-group");

        const buttonDetails = document.createElement("a");
        buttonDetails.classList.add("btn", "btn-sm", "btn-info");
        buttonDetails.href = `details.html?productId=${product._id}`;
        buttonDetails.innerText = "Details";

        const buttonModify = document.createElement("a");
        buttonModify.classList.add("btn", "btn-sm", "btn-warning");
        buttonModify.href = `back-office.html?productId=${product._id}`;
        buttonModify.innerText = "Modify";

        const price = document.createElement("p");
        price.innerText = product.price + "€";

        btnGroup.appendChild(buttonModify);
        btnGroup.appendChild(buttonDetails);
        btnAndPrice.appendChild(btnGroup);
        btnAndPrice.appendChild(price);

        cardBody.appendChild(h5);
        cardBody.appendChild(btnAndPrice);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);
        row.appendChild(col);
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    })
    .finally(() => {
      document.querySelector(".spinner-border").classList.add("d-none");
    });
}

loadProducts(URL);
