import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";

interface BookingDialogProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

export default function BookingDialog({ vehicle, onClose }: BookingDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!vehicle) return null;

  const validateEmail = (val: string) => {
    return /\S+@\S+\.\S+/.test(val);
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the terms to book.");
      return;
    }

    setError("");

    // Build pre-filled WhatsApp message
    const formattedPhone = phone.trim();
    const textMessage = `Hello Transbiz, I would like to book a test drive for the *${vehicle.name}* (${vehicle.brand} ${vehicle.category}).\n\n*My Details:*\n- Name: ${name.trim()}\n- Email: ${email.trim()}\n- Phone: ${formattedPhone}`;
    
    // Transbiz official phone number is +254 747 468 481 -> stripped of symbols for wa.me link
    const waUrl = `https://wa.me/254747468481?text=${encodeURIComponent(textMessage)}`;

    window.open(waUrl, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop close area */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-[480px] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto animate-scale-up border border-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all z-10"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Form Wrap */}
        <form onSubmit={handleBook} className="p-6 md:p-8 space-y-6">
          
          {/* Header Title */}
          <h2 className="text-[#0a1e3a] font-heading font-bold text-xl md:text-2xl pr-8">
            Book a Test Drive
          </h2>

          {/* Selected Vehicle Card */}
          <div className="bg-[#f3f6f9] border border-slate-100 rounded-xl p-4 flex items-center gap-4">
            <div className="w-20 h-14 bg-white rounded-lg border border-slate-200/50 p-1 flex items-center justify-center shrink-0">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-[#0a1e3a] text-sm md:text-base leading-tight">
                {vehicle.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {vehicle.brand} &middot; {vehicle.category}
              </p>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-sm"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-sm"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +254 700 000 000"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-sm"
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                agreed
                  ? "bg-brand border-brand text-white shadow-[0_0_8px_rgba(34,197,94,0.3)]"
                  : "bg-white border-slate-300 hover:border-brand"
              }`}
            >
              {agreed && <Check size={12} strokeWidth={3} />}
            </button>
            <span
              onClick={() => setAgreed(!agreed)}
              className="text-xs text-slate-600 leading-normal select-none cursor-pointer"
            >
              I agree to the terms and conditions. By booking, we will WhatsApp you to confirm your test drive.
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-xs font-semibold text-red-500 bg-red-50 border border-red-100 rounded-lg p-3 text-center">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1b355a] hover:bg-[#122540] text-white font-heading font-semibold text-sm py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center"
          >
            Book via WhatsApp
          </button>

        </form>
      </div>
    </div>
  );
}
