/**
 * Questo componente rappresenta una singola scheda di un laptop,
 * mostrando le principali informazioni come titolo, marca, categoria,
 * e altre caratteristiche utili.
*/

import React from 'react';
// Import per navigazione interna tra pagine (React Router)
import { Link } from 'react-router-dom';
import FavoritesIcon from '../FavoritesIcon/FavoritesIcon';
import CompareIcon from '../CompareIcon/CompareIcon';
import { FaLaptop } from 'react-icons/fa';
import './LaptopCard.css';


// Componente che mostra la scheda di un singolo laptop
export default function LaptopCard({ laptop }) {

    // Costruisce i path delle immagini se definiti
    const image = laptop.image || null;
    const imageHover = laptop.imageHover || null;


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
                {image && imageHover ? (
                    <>
                        <img
                            src={image}
                            alt={`Immagine normale di ${laptop.title}`}
                            className="laptopcard-image normal-image"
                        />
                        <img
                            src={imageHover}
                            alt={`Immagine hover di ${laptop.title}`}
                            className="laptopcard-image hover-image"
                        />
                    </>
                ) : image ? (
                    <img
                        src={image}
                        alt={`Immagine di ${laptop.title}`}
                        className="laptopcard-image"
                    />
                ) : (
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
