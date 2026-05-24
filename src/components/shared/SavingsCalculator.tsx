import { useState, useMemo } from "react";
import { Car, Bus, Zap, TrendingDown, Leaf, DollarSign } from "lucide-react";

interface VehicleConfig {
  name: string;
  iceEfficiency: number; // km per Litre
  evEfficiency: number;  // km per kWh
  iceMaint: number;      // KES per km
  evMaint: number;       // KES per km
  co2Factor: number;     // kg CO2 per km
  elecPrice: number;     // KES per kWh
  icon: typeof Car;
}

const VEHICLE_CONFIGS: Record<string, VehicleConfig> = {
  car: {
    name: "Private Car",
    iceEfficiency: 12,
    evEfficiency: 6.0,
    iceMaint: 10,
    evMaint: 4.5,
    co2Factor: 0.12,
    elecPrice: 25,
    icon: Car,
  },
  taxi: {
    name: "Taxi / Uber",
    iceEfficiency: 10,
    evEfficiency: 5.5,
    iceMaint: 12,
    evMaint: 4.8,
    co2Factor: 0.13,
    elecPrice: 25,
    icon: Car,
  },
  matatu: {
    name: "Matatu (Bus)",
    iceEfficiency: 6,
    evEfficiency: 1.8,
    iceMaint: 18,
    evMaint: 7.5,
    co2Factor: 0.26,
    elecPrice: 22,
    icon: Bus,
  },
};

export default function SavingsCalculator() {
  const [vehicleType, setVehicleType] = useState<string>("taxi");
  const [distance, setDistance] = useState<number>(150);
  const [fuelPrice, setFuelPrice] = useState<number>(190);

  const activeConfig = VEHICLE_CONFIGS[vehicleType];

  const calculations = useMemo(() => {
    // ICE daily cost = Fuel cost + maintenance
    const iceFuelDaily = (distance / activeConfig.iceEfficiency) * fuelPrice;
    const iceMaintDaily = distance * activeConfig.iceMaint;
    const iceTotalDaily = iceFuelDaily + iceMaintDaily;

    // EV daily cost = Electricity cost + maintenance
    const evElecDaily = (distance / activeConfig.evEfficiency) * activeConfig.elecPrice;
    const evMaintDaily = distance * activeConfig.evMaint;
    const evTotalDaily = evElecDaily + evMaintDaily;

    // Monthly & Annual values
    const iceMonthly = iceTotalDaily * 30;
    const evMonthly = evTotalDaily * 30;

    const dailySavings = Math.max(0, iceTotalDaily - evTotalDaily);
    const monthlySavings = dailySavings * 30;
    const annualSavings = dailySavings * 365;

    // CO2 offset in metric tonnes/year
    const annualCO2Saved = (distance * 365 * activeConfig.co2Factor) / 1000;

    // Percentage savings
    const percentSavings = iceTotalDaily > 0 ? Math.round((dailySavings / iceTotalDaily) * 100) : 0;

    return {
      iceMonthly,
      evMonthly,
      monthlySavings,
      annualSavings,
      annualCO2Saved,
      percentSavings,
    };
  }, [distance, fuelPrice, activeConfig]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="w-full bg-[#0d0d0f]/90 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
      {/* Light effect */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand/10 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand/10 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-center justify-between border-b border-white/5 pb-5">
          <div>
            <h4 className="text-white font-heading font-semibold text-lg flex items-center gap-2">
              <Zap size={18} className="text-brand animate-pulse-subtle" />
              EV Savings Calculator
            </h4>
            <p className="text-xs text-txt-secondary mt-0.5">
              Calculate your operating cost reduction in Kenya
            </p>
          </div>
          <span className="bg-brand/10 text-brand text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-brand/20">
            KES {activeConfig.elecPrice}/kWh charging
          </span>
        </div>

        {/* Tab Selectors */}
        <div className="grid grid-cols-3 gap-2 mt-6">
          {Object.entries(VEHICLE_CONFIGS).map(([key, config]) => {
            const Icon = config.icon;
            const isActive = vehicleType === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setVehicleType(key);
                  if (key === "matatu" && distance < 100) setDistance(180);
                  if (key === "car" && distance > 180) setDistance(60);
                }}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs font-semibold transition-all duration-300 border ${
                  isActive
                    ? "bg-brand/10 border-brand text-white shadow-[0_0_15px_rgba(34,197,94,0.15)]"
                    : "bg-white/[0.02] border-white/5 text-txt-secondary hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <Icon size={16} className={isActive ? "text-brand" : "text-txt-muted"} />
                <span>{config.name}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Sliders Input */}
          <div className="space-y-6">
            {/* Distance Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-txt-secondary uppercase tracking-wider">
                  Daily Distance
                </label>
                <span className="text-sm font-semibold text-white font-heading">
                  {distance} km <span className="text-xs text-txt-muted">/ day</span>
                </span>
              </div>
              <input
                type="range"
                min={vehicleType === "matatu" ? 60 : 20}
                max={vehicleType === "matatu" ? 400 : 300}
                step={5}
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand transition-all focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-txt-muted mt-1">
                <span>{vehicleType === "matatu" ? "60 km" : "20 km"}</span>
                <span>{vehicleType === "matatu" ? "400 km" : "300 km"}</span>
              </div>
            </div>

            {/* Fuel Price Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-txt-secondary uppercase tracking-wider">
                  Fuel Price (KES/Litre)
                </label>
                <span className="text-sm font-semibold text-white font-heading">
                  KES {fuelPrice} <span className="text-xs text-txt-muted">/ L</span>
                </span>
              </div>
              <input
                type="range"
                min={150}
                max={250}
                step={1}
                value={fuelPrice}
                onChange={(e) => setFuelPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand transition-all focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-txt-muted mt-1">
                <span>KES 150</span>
                <span>KES 250</span>
              </div>
            </div>

            {/* Micro comparison stat card */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-txt-secondary flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Fuel & Maint. (Monthly)
                </span>
                <span className="text-txt-muted font-heading font-semibold">
                  {formatCurrency(calculations.iceMonthly)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-txt-secondary flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand" />
                  EV Charging & Maint. (Monthly)
                </span>
                <span className="text-brand font-heading font-bold">
                  {formatCurrency(calculations.evMonthly)}
                </span>
              </div>

              {/* Progress comparison bar */}
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden flex mt-2">
                <div
                  className="bg-brand h-full transition-all duration-300"
                  style={{
                    width: `${Math.max(12, (calculations.evMonthly / calculations.iceMonthly) * 100)}%`,
                  }}
                />
                <div className="bg-white/10 flex-1" />
              </div>
            </div>
          </div>

          {/* Results Block */}
          <div className="flex flex-col justify-between bg-white/[0.03] border border-white/5 rounded-2xl p-5 md:p-6 relative overflow-hidden">
            {/* Glowing accent border */}
            <div className="absolute top-0 right-0 w-1 h-full bg-brand" />

            <div>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-brand font-bold bg-brand/10 px-2.5 py-1 rounded-full border border-brand/20">
                <TrendingDown size={10} />
                Save up to {calculations.percentSavings}%
              </span>

              <div className="mt-4">
                <span className="text-xs text-txt-secondary block">ESTIMATED ANNUAL SAVINGS</span>
                <span className="text-3xl md:text-4xl font-heading font-black text-brand tracking-tight block mt-1">
                  {formatCurrency(calculations.annualSavings)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
              <div>
                <span className="text-[10px] text-txt-muted block uppercase tracking-wider">
                  Monthly Savings
                </span>
                <span className="text-lg font-heading font-semibold text-white mt-1 block">
                  {formatCurrency(calculations.monthlySavings)}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-txt-muted block uppercase tracking-wider">
                  CO₂ Saved / Yr
                </span>
                <span className="text-lg font-heading font-semibold text-brand mt-1 block flex items-center gap-1">
                  <Leaf size={14} className="text-brand inline" />
                  {calculations.annualCO2Saved.toFixed(1)} <span className="text-xs text-txt-muted">Tons</span>
                </span>
              </div>
            </div>

            <p className="text-[9px] text-txt-muted leading-relaxed mt-4">
              *Estimates based on regional driving conditions, KES 25/kWh grid rates, and standard commercial petrol/diesel fuel prices. Actual savings may vary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
