import { SearchBox } from '../../../features/search-superhero/ui/search-box';
import { useSearch } from '../../../features/search-superhero/model/use-search';

export function HomePage() {
  const { searchQuery, search, isLoading, error, heroes } = useSearch();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-center text-4xl">
        Superhero Directory
      </h1>
      <p className="text-center">
        Welcome to the Superhero Directory! Here you can find
        information about your favorite superheroes.
      </p>

      <SearchBox
        value={searchQuery}
        onChange={search}
        isLoading={isLoading}
      />

      {error && (
        <div className="text-red-500 text-center">
          {error}
        </div>
      )}

      {!error && !isLoading && heroes.length === 0 && searchQuery && (
        <div className="text-center text-gray-500">
          No heroes found
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {heroes.map((hero) => (
          <div key={hero.id} className="p-4 border rounded-lg">
            <h3 className="font-bold">{hero.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}