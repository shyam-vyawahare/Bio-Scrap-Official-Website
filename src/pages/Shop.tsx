import { useTranslation } from "react-i18next";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const products = [
  { id: "compost", name: "Compost", price: 199, description: "Premium organic compost for healthy soil.", image: "/images/organic-waste.jpg.png" },
  { id: "compost-bin", name: "Compost Bin", price: 1299, description: "Durable bin for home composting.", image: "/images/recyclable-scrap.jpg.webp" },
  { id: "cocopeat", name: "Cocopeat", price: 149, description: "Natural growing medium from coconut husk.", image: "/public/placeholder.svg" },
  { id: "bio-products", name: "Bio-Products", price: 299, description: "Eco-friendly everyday products.", image: "/public/placeholder.svg" },
];

export default function Shop() {
  const { t } = useTranslation();
  const { addItem } = useCart();

  return (
    <div className="pt-20 min-h-screen">
      <section className="py-12 lg:py-16 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
              Bio-Scrap Shop – Sustainable products for a greener lifestyle
            </h1>
            <p className="text-primary-foreground/80">
              Explore eco-friendly products that complement your waste management journey.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border bg-card overflow-hidden shadow"
            >
              <div className="h-40 bg-muted" />
              <div className="p-4 space-y-2">
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-muted-foreground">{p.description}</div>
                <div className="text-lg font-bold mt-2">₹{p.price}</div>
                <Button
                  className="mt-2 w-full"
                  onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.image })}
                >
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

