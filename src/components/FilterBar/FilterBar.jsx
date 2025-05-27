/**
 * Questo componente contiene gli input per filtrare la lista dei laptop.
 * Comprende una barra di ricerca testuale e un filtro per categoria.
*/


// Importa i componenti per la barra di ricerca e il filtro per categoria
import SearchBar from '../SearchBar/SearchBar';
import FilterCategory from '../FilterCategory/FilterCategory';


// Componente che combina SearchBar e FilterCategory in un'unica barra di filtri
export default function FilterBar({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter }) {

    return (

        <>

            <div className="filter-bar-container">

                {/* Wrapper per la barra di ricerca */}
                <div className="search-bar-wrapper">

                    {/* Componente input per cercare per titolo */}
                    <SearchBar
                        value={searchTerm}              // valore attuale della ricerca
                        onChange={setSearchTerm}        // funzione per aggiornare lo stato della ricerca
                    />

                </div>

                {/* Wrapper per il filtro categoria */}
                <div className="filter-category-wrapper">

                    {/* Componente select per filtrare per categoria */}
                    <FilterCategory
                        value={categoryFilter}           // categoria attualmente selezionata
                        onChange={setCategoryFilter}     // funzione per aggiornare lo stato del filtro
                    />

                </div>

            </div>

        </>

    );

}
