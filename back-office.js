const form = document.getElementById("product-form");
const deleteButton = document.getElementById("delete-btn");
const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");
const URL = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";

if (!productId) {
  deleteButton.style.display = "none";
}

fetch(URL, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNThhMGI3NDcwMTAwMTU4YjJhZWMiLCJpYXQiOjE3Mzc3MDk3MjgsImV4cCI6MTczODkxOTMyOH0.1vDYZZ-wvBd_Oj1eDmTDdFLVHiLt2MgGRwBnKfBoVU0",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

window.addEventListener("DOMContentLoaded", () => {
  if (productId) {
    fetch(URL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNThhMGI3NDcwMTAwMTU4YjJhZWMiLCJpYXQiOjE3Mzc3MDk3MjgsImV4cCI6MTczODkxOTMyOH0.1vDYZZ-wvBd_Oj1eDmTDdFLVHiLt2MgGRwBnKfBoVU0",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((product) => {
        form.elements.name.value = product.name;
        form.elements.description.value = product.description;
        form.elements.brand.value = product.brand;
        form.elements.imageUrl.value = product.imageUrl;
        form.elements.price.value = product.price;
      });
  }
}),
  (form.onsubmit = function (event) {
    event.preventDefault();

    const newProduct = {
      name: form.elements.name.value,
      description: form.elements.description.value,
      brand: form.elements.brand.value,
      price: parseFloat(form.elements.price.value),
      imageUrl: form.elements.imageUrl.value,
    };

    console.log(newProduct);

    fetch(URL, {
      method: productId ? "PUT" : "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNThhMGI3NDcwMTAwMTU4YjJhZWMiLCJpYXQiOjE3Mzc3MDk3MjgsImV4cCI6MTczODkxOTMyOH0.1vDYZZ-wvBd_Oj1eDmTDdFLVHiLt2MgGRwBnKfBoVU0",
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella creazione del prodotto");
      }
    });
  });

deleteButton.addEventListener("click", () => {
  const confirmDelete = confirm("Sei sicuro di voler eliminare questo prodotto?");
  if (confirmDelete) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNThhMGI3NDcwMTAwMTU4YjJhZWMiLCJpYXQiOjE3Mzc3MDk3MjgsImV4cCI6MTczODkxOTMyOH0.1vDYZZ-wvBd_Oj1eDmTDdFLVHiLt2MgGRwBnKfBoVU0",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          alert("Prodotto eliminato!");
          window.location.href = "home-page.html";
        } else {
          throw new Error("Errore nell'eliminazione del prodotto");
        }
      })
      .catch((error) => console.error("Errore:", error));
  }
});
