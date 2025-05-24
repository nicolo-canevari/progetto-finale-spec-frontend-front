// PAGINA PER MOSTRARE I PREFERITI

import React, { useContext } from 'react';
// Importa il contesto per accedere ai preferiti
import { FavoritesContext } from '../contexts/FavoritesContext';
import LaptopCard from '../components/LaptopCard/LaptopCard';
import Layout from '../components/Layout/Layout';

export default function Favorites() {

    // Prende la lista dei laptop preferiti dal contesto
    const { favorites } = useContext(FavoritesContext);

    // Renderizza la lista dei laptop preferiti
    return (

        <Layout>

            {/* Sezione principale della pagina dei preferiti */}
            <section className="favorites-container">

                {/* Titolo della pagina */}
                <h1 className="favorites-title">I tuoi laptop preferiti</h1>

                {/* Se la lista è vuota, mostra un messaggio */}
                {favorites.length === 0 ? (
                    <p>Non ci sono laptop nei preferiti.</p>
                ) : (

                    <div className="favorites-list">

                        {/* Per ogni laptop nella lista dei preferiti, mostra una card */}
                        {favorites.map(laptop => (
                            <LaptopCard key={laptop.id} laptop={laptop} />
                        ))}

                    </div>

                )}

            </section>

        </Layout >

    );

}