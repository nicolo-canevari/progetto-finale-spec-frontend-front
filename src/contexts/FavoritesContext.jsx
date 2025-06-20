/**
 * Questo modulo definisce un contesto React per gestire lo stato globale dei "laptop preferiti".
 * Il context permette di:
 * - Aggiungere e rimuovere laptop dai preferiti
 * - Controllare se un laptop è tra i preferiti
 * - Salvare la lista dei preferiti nel localStorage per mantenerla persistente tra le sessioni
 */


import React, { createContext, useState, useEffect } from 'react';

// Crea il contesto per i preferiti
export const FavoritesContext = createContext();

// Provider che avvolge l'app per fornire lo stato dei preferiti e le funzioni associate
export function FavoritesProvider({ children }) {

    // Stato per la lista dei laptop preferiti, inizializzato dal localStorage (se presente)
    const [favorites, setFavorites] = useState(() => {

        try {

            // Recupera i preferiti dal localStorage
            const saved = localStorage.getItem('favorites');
            // Se esistono dati salvati li converte da stringa a array, altrimenti array vuoto
            return saved ? JSON.parse(saved) : [];

        } catch (e) {
            console.error("Errore nel parsing dei preferiti dal localStorage", e);
            return [];
        }

    });

    // Aggiorna il localStorage ogni volta che cambia la lista dei preferiti
    useEffect(() => {

        // Salva la lista aggiornata come stringa JSON
        localStorage.setItem('favorites', JSON.stringify(favorites));

    }, [favorites]);  // Si attiva solo quando 'favorites' cambia

    // Funzione per aggiungere un laptop ai preferiti (se non è già presente)
    const addFavorite = (laptop) => {

        const completeLaptop = {
            ...laptop,
            image: laptop.image?.startsWith('http') ? laptop.image : `${window.location.origin}/${laptop.image}`,
            imageHover: laptop.imageHover?.startsWith('http') ? laptop.imageHover : `${window.location.origin}/${laptop.imageHover}`,
        };

        setFavorites((prev) => {

            // Controlla se il laptop è già presente nella lista per evitare duplicati
            if (prev.some(item => item.id === laptop.id)) return prev;
            // Se non è presente lo aggiunge creando un nuovo array
            return [...prev, completeLaptop];

        });

    };

    // Funzione per rimuovere un laptop dai preferiti tramite id
    const removeFavorite = (laptopId) => {

        // Filtra la lista mantenendo solo gli elementi che NON hanno l'id passato
        setFavorites((prev) => prev.filter(item => item.id !== laptopId));

    };

    // Funzione per controllare se un laptop è tra i preferiti
    const isFavorite = (laptopId) => {
        return favorites.some(item => item.id === laptopId);  // Restituisce true o false
    };

    // Toggle: aggiunge o rimuove a seconda se è già preferito
    const toggleFavorite = (laptop) => {

        // Aggiorna la lista dei preferiti basandosi sul valore precedente
        setFavorites(prev => {

            // Se il laptop è già nei preferiti, ritorna una nuova lista filtrata senza quel laptop
            if (prev.some(item => item.id === laptop.id)) {
                return prev.filter(item => item.id !== laptop.id);

                // Se il laptop NON è nei preferiti, crea una nuova lista aggiungendo il laptop in fondo
            } else {
                return [...prev, laptop];
            }

        });

    };

    // Ritorna il provider con il valore da condividere
    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );

}