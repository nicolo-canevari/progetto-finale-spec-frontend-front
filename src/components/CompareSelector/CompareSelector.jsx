// COMPONENTE PER SELEZIONARE LAPTOP DA COMPARARE

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
                onChange={(e) => onSelect(e.target.value)}  // Aggiorna stato con nuovo ID
                aria-label="Seleziona laptop da confrontare"
            >
                {/* Opzione vuota iniziale */}
                <option value="">-- Seleziona un laptop --</option>

                {/* Mappa tutti i laptop per le opzioni */}
                {laptops.map((laptop) => (
                    <option key={laptop.id} value={laptop.id}>
                        {laptop.title}
                    </option>
                ))}
            </select>

        </div>

    );

}
