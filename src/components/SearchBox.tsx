
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-2xl mx-auto mb-8">
      <Input
        type="text"
        placeholder="Search YouTube videos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
