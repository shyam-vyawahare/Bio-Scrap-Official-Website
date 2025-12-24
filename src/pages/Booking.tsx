import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Calendar,
  Clock,
  MapPin,
  Package,
  User,
  Check,
  Leaf,
  Truck,
  Recycle,
  TreeDeciduous,
  CheckCircle,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { containerSizes } from "@/data/containers";
import LocationPicker from "@/components/location/LocationPicker";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

  const bookingSchema = z.object({
    wasteType: z.string().optional(),
    date: z.string().min(1, "Please select a date"),
    timeSlot: z.string().min(1, "Please select a time slot"),
    containerSize: z.string().optional(),
    address: z.string().min(10, "Please enter your full address"),
    city: z.string().min(2, "Please enter your city"),
    pincode: z.string().min(5, "Please enter a valid pincode"),
    name: z.string().min(2, "Please enter your name"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    instructions: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  });

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingProps {
  mode?: "waste" | "scrap";
}

export default function Booking({ mode = "waste" }: BookingProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scrapTypes, setScrapTypes] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      wasteType: "",
      date: "",
      timeSlot: "",
      containerSize: "medium",
      address: "",
      city: "",
      pincode: "",
      name: "",
      email: "",
      phone: "",
      instructions: "",
      latitude: undefined,
      longitude: undefined,
    },
  });
  const watchedValues = watch();

  // Translated Data Arrays
  const wasteTypes = [
    { id: "kitchen", label: t('booking.wasteType.kitchen', "Kitchen Waste"), icon: Leaf, description: t('booking.wasteType.kitchenDesc', "Food scraps, vegetable peels, etc.") },
    { id: "garden", label: t('booking.wasteType.garden', "Garden Waste"), icon: TreeDeciduous, description: t('booking.wasteType.gardenDesc', "Leaves, grass, branches") },
    { id: "agricultural", label: t('booking.wasteType.agricultural', "Agricultural Waste"), icon: Recycle, description: t('booking.wasteType.agriculturalDesc', "Crop residues, farm waste") },
    { id: "food-commercial", label: t('booking.wasteType.commercial', "Commercial Food"), icon: Truck, description: t('booking.wasteType.commercialDesc', "Restaurant & hotel waste") },
  ];

  const timeSlots = [
    { id: "morning", label: t('booking.schedule.morning', "Morning"), time: "8:00 AM - 12:00 PM" },
    { id: "afternoon", label: t('booking.schedule.afternoon', "Afternoon"), time: "12:00 PM - 4:00 PM" },
    { id: "evening", label: t('booking.schedule.evening', "Evening"), time: "4:00 PM - 8:00 PM" },
  ];

  // container sizes for waste flow only
  
  useEffect(() => {
    if (mode === "scrap") {
      if (!location.state?.scrapTypes) {
        navigate("/booking/scrap");
        return;
      }
      if (!location.state?.weightKg) {
        navigate("/booking/scrap/weight", { state: { scrapTypes: location.state.scrapTypes } });
        return;
      }
      setScrapTypes(location.state.scrapTypes);
    }
  }, [mode, location.state, navigate]);

  const steps = mode === "waste"
    ? [
        { number: 1, title: t('booking.steps.wasteType', "Waste Type"), icon: Package },
        { number: 2, title: t('booking.steps.schedule', "Schedule"), icon: Calendar },
        { number: 3, title: t('booking.steps.location', "Location"), icon: MapPin },
        { number: 4, title: t('booking.steps.details', "Details"), icon: User },
      ]
    : [
        { number: 1, title: t('booking.steps.schedule', "Schedule"), icon: Calendar },
        { number: 2, title: t('booking.steps.location', "Location"), icon: MapPin },
        { number: 3, title: t('booking.steps.details', "Details"), icon: User },
      ];

  const validateStep = async () => {
    let fieldsToValidate: (keyof BookingFormData)[] = [];
    
    if (mode === "waste") {
      switch (currentStep) {
        case 1:
          fieldsToValidate = ["wasteType", "containerSize"];
          break;
        case 2:
          fieldsToValidate = ["date", "timeSlot"];
          break;
        case 3:
          fieldsToValidate = ["address", "city", "pincode"];
          break;
        case 4:
          fieldsToValidate = ["name", "email", "phone"];
          break;
      }
    } else {
      switch (currentStep) {
        case 1:
          fieldsToValidate = ["date", "timeSlot"];
          break;
        case 2:
          fieldsToValidate = ["address", "city", "pincode"];
          break;
        case 3:
          fieldsToValidate = ["name", "email", "phone"];
          break;
      }
    }
    
    if (mode === "waste" && currentStep === 1) {
       if (!watchedValues.wasteType) {
         const isValid = await trigger(["wasteType", "containerSize"]);
         if (!watchedValues.wasteType) return false;
         return isValid;
       }
    }

    const isValid = await trigger(fieldsToValidate);
    return isValid;
  };

  const nextStep = async () => {
    const isValid = await validateStep();
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      return;
    }
    if (mode === "scrap") {
      navigate("/booking/scrap/weight", { state: { scrapTypes } });
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    try {
      // Prepare form data for submission
      const formData = new FormData();
      const timestamp = new Date().toISOString();
      
      // Add all form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, String(value));
        }
      });
      
      // Add additional metadata
      formData.append('timestamp', timestamp);
      formData.append('service_type', mode);
      formData.append('order_type', mode === 'waste' ? 'Bio-Waste Pickup' : 'Scrap Pickup');
      if (mode === 'scrap') {
        formData.append('scrap_items', scrapTypes.join(', '));
        if (location.state?.weightKg) {
          formData.append('weight', location.state.weightKg);
        }
      }

      // Submit to FormSubmit
      const response = await fetch('https://formsubmit.co/your-email@example.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        setIsSubmitted(true);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again or contact support.",
        variant: "destructive",
      });
    }
    toast({
      title: t('booking.success.title', "Booking Confirmed!"),
      description: t('booking.success.message', "We'll send you a confirmation email shortly."),
    });
  };

  const selectedContainer = containerSizes.find(c => c.id === watchedValues.containerSize);

  

  const renderStepContent = () => {
    // We compare step index because titles are now translated
    const stepIndex = currentStep - 1;
    // mode="waste": 0=WasteType, 1=Schedule, 2=Location, 3=Details
    // mode="scrap": 0=Schedule, 1=Location, 2=Details
    
    // Determine the 'logical' step type
    let stepType = "";
    if (mode === "waste") {
      if (stepIndex === 0) stepType = "wasteType";
      if (stepIndex === 1) stepType = "schedule";
      if (stepIndex === 2) stepType = "location";
      if (stepIndex === 3) stepType = "details";
    } else {
      if (stepIndex === 0) stepType = "schedule";
      if (stepIndex === 1) stepType = "location";
      if (stepIndex === 2) stepType = "details";
    }

    if (stepType === "wasteType") {
      return (
        <motion.div
          key="step-waste"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
              {t('booking.wasteType.title', "What type of waste do you have?")}
            </h2>
            <p className="text-muted-foreground">{t('booking.wasteType.subtitle', "Select the primary type of bio-waste for collection.")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wasteTypes.map((type) => (
              <label
                key={type.id}
                className={cn(
                  "p-6 rounded-xl border-2 cursor-pointer transition-all duration-300",
                  watchedValues.wasteType === type.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <input
                  type="radio"
                  value={type.id}
                  {...register("wasteType")}
                  className="sr-only"
                />
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    watchedValues.wasteType === type.id ? "bg-primary" : "bg-primary/10"
                  )}>
                    <type.icon className={cn(
                      "w-6 h-6",
                      watchedValues.wasteType === type.id ? "text-primary-foreground" : "text-primary"
                    )} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{type.label}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
          {errors.wasteType && (
            <p className="text-sm text-destructive">{errors.wasteType.message}</p>
          )}

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('booking.wasteType.containerSize', "Select Container Size")}</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {containerSizes.map((size) => (
                <label
                  key={size.id}
                  className={cn(
                    "p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 text-center",
                    watchedValues.containerSize === size.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <input
                    type="radio"
                    value={size.id}
                    {...register("containerSize")}
                    className="sr-only"
                  />
                  <Package className={cn(
                    "w-8 h-8 mx-auto mb-2",
                    watchedValues.containerSize === size.id ? "text-primary" : "text-muted-foreground"
                  )} />
                  <h4 className="font-semibold text-foreground">{size.label}</h4>
                  <p className="text-sm text-muted-foreground">{size.capacity}</p>
                </label>
              ))}
            </div>
          </div>
        </motion.div>
      );
    }

    if (stepType === "schedule") {
      return (
        <motion.div
          key="step-schedule"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          {mode === "scrap" && scrapTypes.length > 0 && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Recycle className="w-5 h-5 text-primary" />
                {t('booking.scrap.selectedItems', "Selected Scrap Items")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {scrapTypes.map((type) => (
                  <span 
                    key={type} 
                    className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-primary/30 text-sm font-medium text-primary shadow-sm"
                  >
                    {t(`scrapSelection.types.${type}.label`, type.charAt(0).toUpperCase() + type.slice(1))}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {t('booking.scrap.changeSelection', "Need to change? Click 'Previous' to go back.")}
              </p>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
              {t('booking.schedule.title', "When should we pick up?")}
            </h2>
            <p className="text-muted-foreground">{t('booking.schedule.subtitle', "Choose your preferred date and time slot.")}</p>
          </div>

          <div>
            <Label htmlFor="date">{t('booking.schedule.date', "Pickup Date")}</Label>
            <Input
              id="date"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              {...register("date")}
              className="mt-2"
            />
            {errors.date && (
              <p className="text-sm text-destructive mt-1">{errors.date.message}</p>
            )}
          </div>

          <div>
            <Label>{t('booking.schedule.timeSlot', "Time Slot")}</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              {timeSlots.map((slot) => (
                <label
                  key={slot.id}
                  className={cn(
                    "p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                    watchedValues.timeSlot === slot.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <input
                    type="radio"
                    value={slot.id}
                    {...register("timeSlot")}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <Clock className={cn(
                      "w-5 h-5",
                      watchedValues.timeSlot === slot.id ? "text-primary" : "text-muted-foreground"
                    )} />
                    <div>
                      <h4 className="font-semibold text-foreground">{slot.label}</h4>
                      <p className="text-sm text-muted-foreground">{slot.time}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            {errors.timeSlot && (
              <p className="text-sm text-destructive mt-1">{errors.timeSlot.message}</p>
            )}
          </div>
        </motion.div>
      );
    }

    if (stepType === "location") {
      return (
        <motion.div
          key="step-location"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
              {t('booking.location.title', "Where should we collect?")}
            </h2>
            <p className="text-muted-foreground">{t('booking.location.subtitle', "Enter your pickup location details.")}</p>
          </div>

          <div>
            <Label htmlFor="address">{t('booking.location.address', "Full Address")}</Label>
            <Textarea
              id="address"
              placeholder={t('booking.location.addressPlaceholder', "Enter your street address, building, floor...")}
              rows={3}
              {...register("address")}
              className="mt-2"
            />
            {errors.address && (
              <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="city">{t('booking.location.city', "City")}</Label>
              <Input
                id="city"
                placeholder={t('booking.location.cityPlaceholder', "City")}
                {...register("city")}
                className="mt-2"
              />
              {errors.city && (
                <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="pincode">{t('booking.location.pincode', "PIN Code")}</Label>
              <Input
                id="pincode"
                placeholder="123456"
                {...register("pincode")}
                className="mt-2"
              />
              {errors.pincode && (
                <p className="text-sm text-destructive mt-1">{errors.pincode.message}</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="p-4 bg-muted/40 border-b border-border">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{t('booking.location.map', "Map Selection (optional)")}</span>
              </div>
            </div>
            <div className="p-4">
              <LocationPicker
                value={{
                  lat: watch("latitude") || null,
                  lng: watch("longitude") || null,
                  address: watch("address") || "",
                }}
                onChange={(val) => {
                  if (typeof val.lat === "number") setValue("latitude", val.lat);
                  if (typeof val.lng === "number") setValue("longitude", val.lng);
                  if (val.address) setValue("address", val.address);
                }}
              />
            </div>
          </div>
        </motion.div>
      );
    }

    if (stepType === "details") {
      return (
        <motion.div
          key="step-details"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
              {t('booking.details.title', "Your Contact Details")}
            </h2>
            <p className="text-muted-foreground">{t('booking.details.subtitle', "We'll use this to confirm your booking.")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">{t('booking.details.name', "Full Name")}</Label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register("name")}
                  className="pl-10"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">{t('booking.details.phone', "Phone Number")}</Label>
              <div className="relative mt-2">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  {...register("phone")}
                  className="pl-10"
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="email">{t('booking.details.email', "Email Address")}</Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                className="pl-10"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="instructions">{t('booking.details.instructions', "Special Instructions (Optional)")}</Label>
            <Textarea
              id="instructions"
              placeholder={t('booking.details.instructionsPlaceholder', "Gate code, specific directions, etc.")}
              rows={3}
              {...register("instructions")}
              className="mt-2"
            />
          </div>
        </motion.div>
      );
    }
  };

  return (
    <div className="pt-20 min-h-screen gradient-cream">
      {/* Header */}
      <section className="py-12 lg:py-16 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
              {mode === "scrap" ? t('booking.scrap.title', "Schedule Scrap Pickup") : t('booking.waste.title', "Book Bio-Waste Pickup")}
            </h1>
            <p className="text-primary-foreground/80">
              {mode === "scrap" 
                ? t('booking.scrap.subtitle', "Choose a convenient time for us to collect your recyclables.") 
                : t('booking.waste.subtitle', "Schedule your bio-waste collection in just a few simple steps.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 lg:px-8 -mt-8 relative z-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between p-6 rounded-2xl bg-card border border-border/50 shadow-lg overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={cn(
                      "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                      currentStep >= step.number
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-muted-foreground/30 text-muted-foreground"
                    )}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs mt-2 font-medium text-center w-20 md:w-auto",
                      currentStep >= step.number ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 mx-2 md:mx-4 mt-5 md:mt-6 transition-colors duration-500",
                      currentStep > step.number ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <form 
            onSubmit={handleSubmit(onSubmit)}
            action="https://formsubmit.co/your-email@example.com" 
            method="POST"
          >
            {/* FormSubmit configuration */}
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value={window.location.href} />
            <input type="hidden" name="_captcha" value="false" />
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            <div className="flex justify-between mt-12 pt-8 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
              >
                {t('booking.buttons.prev', "Previous")}
              </Button>

              {currentStep === steps.length ? (
                <Button type="submit" size="lg" className="px-8">
                  {t('booking.buttons.confirm', "Confirm Booking")}
                </Button>
              ) : (
                <Button type="button" size="lg" onClick={nextStep} className="px-8">
                  {t('booking.buttons.next', "Next Step")}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">{t('booking.success.title', "Booking Confirmed!")}</DialogTitle>
            <DialogDescription>
              {t('booking.success.message', "Thank you for choosing Bio-Scrap. We've sent a confirmation email with all the details.")}
            </DialogDescription>
          </DialogHeader>
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border/50 text-left mb-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('booking.success.type', "Type")}:</span>
                <span className="font-medium text-foreground capitalize">
                  {mode === "waste" ? t('pickupCards.waste.title', "Waste Pickup") : t('pickupCards.scrap.title', "Scrap Pickup")}
                </span>
              </div>
              {mode === "waste" && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('booking.success.wasteCategory', "Waste Category")}:</span>
                  <span className="font-medium text-foreground">{wasteTypes.find(w => w.id === watchedValues.wasteType)?.label}</span>
                </div>
              )}
              {mode === "scrap" && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('booking.success.scrapItems', "Scrap Items")}:</span>
                  <span className="font-medium text-foreground">{scrapTypes.length} {t('booking.success.itemsSelected', "items selected")}</span>
                </div>
              )}
              {mode === "scrap" && location.state?.weightKg && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('scrapWeight.title', "Select Scrap Weight")}:</span>
                  <span className="font-medium text-foreground">
                    {location.state.weightKg.replace('kg', '')} kg
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('booking.success.date', "Date")}:</span>
                <span className="font-medium text-foreground">{watchedValues.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('booking.success.timeSlot', "Time Slot")}:</span>
                <span className="font-medium text-foreground">{timeSlots.find(t => t.id === watchedValues.timeSlot)?.time}</span>
              </div>
              {mode === "waste" && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('booking.success.container', "Container")}:</span>
                  <span className="font-medium text-foreground">{selectedContainer?.label} ({selectedContainer?.capacity})</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <Button
              variant="hero"
              size="lg"
              onClick={() => {
                navigate("/receipt", {
                  state: {
                    mode,
                    scrapTypes,
                    weightKg: location.state?.weightKg || null,
                    date: watchedValues.date,
                    timeSlot: watchedValues.timeSlot,
                    containerSize: watchedValues.containerSize,
                    wasteType: watchedValues.wasteType,
                    address: watchedValues.address,
                    city: watchedValues.city,
                    pincode: watchedValues.pincode,
                    name: watchedValues.name,
                    email: watchedValues.email,
                    phone: watchedValues.phone,
                  },
                });
              }}
            >
              {t('booking.buttons.showReceipt', "Show Receipt")}
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/")}>
              {t('booking.buttons.backHome', "Back to Home")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
