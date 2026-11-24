import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "fora-do-ar-favoritos";

function readFavorites() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readFavorites);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(show) {
    setFavorites((currentFavorites) => {
      const alreadySaved = currentFavorites.some((item) => item.id === show.id);
      return alreadySaved
        ? currentFavorites.filter((item) => item.id !== show.id)
        : [...currentFavorites, show];
    });
  }

  function isFavorite(showId) {
    return favorites.some((item) => item.id === Number(showId));
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites precisa ser usado dentro de FavoritesProvider.");
  return context;
}
