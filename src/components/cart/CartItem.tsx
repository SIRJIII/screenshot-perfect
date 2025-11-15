import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center text-4xl flex-shrink-0">
          {item.image}
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground line-clamp-1">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.retailer}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(item.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Badge variant={item.stock === 'in-stock' ? 'default' : 'secondary'} className="text-xs">
              {item.stock === 'in-stock' ? '✓ In Stock' : item.stock === 'coming-soon' ? `Available ${item.availableDate}` : 'Low Stock'}
            </Badge>
            {item.isLocal && (
              <Badge variant="outline" className="text-xs border-primary text-primary">
                🌾 Local
              </Badge>
            )}
            {item.isProxy && (
              <Badge variant="outline" className="text-xs">
                Via Wholesaler
              </Badge>
            )}
          </div>

          {/* Price and Quantity */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 bg-muted rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="h-8 w-8 hover:bg-background"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="h-8 w-8 hover:bg-background"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">₹{item.price} each</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
