import { useState } from 'react';
import { ArrowLeft, Tag, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { AddressCard } from '@/components/checkout/AddressCard';
import { PaymentMethods } from '@/components/checkout/PaymentMethods';
import { OrderScheduling } from '@/components/checkout/OrderScheduling';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const deliveryCharges = subtotal > 500 ? 0 : 40;
  const taxes = subtotal * 0.05;
  const total = subtotal + deliveryCharges + taxes - discount;

  const handleApplyPromo = () => {
    if (promoCode === 'FIRST10') {
      setDiscount(subtotal * 0.1);
      toast({
        title: "Promo applied!",
        description: "You saved 10% on your order",
      });
    } else {
      toast({
        title: "Invalid code",
        description: "Please enter a valid promo code",
        variant: "destructive",
      });
    }
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    
    // Simulate order placement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Order placed successfully! 🎉",
      description: "You will receive a confirmation shortly",
    });
    
    clearCart();
    setIsPlacingOrder(false);
    navigate('/');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/cart')}
              className="hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Checkout</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <AddressCard
              name="John Doe"
              address="123 Main Street, Apartment 4B"
              location="Pilani, Rajasthan 333031"
              isDeliverable={true}
              onChangeAddress={() => toast({ title: "Address change coming soon!" })}
            />

            {/* Order Summary */}
            <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
              <h3 className="font-semibold text-lg mb-4 text-foreground">Order Summary</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b border-border last:border-0">
                    <div className="w-16 h-16 bg-muted rounded flex items-center justify-center text-2xl flex-shrink-0">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.retailer}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                        <span className="font-semibold text-sm text-foreground">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Scheduling */}
            <OrderScheduling />

            {/* Payment Methods */}
            <PaymentMethods />
          </div>

          {/* Price Summary Sidebar */}
          <div className="space-y-4">
            <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
              <h3 className="font-semibold text-lg mb-4 text-foreground">Price Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-medium text-foreground">₹{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Charges</span>
                  <span className="font-medium text-foreground">
                    {deliveryCharges === 0 ? (
                      <span className="text-primary">FREE</span>
                    ) : (
                      `₹${deliveryCharges.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span className="font-medium text-foreground">₹{taxes.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm text-primary">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                
                <Separator />
                
                {/* Promo Code */}
                <div className="space-y-2 pt-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm" onClick={handleApplyPromo}>
                      <Tag className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Try: FIRST10</p>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center pt-1">
                  <span className="font-semibold text-foreground">Grand Total</span>
                  <span className="text-2xl font-bold text-primary">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Place Order Button - Desktop */}
            <Button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              size="lg"
              className="w-full text-base font-semibold hidden lg:flex"
            >
              {isPlacingOrder ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                'Place Order Securely'
              )}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center space-y-2">
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <button className="hover:text-primary transition-colors">Contact Support</button>
            <button className="hover:text-primary transition-colors">Feedback & Help</button>
            <button className="hover:text-primary transition-colors">Order Policy</button>
          </div>
          <p className="text-xs text-muted-foreground">
            Made for CSF213 OOP Project – Batch 2025
          </p>
        </footer>
      </div>

      {/* Mobile Sticky Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border lg:hidden shadow-lg">
        <Button
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
          size="lg"
          className="w-full text-base font-semibold"
        >
          {isPlacingOrder ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            `Place Order • ₹${total.toFixed(2)}`
          )}
        </Button>
      </div>
    </div>
  );
}
