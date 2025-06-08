import { ChangeEvent } from 'react';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export function SearchBox({ value, onChange, isLoading }: SearchBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Search superheroes..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        data-testid="search-input"
      />
      {isLoading && (
        <div
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          data-testid="loading-indicator"
        >
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent" />
        </div>
      )}
    </div>
  );
}