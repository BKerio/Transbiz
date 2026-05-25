import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { vehicles, categories, type Vehicle } from "@/data/vehicles";
import ScrollReveal from "@/components/shared/ScrollReveal";
import VehicleCard from "@/components/shared/VehicleCard";
import FilterTabs from "@/components/shared/FilterTabs";
import BookingDialog from "@/components/shared/BookingDialog";

function HeroSection() {
  return (
    <section className="relative min-h-[45vh] bg-bg-primary flex items-center pt-[72px]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1200&q=80"
          alt="Electric Fleet"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,5,5,0.9)] via-[rgba(5,5,5,0.6)] to-transparent" />
      </div>
      <div className="relative z-10 content-max-width w-full py-16">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.12em] text-brand mb-4">
          OUR FLEET
        </span>
        <h1 className="font-heading font-bold text-[clamp(36px,4vw,56px)] leading-[1.1] tracking-[-0.02em] text-white">
          Explore Our Electric Fleet
        </h1>
        <p className="mt-4 text-lg text-txt-secondary max-w-[600px] leading-relaxed">
          From urban commuters to rugged adventurers, discover the Transbiz vehicle that fits your
          lifestyle.
        </p>
        <div className="flex items-center gap-3 mt-8">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-txt-muted" />
            <input
              type="text"
              placeholder="Search vehicles..."
              className="pl-10 pr-4 py-3 bg-bg-card border border-border-dark rounded-xl text-sm text-txt-primary placeholder:text-txt-muted focus:outline-none focus:border-brand transition-colors w-[260px]"
            />
          </div>
          <span className="text-sm text-txt-muted">{vehicles.length} vehicles</span>
        </div>
      </div>
    </section>
  );
}

interface VehicleGridSectionProps {
  onBook: (v: Vehicle) => void;
}

function VehicleGridSection({ onBook }: VehicleGridSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return vehicles;
    return vehicles.filter((v) => v.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="bg-bg-secondary section-padding">
      <div className="content-max-width">
        <FilterTabs
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
        <ScrollReveal stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} onBook={onBook} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function Vehicles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const bookId = searchParams.get("book");
    if (bookId) {
      const match = vehicles.find((v) => v.id === bookId);
      if (match) {
        setSelectedVehicle(match);
      }
    }
  }, [searchParams]);

  const handleClose = () => {
    setSelectedVehicle(null);
    setSearchParams({}, { replace: true });
  };

  return (
    <main>
      <HeroSection />
      <VehicleGridSection onBook={setSelectedVehicle} />
      <BookingDialog vehicle={selectedVehicle} onClose={handleClose} />
    </main>
  );
}
