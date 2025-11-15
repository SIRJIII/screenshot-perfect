import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal } from "lucide-react";

export interface Filters {
  priceRange: [number, number];
  stockFilter: string[];
  maxDistance: number;
  sortBy: string;
}

interface FiltersPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const FiltersPanel = ({ filters, onFiltersChange }: FiltersPanelProps) => {
  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleStockFilter = (value: string) => {
    const current = filters.stockFilter;
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateFilter("stockFilter", updated);
  };

  return (
    <Card className="p-6 space-y-6 sticky top-20 shadow-card">
      <div className="flex items-center gap-2 pb-4 border-b">
        <SlidersHorizontal className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">Smart Filters</h3>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Price Range</Label>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
          min={0}
          max={200}
          step={10}
          className="py-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{filters.priceRange[0]}</span>
          <span>₹{filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Stock Availability */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Stock Availability</Label>
        <div className="space-y-2">
          {["in-stock", "low-stock", "coming-soon"].map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={status}
                checked={filters.stockFilter.includes(status)}
                onCheckedChange={() => toggleStockFilter(status)}
              />
              <label
                htmlFor={status}
                className="text-sm capitalize cursor-pointer"
              >
                {status.replace("-", " ")}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Distance Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Maximum Distance</Label>
        <Slider
          value={[filters.maxDistance]}
          onValueChange={(value) => updateFilter("maxDistance", value[0])}
          min={0}
          max={10}
          step={0.5}
          className="py-4"
        />
        <div className="text-sm text-muted-foreground">
          Up to {filters.maxDistance} km
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Sort By</Label>
        <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="local-first">Local First</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};

export default FiltersPanel;
