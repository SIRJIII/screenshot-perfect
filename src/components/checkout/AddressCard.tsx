import { MapPin, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AddressCardProps {
  name: string;
  address: string;
  location: string;
  isDeliverable: boolean;
  onChangeAddress?: () => void;
}

export function AddressCard({ 
  name, 
  address, 
  location, 
  isDeliverable,
  onChangeAddress 
}: AddressCardProps) {
  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-foreground">Delivery Address</h3>
        <Button variant="ghost" size="sm" onClick={onChangeAddress}>
          <Edit className="h-4 w-4 mr-1" />
          Change
        </Button>
      </div>
      
      <div className="space-y-2">
        <p className="font-medium text-foreground">{name}</p>
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
          <div>
            <p>{address}</p>
            <p className="text-xs mt-1">{location}</p>
          </div>
        </div>
        
        <div className="pt-2">
          {isDeliverable ? (
            <Badge className="bg-primary/10 text-primary border-primary/20">
              ✓ Delivery Available
            </Badge>
          ) : (
            <Badge variant="destructive">
              Delivery Not Available
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
