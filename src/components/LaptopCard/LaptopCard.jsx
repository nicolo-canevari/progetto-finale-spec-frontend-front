/**
 * Questo componente rappresenta una singola scheda di un laptop,
 * mostrando le principali informazioni come titolo, marca, categoria,
 * e altre caratteristiche utili.
*/

import React, { useState } from 'react';
// Import per navigazione interna tra pagine (React Router)
import { Link } from 'react-router-dom';
import FavoritesIcon from '../FavoritesIcon/FavoritesIcon';
import CompareIcon from '../CompareIcon/CompareIcon';
import { FaLaptop } from 'react-icons/fa';
import './LaptopCard.css';


// Componente che mostra la scheda di un singolo laptop
export default function LaptopCard({ laptop }) {

    // Stato locale per tracciare se si è verificato un errore nel caricamento dell'immagine normale
    const [imageError, setImageError] = useState(false);
    // Stato locale per tracciare se si è verificato un errore nel caricamento dell'immagine hover
    const [hoverError, setHoverError] = useState(false);

    // Costruisce i path delle immagini se definiti
    const image = laptop.image || null;
    const imageHover = laptop.imageHover || null;

    // Controllo se l'immagine normale è presente e non ha dato errore durante il caricamento
    const hasValidImages = image && !imageError;

    // Debug in console per verificare i path delle immagini
    // console.log('laptop.image:', laptop.image);

    return (

        // Container principale 
        <article className="laptop-card">

            {/* Contenitore del titolo del Laptop */}
            <div className="laptop-header">

                {/* Titolo del laptop */}
                <h2 className="laptop-title">{laptop.title}</h2>

            </div>

            {/* Immagine normale + immagine hover, se entrambe presenti */}
            <div className="laptopcard-image-container">

                {/* Se l'immagine normale è disponibile e caricata correttamente */}
                {hasValidImages ? (
                    <>
                        {/* Immagine normale */}
                        <img
                            src={image}
                            alt={`Immagine di ${laptop.title}`}
                            className="laptopcard-image normal-image"
                            onError={() => setImageError(true)}
                        />
                        {/* Se l'immagine hover è definita e non ha dato errore */}
                        {imageHover && !hoverError && (
                            <img
                                src={imageHover}
                                alt={`Immagine hover di ${laptop.title}`}
                                className="laptopcard-image hover-image"
                                onError={() => setHoverError(true)}
                            />
                        )}
                    </>
                ) : (
                    // Se l'immagine normale non è disponibile o ha dato errore, mostra l'icona e il messaggio di fallback
                    <div className="no-image-placeholder">
                        <FaLaptop className="placeholder-icon" />
                        Nessuna immagine
                    </div>
                )}
            </div>

            {/* Categoria del laptop */}
            <p className="laptop-category">Categoria: {laptop.category}</p>

            {/* Sezione con azioni rapide (preferiti, confronto) */}
            <div className="card-actions">

                {/* Icona per aggiungere/rimuovere dai preferiti */}
                <FavoritesIcon laptop={laptop} />

                {/* Selettore per aggiungere/rimuovere dalla comparazione */}
                <CompareIcon laptop={laptop} />

            </div>

            {/* Link per andare alla pagina dettaglio del laptop selezionato */}
            <Link to={`/detail/${laptop.id}`} className="detail-link" aria-label={`Dettagli di ${laptop.title}`}>
                Dettagli
            </Link>

        </article>

    );

}
