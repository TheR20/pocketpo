async function loadCarta() {
    const urlParams = new URLSearchParams(window.location.search);
    const nombreCarta = urlParams.get('nombreCarta'); // Obtener el nombre de la carta desde la URL

    const response = await fetch('./yeisons/cartas.json');
    const data = await response.json();

    const carta = data.cartas.find(c => c.nombreCarta === nombreCarta);

    if (carta) {
        document.getElementById('card-image').src = carta.url;
        document.getElementById('nombre').textContent = carta.nombreCarta;
        document.getElementById('tipo').textContent = carta.tipo;
        document.getElementById('descripcion').textContent = carta.descripcion;
        document.getElementById('obtener').textContent = carta.obtener;
    } else {
        console.log("Carta no encontrada");
    }
}

loadCarta();
