// PAGINA PER MOSTRARE I PREFERITI

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// Importa il contesto per accedere ai preferiti
import { FavoritesContext } from '../contexts/FavoritesContext';
import LaptopCard from '../components/LaptopCard/LaptopCard';

export default function Favorites() {

    // Prende la lista dei laptop preferiti dal contesto
    const { favorites } = useContext(FavoritesContext);

    // Se non ci sono laptop preferiti, mostra un messaggio informativo
    if (favorites.length === 0) {

        return (

            <section>

                <nav>
                    <Link to="/">Home</Link>
                </nav>

                <p>Non ci sono laptop nei preferiti.</p>

            </section>

        );

    }

    // Renderizza la lista dei laptop preferiti
    return (

        // Sezione principale della pagina dei preferiti
        <section className="favorites-container">

            {/* Link per tornare alla Home */}
            <nav>
                <Link to="/">Home</Link>
            </nav>

            {/* Titolo della pagina */}
            <h1 className="favorites-title">I tuoi laptop preferiti</h1>

            {/* Lista dei laptop preferiti */}
            <div className="favorites-list">

                {/* Per ogni laptop nella lista dei preferiti, mostra una card */}
                {favorites.map(laptop => (
                    <LaptopCard key={laptop.id} laptop={laptop} />
                ))}

            </div>

        </section>

    );

}