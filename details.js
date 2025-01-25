const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");
const URL = `https://striveschool-api.herokuapp.com/api/product/${productId}`;

function loadProduct(URL) {
  fetch(URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNThhMGI3NDcwMTAwMTU4YjJhZWMiLCJpYXQiOjE3Mzc3MDk3MjgsImV4cCI6MTczODkxOTMyOH0.1vDYZZ-wvBd_Oj1eDmTDdFLVHiLt2MgGRwBnKfBoVU0",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Fallito a caricare il prodotto");
      }
      return response.json();
    })
    .then((product) => {
      const container = document.getElementById("product");
      container.innerHTML = `
        <div class="d-flex flex-column flex-lg-row justify-content-center bg-white mt-5 p-5 rounded-5 border border-3 border-warning">
          <div>
            <img src="${product.imageUrl}" class="card-img-top me-lg-5 mb-3 mb-lg-0" alt="${product.name}" />
          </div>
          <div class="ms-4">
            <h5>${product.name}</h5>
            <p>${product.description}</p>
            <p class="text-info">${product.brand}</p>
            <p>Prezzo: ${product.price}€</p>
            <a href="back-office.html?productId=${product._id}" class="btn btn-warning">Modifica</a>
          </div>
        </div>
      </div>`;
    })
    .catch((error) => console.error("Errore:", error));
}

window.addEventListener("DOMContentLoaded", () => {
  if (productId) {
    loadProduct(URL);
  } else {
    console.error("Nessun productId fornito.");
  }
});
