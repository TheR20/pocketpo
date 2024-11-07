    // Función para obtener el nombre del deck de la URL
    function getDeckNameFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('deckName');
    }

    // Cargar el archivo JSON de cartas
    async function loadCartas() {
        const response = await fetch('./yeisons/cartas.json'); // Cargar el archivo cartas.json
        return response.json();
    }
    

    // Cargar el archivo JSON de decks
    async function loadDeck() {
        const deckName = getDeckNameFromUrl(); // Obtener el nombre del deck de la URL
        const deckResponse = await fetch('./yeisons/decks.json'); // Cargar el archivo decks.json
        const deckData = await deckResponse.json();
        
        // Cargar las cartas
        const cartasData = await loadCartas();

        // Filtrar el deck con el nombre recibido
        const deck = deckData.decks.find(deck => deck.nombreDeck === deckName);

        if (deck) {
            // Cambiar el título al nombre del deck
            document.getElementById('deck-title').textContent = deck.nombreDeck;

            // Obtener el contenedor para las cartas
            const deckContainer = document.getElementById('deck-container');

            // Crear las cartas dinámicamente en filas de 4
            deck.cartas.forEach(carta => {
                // Buscar la URL de la carta en el archivo cartas.json
                const cartaEncontrada = cartasData.cartas.find(c => c.nombreCarta === carta.nombreCarta);
                if (cartaEncontrada) {
                    carta.url = cartaEncontrada.url; // Asignar la URL de la carta

                    // Crear la columna de la carta
                    const cardColumn = document.createElement('div');
                    cardColumn.classList.add('col-md-3', 'card-column'); // Columna de 3 partes en una fila de Bootstrap

                    // Crear la tarjeta
                    const card = document.createElement('div');
                    card.classList.add('card', 'h-100'); // Agregar clases de tarjeta de Bootstrap

                    // Crear un enlace que redirige a carta.html con el nombre de la carta
                    const cardLink = document.createElement('a');
                    cardLink.href = `carta.html?nombreCarta=${encodeURIComponent(carta.nombreCarta)}`;
                    cardLink.classList.add('stretched-link'); // Hace que toda el área de la tarjeta sea clickeable

                    // Crear la imagen de la carta
                    const cardImg = document.createElement('img');
                    cardImg.src = carta.url;
                    cardImg.classList.add('card-img-top');
                    cardImg.alt = carta.nombreCarta;

                    // Añadir la imagen y cuerpo de la carta al enlace
                    cardLink.appendChild(cardImg);

                    // Añadir el enlace (que contiene la imagen) a la tarjeta
                    card.appendChild(cardLink);

                    // Añadir la tarjeta a la columna
                    cardColumn.appendChild(card);

                    // Añadir la columna al contenedor
                    deckContainer.appendChild(cardColumn);
                }
            });
        } else {
            console.log("Deck no encontrado");
        }
    }

    // Llamar a la función para cargar el deck cuando la página se haya cargado
    loadDeck();