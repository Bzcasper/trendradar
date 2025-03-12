
import { useState, useCallback } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Search, Sparkles } from "lucide-react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export const SearchBox = ({ onSearch, isLoading }: SearchBoxProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  }, [query, onSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-2xl w-full">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </div>
        <Input
          type="text"
          placeholder="Search for trends across platforms..."
          value={query}
          onChange={handleChange}
          className="pl-10 pr-4 py-6 transition-colors text-base"
          disabled={isLoading}
          aria-label="Search query"
        />
      </div>
      <Button 
        type="submit" 
        disabled={isLoading}
        size="lg"
        className="min-w-[120px] bg-brand-primary hover:bg-brand-primary/90"
        aria-label={isLoading ? "Analyzing trends..." : "Analyze trends"}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Analyzing</span>
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Analyze</span>
          </>
        )}
      </Button>
    </form>
  );
};
