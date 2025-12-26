import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Receipt() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const data = (location.state || {}) as any;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const timeSlots = [
    { id: "morning", label: t('booking.schedule.morning', "Morning"), time: t('booking.schedule.range.morning', "8:00 AM - 12:00 PM") },
    { id: "afternoon", label: t('booking.schedule.afternoon', "Afternoon"), time: t('booking.schedule.range.afternoon', "12:00 PM - 4:00 PM") },
    { id: "evening", label: t('booking.schedule.evening', "Evening"), time: t('booking.schedule.range.evening', "4:00 PM - 8:00 PM") },
  ];

  const timeSlotLabel = timeSlots.find(s => s.id === data.timeSlot)?.time || data.timeSlot || "";

  return (
    <div className="pt-20 min-h-screen gradient-cream">
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              {t('receipt.title', "Booking Receipt")}
            </h1>
            <p className="text-muted-foreground mt-2">
              {t('receipt.subtitle', "Keep this for your records.")}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('booking.success.type', "Type")}:</span>
                <span className="font-medium text-foreground capitalize">
                  {data.mode === "waste" ? t('pickupCards.waste.title', "Waste Pickup") : t('pickupCards.scrap.title', "Scrap Pickup")}
                </span>
              </div>

              {data.mode === "scrap" && Array.isArray(data.scrapTypes) && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('booking.success.scrapItems', "Scrap Items")}:</span>
                  <span className="font-medium text-foreground">{data.scrapTypes.length} {t('booking.success.itemsSelected', "items selected")}</span>
                </div>
              )}

              {data.mode === "scrap" && data.weightKg && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('scrapWeight.title', "Select Scrap Weight")}:</span>
                  <span className="font-medium text-foreground">
                    {String(data.weightKg).replace('kg', '')} kg
                  </span>
                </div>
              )}

              {data.mode === "waste" && data.containerSize && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('booking.success.container', "Container")}:</span>
                  <span className="font-medium text-foreground">{data.containerSize}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('booking.success.date', "Date")}:</span>
                <span className="font-medium text-foreground">{data.date || ""}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('booking.success.timeSlot', "Time Slot")}:</span>
                <span className="font-medium text-foreground">{timeSlotLabel}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('booking.location.city', "City")}:</span>
                <span className="font-medium text-foreground">{data.city || ""}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('booking.location.pincode', "PIN Code")}:</span>
                <span className="font-medium text-foreground">{data.pincode || ""}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('booking.location.address', "Full Address")}:</span>
                <span className="font-medium text-foreground">{data.address || ""}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border mt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('booking.details.name', "Full Name")}:</span>
                  <span className="font-medium text-foreground">{data.name || ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('booking.details.phone', "Phone Number")}:</span>
                  <span className="font-medium text-foreground">{data.phone || ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('booking.details.email', "Email Address")}:</span>
                  <span className="font-medium text-foreground">{data.email || ""}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="hero" size="lg" onClick={() => navigate("/")}>
              {t('booking.buttons.backHome', "Back to Home")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
