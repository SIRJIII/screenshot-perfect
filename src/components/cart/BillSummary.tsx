import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface BillSummaryProps {
  subtotal: number;
  deliveryCharges?: number;
  taxes?: number;
  savings?: number;
}

export function BillSummary({ 
  subtotal, 
  deliveryCharges = 0, 
  taxes = 0, 
  savings = 0 
}: BillSummaryProps) {
  const total = subtotal + deliveryCharges + taxes;

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
      <h3 className="font-semibold text-lg mb-4 text-foreground">Bill Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Item Total</span>
          <span className="font-medium text-foreground">₹{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery Charges</span>
          <span className="font-medium text-foreground">
            {deliveryCharges === 0 ? (
              <Badge variant="secondary" className="text-xs">FREE</Badge>
            ) : (
              `₹${deliveryCharges.toFixed(2)}`
            )}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Taxes & Fees</span>
          <span className="font-medium text-foreground">₹{taxes.toFixed(2)}</span>
        </div>
        
        {savings > 0 && (
          <div className="bg-primary/10 rounded-md p-2 flex justify-between items-center">
            <span className="text-sm font-medium text-primary">Total Savings</span>
            <span className="text-sm font-bold text-primary">-₹{savings.toFixed(2)}</span>
          </div>
        )}
        
        <Separator />
        
        <div className="flex justify-between items-center pt-1">
          <span className="font-semibold text-foreground">Total Amount</span>
          <span className="text-xl font-bold text-primary">₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
