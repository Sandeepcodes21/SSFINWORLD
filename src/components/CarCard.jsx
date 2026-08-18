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
        className="bg-[#15130f] border border-white/10 rounded-xl overflow-hidden cursor-pointer transition-all duration-400 hover:-translate-y-1 hover:border-[#e89c3e]/30 hover:shadow-2xl hover:shadow-black/70 flex flex-col md:flex-row relative group"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {/* Delete Button - Admin Only */}
        {isAdmin && (
          <button
            onClick={handleDeleteClick}
            className={`absolute top-3 right-3 z-10 p-2 rounded-lg transition-all duration-300 ${
              deleteConfirm === car.id
                ? "bg-[#eb5757] text-white animate-pulse"
                : "bg-black/70 backdrop-blur-sm text-[#8a7f6e] hover:text-[#eb5757] hover:bg-[#eb5757]/20"
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

        <div className="relative h-[200px] md:h-auto md:w-[280px] flex-shrink-0 overflow-hidden bg-[#1d1a14]">
          <img
            src={car.images[0]}
            alt={car.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div
            className={`absolute top-3.5 left-3.5 bg-black/85 backdrop-blur-sm px-3 py-1.5 rounded-md text-[11px] font-bold uppercase border border-white/10 ${car.year >= 2021 ? "bg-[#e89c3e] text-[#0c0b0a] border-none" : ""}`}
          >
            {car.year}
          </div>
          <div className="absolute bottom-3.5 right-3.5 bg-black/85 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs flex items-center gap-1.5 border border-white/10 font-semibold text-[#f4ede0]">
            <Image className="w-3.5 h-3.5" /> {car.images.length}
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-syne font-bold text-xl tracking-[-0.02em] leading-tight text-[#f4ede0]">
                  {car.title}
                </div>
                <div className="text-[#8a7f6e] text-xs mt-1">
                  {car.year} • {car.brand} • {car.owner}
                </div>
              </div>
              <div className="font-syne font-bold text-2xl text-[#e89c3e] whitespace-nowrap">
                {formatPrice(car.price)}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-3 py-3 border-t border-b border-white/10">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#e89c3e]" />
                <span className="text-xs font-medium text-[#f4ede0]">
                  {formatKm(car.km)}
                </span>
                <span className="text-[10px] text-[#8a7f6e]">Driven</span>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="w-4 h-4 text-[#e89c3e]" />
                <span className="text-xs font-medium text-[#f4ede0]">
                  {car.fuel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Cog className="w-4 h-4 text-[#e89c3e]" />
                <span className="text-xs font-medium text-[#f4ede0]">
                  {car.trans}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center mt-3">
            <div className="text-[#8a7f6e] text-xs flex items-center gap-1.5 transition-all duration-300 font-medium hover:text-[#e89c3e] hover:gap-2.5">
              View Details <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View with Delete Button
  return (
    <div
      onClick={onClick}
      className="bg-[#15130f] border border-white/10 rounded-xl overflow-hidden cursor-pointer transition-all duration-400 hover:-translate-y-2 hover:border-[#e89c3e]/30 hover:shadow-2xl hover:shadow-black/70 relative group"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Delete Button - Admin Only */}
      {isAdmin && (
        <button
          onClick={handleDeleteClick}
          className={`absolute top-3 right-3 z-10 p-2 rounded-lg transition-all duration-300 ${
            deleteConfirm === car.id
              ? "bg-[#eb5757] text-white animate-pulse"
              : "bg-black/70 backdrop-blur-sm text-[#8a7f6e] hover:text-[#eb5757] hover:bg-[#eb5757]/20"
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

      <div className="relative h-[230px] overflow-hidden bg-[#1d1a14]">
        <img
          src={car.images[0]}
          alt={car.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div
          className={`absolute top-3.5 left-3.5 bg-black/85 backdrop-blur-sm px-3 py-1.5 rounded-md text-[11px] font-bold uppercase border border-white/10 ${car.year >= 2021 ? "bg-[#e89c3e] text-[#0c0b0a] border-none" : ""}`}
        >
          {car.year}
        </div>
        <div className="absolute bottom-3.5 right-3.5 bg-black/85 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs flex items-center gap-1.5 border border-white/10 font-semibold text-[#f4ede0]">
          <Image className="w-3.5 h-3.5" /> {car.images.length}
        </div>
      </div>

      <div className="p-5">
        <div className="font-syne font-bold text-xl tracking-[-0.02em] leading-tight text-[#f4ede0]">
          {car.title}
        </div>
        <div className="text-[#8a7f6e] text-xs mb-4">
          {car.year} • {car.owner}
        </div>

        <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-white/10 mb-4">
          <div className="text-center">
            <Gauge className="w-4 h-4 text-[#e89c3e] mx-auto mb-1.5" />
            <div className="text-xs font-semibold text-[#f4ede0]">
              {formatKm(car.km)}
            </div>
            <div className="text-[10px] text-[#8a7f6e] uppercase tracking-[0.08em]">
              Driven
            </div>
          </div>
          <div className="text-center">
            <Fuel className="w-4 h-4 text-[#e89c3e] mx-auto mb-1.5" />
            <div className="text-xs font-semibold text-[#f4ede0]">
              {car.fuel}
            </div>
            <div className="text-[10px] text-[#8a7f6e] uppercase tracking-[0.08em]">
              Fuel
            </div>
          </div>
          <div className="text-center">
            <Cog className="w-4 h-4 text-[#e89c3e] mx-auto mb-1.5" />
            <div className="text-xs font-semibold text-[#f4ede0]">
              {car.trans}
            </div>
            <div className="text-[10px] text-[#8a7f6e] uppercase tracking-[0.08em]">
              Trans
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="font-syne font-bold text-2xl text-[#e89c3e]">
            {formatPrice(car.price)}
          </div>
          <div className="text-[#8a7f6e] text-xs flex items-center gap-1.5 transition-all duration-300 font-medium hover:text-[#e89c3e] hover:gap-2.5">
            View Details <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
