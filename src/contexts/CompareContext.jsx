// Per gestire i Laptop da confrontare (max 2)  

import React, { createContext, useContext, useState } from 'react';

// Crea il contesto per il confronto
const CompareContext = createContext();

// Hook personalizzato per accedere facilmente al contesto
export const useCompare = () => useContext(CompareContext);

// Componente Provider che wrappa l'app
export function CompareProvider({ children }) {

    // Stato: array di laptop selezionati per il confronto (max 2)
    const [compareList, setCompareList] = useState([]);

    // Funzione per aggiungere o rimuovere un laptop dalla lista confronto
    const toggleCompare = (laptop) => {
        const alreadyInCompare = compareList.some(item => item.id === laptop.id);

        if (alreadyInCompare) {
            // Se già presente → rimuovilo
            setCompareList(prev => prev.filter(item => item.id !== laptop.id));
        } else if (compareList.length < 2) {
            // Se non presente e ce n'è meno di 2 → aggiungilo
            setCompareList(prev => [...prev, laptop]);
        } else {
            // Se sono già 2, non fare nulla (oppure mostrare un avviso)
            alert("Puoi confrontare solo 2 laptop alla volta.");
        }

    };

    // Funzione per controllare se un laptop è già nella lista confronto
    const isInCompare = (laptopId) => {

        // Controlla se nella lista di confronto (compareList) esiste almeno un laptop con l'id specificato
        return compareList.some(item => item.id === laptopId);
    };

    // Espone le funzioni e lo stato a tutti i figli
    return (
        <CompareContext.Provider value={{ compareList, toggleCompare, isInCompare }}>
            {children}
        </CompareContext.Provider>
    );
}
