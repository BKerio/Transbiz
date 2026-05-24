import { Link } from "react-router-dom";
import { Car, Users, Route } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";

interface VehicleCardProps {
  vehicle: Vehicle;
  onBook?: (v: Vehicle) => void;
}

export default function VehicleCard({ vehicle, onBook }: VehicleCardProps) {
  return (
    <div className="group bg-bg-card border border-border-dark rounded-xl overflow-hidden hover:border-white/15 hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-[#F0F0F0] overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-400"
        />
        {/* Brand Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 bg-brand text-white text-xs font-semibold rounded-md">
          {vehicle.brand}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading font-semibold text-lg text-txt-primary">
          {vehicle.name}
        </h3>

        {/* Specs */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-xs text-txt-secondary">
          <span className="flex items-center gap-1">
            <Car size={14} className="text-txt-muted" />
            {vehicle.category}
          </span>
          <span className="flex items-center gap-1">
            <Users size={14} className="text-txt-muted" />
            {vehicle.seats} seats
          </span>
          <span className="flex items-center gap-1">
            <Route size={14} className="text-txt-muted" />
            {vehicle.range}
          </span>
        </div>

        {/* Battery */}
        <p className="mt-2 text-xs font-semibold text-brand">
          {vehicle.battery}
        </p>

        {/* CTA */}
        {onBook ? (
          <button
            onClick={() => onBook(vehicle)}
            className="inline-block mt-4 text-sm font-medium text-brand hover:underline underline-offset-4 transition-all text-left focus:outline-none"
          >
            Book a Test Drive
          </button>
        ) : (
          <Link
            to={`/vehicles?book=${vehicle.id}`}
            className="inline-block mt-4 text-sm font-medium text-brand hover:underline underline-offset-4 transition-all"
          >
            Book a Test Drive
          </Link>
        )}
      </div>
    </div>
  );
}
