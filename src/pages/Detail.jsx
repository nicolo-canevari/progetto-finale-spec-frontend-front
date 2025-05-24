// PAGINA DEL DETTAGLIO DEL PRODOTTO SELEZIONATO

import React, { useEffect, useState } from 'react';
// useParams serve per leggere i parametri della URL
import { useParams } from 'react-router-dom';
// Import della funzione che recupera i dati di un laptop dal backend
import { fetchLaptopById } from '../services/laptopServices';
import FavoriteIcon from '../components/FavoritesIcon/FavoritesIcon';
import Layout from '../components/Layout/Layout';

export default function Detail() {

    // Estrae l'id del laptop dai parametri URL
    const { id } = useParams();

    // Stato per contenere i dati del laptop recuperati
    const [laptop, setLaptop] = useState(null);
    // Stato per gestire il caricamento dati
    const [loading, setLoading] = useState(true);
    // Stato per gestire eventuali errori nella chiamata API
    const [error, setError] = useState(null);

    // useEffect esegue la chiamata API al montaggio del componente o se cambia l'id
    useEffect(() => {

        // Funzione asincrona per caricare i dati del laptop dal backend
        async function loadLaptop() {

            try {
                // Imposta loading a true all'inizio del caricamento
                setLoading(true);

                // Effettua la chiamata API passando l'id del laptop
                const data = await fetchLaptopById(id);

                // Salva i dati ricevuti nello stato laptop
                setLaptop(data.laptop);
                // Resetta eventuali errori precedenti
                setError(null);

            } catch (err) {
                // Se c'è un errore, salva il messaggio nello stato error
                setError(err.message);
                // Resetta il laptop a null per evitare dati incoerenti
                setLaptop(null);

            } finally {
                // Imposta loading a false, fine caricamento (sia in caso di successo o errore)
                setLoading(false);
            }
        }

        // Invoca la funzione per caricare i dati
        loadLaptop();

    }, [id]);  // L'effetto si riesegue se cambia l'id nella URL

    // Se stiamo caricando, mostra un messaggio di caricamento
    if (loading) return (

        <Layout>
            <p>Caricamento in corso...</p>
        </Layout>

    )

    // Se c'è un errore, mostra la sezione con il messaggio di errore
    if (error) return (

        <Layout>
            <div className="detail-error">
                <h2>Errore</h2>
                <p>{error}</p>
            </div>
        </Layout>

    );

    // Se per qualche motivo non abbiamo dati, non mostra nulla (fallback)
    if (!laptop) return null;

    // Debug
    console.log("Laptop ricevuto:", laptop);

    // Renderizza la pagina con i dettagli del laptop
    return (

        <Layout>

            <section className="detail-container">

                {/* Titolo principale con il nome del laptop */}
                <h1>{laptop.title}</h1>

                {/* icona per aggiungere il Laptop ai preferiti */}
                <FavoriteIcon laptop={laptop} />

                {/* Lista puntata con tutte le caratteristiche del laptop */}
                <ul className="detail-list">

                    <li><strong>Categoria:</strong> {laptop.category}</li>
                    <li><strong>Brand:</strong> {laptop.brand}</li>
                    <li><strong>CPU:</strong> {laptop.cpu}</li>
                    <li><strong>RAM:</strong> {laptop.ram}</li>
                    <li><strong>Storage:</strong> {laptop.storage}</li>
                    <li><strong>Display:</strong> {laptop.display}</li>
                    <li><strong>GPU:</strong> {laptop.gpu}</li>
                    <li><strong>Sistema Operativo:</strong> {laptop.os}</li>
                    <li><strong>Prezzo:</strong> {laptop.price}€</li>
                    <li><strong>Peso:</strong> {laptop.weight}</li>
                    <li><strong>Durata Batteria:</strong> {laptop.batteryLife}</li>

                </ul>

            </section>

        </Layout>

    );

}