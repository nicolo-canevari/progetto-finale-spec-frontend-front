// Importa il componente Link da react-router-dom, per navigare tra le pagine della SPA
import { Link } from 'react-router-dom';
import './Navbar.css';

// Componente funzionale Navbar
export default function Navbar() {

    return (

        // Elemento nav che contiene i link di navigazione principali della SPA
        <nav className="navbar">

            {/* Link alla homepage. Il componente <Link> evita il refresh della pagina */}
            <Link to="/">Home</Link>

            {/* Link alla pagina di confronto tra laptop */}
            <Link to="/compare">Confronta</Link>

            {/* Link alla pagina dei laptop preferiti */}
            <Link to="/favorites">Preferiti</Link>

        </nav>

    );

}