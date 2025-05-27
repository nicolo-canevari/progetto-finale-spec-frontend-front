// HOMEPAGE

// Import dei React hooks useEffect e useState per gestire stato e side effect
import { useEffect, useState } from 'react';
// Import della funzione per recuperare i laptop dal backend (API)
import { fetchLaptops } from '../services/laptopServices';
// Import dei componenti figli per filtrare, ordinare e mostrare la lista dei laptop
import FilterBar from '../components/FilterBar/FilterBar';
import SortControls from '../components/SortControls/SortControls';
import LaptopList from '../components/LaptopList/LaptopList';
// Import del Layout che contiene Navbar e Footer, per una struttura uniforme
import Layout from '../components/Layout/Layout';
import './style/Home.css';

export default function Home() {

    // Stato per memorizzare la lista dei laptop caricati dal backend
    const [laptops, setLaptops] = useState([]);

    // Stato booleano per mostrare un messaggio di caricamento mentre la fetch è in corso
    const [loading, setLoading] = useState(true);

    // Stato per salvare eventuali messaggi di errore nella fetch
    const [error, setError] = useState(null);

    // Stato per il termine di ricerca inserito dall'utente nella barra di ricerca
    const [searchTerm, setSearchTerm] = useState('');

    // Stato per il valore "debounced" del termine di ricerca (ritardato)
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    // Stato per la categoria selezionata come filtro
    const [categoryFilter, setCategoryFilter] = useState('');

    // Stato per la proprietà con cui ordinare la lista (es. 'title' o 'category')
    const [sortBy, setSortBy] = useState('title');

    // Stato per l'ordine dell'ordinamento ('asc' per crescente, 'desc' per decrescente)
    const [sortOrder, setSortOrder] = useState('asc');


    // Debounce: aggiorna `debouncedSearchTerm` 300ms dopo l'ultima digitazione
    useEffect(() => {

        // Imposta un timer per ritardare l'aggiornamento
        const timer = setTimeout(() => {

            setDebouncedSearchTerm(searchTerm);

        }, 300);

        // Pulizia: se l'utente digita di nuovo prima dei 300ms, cancella il timer precedente
        return () => clearTimeout(timer);

    }, [searchTerm]);

    // useEffect: esegue il fetch ogni volta che cambiano i filtri, la ricerca o l'ordinamento
    useEffect(() => {

        // Inizio fetch: mostra il caricamento e resetta l'errore precedente
        setLoading(true);
        setError(null);

        // Costruisce un oggetto con i parametri da passare alla fetch (search, category)
        const params = {};

        // Se l'utente ha inserito un termine di ricerca, aggiungilo ai parametri
        if (debouncedSearchTerm) params.search = debouncedSearchTerm;
        // Se è stato selezionato un filtro per la categoria, aggiungilo ai parametri
        if (categoryFilter) params.category = categoryFilter;

        // // Se l'utente ha inserito un termine di ricerca, aggiungilo ai parametri
        // if (searchTerm) params.search = searchTerm;
        // // Se è stato selezionato un filtro per la categoria, aggiungilo ai parametri
        // if (categoryFilter) params.category = categoryFilter;

        // Effettua la chiamata fetch passando i parametri (search, category)
        fetchLaptops(params)

            .then(data => {

                // Ordina i dati ricevuti in base al campo sortBy e all'ordine sortOrder
                const sorted = [...data].sort((a, b) => {
                    // Trasforma i valori a lowercase per confronto case-insensitive
                    const valA = a[sortBy].toLowerCase();
                    const valB = b[sortBy].toLowerCase();

                    // Ordina con localeCompare per rispettare alfabetizzazione e accenti
                    return sortOrder === 'asc'
                        ? valA.localeCompare(valB)
                        : valB.localeCompare(valA);
                });

                // Aggiorna lo stato con i laptop ordinati da mostrare nella UI
                setLaptops(sorted);
            })
            // Se si verifica un errore durante la fetch, salvo il messaggio nello stato error
            .catch(err => setError(err.message))
            // Alla fine, qualunque sia l'esito, disabilito il caricamento
            .finally(() => setLoading(false));

        // L'effetto si riattiva se cambia uno qualsiasi di questi stati: ricerca, filtro o ordinamento
        // }, [searchTerm, categoryFilter, sortBy, sortOrder]);

    }, [debouncedSearchTerm, categoryFilter, sortBy, sortOrder]);

    // Render della pagina Home, dentro il Layout (che contiene Navbar e Footer)
    return (

        <Layout>

            {/* Contenuto principale della home */}
            <main className="home-container">

                {/* Titolo principale della pagina */}
                {/* <h1 className="page-title">Lista Laptop</h1> */}

                {/* Barra con campo ricerca e filtro categoria */}
                <FilterBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                />

                {/* Controlli per scegliere su quale campo ordinare e l'ordine */}
                <SortControls
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    setSortBy={setSortBy}
                    setSortOrder={setSortOrder}
                />

                {/* Messaggi di feedback per l'utente: caricamento o errore */}
                {loading && <p className="loading-message">Caricamento in corso...</p>}
                {error && <p className="error-message">Errore: {error}</p>}

                {/* Lista dei laptop filtrata, ordinata e passata al componente LaptopList */}
                <LaptopList laptops={laptops} />

            </main>

        </Layout>
    );
}