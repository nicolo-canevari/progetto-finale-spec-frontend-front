// Importa StrictMode da React per abilitare controlli aggiuntivi durante lo sviluppo
import { StrictMode } from 'react';

// Importa createRoot da react-dom/client per creare il root dell'app React
import { createRoot } from 'react-dom/client';

// Importa BrowserRouter da react-router-dom per abilitare il routing nell'applicazione
import { BrowserRouter } from 'react-router-dom';

// Importa lo stile globale dell'app
import './index.css';

// Importa il componente principale dell'applicazione
import App from './App.jsx';

// Collega l'applicazione al nodo DOM con id "root"
createRoot(document.getElementById('root')).render(

  // StrictMode aiuta a identificare problemi comuni durante lo sviluppo
  <StrictMode>

    {/* BrowserRouter abilita la navigazione tra pagine nella SPA */}
    <BrowserRouter>

      {/* App è il componente principale che conterrà tutte le pagine */}
      <App />

    </BrowserRouter>

  </StrictMode>,

);