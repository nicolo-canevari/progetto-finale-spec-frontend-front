# Laptop Compare SPA

## Descrizione

Questo progetto è una Single Page Application (SPA) realizzata con React che permette a un utente non autenticato di:

- Sfogliare una lista di laptop
- Cercare e filtrare i laptop per titolo e categoria
- Ordinare i risultati per titolo o categoria (ascendente/descendente)
- Visualizzare i dettagli di ogni laptop
- Confrontare fino a due laptop affiancati
- Salvare i laptop preferiti per consultazioni future

⚠️ L’utente **non può** creare, modificare o cancellare i record dei laptop: la SPA è solo in lettura.

---

## Struttura del progetto

- `/src/pages`  
  Contiene le pagine principali (Home, Detail, Compare, Favorites)

- `/src/components`  
  Componenti riutilizzabili come SearchBar, FilterCategory, LaptopCard, CompareSelector e FavouriteIcon.

- `/src/contexts`  
  Context React per gestire stati globali come preferiti e confronto laptop

- `/src/services`  
  Funzioni per comunicare con il backend tramite fetch API (es. `fetchLaptops`)

