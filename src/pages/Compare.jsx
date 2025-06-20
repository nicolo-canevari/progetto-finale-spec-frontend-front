// PAGINA PER CONFRONTARE I PRODOTTI

import React, { useEffect, useState } from 'react';
// Contesto per confronto laptop
import { useCompare } from '../contexts/CompareContext';
// Dropdown per selezionare laptop
import CompareSelector from '../components/CompareSelector/CompareSelector';
// Icona per toggle confronto
import CompareIcon from '../components/CompareIcon/CompareIcon';
import FavoriteIcon from '../components/FavoritesIcon/FavoritesIcon';
import Layout from '../components/Layout/Layout';
// Import della funzione che recupera i dati di un laptop dal backend
import { fetchLaptops } from '../services/laptopServices';
import './style/Compare.css'


export default function Compare() {

    // Estrae dal contesto la lista di laptop selezionati per il confronto e la funzione per aggiungere/rimuovere
    const { compareList, toggleCompare, minPrice, maxPrice } = useCompare();

    // Debug
    console.log("compareList:", compareList);

    // Stato per conservare tutti i laptop disponibili dal backend, per popolari il dropdown
    const [allLaptops, setAllLaptops] = useState([]);
    // Stato per gestire il caricamento dati (loading) e eventuali errori
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Stato per tenere traccia del laptop selezionato nel dropdown (stringa con id o vuoto)
    const [selectedLaptopId, setSelectedLaptopId] = useState('');

    // Effetto che carica i laptop dal backend al montaggio del componente
    useEffect(() => {

        async function load() {

            try {
                setLoading(true);
                const data = await fetchLaptops();  // chiamo API per lista laptop
                setAllLaptops(data);  // usa data
                setError(null);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false); // fine caricamento
            }

        }

        load();

    }, []); // effetto eseguito solo alla prima renderizzazione (componente montato)

    // Funzione da passare a CompareSelector per aggiungere laptop a confronto
    function handleSelect(id) {

        // se id vuoto, non fare nulla
        if (!id) return;

        // Trova il laptop completo nell'array di tutti i laptop caricati
        const selectedLaptop = allLaptops.find(l => String(l.id) === String(id));
        // aggiungi/rimuovi laptop dal confronto
        if (selectedLaptop) toggleCompare(selectedLaptop);
        // reset dropdown a selezione vuota
        setSelectedLaptopId('');

    }

    // Se sta caricando mostra messaggio
    if (loading) {

        return (
            <Layout>
                <p>Caricamento laptop...</p>
            </Layout>
        );

    }

    // Se c'è un errore mostra messaggio
    if (error) {

        return (
            <Layout>
                <p>Errore: {error}</p>
            </Layout>
        );

    }

    // Se ci sono meno di 2 laptop nella lista confronto, mostra messaggio e selettore
    if (compareList.length < 2) {

        return (

            <Layout>

                <section className="compare-section">

                    <p className="compare-placeholder">Seleziona almeno 2 laptop da confrontare per vedere il confronto.</p>

                    <div className="compare-controls">

                        {/* Selector per scegliere i laptop da aggiungere al confronto */}
                        <CompareSelector
                            laptops={allLaptops}
                            selected={selectedLaptopId}
                            onSelect={handleSelect}
                        />

                    </div>

                </section>

            </Layout>

        );

    }

    // Se ci sono almeno 2 laptop da confrontare, li assegno a due variabili
    // const [laptop1, laptop2] = compareList;

    // Renderizza la pagina di confronto vera e propria
    return (

        <Layout>

            <section>

                {/* Selector per aggiungere/rimuovere laptop dalla lista confronto */}
                <CompareSelector
                    laptops={allLaptops}
                    selected={selectedLaptopId}
                    onSelect={handleSelect}
                />

                {/* Griglia con i due laptop affiancati */}
                <div className="compare-grid">

                    {/* Mappa i due laptop per mostrare i dettagli */}
                    {/* {[laptop1, laptop2].map((laptop) => ( */}

                    {compareList.map((laptop) => (

                        <article key={laptop.id}>

                            {/* Titolo del laptop */}
                            <h2>{laptop.title}</h2>

                            {/* Contenitore immagine normale e hover */}
                            <div className="compare-image-container">
                                {laptop.image && laptop.imageHover ? (
                                    <>
                                        <img
                                            src={laptop.image}
                                            alt={`Immagine di ${laptop.title}`}
                                            className="compare-image normal-image"
                                        />
                                        <img
                                            src={laptop.imageHover}
                                            alt={`Immagine hover di ${laptop.title}`}
                                            className="compare-image hover-image"
                                        />
                                    </>
                                ) : laptop.image ? (
                                    <img
                                        src={laptop.image}
                                        alt={`Immagine di ${laptop.title}`}
                                        className="compare-image"
                                    />
                                ) : (
                                    <div className="no-image-placeholder">Nessuna immagine</div>
                                )}
                            </div>

                            {/* Contenitore dei bottoni */}
                            <div className="compare-buttons">

                                {/* Icona bottone per aggiungere/rimuovere dal confronto */}
                                <CompareIcon laptop={laptop} />

                                {/* Icona per aggiungere il prodotto ai preferiti */}
                                <FavoriteIcon laptop={laptop} />

                            </div>

                            {/* Lista delle caratteristiche tecniche */}
                            <ul>

                                <li><strong>Categoria:</strong> {laptop.category}</li>
                                <li><strong>Brand:</strong> {laptop.brand}</li>
                                <li><strong>CPU:</strong> {laptop.cpu}</li>
                                <li><strong>RAM:</strong> {laptop.ram}</li>
                                <li><strong>Storage:</strong> {laptop.storage}</li>
                                <li><strong>Display:</strong> {laptop.display}</li>
                                <li><strong>GPU:</strong> {laptop.gpu}</li>
                                <li><strong>OS:</strong> {laptop.os}</li>

                                {/* Prezzo evidenziato in base al valore */}
                                <li>
                                    <strong>Prezzo:</strong> {' '}
                                    <span
                                        style={{
                                            color:
                                                laptop.price === maxPrice ? 'red' :
                                                    laptop.price === minPrice ? 'green' :
                                                        'inherit'
                                        }}
                                    >
                                        {laptop.price}€
                                    </span>
                                </li>

                                <li><strong>Peso:</strong> {laptop.weight}</li>
                                <li><strong>Batteria:</strong> {laptop.batteryLife}</li>

                            </ul>

                        </article>

                    ))}

                </div>

            </section>

        </Layout>

    );

}


