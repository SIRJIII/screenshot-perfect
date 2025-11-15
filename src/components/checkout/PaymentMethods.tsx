import { useState } from 'react';
import { CreditCard, Smartphone, Banknote, Shield } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type PaymentMethod = 'upi' | 'card' | 'cod';

interface PaymentMethodsProps {
  onPaymentMethodChange?: (method: PaymentMethod) => void;
}

export function PaymentMethods({ onPaymentMethodChange }: PaymentMethodsProps) {
  const [selected, setSelected] = useState<PaymentMethod>('upi');

  const handleChange = (value: string) => {
    const method = value as PaymentMethod;
    setSelected(method);
    onPaymentMethodChange?.(method);
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
      <h3 className="font-semibold text-lg mb-4 text-foreground">Payment Method</h3>
      
      <RadioGroup value={selected} onValueChange={handleChange} className="space-y-3">
        {/* UPI */}
        <div className="flex items-center space-x-3 p-3 rounded-md border border-border hover:bg-muted/50 transition-colors cursor-pointer">
          <RadioGroupItem value="upi" id="upi" />
          <Label htmlFor="upi" className="flex items-center gap-3 flex-1 cursor-pointer">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">UPI Payment</p>
              <p className="text-xs text-muted-foreground">Pay via GPay, PhonePe, Paytm</p>
            </div>
          </Label>
        </div>

        {/* Card/Gateway */}
        <div className="flex items-center space-x-3 p-3 rounded-md border border-border hover:bg-muted/50 transition-colors cursor-pointer">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex items-center gap-3 flex-1 cursor-pointer">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Card / RazorPay</p>
              <p className="text-xs text-muted-foreground">Credit, Debit Card, Net Banking</p>
            </div>
          </Label>
        </div>

        {/* Cash on Delivery */}
        <div className="flex items-center space-x-3 p-3 rounded-md border border-border hover:bg-muted/50 transition-colors cursor-pointer">
          <RadioGroupItem value="cod" id="cod" />
          <Label htmlFor="cod" className="flex items-center gap-3 flex-1 cursor-pointer">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Banknote className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Cash on Delivery</p>
              <p className="text-xs text-muted-foreground">Pay when you receive</p>
            </div>
          </Label>
        </div>
      </RadioGroup>

      {/* Security Badge */}
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded">
        <Shield className="h-4 w-4 text-primary" />
        <span>100% Secure Payment • SSL Encrypted</span>
      </div>
    </div>
  );
}
