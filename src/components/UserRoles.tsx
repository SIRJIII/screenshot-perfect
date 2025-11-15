import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Store, Package } from "lucide-react";
import customerIcon from "@/assets/customer-icon.jpg";
import retailerIcon from "@/assets/retailer-icon.jpg";
import wholesalerIcon from "@/assets/wholesaler-icon.jpg";

const roles = [
  {
    title: "Customer",
    description: "Browse products, place orders, and track deliveries from local stores",
    icon: customerIcon,
    features: ["Browse & Search", "Smart Filters", "Order Tracking", "Feedback"],
    color: "primary"
  },
  {
    title: "Retailer",
    description: "Manage inventory, connect with customers, and grow your business",
    icon: retailerIcon,
    features: ["Inventory Management", "Order Processing", "Customer Insights", "Wholesaler Connect"],
    color: "accent"
  },
  {
    title: "Wholesaler",
    description: "Supply retailers, manage bulk orders, and expand your network",
    icon: wholesalerIcon,
    features: ["Bulk Inventory", "Retailer Network", "Order Management", "Analytics"],
    color: "primary"
  }
];

const UserRoles = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Role
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're shopping, selling, or supplying - Live MART connects everyone in the supply chain
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-card-hover transition-all duration-300 group cursor-pointer border-2 hover:border-primary/50"
            >
              <div className="space-y-4">
                <div className="relative h-32 w-32 mx-auto rounded-2xl overflow-hidden">
                  <img 
                    src={role.icon} 
                    alt={role.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold">{role.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {role.description}
                  </p>
                </div>
                <ul className="space-y-2">
                  {role.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full gap-2 group-hover:gap-3 transition-all" 
                  variant="outline"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserRoles;
