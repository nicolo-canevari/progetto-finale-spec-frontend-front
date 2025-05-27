/**
 * Questo componente rappresenta un'icona utilizzata per indicare
 * se un laptop è stato aggiunto ai preferiti o meno.
*/


import React, { useContext } from 'react';
// Importa il contesto che gestisce lo stato dei preferiti
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './FavoritesIcon.css'

export default function FavoritesIcon({ laptop }) {

    // Ottiene lo stato e le funzioni dal context
    const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

    // Controlla se il laptop è tra i preferiti
    const favorite = isFavorite(laptop.id);

    return (

        <button
            className="favorites-icon-button"
            onClick={() => toggleFavorite(laptop)}     // Chiama toggle al click
            aria-label={favorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
            title={favorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        >
            {/* Mostra il simbolo ❤️ se è tra i preferiti, 🤍 altrimenti */}
            <span className="favorites-icon">
                {favorite ? <FaHeart /> : <FaRegHeart />}
            </span>

        </button>

    );

}
