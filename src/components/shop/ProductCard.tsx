import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { MapPin, Star, ShoppingCart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onQuickView, onAddToCart }: ProductCardProps) => {
  const stockConfig = {
    "in-stock": { label: "In Stock", color: "bg-primary/10 text-primary" },
    "low-stock": { label: "Low Stock", color: "bg-accent/10 text-accent" },
    "coming-soon": { label: product.availableDate || "Coming Soon", color: "bg-muted text-muted-foreground" }
  };

  const stockInfo = stockConfig[product.stock];

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      <div className="relative aspect-square bg-muted/30 flex items-center justify-center text-6xl">
        {product.image}
        {product.isLocal && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            🌾 Local
          </Badge>
        )}
        {product.isProxy && (
          <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground text-xs">
            Via Wholesaler
          </Badge>
        )}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="gap-2"
            onClick={() => onQuickView(product)}
          >
            <Eye className="h-4 w-4" />
            Quick View
          </Button>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="h-3 w-3" />
            <span>{product.retailer}</span>
            <span className="mx-1">•</span>
            <span>{product.distance} km</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating)
                    ? "fill-accent text-accent"
                    : "text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.rating})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">₹{product.price}</span>
          </div>
          <Badge variant="outline" className={stockInfo.color}>
            {stockInfo.label}
          </Badge>
        </div>

        <Button
          className="w-full gap-2"
          onClick={() => onAddToCart(product)}
          disabled={product.stock === "coming-soon"}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.stock === "coming-soon" ? "Schedule Order" : "Add to Cart"}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
