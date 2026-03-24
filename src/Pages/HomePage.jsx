import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'
import useFoodSearch from '../hooks/useFoodSearch'

function HomePage() {
  const { results, loading, error, search } = useFoodSearch()

  return (
    <div className="page">
      <h2>Search Nutrition Info</h2>

      {/* 🔍 Search */}
      <SearchBar onSearch={search} />

      {/* 🔄 Loading */}
      {loading && <p>Loading... ⏳</p>}

      {/* ❌ Error */}
      {error && <p>Error: {error} ⚠️</p>}

      {/* 😶 Empty state */}
      {!loading && !error && results.length === 0 && (
        <p>No results found. Try searching something! 🔍</p>
      )}

      {/* 🍔 Results */}
      {!loading && !error && results.length > 0 && (
        <FoodList products={results} />
      )}
    </div>
  )
}

export default HomePage