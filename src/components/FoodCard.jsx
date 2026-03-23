import React from "react";

function FoodCard({ product }) {
  const { product_name, brands, nutriments, image_small_url } = product;

  return (
    <div className="food-card">
      
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