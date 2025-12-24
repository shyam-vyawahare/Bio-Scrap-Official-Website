import { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { items, removeItem, updateQty, total } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="w-4 h-4 mr-2" />
          <span>Cart</span>
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {items.reduce((acc, i) => acc + i.qty, 0)}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle>Your Cart</DrawerTitle>
          <button className="p-2" onClick={() => setOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border rounded-xl p-3">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">₹{item.price} × {item.qty}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}>-</Button>
                      <Button variant="outline" onClick={() => updateQty(item.id, item.qty + 1)}>+</Button>
                      <Button variant="ghost" onClick={() => removeItem(item.id)}>Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-lg font-semibold">Total: ₹{total}</div>
                <Button asChild onClick={() => setOpen(false)}>
                  <Link to="/checkout">Place Order</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

