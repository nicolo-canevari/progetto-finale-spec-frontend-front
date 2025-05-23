/**
 * Questo componente permette all'utente di selezionare uno o più laptop
 * da aggiungere o rimuovere dalla lista di confronto.
*/

import React from 'react';
import './CompareSelector.css';

export default function CompareSelector({ laptops, selected, onSelect }) {

    return (

        // Contenitore principale del componente
        <div className="compare-selector">

            {/* Etichetta della sezione */}
            <label htmlFor="compare-select" className="compare-label">
                Seleziona laptop da confrontare:
            </label>

            {/* Menu a tendina per selezionare un laptop */}
            <select
                id="compare-select"               // ID usato dall'etichetta
                className="compare-dropdown"
                value={selected || ''}            // Valore selezionato (vuoto se null)
                onChange={(e) => onSelect(e.target.value)}  // Callback per aggiornare la selezione
                aria-label="Seleziona laptop da confrontare"
            >
                {/* Opzione vuota iniziale */}
                <option value="">-- Seleziona un laptop --</option>

                {/* Genera una option per ogni laptop nell'array passato come props */}
                {laptops.map((laptop) => (

                    <option key={laptop.id} value={String(laptop.id)}>
                        {laptop.title}
                    </option>

                ))}

            </select>

        </div>

    );

}
