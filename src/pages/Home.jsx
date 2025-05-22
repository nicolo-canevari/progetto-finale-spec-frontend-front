// Lista laptop con ricerca, filtro e ordinamento

import { useEffect, useState } from 'react';
import { fetchLaptops } from '../services/laptopServices';
import SearchBar from '../components/SearchBar/SearchBar';
import FilterCategory from '../components/FilterCategory/FilterCategory';
import LaptopCard from '../components/LaptopCard/LaptopCard';

export default function Home() {
    // Stato per la lista dei laptop recuperati dal backend
    const [laptops, setLaptops] = useState([]);
    // Stato per mostrare il caricamento
    const [loading, setLoading] = useState(true);
    // Stato per eventuali errori di fetch
    const [error, setError] = useState(null);

    // Stato per la ricerca testuale (barra ricerca)
    const [searchTerm, setSearchTerm] = useState('');
    // Stato per il filtro categoria
    const [categoryFilter, setCategoryFilter] = useState('');
    // Stato per la proprietà su cui ordinare (title o category)
    const [sortBy, setSortBy] = useState('title');
    // Stato per l'ordine di ordinamento ('asc' o 'desc')
    const [sortOrder, setSortOrder] = useState('asc');

    // Effetto che viene eseguito ogni volta che cambiano i valori di ricerca, filtro o ordinamento
    useEffect(() => {

        // Imposta lo stato di caricamento a true ogni volta che parte una nuova fetch
        setLoading(true);
        // Resetta eventuali errori precedenti
        setError(null);

        // Prepara i parametri per la query string dell'API
        const params = {};
        if (searchTerm) params.search = searchTerm;  // se c'è testo di ricerca, aggiungi il parametro 'search'
        if (categoryFilter) params.category = categoryFilter;  // se c'è filtro categoria, aggiungi 'category'

        // Effettua la chiamata fetch al backend con i parametri
        fetchLaptops(params)
            .then(data => {

                // Ordina i risultati lato client in base al campo scelto (title/category) e all'ordine (asc/desc)
                const sorted = [...data].sort((a, b) => {
                    const valA = a[sortBy].toLowerCase();
                    const valB = b[sortBy].toLowerCase();
                    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
                    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
                    return 0;
                });
                // Aggiorna lo stato con la lista ordinata
                setLaptops(sorted);
            })
            // Se qualcosa va storto durante il fetch, aggiorna lo stato errore con il messaggio
            .catch(err => setError(err.message))
            // Al termine della fetch (sia successo che errore), setta loading a false
            .finally(() => setLoading(false));

    }, [searchTerm, categoryFilter, sortBy, sortOrder]); // Rilancia useEffect quando cambiano questi stati

    // Se la fetch è ancora in corso, mostra un messaggio di caricamento
    if (loading) return <p className="loading-message">Caricamento in corso...</p>;

    // Se si è verificato un errore, mostrane il messaggio
    if (error) return <p className="error-message">Errore: {error}</p>;

    // Renderizza la pagina principale con lista, filtri e ordinamenti
    return (

        <main className="home-container">

            {/* Titolo pagina */}
            <h1 className="page-title">Lista Laptop</h1>

            {/* Wrapper per barra di ricerca */}
            <div className="search-bar-wrapper">
                {/* Componente di input per la ricerca testuale */}
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>

            {/* Wrapper per filtro categoria */}
            <div className="filter-category-wrapper">
                {/* Componente per selezionare la categoria da filtrare */}
                <FilterCategory value={categoryFilter} onChange={setCategoryFilter} />
            </div>

            {/* Controlli per l'ordinamento */}
            <div className="sort-controls">

                <label className="sort-label">
                    Ordina per:&nbsp;
                    {/* Select per scegliere la proprietà su cui ordinare */}
                    <select
                        className="sort-select"
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                    >
                        <option value="title">Titolo</option>
                        <option value="category">Categoria</option>
                    </select>
                </label>

                {/* Bottone per invertire l'ordine (ascendente/descendente) */}
                <button
                    className="sort-order-button"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    aria-label="Inverti ordine di ordinamento"
                >
                    {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                </button>

            </div>

            {/* Sezione dove vengono mostrati i laptop o un messaggio se la lista è vuota */}
            <section className="laptops-list">

                {laptops.length === 0 ? (
                    // Messaggio se non ci sono laptop corrispondenti a filtri/ricerca
                    <p className="no-results-message">Nessun laptop trovato.</p>
                ) : (
                    // Mappa ogni laptop in una card visuale
                    laptops.map(laptop => (
                        <LaptopCard key={laptop.id} laptop={laptop} />
                    ))
                )}

            </section>

        </main>

    );
}
