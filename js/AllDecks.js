 // Función para cargar el archivo JSON
 async function loadDecks() {
    const response = await fetch('./yeisons/decks.json'); // Ruta al archivo decks.json
    const data = await response.json();

    // Llama a la función para renderizar los decks
    renderDecks(data.decks);
}

// Función para renderizar los decks en el grid
function renderDecks(decks) {
    const gridContainer = document.getElementById('deckGrid');
    gridContainer.innerHTML = ''; // Limpiar el grid antes de agregar nuevos items

    // Itera sobre cada deck
    decks.forEach(deck => {
        const deckItem = document.createElement('div');
        deckItem.classList.add('deck-item');

        // Crea la imagen del deck
        const img = document.createElement('img');
        img.src = deck.urlfotoDeck;
        img.alt = `${deck.nombreDeck} Image`;

        // Crea el botón con el nombre del deck
        const button = document.createElement('button');
        button.textContent = deck.nombreDeck;

        // Agrega un evento para redirigir al clic del botón
        button.onclick = () => {
            window.location.href = `deck-view.html?deckName=${encodeURIComponent(deck.nombreDeck)}`;
        };

        // Agregar la imagen y el botón al deckItem
        deckItem.appendChild(img);
        deckItem.appendChild(button);

        // Agregar el deckItem al grid
        gridContainer.appendChild(deckItem);
    });
}

// Llama a la función para cargar los decks cuando la página se carga
loadDecks();