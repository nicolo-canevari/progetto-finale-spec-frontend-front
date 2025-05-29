/**
 * Questo componente rappresenta un bottone che permette all'utente
 * di aggiungere o rimuovere un laptop dalla pagina di confronto (Compare.jsx).
*/

import React from 'react';
import { useCompare } from '../../contexts/CompareContext';
import { BiGitCompare } from 'react-icons/bi';
import './CompareIcon.css';

// Componente per aggiungere/rimuovere un laptop dalla comparazione
export default function CompareIcon({ laptop }) {

    // Ottiene dal contesto le funzioni per modificare la lista confronto
    const { toggleCompare, isInCompare } = useCompare();

    // Controlla se il laptop è già nella lista confronto
    const inCompare = isInCompare(laptop.id);

    return (

        // Bottone che consente di aggiungere o rimuovere il laptop dal confronto
        <button
            onClick={() => toggleCompare(laptop)}  // Chiama la funzione toggle con il laptop corrente
            className={`compare-icon ${inCompare ? 'active' : ''}`}  // Applica classe diversa se attivo
            aria-label={inCompare ? "Rimuovi dal confronto" : "Aggiungi al confronto"}
        >
            {/* Mostra un'icona diversa in base allo stato */}
            <BiGitCompare />
        </button>

    );

}
