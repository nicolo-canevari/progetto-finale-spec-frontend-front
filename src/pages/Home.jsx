// HOMEPAGE

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchLaptops } from '../services/laptopServices';
import FilterBar from '../components/FilterBar/FilterBar';
import SortControls from '../components/SortControls/SortControls';
import LaptopList from '../components/LaptopList/LaptopList';

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

        // Imposta lo stato loading a true per mostrare il caricamento
        setLoading(true);
        // Resetta l'errore precedente (se c'è)
        setError(null);

        // Prepara i parametri da inviare alla chiamata fetch, solo se sono valorizzati
        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (categoryFilter) params.category = categoryFilter;

        // Chiama la funzione fetchLaptops con i parametri per ottenere i dati
        fetchLaptops(params)

            .then(data => {

                // Ordina i dati lato client in base al campo e all'ordine scelti
                const sorted = [...data].sort((a, b) => {

                    // Converte i valori a lowercase per confronto case-insensitive
                    const valA = a[sortBy].toLowerCase();
                    const valB = b[sortBy].toLowerCase();

                    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
                    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
                    return 0;

                });

                // Aggiorna lo stato con la lista ordinata di laptop
                setLaptops(sorted);

            })

            // Se la fetch genera un errore, lo salvo nello stato error
            .catch(err => setError(err.message))
            // Al termine della fetch, anche in caso di errore, disabilito il caricamento
            .finally(() => setLoading(false));
    }, [searchTerm, categoryFilter, sortBy, sortOrder]); // Dipendenze che riattivano l'effetto

    // Se la fetch è in corso, mostra un messaggio di caricamento all'utente
    if (loading) return <p className="loading-message">Caricamento in corso...</p>;

    // Se c'è un errore nella fetch, mostra il messaggio di errore
    if (error) return <p className="error-message">Errore: {error}</p>;

    // Render della pagina principale: contiene navigazione, filtri, ordinamento e lista laptop
    return (

        <main className="home-container">

            {/* Navigazione per Compare e Favorites */}
            <nav>
                <Link to="/compare">Compare</Link> |{' '}
                <Link to="/favorites">Favorites</Link>
            </nav>

            {/* Titolo pagina */}
            <h1 className="page-title">Lista Laptop</h1>

            {/* Barra di ricerca + filtro categoria */}
            <FilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
            />

            {/* Controlli per ordinamento */}
            <SortControls
                sortBy={sortBy}
                sortOrder={sortOrder}
                setSortBy={setSortBy}
                setSortOrder={setSortOrder}
            />

            {/* Lista laptop filtrata, ordinata e mappata */}
            <LaptopList laptops={laptops} />

        </main>
    );
}
