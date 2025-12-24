import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function Cart() {
  const { items, removeItem, updateQty, total } = useCart();
  const navigate = useNavigate();

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
              Your Cart
            </h1>
            <p className="text-primary-foreground/80">
              Review your items and proceed to checkout.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-5xl">
        {items.length === 0 ? (
          <div className="max-w-lg mx-auto text-center">
            <div className="text-2xl font-serif font-bold mb-2">Your cart is empty</div>
            <p className="text-muted-foreground mb-6">Add products from the shop and they will appear here.</p>
            <Button asChild>
              <Link to="/shop">Go to Shop</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="flex items-center justify-between border rounded-2xl p-4 bg-card"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden" />
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-muted-foreground">₹{item.price}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}>-</Button>
                    <div className="w-10 text-center">{item.qty}</div>
                    <Button variant="outline" onClick={() => updateQty(item.id, item.qty + 1)}>+</Button>
                    <Button variant="ghost" onClick={() => removeItem(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="border rounded-2xl p-6 bg-card h-fit">
              <h3 className="text-lg font-semibold mb-4">Bill Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium">₹0</span>
                </div>
                <div className="pt-3 border-t flex items-center justify-between">
                  <span className="text-foreground font-semibold">Total</span>
                  <span className="text-foreground font-bold">₹{total}</span>
                </div>
              </div>
              <Button className="w-full mt-6" onClick={() => navigate("/checkout")}>
                Place Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
