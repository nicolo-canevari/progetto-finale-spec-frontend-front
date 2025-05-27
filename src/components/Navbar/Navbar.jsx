// Importa il componente Link da react-router-dom, per navigare tra le pagine della SPA
import { Link } from 'react-router-dom';
import { FaHome, FaBalanceScale, FaHeart } from 'react-icons/fa'
import './Navbar.css';

// Componente funzionale Navbar
export default function Navbar() {

    return (

        // Elemento nav che contiene i link di navigazione principali della SPA
        <nav className="navbar">

            {/* Link alla homepage */}
            <Link to="/" title="Home">
                <FaHome className="nav-icon" />
            </Link>

            {/* Link alla pagina di confronto tra laptop */}
            <Link to="/compare" title="Confronta">
                <FaBalanceScale className="nav-icon" />
            </Link>

            {/* Link alla pagina dei laptop preferiti */}
            <Link to="/favorites" title="Preferiti">
                <FaHeart className="nav-icon" />
            </Link>

        </nav>
    );

}