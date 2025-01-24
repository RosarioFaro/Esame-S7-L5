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
        <div class="d-flex flex-column flex-lg-row justify-content-center mt-5 bg-black p-5 rounded-5">
          <div>
            <img src="${product.imageUrl}" class="card-img-top me-lg-5 mb-3 mb-lg-0" alt="${product.name}" />
          </div>
          <div>
            <h5 class="text-white">${product.name}</h5>
            <p class="text-white">${product.description}</p>
            <p class="text-white">${product.brand}</p>
            <p class="text-white">Prezzo: ${product.price}€</p>
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
