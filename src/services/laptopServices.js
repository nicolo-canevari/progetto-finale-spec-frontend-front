// URL base del backend per ottenere i dati dei laptop
const API_URL = 'http://localhost:3001/laptops';


//  Funzione per recuperare i laptop dal backend e arricchirli con le immagini corrispondenti prese da un file statico JSON.
export async function fetchLaptops(params = {}) {

    // Converte i parametri in stringa per comporre la query URL
    const query = new URLSearchParams(params).toString();

    // Effettua due fetch in parallelo:
    // 1. ai laptop dal backend (es. localhost:3001/laptops)
    // 2. al file JSON statico con le immagini, in public/assets
    const [response, imagesResponse] = await Promise.all([
        fetch(`${API_URL}?${query}`),
        fetch('/assets/laptopImage.json')
    ]);

    // Se una delle due fetch fallisce, lancia un errore
    if (!response.ok) throw new Error('Errore nel recupero dei dati laptop');
    if (!imagesResponse.ok) throw new Error('Errore nel recupero delle immagini');

    // Parsea i JSON ottenuti dalle due fetch
    const laptops = await response.json();       // Array di oggetti laptop dal backend
    const images = await imagesResponse.json();  // Array di oggetti immagine (con id, image, imageHover)

    // Combina ogni laptop con le immagini corrispondenti per id
    const enrichedLaptops = laptops.map(laptop => {
        const img = images.find(i => i.id === laptop.id);
        return {
            ...laptop,
            image: img?.image || null,
            imageHover: img?.imageHover || null
        };
    });

    // Ritorna l'array arricchito
    return enrichedLaptops;
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
