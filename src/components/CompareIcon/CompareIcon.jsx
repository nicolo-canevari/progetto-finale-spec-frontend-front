import React from 'react';
import { useCompare } from '../../contexts/CompareContext';
import './CompareIcon.css';

// Componente per aggiungere/rimuovere un laptop dalla comparazione
export default function CompareIcon({ laptop }) {

    // Ottiene funzioni dal context
    const { toggleCompare, isInCompare } = useCompare();

    // Controlla se il laptop è già nella lista confronto
    const inCompare = isInCompare(laptop.id);

    return (

        // Bottone che consente di aggiungere o rimuovere il laptop dal confronto
        <button
            onClick={() => toggleCompare(laptop)}
            className={`compare-icon ${inCompare ? 'active' : ''}`}  // Applica classe diversa se attivo
            aria-label={inCompare ? "Rimuovi dal confronto" : "Aggiungi al confronto"}
        >
            {/* Mostra un'icona diversa in base allo stato */}
            {inCompare ? '🔁' : '➕'}
        </button>

    );

}
