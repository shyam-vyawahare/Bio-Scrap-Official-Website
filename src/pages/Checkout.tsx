import { useCart } from "@/context/CartContext";
import LocationPicker from "@/components/location/LocationPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [instructions, setInstructions] = useState("");
  const [paymentMode, setPaymentMode] = useState<"cod" | "online">("cod");
  const [confirmed, setConfirmed] = useState(false);

  const next = () => setStep((s) => Math.min(4, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const placeOrder = () => {
    setConfirmed(true);
    clear();
  };

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
              {t("checkout.title", "Checkout")}
            </h1>
            <p className="text-primary-foreground/80">
              {t("checkout.subtitle", "Complete your order in a few simple steps.")}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-3xl">
        {!confirmed ? (
          <>
            <div className="flex items-center justify-between p-6 rounded-2xl bg-card border border-border/50 shadow-lg">
              {[
                t("checkout.steps.details", "Details"),
                t("checkout.steps.address", "Address"),
                t("checkout.steps.summary", "Summary"),
                t("checkout.steps.payment", "Payment")
              ].map((label, index) => (
                <div key={label} className="flex-1 text-center">
                  <div className={`w-10 h-10 mx-auto rounded-full ${step > index ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} flex items-center justify-center`}>
                    {index + 1}
                  </div>
                  <div className={`mt-2 text-xs ${step > index ? "text-primary" : "text-muted-foreground"}`}>{label}</div>
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4 mt-8">
                <div>
                  <Label>{t("checkout.details.name", "Name")}</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{t("checkout.details.phone", "Phone")}</Label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div>
                    <Label>{t("checkout.details.email", "Email (optional)")}</Label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outline" disabled>{t("checkout.buttons.previous", "Previous")}</Button>
                  <Button onClick={next}>{t("checkout.buttons.next", "Next")}</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 mt-8">
                <Label>{t("checkout.address.deliveryAddress", "Delivery Address")}</Label>
                <Textarea value={address} onChange={(e) => setAddress(e.target.value)} />
                <div className="rounded-2xl border">
                  <LocationPicker
                    value={{ lat, lng, address }}
                    onChange={(val) => {
                      setLat(val.lat || null);
                      setLng(val.lng || null);
                      if (val.address) setAddress(val.address);
                    }}
                  />
                </div>
                <div>
                  <Label>{t("checkout.address.instructions", "Instructions")}</Label>
                  <Textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} />
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={prev}>{t("checkout.buttons.previous", "Previous")}</Button>
                  <Button onClick={next}>{t("checkout.buttons.next", "Next")}</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 mt-8">
                <h3 className="text-lg font-semibold">{t("checkout.summary.title", "Order Summary")}</h3>
                <div className="space-y-3">
                  {items.map((i) => (
                    <div key={i.id} className="flex items-center justify-between border rounded-xl p-3">
                      <div>{i.name} × {i.qty}</div>
                      <div>₹{i.price * i.qty}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-lg font-semibold">{t("checkout.summary.total", "Total")}: ₹{total}</div>
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={prev}>{t("checkout.buttons.previous", "Previous")}</Button>
                  <Button onClick={next}>{t("checkout.buttons.next", "Next")}</Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 mt-8">
                <h3 className="text-lg font-semibold">{t("checkout.payment.title", "Payment Mode")}</h3>
                <div className="flex items-center gap-4">
                  <Button variant={paymentMode === "cod" ? "default" : "outline"} onClick={() => setPaymentMode("cod")}>{t("checkout.payment.cod", "Cash on Delivery")}</Button>
                  <Button variant={paymentMode === "online" ? "default" : "outline"} onClick={() => setPaymentMode("online")}>{t("checkout.payment.online", "Online (coming soon)")}</Button>
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={prev}>{t("checkout.buttons.previous", "Previous")}</Button>
                  <Button onClick={placeOrder}>{t("checkout.payment.placeOrder", "Place Order")}</Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-lg mx-auto text-center">
            <div className="text-3xl font-serif font-bold mb-4">{t("checkout.confirmation.title", "Order Confirmed!")}</div>
            <p className="text-muted-foreground">{t("checkout.confirmation.message", "Thank you for shopping with Bio-Scrap. We will contact you shortly to confirm delivery.")}</p>
            <Button className="mt-6" onClick={() => (window.location.href = "/")}>{t("checkout.confirmation.backToHome", "Back to Home")}</Button>
          </div>
        )}
      </div>
    </div>
  );
}

