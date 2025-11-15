import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategorySection from "@/components/shop/CategorySection";
import FiltersPanel, { Filters } from "@/components/shop/FiltersPanel";
import ProductCard from "@/components/shop/ProductCard";
import QuickViewModal from "@/components/shop/QuickViewModal";
import PersonalizedSection from "@/components/shop/PersonalizedSection";
import { products, Product } from "@/data/products";
import { toast } from "sonner";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 200],
    stockFilter: ["in-stock", "low-stock", "coming-soon"],
    maxDistance: 10,
    sortBy: "local-first"
  });

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Category filter
      if (selectedCategory !== "all") {
        const categoryMatch = product.category.toLowerCase() === selectedCategory.replace("-", " ");
        if (!categoryMatch) return false;
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Stock filter
      if (!filters.stockFilter.includes(product.stock)) {
        return false;
      }

      // Distance filter
      if (product.distance > filters.maxDistance) {
        return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popularity":
          return b.rating - a.rating;
        case "rating":
          return b.rating - a.rating;
        case "local-first":
        default:
          if (a.isLocal && !b.isLocal) return -1;
          if (!a.isLocal && b.isLocal) return 1;
          return a.distance - b.distance;
      }
    });

    return filtered;
  }, [selectedCategory, filters]);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  const handleAddToCart = (product: Product) => {
    toast.success(`${product.name} added to cart!`, {
      description: `From ${product.retailer} - ₹${product.price}`
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <CategorySection
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <FiltersPanel filters={filters} onFiltersChange={setFilters} />
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {selectedCategory === "all" ? "All Products" : selectedCategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                </h2>
                <p className="text-muted-foreground">
                  {filteredProducts.length} products found
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={handleQuickView}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">No products found matching your filters</p>
                  <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
                </div>
              )}

              {/* Personalized Sections */}
              <PersonalizedSection
                onQuickView={handleQuickView}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <QuickViewModal
        product={selectedProduct}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Shop;
