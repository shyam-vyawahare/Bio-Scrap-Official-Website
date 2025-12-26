import {
  BarChart3,
  Building2,
  Factory,
  Home,
  Leaf,
  Package,
  Recycle,
  ShoppingBag,
  Sprout,
  TreeDeciduous,
  Truck,
} from "lucide-react";

export const serviceCards = [
  {
    icon: Leaf,
    title: "Green Zone Collection",
    description: "Comprehensive collection of agricultural waste, garden trimmings, leaves, and organic materials from residential and commercial properties.",
    features: ["Weekly scheduled pickups", "Same-day collection available", "Specialized bins provided", "GPS-tracked vehicles"],
    price: "From ₹499/month",
    popular: false,
  },
  {
    icon: Recycle,
    title: "Bio-Composting",
    description: "Transform your organic waste into premium quality compost through our state-of-the-art composting facilities.",
    features: ["Aerobic composting", "Vermicomposting", "Temperature-controlled process", "Quality tested output"],
    price: "From ₹899/month",
    popular: true,
  },
  {
    icon: Truck,
    title: "Food Waste Collection",
    description: "Specialized collection services for restaurants, hotels, and food processing units with daily pickup options.",
    features: ["Sealed containers", "Odor-controlled transport", "Daily/weekly options", "Compliance certificates"],
    price: "From ₹1999/month",
    popular: false,
  },
  {
    icon: Recycle,
    title: "Scrap Collection",
    description: "Efficient collection and recycling of various types of scrap materials for proper disposal and recycling.",
    features: ["All types of scrap accepted", "Competitive pricing", "Free pickup service", "Environmentally responsible disposal"],
    price: "From ₹0 (Free pickup)",
    popular: false,
  },
  {
    icon: Package,
    title: "Container Rental",
    description: "Flexible bin and container rental services for various waste volumes, from small home bins to large commercial skips.",
    features: ["Multiple sizes available", "Flexible rental terms", "Free delivery", "Regular maintenance"],
    price: "From ₹199/month",
    popular: false,
  },
  {
    icon: Sprout,
    title: "Organic Fertilizers",
    description: "Purchase our premium organic fertilizers and soil conditioners made from processed bio-waste.",
    features: ["Chemical-free products", "Various grades available", "Bulk ordering", "Home delivery"],
    price: "From ₹149/bag",
    popular: false,
  },
];

export const customerTypes = [
  {
    icon: Home,
    title: "Residential",
    description: "Perfect for homes and apartments looking to manage kitchen and garden waste sustainably.",
  },
  {
    icon: Building2,
    title: "Commercial",
    description: "Tailored solutions for offices, malls, and commercial complexes with high-volume needs.",
  },
  {
    icon: Factory,
    title: "Industrial",
    description: "Large-scale waste management for factories and manufacturing units.",
  },
  {
    icon: TreeDeciduous,
    title: "Agricultural",
    description: "Specialized services for farms, nurseries, and agricultural operations.",
  },
  {
    icon: ShoppingBag,
    title: "Retail & Hospitality",
    description: "Custom plans for restaurants, hotels, and retail stores.",
  },
];


