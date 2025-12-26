import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Scale, Check, Calendar, MapPin, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scrapWeights } from "@/data/weights";

export default function ScrapWeight() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedWeight, setSelectedWeight] = useState<string>("");
  const [weightError, setWeightError] = useState<boolean>(false);
  const scrapTypes: string[] = location.state?.scrapTypes || [];

  useEffect(() => {
    if (!scrapTypes || scrapTypes.length === 0) {
      navigate("/booking/scrap");
    }
  }, [scrapTypes, navigate]);

  const continueToSchedule = () => {
    if (!selectedWeight) {
      setWeightError(true);
      return;
    }
    navigate("/booking/scrap/schedule", {
      state: {
        scrapTypes,
        weightKg: selectedWeight,
      },
    });
  };

  return (
    <div className="pt-20 md:pt-24 min-h-screen">
      <section className="py-12 lg:py-16 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
              {t("scrapWeight.title", "Select Scrap Weight")}
            </h1>
            <p className="text-primary-foreground/80">
              {t("scrapWeight.subtitle", "Choose approximate total scrap weight in kilograms (kg).")}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-2 sm:px-4 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between p-3 sm:p-4 md:p-6 rounded-2xl bg-card border border-border/50 shadow-lg overflow-x-auto">
            {[
              { number: 1, title: t("scrapSelection.title", "Select Scrap") },
              { number: 2, title: t("scrapWeight.title", "Select Scrap Weight") },
              { number: 3, title: t("booking.steps.schedule", "Schedule") },
              { number: 4, title: t("booking.steps.location", "Location") },
              { number: 5, title: t("booking.steps.details", "Details") },
            ].map((step, index) => (
              <div key={step.number} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={cn(
                      "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 border-2 text-sm sm:text-base",
                      step.number <= 2
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-muted-foreground/30 text-muted-foreground"
                    )}
                  >
                    {step.number === 1 ? (
                      <Check className="w-5 h-5" />
                    ) : step.number === 2 ? (
                      <Scale className="w-5 h-5" />
                    ) : step.number === 3 ? (
                      <Calendar className="w-5 h-5" />
                    ) : step.number === 4 ? (
                      <MapPin className="w-5 h-5" />
                    ) : (
                      <ClipboardList className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] xs:text-xs mt-1.5 font-medium text-center max-w-[72px] sm:max-w-[88px] md:max-w-none whitespace-normal break-words leading-tight",
                      step.number <= 2 ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < 4 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 mx-2 md:mx-4 mt-5 md:mt-6 transition-colors duration-500",
                      step.number < 2 ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {scrapTypes.length > 0 && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-6 mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" />
              {t("booking.scrap.selectedItems", "Selected Scrap Items")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {scrapTypes.map((type) => (
                <span
                  key={type}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-primary/30 text-sm font-medium text-primary shadow-sm"
                >
                  {t(`scrapSelection.types.${type}`, type.charAt(0).toUpperCase() + type.slice(1))}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
            {t("scrapWeight.title", "Select Scrap Weight")}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t("scrapWeight.note", "Pick an estimate so we can plan capacity.")}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {scrapWeights.map((w) => (
              <label
                key={w.id}
                className={cn(
                  "p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 text-center",
                  selectedWeight === w.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                )}
              >
                <input
                  type="radio"
                  value={w.id}
                  checked={selectedWeight === w.id}
                  onChange={() => {
                    setSelectedWeight(w.id);
                    if (weightError) setWeightError(false);
                  }}
                  className="sr-only"
                />
                <Scale className={cn("w-8 h-8 mx-auto mb-2", selectedWeight === w.id ? "text-primary" : "text-muted-foreground")} />
                <h4 className="font-semibold text-foreground">
                  {t(`scrapWeight.options.${w.id}`, w.label)}
                </h4>
              </label>
            ))}
          </div>
          {weightError && (
            <p className="text-sm text-destructive mt-3">
              {t("scrapWeight.validation.required", "Please select a scrap weight to continue")}
            </p>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
            <Button type="button" variant="outline" onClick={() => navigate("/booking/scrap")} className="w-full sm:w-auto">
              {t("booking.buttons.prev", "Previous")}
            </Button>
            <Button type="button" size="lg" onClick={continueToSchedule} className="w-full sm:w-auto px-8">
              {t("booking.buttons.next", "Next Step")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
