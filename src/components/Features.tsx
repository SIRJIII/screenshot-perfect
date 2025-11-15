import { MapPin, Search, ShoppingCart, TrendingUp, Bell, Shield } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Search & Filters",
    description: "Find exactly what you need with advanced filtering by price, availability, and location"
  },
  {
    icon: MapPin,
    title: "Local Products",
    description: "Discover and support local businesses with region-specific product highlights"
  },
  {
    icon: ShoppingCart,
    title: "Easy Ordering",
    description: "Seamless cart management and multiple payment options for your convenience"
  },
  {
    icon: TrendingUp,
    title: "Personalized Recommendations",
    description: "Get product suggestions based on your browsing and purchase history"
  },
  {
    icon: Bell,
    title: "Real-time Tracking",
    description: "Track your orders from placement to delivery with instant notifications"
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Safe and encrypted transactions with multiple payment methods"
  }
];

const Features = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete platform designed to make online shopping and selling effortless
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
