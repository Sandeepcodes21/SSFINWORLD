import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  Trash2,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  User,
  Tag,
} from "lucide-react";
import { formatPrice, formatKm } from "../utils/helpers";

const CarModal = ({ car, onClose, isAdmin, onDelete }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteTimer, setDeleteTimer] = useState(null);

  useEffect(() => {
    setCurrentImageIndex(0);
    setDeleteConfirm(false);
    if (deleteTimer) {
      clearTimeout(deleteTimer);
      setDeleteTimer(null);
    }
  }, [car]);

  const handlePrevImage = () => {
    if (car) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + car.images.length) % car.images.length,
      );
    }
  };

  const handleNextImage = () => {
    if (car) {
      setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (!car) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    },
    [car, onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!car) return null;

  const handleDelete = () => {
    if (deleteConfirm) {
      onDelete(car.id);
    } else {
      setDeleteConfirm(true);
      const timer = setTimeout(() => {
        setDeleteConfirm(false);
      }, 3000);
      setDeleteTimer(timer);
    }
  };

  const handleWhatsApp = () => {
    const msg = `Hi SSFINWORLD CarHub, mujhe is car me interest hai:\n\n*${car.title}*\nYear: ${car.year}\nPrice: ${formatPrice(car.price)}\nKM: ${formatKm(car.km)}\nFuel: ${car.fuel}\nTransmission: ${car.trans}\nOwner: ${car.owner}\n\nListing ID: ${car.id.slice(-8).toUpperCase()}`;
    window.open(
      `https://wa.me/919876543210?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[1000] flex items-center justify-center p-4 md:p-5 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200/80 rounded-2xl max-w-[1100px] w-full max-h-[90vh] overflow-y-auto relative transform transition-all duration-300 shadow-2xl scrollbar-custom"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Modal Floating Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full text-slate-600 flex items-center justify-center z-20 transition-all duration-300 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 hover:rotate-90 shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Gallery Container */}
        <div className="relative bg-slate-100">
          <img
            src={car.images[currentImageIndex]}
            alt={car.title}
            className="w-full h-[280px] md:h-[500px] object-cover block"
          />

          {car.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 -translate-y-1/2 left-4 w-11 h-11 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-full text-slate-800 flex items-center justify-center transition-all duration-300 hover:bg-[#d97706] hover:text-white hover:border-[#d97706] shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 -translate-y-1/2 right-4 w-11 h-11 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-full text-slate-800 flex items-center justify-center transition-all duration-300 hover:bg-[#d97706] hover:text-white hover:border-[#d97706] shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Thumbnails Row */}
          <div className="flex gap-2.5 p-3.5 overflow-x-auto bg-slate-50 border-t border-slate-200/80">
            {car.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-[90px] h-16 rounded-lg overflow-hidden cursor-pointer border-2 flex-shrink-0 transition-all duration-300 hover:opacity-100 ${
                  idx === currentImageIndex
                    ? "border-[#d97706] ring-2 ring-amber-500/20 opacity-100 shadow-sm"
                    : "border-transparent opacity-60 hover:opacity-90"
                }`}
              >
                <img
                  src={img}
                  alt={`thumb ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-9">
          {/* Header & Pricing */}
          <div className="flex flex-wrap justify-between items-start gap-4 mb-7">
            <div>
              <div className="font-syne font-bold text-2xl md:text-3xl tracking-tight leading-tight text-slate-900">
                {car.title}
              </div>
              <div className="text-slate-500 text-xs md:text-sm mt-1.5 font-medium">
                {car.year} • {car.brand} • {car.owner}
              </div>
            </div>
            <div className="text-right">
              <div className="font-syne font-extrabold text-3xl md:text-4xl text-[#d97706] leading-none tracking-tight">
                {formatPrice(car.price)}
              </div>
              <div className="text-[11px] text-slate-400 uppercase tracking-widest font-bold mt-1.5">
                Fixed Price
              </div>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 mb-8">
            {[
              { icon: Calendar, label: "Year", value: car.year },
              { icon: Gauge, label: "KM Driven", value: formatKm(car.km) },
              { icon: Fuel, label: "Fuel Type", value: car.fuel },
              { icon: Cog, label: "Transmission", value: car.trans },
              { icon: User, label: "Ownership", value: car.owner },
              {
                icon: Tag,
                label: "Listing ID",
                value: car.id.slice(-8).toUpperCase(),
              },
            ].map((spec, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 transition-all duration-300 hover:border-amber-300 hover:bg-amber-50/30"
              >
                <spec.icon className="w-5 h-5 text-[#d97706] mb-2" />
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">
                  {spec.label}
                </div>
                <div className="font-bold text-slate-900 text-sm">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>

          {/* Description Section */}
          <h3 className="font-syne font-bold text-lg text-slate-900 mb-3 flex items-center gap-2.5">
            <span className="w-1 h-5 bg-[#d97706] rounded-full"></span>{" "}
            Description
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm mb-8 font-medium">
            {car.desc || "No description provided for this listing."}
          </p>

          {/* Action Footer */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200 items-center">
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#25d366] text-white rounded-xl font-bold text-sm transition-all duration-300 hover:bg-[#1da851] hover:scale-[1.02] active:scale-[0.98] shadow-sm cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-white" /> Inquire on WhatsApp
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-bold text-sm transition-all duration-300 hover:bg-slate-200/80 hover:text-slate-900 cursor-pointer"
            >
              <X className="w-4 h-4" /> Close
            </button>

            {isAdmin && (
              <button
                onClick={handleDelete}
                className={`ml-auto inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
                  deleteConfirm
                    ? "bg-rose-600 text-white animate-shake shadow-sm"
                    : "bg-transparent text-rose-600 border border-rose-200 hover:bg-rose-50 hover:border-rose-300"
                }`}
              >
                <Trash2 className="w-4 h-4" />{" "}
                {deleteConfirm ? "Click again to confirm" : "Delete Listing"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarModal;
