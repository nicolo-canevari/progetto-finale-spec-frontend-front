// CARD LAPTOP (usata nella lista e altrove)

import React from 'react';
// Import per navigazione interna tra pagine (React Router)
import { Link } from 'react-router-dom';
import FavoritesIcon from '../FavoritesIcon/FavoritesIcon';
import CompareIcon from '../CompareIcon/CompareIcon';
import './LaptopCard.css';


// Componente che mostra la scheda di un singolo laptop
export default function LaptopCard({ laptop }) {

    return (

        // Container principale 
        <article className="laptop-card">

            {/* Titolo del laptop */}
            <h2 className="laptop-title">{laptop.title}</h2>

            {/* Categoria del laptop */}
            <p className="laptop-category">{laptop.category}</p>

            {/* Sezione con azioni rapide (preferiti, confronto) */}
            <div className="card-actions">

                {/* Icona per aggiungere/rimuovere dai preferiti */}
                <FavoritesIcon laptop={laptop} />

                {/* Selettore per aggiungere/rimuovere dalla comparazione */}
                <CompareIcon laptop={laptop} />

            </div>

            {/* Link per andare alla pagina dettaglio del laptop selezionato */}
            <Link to={`/detail/${laptop.id}`} className="detail-link">
                Dettagli
            </Link>

        </article>

    );

}
