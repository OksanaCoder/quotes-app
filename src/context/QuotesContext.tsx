import { createContext, useContext, useState, useEffect } from "react";
import { Quote } from "../types/Quote";

interface QuotesContextValue {
  favorites: Quote[];
  toggleFavorite: (quote: Quote) => void;
  showFavorites: boolean;
  setShowFavorites: (v: boolean) => void;
  randomQuote: Quote | null;
  setRandomQuote: (q: Quote | null) => void;
  search: string;
  setSearch: (text: string) => void;
  lengthFilter: string;
  setLengthFilter: (value: string) => void;
}

const QuotesContext = createContext<QuotesContextValue | undefined>(undefined);

export function QuotesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Quote[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [showFavorites, setShowFavorites] = useState(false);
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [search, setSearch] = useState("");
  const [lengthFilter, setLengthFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(quote: Quote) {
    setFavorites((prev) =>
      prev.find((q) => q.id === quote.id)
        ? prev.filter((q) => q.id !== quote.id)
        : [...prev, quote]
    );
  }

  return (
    <QuotesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        showFavorites,
        setShowFavorites,
        randomQuote,
        setRandomQuote,
        search,
        setSearch,
        lengthFilter,
        setLengthFilter
      }}
    >
      {children}
    </QuotesContext.Provider>
  );
}

export function useQuotesContext() {
  const ctx = useContext(QuotesContext);
  if (!ctx) throw new Error("useQuotesContext must be inside QuotesProvider");
  return ctx;
}
