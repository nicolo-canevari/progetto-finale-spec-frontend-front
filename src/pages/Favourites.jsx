// PAGINA PER MOSTRARE I PREFERITI

import React, { useContext } from 'react';
// Importa il contesto per accedere ai preferiti
import { FavoritesContext } from '../contexts/FavoritesContext';
import LaptopCard from '../components/LaptopCard/LaptopCard';

export default function Favorites() {

    // Prende la lista dei laptop preferiti dal contesto
    const { favorites } = useContext(FavoritesContext);

    // Se non ci sono laptop preferiti, mostra un messaggio informativo
    if (favorites.length === 0) {
        return <p className="favorites-empty-message">Non ci sono laptop nei preferiti.</p>;
    }

    // Renderizza la lista dei laptop preferiti
    return (

        <section className="favorites-container">

            <h1 className="favorites-title">I tuoi laptop preferiti</h1>

            <div className="favorites-list">

                {favorites.map(laptop => (
                    <LaptopCard key={laptop.id} laptop={laptop} />
                ))}

            </div>

        </section>

    );

}