import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function DetailPage() {
  const { barcode } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        )

        if (response.data.status === 1) {
          setProduct(response.data.product)
        } else {
          setProduct(null)
        }
      } catch (err) {
        setError('Failed to fetch product details.')
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [barcode])

  if (loading) return <p>Loading product details... ⏳</p>
  if (error) return <p>{error} ⚠️</p>
  if (!product) return <p>Product not found.</p>

  const {
    product_name,
    brands,
    image_front_small_url,
    nutriments
  } = product

  return (
    <div className="detail-page">
      {/* 🔙 Back Button */}
      <button onClick={() => navigate(-1)}>← Back</button>

      {/* 🧾 Header */}
      <div className="detail-header">
        <img
          src={image_front_small_url || "https://via.placeholder.com/150"}
          alt={product_name || "No image"}
        />
        <h2>{product_name || "Unknown Product"}</h2>
        <p><strong>Brand:</strong> {brands || "Unknown"}</p>
      </div>

      {/* 🥗 Nutrition Info */}
      <div className="nutrition-table">
        <h3>Nutrition per 100g</h3>
        <ul>
          <li>Calories: {nutriments?.["energy-kcal_100g"] ?? "N/A"} kcal</li>
          <li>Protein: {nutriments?.proteins_100g ?? "N/A"} g</li>
          <li>Carbohydrates: {nutriments?.carbohydrates_100g ?? "N/A"} g</li>
          <li>Fat: {nutriments?.fat_100g ?? "N/A"} g</li>
          <li>Sugars: {nutriments?.sugars_100g ?? "N/A"} g</li>
          <li>Salt: {nutriments?.salt_100g ?? "N/A"} g</li>
        </ul>
      </div>

      {/* 💾 Save Button */}
      <button
        onClick={() => {
          const saved = JSON.parse(localStorage.getItem('savedFoods')) || []
          localStorage.setItem(
            'savedFoods',
            JSON.stringify([...saved, product])
          )
          alert('Saved successfully! ✅')
        }}
      >
        Save to My List
      </button>
    </div>
  )
}

export default DetailPage