/**
 * Questo componente rappresenta una barra di input testuale
 * che permette all'utente di inserire una stringa per effettuare
 * una ricerca filtrata.
*/


import React from 'react';
import './SearchBar.css';

// Componente SearchBar: input testuale per ricerca
export default function SearchBar({ value, onChange }) {

    return (

        // Input di testo con classe per stile e accessibilità
        <input
            type="text"
            className="search-bar"
            placeholder="Cerca per titolo..." // Testo placeholder
            value={value} // Valore controllato dal parent
            onChange={e => onChange(e.target.value)} // Callback al parent al cambio valore
            aria-label="Barra di ricerca"
        />

    );
}