import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ShoppingCart, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const QuickViewModal = ({ product, open, onClose, onAddToCart }: QuickViewModalProps) => {
  if (!product) return null;

  const stockConfig = {
    "in-stock": { label: "In Stock", color: "bg-primary/10 text-primary" },
    "low-stock": { label: "Low Stock", color: "bg-accent/10 text-accent" },
    "coming-soon": { label: product.availableDate || "Coming Soon", color: "bg-muted text-muted-foreground" }
  };

  const stockInfo = stockConfig[product.stock];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative aspect-square bg-muted/30 rounded-lg flex items-center justify-center text-8xl">
            {product.image}
            {product.isLocal && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                🌾 Local Product
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin className="h-4 w-4" />
                <span>{product.retailer}</span>
                <span className="mx-1">•</span>
                <span>{product.distance} km away</span>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.rating} rating)
                </span>
              </div>

              <Badge variant="outline" className={stockInfo.color}>
                {stockInfo.label}
              </Badge>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {product.isProxy && (
              <div className="p-3 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  📦 This item is available through a wholesaler partnership
                </p>
              </div>
            )}

            {product.stock === "coming-soon" && (
              <div className="p-3 bg-muted rounded-lg flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">
                  Available {product.availableDate}. Schedule your order now!
                </p>
              </div>
            )}

            <div className="pt-4 border-t space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                <span className="text-muted-foreground">per unit</span>
              </div>

              <Button
                className="w-full gap-2"
                size="lg"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                disabled={product.stock === "coming-soon"}
              >
                <ShoppingCart className="h-5 w-5" />
                {product.stock === "coming-soon" ? "Schedule Order" : "Add to Cart"}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
