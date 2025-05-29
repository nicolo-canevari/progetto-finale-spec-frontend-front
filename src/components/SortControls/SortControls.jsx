/**
 * Questo componente fornisce i controlli per l'ordinamento della lista.
 * Consente di selezionare la proprietà su cui ordinare (es. titolo o categoria)
 * e di invertire l'ordine (ascendente o discendente).
 */

// Icone per indicare ordine asc/desc
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import './SortControl.css';


export default function SortControls({ sortBy, sortOrder, setSortBy, setSortOrder }) {

    return (

        // Contenitore principale dei controlli di ordinamento
        <div className="sort-controls-container">

            {/* Etichetta e select per scegliere il campo su cui ordinare (titolo o categoria) */}
            <label htmlFor="sort-by" className="sort-label">

                Ordina per:&nbsp;

                <select
                    className="sort-select"
                    value={sortBy} // valore attualmente selezionato
                    onChange={e => setSortBy(e.target.value)} // aggiorna il campo su cui ordinare
                >
                    <option value="title">Titolo</option>
                    <option value="category">Categoria</option>
                </select>

            </label>

            {/* Bottone per invertire l'ordine di ordinamento (ascendente <-> discendente) */}
            <button
                className="sort-order-button"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} // toggle tra asc e desc
                aria-label="Inverti ordine"
            >
                {/* Mostra l'etichetta del tipo di ordinamento corrente */}
                {sortOrder === 'asc'
                    ? <AiOutlineSortAscending className="sort-icon" />
                    : <AiOutlineSortDescending className="sort-icon" />
                }
            </button>

        </div>
    );
}
