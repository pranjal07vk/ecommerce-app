import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
});

// Get all products
export const getProducts = async () => {
  const res = await API.get("/products");
  
  // transform data to match your existing structure
  return res.data.products.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    description: p.description,
    category: p.category,
    image: p.thumbnail, // map thumbnail → image
    rating: { rate: p.rating, count: 0 } // match your structure
  }));
};

// Get single product
export const getProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  const p = res.data;

  return {
    id: p.id,
    title: p.title,
    price: p.price,
    description: p.description,
    category: p.category,
    image: p.thumbnail,
    rating: { rate: p.rating, count: 0 }
  };
};

// Categories (optional)
export const getCategories = async () => {
  const res = await API.get("/products/categories");
  return res.data;
};