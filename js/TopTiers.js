 // Función para cargar ambos archivos JSON
 async function loadTierList() {
    const tierResponse = await fetch('./yeisons/toptier.json'); // Carga el archivo toptier.json
    const deckResponse = await fetch('./yeisons/decks.json'); // Carga el archivo decks.json

    const tierData = await tierResponse.json();
    const deckData = await deckResponse.json();

    // Llama a la función para renderizar cada tier
    renderTier(tierData.Tier1, deckData.decks, document.querySelector('#tier1 .tier'));
    renderTier(tierData.Tier2, deckData.decks, document.querySelector('#tier2 .tier'));
    renderTier(tierData.Tier3, deckData.decks, document.querySelector('#tier3 .tier'));
}

// Función para renderizar un tier específico
function renderTier(tierData, decksData, tierContainer) {
    // Itera sobre cada deck en el tier
    tierData.forEach(item => {
        const tierItem = document.createElement('div');
        tierItem.classList.add('tier-item');

        // Busca el deck correspondiente en el archivo de decks
        const deck = decksData.find(deck => deck.nombreDeck === item.name);

        // Si el deck se encuentra, asigna la imagen, si no, usa una imagen vacía
        const img = document.createElement('img');
        img.src = deck && deck.urlfotoDeck ? deck.urlfotoDeck : 'ruta/a/imagen/vacia.png'; // Imagen vacía si no existe la URL
        img.alt = `${item.name} Image`;

        const button = document.createElement('button');
        button.textContent = item.name;

        // Cambiar el onclick para redirigir con el nombre del deck
        button.onclick = () => {
            window.location.href = `deck-view.html?deckName=${encodeURIComponent(item.name)}`;
        };

        tierItem.appendChild(img);
        tierItem.appendChild(button);
        tierContainer.appendChild(tierItem);
    });
}

// Llama a la función al cargar la página
loadTierList();