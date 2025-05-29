import { Routes, Route, Navigate } from 'react-router-dom';

// Importa le pagine principali
import Home from './pages/Home';
import Detail from './pages/Detail';
import Compare from './pages/Compare';
import Favorites from './pages/Favorites';
import './index.css';

function App() {

  return (

    <Routes>

      {/* Route per la home con la lista dei laptop */}
      <Route path="/" element={<Home />} />

      {/* Route per la pagina dettaglio, con parametro id */}
      <Route path="/detail/:id" element={<Detail />} />

      {/* Route per la pagina comparatore */}
      <Route path="/compare" element={<Compare />} />

      {/* Route per la pagina preferiti */}
      <Route path="/favorites" element={<Favorites />} />

      {/* Redirect qualsiasi percorso non definito alla home */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>

  );

}

export default App;
