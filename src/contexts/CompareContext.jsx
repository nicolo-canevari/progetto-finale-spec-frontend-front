/**
 * Questo modulo definisce un contesto React per gestire la lista dei laptop da confrontare.
 * Permette di aggiungere o rimuovere fino a un massimo di 2 laptop dalla lista di confronto.
 * 
 * Espone tramite il provider il valore `compareList` (array dei laptop da confrontare),
 * la funzione `toggleCompare` (per aggiungere/rimuovere un laptop),
 * e la funzione `isInCompare` (per controllare se un laptop è già in confronto).
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchLaptopById } from '../services/laptopServices';

// Crea il contesto per il confronto
const CompareContext = createContext();

// Hook personalizzato per accedere facilmente al contesto
export const useCompare = () => useContext(CompareContext);

// Componente Provider che wrappa l'app e fornisce i dati e le funzioni di confronto
export function CompareProvider({ children }) {

    // Stato: array di laptop selezionati per il confronto (max 2)
    const [compareList, setCompareList] = useState([]);

    // Al montaggio iniziale del componente, carica eventuali ID salvati nel localStorage
    useEffect(() => {

        const stored = localStorage.getItem('compareList');

        if (stored) {

            try {

                // Parsing dell'array di ID dal localStorage
                const ids = JSON.parse(stored);

                // Per ogni ID, esegue una richiesta per ottenere i dati completi del laptop
                Promise.all(ids.map(id => fetchLaptopById(id)))

                    .then(responses => {

                        // Estrae solo i laptop dai risultati e aggiorna lo stato
                        const laptops = responses.map(res => res.laptop);
                        setCompareList(laptops);
                    })
                    .catch(e => console.error("Errore nel caricamento dei laptop dal localStorage", e));
            } catch (e) {
                console.error("Errore nel parsing di compareList da localStorage", e);
            }
        }
    }, []);

    // Ogni volta che compareList cambia, salva gli ID nel localStorage per persistenza
    useEffect(() => {
        const ids = compareList.map(item => item.id);
        localStorage.setItem('compareList', JSON.stringify(ids));
    }, [compareList]);

    // Calcola prezzo minimo e massimo
    const prices = compareList.map(laptop => laptop.price);
    const maxPrice = prices.length ? Math.max(...prices) : null;
    const minPrice = prices.length ? Math.min(...prices) : null;

    // Funzione per aggiungere o rimuovere un laptop dalla lista confronto
    const toggleCompare = async (input) => {

        // Ottiene l'id del laptop dall'input (oggetto o id diretto)
        let laptopId = typeof input === 'object' ? input.id : input;

        try {

            // Richiama l'API per ottenere il laptop completo dai dati backend
            const response = await fetchLaptopById(laptopId);
            const laptop = response.laptop;

            // Aggiorna lo stato compareList in modo immutabile
            setCompareList(prev => {

                // Controlla se il laptop è già presente nella lista confronto
                const alreadyInCompare = prev.some(item => String(item.id) === String(laptop.id));

                if (alreadyInCompare) {
                    // Se è già presente, lo rimuove dalla lista
                    return prev.filter(item => String(item.id) !== String(laptop.id));
                } else if (prev.length < 2) {
                    // Se non è presente e la lista non è piena, aggiunge il laptop
                    return [...prev, laptop];
                } else {
                    // Se la lista è già piena, mostra un messaggio di errore e non modifico la lista
                    alert("Puoi confrontare solo 2 laptop alla volta.");
                    return prev;
                }
            });
        } catch (e) {
            // Gestione degli errori: log dell'errore in console
            console.error("Errore nel caricamento del laptop:", e);

            return;
        }

    };

    // Funzione per controllare se un laptop è già nella lista confronto
    const isInCompare = (laptopId) => {

        // Controlla se nella lista di confronto (compareList) esiste almeno un laptop con l'id specificato
        return compareList.some(item => item.id === laptopId);
    };

    // Espone le funzioni e lo stato a tutti i figli
    return (
        <CompareContext.Provider value={{ compareList, toggleCompare, isInCompare, minPrice, maxPrice }}>
            {children}
        </CompareContext.Provider>
    );
}
