export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: "in-stock" | "coming-soon" | "low-stock";
  availableDate?: string;
  retailer: string;
  distance: number; // in km
  isLocal: boolean;
  rating: number;
  description: string;
  isProxy?: boolean; // Available through wholesaler
}

export const products: Product[] = [
  {
    id: "1",
    name: "Fresh Organic Tomatoes",
    price: 45,
    image: "🍅",
    category: "Vegetables",
    stock: "in-stock",
    retailer: "Green Valley Store",
    distance: 2.3,
    isLocal: true,
    rating: 4.5,
    description: "Locally grown organic tomatoes, fresh from the farm. Rich in vitamins and perfect for salads and cooking."
  },
  {
    id: "2",
    name: "Whole Wheat Bread",
    price: 35,
    image: "🍞",
    category: "Bakery",
    stock: "in-stock",
    retailer: "Baker's Delight",
    distance: 1.5,
    isLocal: false,
    rating: 4.8,
    description: "Freshly baked whole wheat bread. Soft, nutritious, and perfect for breakfast."
  },
  {
    id: "3",
    name: "Farm Fresh Eggs (12 pcs)",
    price: 65,
    image: "🥚",
    category: "Groceries",
    stock: "low-stock",
    retailer: "Daily Mart",
    distance: 0.8,
    isLocal: true,
    rating: 4.7,
    description: "Farm-fresh eggs from free-range chickens. High in protein and omega-3."
  },
  {
    id: "4",
    name: "Premium Basmati Rice 1kg",
    price: 120,
    image: "🌾",
    category: "Groceries",
    stock: "in-stock",
    retailer: "Spice Market",
    distance: 3.2,
    isLocal: false,
    rating: 4.6,
    description: "Premium quality basmati rice with long grains and aromatic flavor.",
    isProxy: true
  },
  {
    id: "5",
    name: "Fresh Green Apples",
    price: 80,
    image: "🍏",
    category: "Fruits",
    stock: "in-stock",
    retailer: "Fruit Paradise",
    distance: 2.1,
    isLocal: false,
    rating: 4.4,
    description: "Crisp and juicy green apples, perfect for snacking or baking."
  },
  {
    id: "6",
    name: "Organic Spinach Bundle",
    price: 30,
    image: "🥬",
    category: "Vegetables",
    stock: "coming-soon",
    availableDate: "Tomorrow",
    retailer: "Green Valley Store",
    distance: 2.3,
    isLocal: true,
    rating: 4.5,
    description: "Fresh organic spinach, rich in iron and vitamins. Great for salads and smoothies."
  },
  {
    id: "7",
    name: "Fresh Milk 1L",
    price: 55,
    image: "🥛",
    category: "Groceries",
    stock: "in-stock",
    retailer: "Daily Mart",
    distance: 0.8,
    isLocal: true,
    rating: 4.9,
    description: "Fresh pasteurized milk from local dairy farms."
  },
  {
    id: "8",
    name: "Handmade Cookies (200g)",
    price: 95,
    image: "🍪",
    category: "Bakery",
    stock: "in-stock",
    retailer: "Baker's Delight",
    distance: 1.5,
    isLocal: true,
    rating: 4.8,
    description: "Delicious handmade cookies with premium ingredients. Perfect for tea time."
  },
  {
    id: "9",
    name: "Sweet Oranges (6 pcs)",
    price: 70,
    image: "🍊",
    category: "Fruits",
    stock: "in-stock",
    retailer: "Fruit Paradise",
    distance: 2.1,
    isLocal: false,
    rating: 4.6,
    description: "Sweet and juicy oranges, packed with Vitamin C."
  },
  {
    id: "10",
    name: "Dishwash Liquid 500ml",
    price: 85,
    image: "🧴",
    category: "Household",
    stock: "in-stock",
    retailer: "Home Essentials",
    distance: 4.5,
    isLocal: false,
    rating: 4.3,
    description: "Effective dishwash liquid with lemon fragrance.",
    isProxy: true
  },
  {
    id: "11",
    name: "Local Honey 250g",
    price: 150,
    image: "🍯",
    category: "Local Products",
    stock: "low-stock",
    retailer: "Village Store",
    distance: 5.2,
    isLocal: true,
    rating: 4.9,
    description: "Pure, raw honey from local beekeepers. Rich in antioxidants and natural sweetness."
  },
  {
    id: "12",
    name: "Fresh Bananas (6 pcs)",
    price: 40,
    image: "🍌",
    category: "Fruits",
    stock: "in-stock",
    retailer: "Fruit Paradise",
    distance: 2.1,
    isLocal: false,
    rating: 4.5,
    description: "Fresh yellow bananas, perfect for smoothies and snacks."
  }
];

export const categories = [
  { name: "All", icon: "🛒", id: "all" },
  { name: "Groceries", icon: "🛍️", id: "groceries" },
  { name: "Vegetables", icon: "🥕", id: "vegetables" },
  { name: "Fruits", icon: "🍎", id: "fruits" },
  { name: "Bakery", icon: "🥖", id: "bakery" },
  { name: "Household", icon: "🏠", id: "household" },
  { name: "Local Products", icon: "🌾", id: "local-products" }
];
