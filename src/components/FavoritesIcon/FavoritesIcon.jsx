// ICONA PER AGGIUNGERE/RIMUOVERE PREFERITI

import React, { useContext } from 'react';
// Importa il contesto che gestisce lo stato dei preferiti
import { FavoritesContext } from '../contexts/FavoritesContext';

export default function FavoritesIcon({ laptopId }) {

    // OttienE lo stato e le funzioni dal contesto dei preferiti
    const { favorites, toggleFavorite } = useContext(FavoritesContext);

    // Verifica se il laptop è attualmente nei preferiti
    const isFavorite = favorites.includes(laptopId);

    return (

        <button
            className="favorites-icon-button"            // Classe CSS (da fare in seguito)
            onClick={() => toggleFavorite(laptopId)}     // Chiama toggle al click
            aria-label={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
            title={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        >
            {/* Mostra il simbolo ❤️ se è tra i preferiti, 🤍 altrimenti */}
            <span className="favorites-icon">
                {isFavorite ? '❤️' : '🤍'}
            </span>
        </button>

    );

}
