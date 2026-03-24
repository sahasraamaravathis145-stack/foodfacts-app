import React from "react";
import { useNavigate } from "react-router-dom";

function FoodCard({ product }) {
  const navigate = useNavigate();

  const { product_name, brands, nutriments, image_small_url, code } = product;

  const handleClick = () => {
    if (code) {
      navigate(`/product/${code}`);
    }
  };

  return (
    <div
      className="food-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      
      {/* Product Image */}
      <img
        src={image_small_url ? image_small_url : "https://via.placeholder.com/100"}
        alt={product_name ? product_name : "No image available"}
        className="food-image"
      />

      {/* Product Name */}
      {product_name ? (
        <h2>{product_name}</h2>
      ) : (
        <h2>Unknown Product</h2>
      )}

      {/* Brand */}
      <p>
        <strong>Brand:</strong> {brands ? brands : "Unknown"}
      </p>

      {/* Nutritional Info */}
      <div className="nutrients">
        <p>
          Calories: {nutriments?.["energy-kcal_100g"] ?? "N/A"} kcal
        </p>
        <p>
          Protein: {nutriments?.proteins_100g ?? "N/A"} g
        </p>
        <p>
          Carbs: {nutriments?.carbohydrates_100g ?? "N/A"} g
        </p>
        <p>
          Fat: {nutriments?.fat_100g ?? "N/A"} g
        </p>
      </div>

    </div>
  );
}

export default FoodCard;