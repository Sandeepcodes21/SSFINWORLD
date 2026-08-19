import React from "react";
import { Image, Gauge, Fuel, Cog, ArrowRight, Trash2 } from "lucide-react";
import { formatPrice, formatKm } from "../utils/helpers";

const CarCard = ({
  car,
  index,
  onClick,
  isAdmin,
  viewMode = "grid",
  onDelete,
  deleteConfirm,
}) => {
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(car.id, e);
    }
  };

  if (viewMode === "list") {
    return (
      <div
        onClick={onClick}
        className="bg-white border border-slate-200/80 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/80 hover:shadow-xl hover:shadow-slate-200/70 flex flex-col md:flex-row relative group shadow-sm"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {/* Delete Button - Admin Only */}
        {isAdmin && (
          <button
            onClick={handleDeleteClick}
            className={`absolute top-3 right-3 z-10 p-2 rounded-lg transition-all duration-300 shadow-sm ${
              deleteConfirm === car.id
                ? "bg-rose-600 text-white animate-pulse"
                : "bg-white/90 backdrop-blur-md text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200/80"
            }`}
            title={
              deleteConfirm === car.id
                ? "Click again to confirm delete"
                : "Delete listing"
            }
          >
            <Trash2
              className={`w-4 h-4 ${deleteConfirm === car.id ? "animate-shake" : ""}`}
            />
          </button>
        )}

        {/* Image Container */}
        <div className="relative h-[200px] md:h-auto md:w-[280px] flex-shrink-0 overflow-hidden bg-slate-100">
          <img
            src={car.images[0]}
            alt={car.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className={`absolute top-3.5 left-3.5 px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wide shadow-sm ${
              car.year >= 2021
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold"
                : "bg-slate-900/80 backdrop-blur-md text-white border border-white/20"
            }`}
          >
            {car.year}
          </div>
          <div className="absolute bottom-3.5 right-3.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-md text-xs flex items-center gap-1.5 font-semibold text-white shadow-sm border border-white/20">
            <Image className="w-3.5 h-3.5" /> {car.images.length}
          </div>
        </div>

        {/* Details Container */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-syne font-bold text-xl tracking-tight leading-tight text-slate-900 group-hover:text-[#d97706] transition-colors">
                  {car.title}
                </div>
                <div className="text-slate-500 text-xs mt-1 font-medium">
                  {car.year} • {car.brand} • {car.owner}
                </div>
              </div>
              <div className="font-syne font-bold text-2xl text-[#d97706] whitespace-nowrap">
                {formatPrice(car.price)}
              </div>
            </div>

            {/* Spec Highlights */}
            <div className="flex flex-wrap gap-4 mt-3 py-3 border-t border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#d97706]" />
                <span className="text-xs font-semibold text-slate-800">
                  {formatKm(car.km)}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Driven
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="w-4 h-4 text-[#d97706]" />
                <span className="text-xs font-semibold text-slate-800">
                  {car.fuel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Cog className="w-4 h-4 text-[#d97706]" />
                <span className="text-xs font-semibold text-slate-800">
                  {car.trans}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center mt-3">
            <div className="text-slate-500 text-xs flex items-center gap-1.5 transition-all duration-300 font-bold group-hover:text-[#d97706] group-hover:gap-2.5">
              View Details <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ====== GRID VIEW ======
  return (
    <div
      onClick={onClick}
      className="bg-white border border-slate-200/80 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/80 hover:shadow-xl hover:shadow-slate-200/70 relative group shadow-sm flex flex-col justify-between"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Delete Button - Admin Only */}
      {isAdmin && (
        <button
          onClick={handleDeleteClick}
          className={`absolute top-3 right-3 z-10 p-2 rounded-lg transition-all duration-300 shadow-sm ${
            deleteConfirm === car.id
              ? "bg-rose-600 text-white animate-pulse"
              : "bg-white/90 backdrop-blur-md text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200/80"
          }`}
          title={
            deleteConfirm === car.id
              ? "Click again to confirm delete"
              : "Delete listing"
          }
        >
          <Trash2
            className={`w-4 h-4 ${deleteConfirm === car.id ? "animate-shake" : ""}`}
          />
        </button>
      )}

      {/* Car Image */}
      <div className="relative h-[220px] overflow-hidden bg-slate-100">
        <img
          src={car.images[0]}
          alt={car.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className={`absolute top-3.5 left-3.5 px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wide shadow-sm ${
            car.year >= 2021
              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold"
              : "bg-slate-900/80 backdrop-blur-md text-white border border-white/20"
          }`}
        >
          {car.year}
        </div>
        <div className="absolute bottom-3.5 right-3.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-md text-xs flex items-center gap-1.5 font-semibold text-white shadow-sm border border-white/20">
          <Image className="w-3.5 h-3.5" /> {car.images.length}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="font-syne font-bold text-lg tracking-tight leading-snug text-slate-900 group-hover:text-[#d97706] transition-colors">
            {car.title}
          </div>
          <div className="text-slate-500 text-xs mb-4 font-medium">
            {car.year} • {car.owner}
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-slate-100 mb-4 bg-slate-50/60 rounded-lg">
            <div className="text-center">
              <Gauge className="w-4 h-4 text-[#d97706] mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-800">
                {formatKm(car.km)}
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Driven
              </div>
            </div>
            <div className="text-center border-l border-r border-slate-200/60">
              <Fuel className="w-4 h-4 text-[#d97706] mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-800">{car.fuel}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Fuel
              </div>
            </div>
            <div className="text-center">
              <Cog className="w-4 h-4 text-[#d97706] mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-800">
                {car.trans}
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Trans
              </div>
            </div>
          </div>
        </div>

        {/* Footer Price & Link */}
        <div className="flex justify-between items-center pt-1">
          <div className="font-syne font-bold text-xl text-[#d97706]">
            {formatPrice(car.price)}
          </div>
          <div className="text-slate-500 text-xs flex items-center gap-1.5 transition-all duration-300 font-bold group-hover:text-[#d97706] group-hover:gap-2">
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
