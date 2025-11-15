import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { CartItem } from '@/components/cart/CartItem';
import { BillSummary } from '@/components/cart/BillSummary';
import { products } from '@/data/products';
import { toast } from '@/hooks/use-toast';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, subtotal, totalItems, addToCart } = useCart();

  const deliveryCharges = subtotal > 500 ? 0 : 40;
  const taxes = subtotal * 0.05; // 5% tax
  const savings = items.reduce((sum, item) => {
    return sum + (item.isLocal ? item.price * 0.1 * item.quantity : 0);
  }, 0);

  const recommendations = products.filter(p => !items.find(item => item.id === p.id)).slice(0, 4);

  const handleRemove = (id: string) => {
    removeFromCart(id);
    toast({
      title: "Item removed",
      description: "Product removed from cart",
    });
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add items to cart before checkout",
        variant: "destructive",
      });
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="hover:bg-muted"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Shopping Cart</h1>
                <p className="text-sm text-muted-foreground">{totalItems} items</p>
              </div>
            </div>
            <Link to="/">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Live MART
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-foreground">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add items to get started</p>
            <Button onClick={() => navigate('/shop')} size="lg">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                <p className="text-sm text-foreground">
                  🚚 <span className="font-medium">Estimated Delivery:</span> Within 2-3 hours
                </p>
              </div>

              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-4">
              <BillSummary
                subtotal={subtotal}
                deliveryCharges={deliveryCharges}
                taxes={taxes}
                savings={savings}
              />

              <Button
                onClick={handleCheckout}
                size="lg"
                className="w-full text-base font-semibold"
              >
                Proceed to Checkout →
              </Button>

              {deliveryCharges === 0 && (
                <p className="text-xs text-center text-muted-foreground">
                  🎉 You saved ₹40 on delivery!
                </p>
              )}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendations.map((product) => (
                <div key={product.id} className="bg-card rounded-lg p-4 shadow-sm border border-border">
                  <div className="text-4xl text-center mb-2">{product.image}</div>
                  <h3 className="font-medium text-sm text-center mb-1">{product.name}</h3>
                  <p className="text-lg font-bold text-primary text-center">₹{product.price}</p>
                  <Button 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => {
                      addToCart(product);
                      toast({
                        title: "Added to cart",
                        description: `${product.name} has been added to your cart`,
                      });
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Button */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border lg:hidden shadow-lg">
          <Button
            onClick={handleCheckout}
            size="lg"
            className="w-full text-base font-semibold"
          >
            Checkout • ₹{(subtotal + deliveryCharges + taxes).toFixed(2)}
          </Button>
        </div>
      )}
    </div>
  );
}
