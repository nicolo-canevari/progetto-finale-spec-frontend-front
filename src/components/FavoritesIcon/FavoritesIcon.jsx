// ICONA PER AGGIUNGERE/RIMUOVERE PREFERITI

import React, { useContext } from 'react';
// Importa il contesto che gestisce lo stato dei preferiti
import { FavoritesContext } from '../../contexts/FavoritesContext';

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
                {favorite ? '❤️' : '🤍'}
            </span>
        </button>

    );

}
