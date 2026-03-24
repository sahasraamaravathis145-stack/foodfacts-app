import { useState } from "react";
import axios from "axios";

function useFoodSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://world.openfoodfacts.org/cgi/search.pl",
        {
          params: {
            search_terms: query,
            search_simple: 1,
            action: "process",
            json: 1,
          },
        }
      );

      // ✅ FIX: ensure we always set an array
      setResults(
        Array.isArray(response.data.products)
          ? response.data.products
          : []
      );
    } catch (err) {
      if (err.response) {
        setError(`Server error: ${err.response.status}. Please try again.`);
      } else if (err.request) {
        setError("Network error. Check your connection and try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }

      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
}

export default useFoodSearch;