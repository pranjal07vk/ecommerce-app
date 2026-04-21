import { useState, useEffect } from "react";
import { getProducts, getCategories, getProductsByCategory } from "../services/api";

function useProducts(category) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Fetch products based on category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let productsData;

        if (category && category !== "all") {
          productsData = await getProductsByCategory(category);
        } else {
          productsData = await getProducts();
        }

        setProducts(productsData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, categories, loading, error };
}

export default useProducts;