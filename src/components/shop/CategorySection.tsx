import { categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategorySectionProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategorySection = ({ selectedCategory, onCategoryChange }: CategorySectionProps) => {
  return (
    <div className="py-6 border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={cn(
                "flex-shrink-0 gap-2 transition-all hover:scale-105",
                selectedCategory === category.id && "shadow-card"
              )}
              onClick={() => onCategoryChange(category.id)}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="whitespace-nowrap">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
