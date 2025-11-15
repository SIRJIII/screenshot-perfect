import { ShoppingCart, Search, MapPin, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/">
              <h1 className="text-2xl font-bold bg-hero-gradient bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
                Live MART
              </h1>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">
                Shop
              </Link>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </a>
            </nav>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for products..."
                className="pl-10 pr-4"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
              <MapPin className="h-4 w-4" />
              <span>Location</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                0
              </span>
            </Button>
            <Button variant="default" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
