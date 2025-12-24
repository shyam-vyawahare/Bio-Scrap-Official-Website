import { useEffect, useRef } from "react";

type LocationValue = {
  lat: number | null;
  lng: number | null;
  address: string;
};

interface LocationPickerProps {
  value?: LocationValue;
  onChange: (value: LocationValue) => void;
}

export default function LocationPicker({ value, onChange }: LocationPickerProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletReadyRef = useRef(false);

  useEffect(() => {
    const ensureLeaflet = async () => {
      if ((window as any).L) {
        initMap();
        return;
      }
      if (leafletReadyRef.current) return;
      leafletReadyRef.current = true;

      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(css);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.async = true;
      script.onload = () => initMap();
      document.body.appendChild(script);
    };

    const initMap = () => {
      const L = (window as any).L;
      if (!L || !mapRef.current) return;

      const center = [22.9734, 78.6569]; // India geographic center
      const map = L.map(mapRef.current).setView(center, 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      let marker: any;
      const setMarker = (lat: number, lng: number) => {
        if (marker) {
          marker.setLatLng([lat, lng]);
        } else {
          marker = L.marker([lat, lng], { draggable: true }).addTo(map);
          marker.on("dragend", async () => {
            const { lat, lng } = marker.getLatLng();
            const address = await reverseGeocode(lat, lng);
            onChange({ lat, lng, address });
          });
        }
      };

      map.on("click", async (e: any) => {
        const { lat, lng } = e.latlng;
        setMarker(lat, lng);
        const address = await reverseGeocode(lat, lng);
        onChange({ lat, lng, address });
      });

      // If value present, show marker
      if (value?.lat && value?.lng) {
        setMarker(value.lat, value.lng);
        map.setView([value.lat, value.lng], 14);
      }
    };

    ensureLeaflet();
  }, [onChange, value]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (e.currentTarget.elements.namedItem("query") as HTMLInputElement);
    const q = input.value.trim();
    if (!q) return;
    const results = await searchAddress(q);
    if (results && results.length > 0) {
      const item = results[0];
      onChange({ lat: Number(item.lat), lng: Number(item.lon), address: item.display_name });
    }
  };

  return (
    <div className="space-y-3">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          name="query"
          className="flex-1 rounded-md border px-3 py-2 text-sm"
          placeholder="Search address or place (India)"
        />
        <button type="submit" className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm">
          Search
        </button>
      </form>
      <div ref={mapRef} className="w-full h-64 rounded-xl border overflow-hidden" />
      <p className="text-xs text-muted-foreground">
        Tip: Click on map to drop a pin, or drag the marker to refine location. Address auto-fills below.
      </p>
    </div>
  );
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const resp = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );
    const data = await resp.json();
    return data?.display_name || "";
  } catch {
    return "";
  }
}

async function searchAddress(q: string): Promise<any[]> {
  try {
    const resp = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&countrycodes=in&limit=5`
    );
    return await resp.json();
  } catch {
    return [];
  }
}

