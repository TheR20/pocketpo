let allCards = []; // Almacena todas las cartas cargadas

// Función para cargar el archivo JSON
async function loadCards() {
    const response = await fetch('./yeisons/cartas.json'); // Ruta al archivo carta.json
    const data = await response.json();

    // Asignar los datos de las cartas a la variable global
    allCards = data.cartas;

    // Renderiza todas las cartas inicialmente
    renderCards(allCards);
}

// Función para renderizar las cartas en el grid
function renderCards(cards) {
    const cardGrid = document.getElementById('cardGrid');
    cardGrid.innerHTML = ''; // Limpiar el grid antes de agregar nuevas cartas

    // Itera sobre cada carta
    cards.forEach(carta => {
        const cardItem = document.createElement('div');
        cardItem.classList.add('card-item');

        // Crea la imagen de la carta
        const img = document.createElement('img');
        img.src = carta.url;
        img.alt = `${carta.nombreCarta} Image`;
        img.onclick = () => openCardDetails(carta.nombreCarta); // Añadir evento onclick

        // Crea el nombre de la carta
        const name = document.createElement('h3');
        name.textContent = carta.nombreCarta;

        // Crea el tipo de carta
        const type = document.createElement('p');
        type.textContent = `Tipo: ${carta.tipo}`;

        // Crea la descripción de la carta
        const description = document.createElement('p');
        description.textContent = carta.descripcion;

        // Agregar imagen, nombre, tipo y descripción a cardItem
        cardItem.appendChild(img);
        cardItem.appendChild(name);
        cardItem.appendChild(type);
        cardItem.appendChild(description);

        // Agregar el cardItem al grid
        cardGrid.appendChild(cardItem);
    });
}

// Función para abrir la página de detalles con el nombre de la carta en la URL
function openCardDetails(nombreCarta) {
    const url = `carta.html?nombreCarta=${encodeURIComponent(nombreCarta)}`;
    window.location.href = url;
}

// Función para filtrar cartas por nombre
function filterCards() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredCards = allCards.filter(carta =>
        carta.nombreCarta.toLowerCase().includes(query)
    );

    // Renderiza las cartas filtradas
    renderCards(filteredCards);
}

// Llama a la función para cargar las cartas cuando la página se carga
loadCards();