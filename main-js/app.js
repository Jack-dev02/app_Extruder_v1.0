const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('.buscar');
const productDisplay = document.querySelector('#search-card-2');
const sizeDisplay = document.querySelector('#search-card-4');
const weightDisplay = document.querySelector('#search-card-6');
const thicknessDisplay = document.querySelector('#search-card-8');
const errorElement = document.querySelector('.error1');

// URL del archivo JSON alojado en la web
const jsonUrl = process.env.NEXT_PUBLIC_JSON_URL;
// Variable global para almacenar los datos del JSON
let productData = [];

// Función para cargar los datos del JSON
async function loadProductData() {
  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) {
      throw new Error("Error al cargar los datos: " + response.status);
    }
    return await response.json(); 
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    errorElement.textContent = "Error al cargar los datos";
    errorElement.classList.add('error');
    return [];
  }
}

// Función para verificar y actualizar los datos
async function checkForUpdates() {
  try {
    const newData = await loadProductData();
    if (JSON.stringify(newData) !== JSON.stringify(productData)) {
      productData = newData;
      console.log("Datos actualizados"); 
    }
  } catch (error) {
    console.error("Error al actualizar los datos:", error);
  }
}

// Función de búsqueda (ahora usa la variable global productData)
function search() {
  const searchTerm = searchInput.value.toUpperCase();
  const foundProduct = productData.find(product => product.producto.toUpperCase() === searchTerm); // Convertimos a mayúsculas aquí
  if (foundProduct) {
    errorElement.classList.remove('error');
    productDisplay.textContent = foundProduct.producto;
    sizeDisplay.textContent = foundProduct.medida;
    weightDisplay.textContent = foundProduct.peso;
    thicknessDisplay.textContent = foundProduct.espesor;
  } else {
    errorElement.classList.add('error');
    errorElement.textContent = "Producto no encontrado";
  }
}

// Cargamos los datos al inicio (una sola vez) y luego iniciamos la verificación de actualizaciones
loadProductData().then(() => {
  checkForUpdates(); // Iniciamos la verificación después de la carga inicial

  // Verificamos si hay actualizaciones cada 5 segundos (5000 milisegundos)
  setInterval(checkForUpdates, 5000); 
});

// Event listeners 
searchButton.addEventListener('click', search);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    search();
  }
});
