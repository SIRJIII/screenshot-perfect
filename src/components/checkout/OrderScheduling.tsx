import { Calendar as CalendarIcon, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export function OrderScheduling() {
  const [date, setDate] = useState<Date>();
  const [reminder, setReminder] = useState(false);

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
      <h3 className="font-semibold text-lg mb-3 text-foreground">Schedule Delivery (Optional)</h3>
      
      <div className="space-y-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a delivery date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="reminder" className="text-sm cursor-pointer">
              Send me a reminder
            </Label>
          </div>
          <Switch 
            id="reminder" 
            checked={reminder} 
            onCheckedChange={setReminder}
          />
        </div>

        <p className="text-xs text-muted-foreground bg-primary/5 p-2 rounded">
          📌 Note: Your retailer will confirm availability via notification.
        </p>
      </div>
    </div>
  );
}
