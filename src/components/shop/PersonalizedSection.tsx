import { Product, products } from "@/data/products";
import ProductCard from "./ProductCard";
import { Sparkles, TrendingUp, Heart } from "lucide-react";

interface PersonalizedSectionProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const PersonalizedSection = ({ onQuickView, onAddToCart }: PersonalizedSectionProps) => {
  // Get some sample products for each section
  const recommendedProducts = products.filter(p => p.rating >= 4.5).slice(0, 3);
  const popularProducts = products.filter(p => p.distance <= 3).slice(0, 3);
  const localGems = products.filter(p => p.isLocal).slice(0, 3);

  const Section = ({ title, icon: Icon, items }: { title: string; icon: any; items: Product[] }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-12 py-12">
      <Section
        title="Recommended for You"
        icon={Sparkles}
        items={recommendedProducts}
      />
      <Section
        title="Popular in Your Area"
        icon={TrendingUp}
        items={popularProducts}
      />
      <Section
        title="Local Gems"
        icon={Heart}
        items={localGems}
      />
    </div>
  );
};

export default PersonalizedSection;
