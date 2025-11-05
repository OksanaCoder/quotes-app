import { useEffect } from "react";
import QuoteCard from "../components/QuoteCard";
import { useQuotes } from "../hooks/useQuotes";
import { useQuotesContext } from "../context/QuotesContext";
import { Quote } from "../types/Quote";

export default function QuotesPage() {
  const {
    data: quotes = [],
    isLoading: loading,
    error,
    refetch: fetchQuotes
  } = useQuotes();

  const {
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
  } = useQuotesContext();

  // Filtering logic stays the same
  const filteredQuotes = quotes
    .filter((q: Quote) => q.quote.toLowerCase().includes(search.toLowerCase()))
    .filter((q: Quote) => {
      const length = q.quote.length;
      if (lengthFilter === "short") return length < 60;
      if (lengthFilter === "medium") return length >= 60 && length <= 120;
      if (lengthFilter === "long") return length > 120;
      return true;
    });

  const visibleQuotes = showFavorites ? favorites : filteredQuotes;

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Quotes of the Day</h1>

      {/* Controls */}
      <button onClick={fetchQuotes}>Refresh</button>

      <button
        onClick={() =>
          setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)])
        }
      >
        ✨ Inspire Me
      </button>

      <button onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? "Show All" : "Show Favorites ⭐"}
      </button>

      {/* Filters */}
      <div>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={lengthFilter}
          onChange={(e) => setLengthFilter(e.target.value)}
        >
          <option value="all">All Lengths</option>
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
      </div>

      {/* Random Quote Display */}
      {randomQuote && (
        <QuoteCard
          quote={randomQuote.quote}
          author={randomQuote.author}
          onFavorite={() => toggleFavorite(randomQuote)}
          isFavorite={favorites.some((q) => q.id === randomQuote.id)}
        />
      )}

      {/* No Results */}
      {visibleQuotes.length === 0 && <p>No quotes found.</p>}

      {/* Main List */}
      {visibleQuotes.map((q: Quote) => (
        <QuoteCard
          key={q.id}
          quote={q.quote}
          author={q.author}
          onFavorite={() => toggleFavorite(q)}
          isFavorite={favorites.some((fav) => fav.id === q.id)}
        />
      ))}
    </div>
  );
}
