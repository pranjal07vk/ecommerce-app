import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
});

// helper to transform product
const transformProduct = (p) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  description: p.description,
  category: p.category,
  image: p.thumbnail,
  rating: { rate: p.rating, count: 0 },
});

// ✅ Get all products
export const getProducts = async () => {
  const res = await API.get("/products?limit=100&skip=0");
  return res.data.products.map(transformProduct);
};

// ✅ Get single product
export const getProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  return transformProduct(res.data);
};

// ✅ Get categories
export const getCategories = async () => {
  const res = await API.get("/products/categories");
  return res.data; // already array of objects
};

// ✅ Get products by category (FIXED)
export const getProductsByCategory = async (category) => {
  const res = await API.get(`/products/category/${category}`);
  return res.data.products.map(transformProduct);
};