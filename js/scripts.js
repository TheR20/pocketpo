// Función para cargar archivos HTML
function loadHTML(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el archivo:', error));
}

// Cargar header y footer
document.addEventListener("DOMContentLoaded", () => {
    loadHTML("header", "partials/header.html");
    loadHTML("footer", "partials/footer.html");
});
