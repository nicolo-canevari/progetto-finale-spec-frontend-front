// FILTRO CATEGORIA

import React from 'react';
import './FilterCategory.css';

// Array delle categorie disponibili per il filtro
const categories = ['Tutti', 'Gaming', 'Ultrabook', 'Business', '2-in-1'];

// Componente filtro categoria come select dropdown
export default function FilterCategory({ value, onChange }) {

    return (

        <select

            className="filter-category"
            // valore selezionato
            value={value}
            // Quando cambia il valore, si chiama onChange passandogli la nuova categoria
            // Se selezionato "Tutti", si invia stringa vuota per togliere il filtro
            onChange={e => onChange(e.target.value === 'Tutti' ? '' : e.target.value)}
            aria-label="Filtro per categoria"
        >
            {/* Mappa ogni categoria in un'opzione della select */}
            {categories.map(cat => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
            ))}

        </select>
    );

}
