interface QuoteCardProps {
  quote: string;
  author: string;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export default function QuoteCard({
  quote,
  author,
  onFavorite,
  isFavorite,
}: QuoteCardProps) {
  return (
    <div style={{ margin: "20px 0", borderBottom: "1px solid #ddd" }}>
      <p style={{ fontSize: "18px" }}>"{quote}"</p>
      <p style={{ opacity: 0.6 }}>— {author}</p>
      {onFavorite && (
        <button onClick={onFavorite}>
          {isFavorite ? "★ Unfavorite" : "☆ Favorite"}
        </button>
      )}
    </div>
  );
}
