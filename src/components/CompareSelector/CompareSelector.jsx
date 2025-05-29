/**
 * Questo componente permette all'utente di selezionare uno o più laptop
 * da aggiungere o rimuovere dalla pagina di confronto (Compare.jsx).
*/

import React from 'react';
import Select from 'react-select';
import './CompareSelector.css';

export default function CompareSelector({ laptops, selected, onSelect }) {

    // Converti i laptop in opzioni per react-select
    const options = laptops.map((laptop) => ({
        value: String(laptop.id),  // ID come stringa
        label: laptop.title,  // Titolo mostrato all'utente
    }));

    // Trova l'opzione selezionata basandosi sul valore ricevuto tramite props
    const selectedOption = options.find(opt => opt.value === selected) || null;

    return (

        <div className="compare-selector">

            {/* Etichetta descrittiva per il menu */}
            <label className="compare-label">
                Seleziona laptop da confrontare:
            </label>

            {/* Componente Select da react-select */}
            <Select
                options={options}
                value={selectedOption}
                onChange={(option) => onSelect(option ? option.value : '')}  // Callback sul cambio
                placeholder="-- Seleziona un laptop --"
                classNamePrefix="react-select"
                isSearchable={false}
            />

        </div>

    );

}