import { useQuery } from "@tanstack/react-query";
import { Quote } from "../types/Quote";

async function fetchQuotes(): Promise<Quote[]> {
  const res = await fetch("https://dummyjson.com/quotes?limit=10");
  if (!res.ok) throw new Error("Failed to fetch quotes");
  const data = await res.json();
  return data.quotes as Quote[];
}

export function useQuotes() {
  return useQuery({
    queryKey: ["quotes"],
    queryFn: fetchQuotes,
    staleTime: 60_000, // 1 minute caching
    refetchOnWindowFocus: false,
  });
}
