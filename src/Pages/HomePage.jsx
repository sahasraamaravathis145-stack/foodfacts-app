import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'

function HomePage() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (query) => {
    if (!query) return

    setLoading(true)
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`
      )
      const data = await response.json()

      setResults(data.products || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h2>Search Nutrition Info</h2>

      <SearchBar onSearch={handleSearch} />

      {/* 🔄 Loading */}
      {loading && <p>Loading... ⏳</p>}

      {/* 😶 Empty state */}
      {!loading && results.length === 0 && (
        <p>No results found. Try searching something! 🔍</p>
      )}

      {/* 🍔 Results */}
      {!loading && results.length > 0 && (
        <FoodList foods={results} />
      )}
    </div>
  )
}

export default HomePage