// Importa StrictMode da React per abilitare controlli aggiuntivi durante lo sviluppo
import { StrictMode } from 'react';

// Importa createRoot da react-dom/client per creare il root dell'app React
import { createRoot } from 'react-dom/client';

// Importa BrowserRouter da react-router-dom per abilitare il routing nell'applicazione
import { BrowserRouter } from 'react-router-dom';

// Importa il componente principale dell'applicazione
import App from './App.jsx';

// Importa i context provider per preferiti e confronto
import { FavoritesProvider } from './contexts/FavoritesContext';
import { CompareProvider } from './contexts/CompareContext';

// Collega l'applicazione al nodo DOM con id "root"
createRoot(document.getElementById('root')).render(

  // StrictMode aiuta a identificare problemi comuni durante lo sviluppo
  <StrictMode>

    {/* BrowserRouter abilita la navigazione tra pagine nella SPA */}
    <BrowserRouter>

      {/* Avvolge tutta l'app nei context provider per gestire preferiti e confronto globalmente */}
      <FavoritesProvider>

        {/* CompareProvider avvolge l'app fornendo il context per gestire
            la lista di elementi da confrontare, accessibile da qualsiasi componente */}
        <CompareProvider>

          {/* Il componente principale dell'app che contiene tutta la UI e la logica */}
          <App />

        </CompareProvider>

      </FavoritesProvider>

    </BrowserRouter>

  </StrictMode>,

);