// URL base dell'API backend per la risorsa "laptops"
const API_URL = 'http://localhost:3001/laptops';

// Funzione per recuperare la lista di laptop dal backend
export async function fetchLaptops(params = {}) {

    // Trasforma l'oggetto params in query string per URL
    const query = new URLSearchParams(params).toString();

    // Effettua la chiamata fetch con eventuali parametri nella query string
    const response = await fetch(`${API_URL}?${query}`);

    // Se la risposta non è OK, genera un errore
    if (!response.ok) throw new Error('Errore nel recupero dei dati');

    // Restituisce i dati JSON ottenuti dalla risposta
    return response.json();

}

// Funzione per recuperare un singolo laptop dal backend tramite id
export async function fetchLaptopById(id) {

    // Effettua la chiamata fetch verso /laptops/:id
    const response = await fetch(`${API_URL}/${id}`);

    // Se la risposta non è OK, genera un errore
    if (!response.ok) throw new Error('Laptop non trovato');

    // Restituisce i dati JSON del laptop
    return response.json();

}
