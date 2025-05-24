/**
 * Questo componente riceve un array di laptop filtrati e ordinati
 * e li mappa in una lista di schede visive (<LaptopCard />).
 * Se l'array è vuoto, mostra un messaggio di "Nessun laptop trovato".
*/


// Importa il componente LaptopCard per visualizzare ogni singolo laptop
import LaptopCard from '../LaptopCard/LaptopCard';

// Componente che riceve un array di laptop e li rende in una lista di card
export default function LaptopList({ laptops }) {

    // Se l'array è vuoto, mostra un messaggio di "nessun risultato"
    if (laptops.length === 0) {
        return <p className="no-results-message">Nessun laptop trovato.</p>;
    }

    // Altrimenti, mappa l'array e genera una LaptopCard per ogni laptop
    return (

        <section className="laptops-list">

            {laptops.map(laptop => (
                // Usa l'id come key unica per ogni elemento della lista
                <LaptopCard key={laptop.id} laptop={laptop} />
            ))}

        </section>

    );

}
