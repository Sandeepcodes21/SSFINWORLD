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

  // Add this function inside CarModal component
  const handleDeleteImage = async (imageIndex) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      // Call API to delete image
      await carAPI.deleteImage(car.id, imageIndex);

      // Update local state
      const newImages = car.images.filter((_, idx) => idx !== imageIndex);
      const updatedCar = { ...car, images: newImages };

      // Update parent state
      onCarUpdate(updatedCar);

      // Update current gallery
      setCurrentImageIndex(0);

      showToast("Image deleted successfully", "success");
    } catch (error) {
      showToast("Failed to delete image", "error");
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
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[1000] flex items-center justify-center p-5 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-bg-dark-2 border border-white/10 rounded-2xl max-w-[1100px] w-full max-h-[90vh] overflow-y-auto relative transform transition-transform duration-400 scrollbar-custom"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full text-fg-light flex items-center justify-center z-10 transition-all duration-300 hover:bg-danger hover:border-danger hover:rotate-90"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative bg-bg-dark-3">
          <img
            src={car.images[currentImageIndex]}
            alt={car.title}
            className="w-full h-[280px] md:h-[500px] object-cover block"
          />

          {car.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 -translate-y-1/2 left-4 w-12 h-12 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full text-fg-light flex items-center justify-center transition-all duration-300 hover:bg-accent hover:text-bg-dark hover:border-accent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 -translate-y-1/2 right-4 w-12 h-12 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full text-fg-light flex items-center justify-center transition-all duration-300 hover:bg-accent hover:text-bg-dark hover:border-accent"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="flex gap-2.5 p-3.5 overflow-x-auto bg-bg-dark-3 border-t border-white/10">
            {car.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-[90px] h-16 rounded-lg overflow-hidden cursor-pointer border-2 flex-shrink-0 transition-all duration-300 hover:opacity-100 ${
                  idx === currentImageIndex
                    ? "border-accent opacity-100"
                    : "border-transparent opacity-60"
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

        <div className="p-6 md:p-9">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-7">
            <div>
              <div className="font-syne font-bold text-2xl md:text-3xl tracking-[-0.02em] leading-tight">
                {car.title}
              </div>
              <div className="text-muted text-sm mt-1.5">
                {car.year} • {car.brand} • {car.owner}
              </div>
            </div>
            <div className="text-right">
              <div className="font-syne font-extrabold text-3xl md:text-4xl text-accent leading-none tracking-[-0.02em]">
                {formatPrice(car.price)}
              </div>
              <div className="text-[11px] text-muted uppercase tracking-[0.15em] mt-1.5">
                Fixed Price
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
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
                className="bg-bg-dark-3 border border-white/10 rounded-xl p-4 transition-all duration-300 hover:border-white/16 hover:-translate-y-0.5"
              >
                <spec.icon className="w-5 h-5 text-accent mb-2.5" />
                <div className="text-[10px] text-muted uppercase tracking-[0.1em] font-semibold mb-1.5">
                  {spec.label}
                </div>
                <div className="font-semibold text-fg-light">{spec.value}</div>
              </div>
            ))}
          </div>

          <h3 className="font-syne font-bold text-xl mb-3.5 flex items-center gap-2.5">
            <span className="w-1 h-5 bg-accent rounded-sm"></span> Description
          </h3>
          <p className="text-muted leading-relaxed text-sm mb-8">
            {car.desc || "No description provided for this listing."}
          </p>

          <div className="flex flex-wrap gap-3 pt-6 border-t border-white/10 items-center">
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#25d366] text-bg-dark rounded-xl font-bold text-sm transition-all duration-300 hover:bg-[#1da851] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#25d366]/50"
            >
              <Phone className="w-4 h-4" /> Inquire on WhatsApp
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-transparent text-fg-light border border-white/16 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-bg-dark-2 hover:border-accent"
            >
              <X className="w-4 h-4" /> Close
            </button>
            {isAdmin && (
              <button
                onClick={handleDelete}
                className={`ml-auto inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  deleteConfirm
                    ? "bg-danger text-white animate-shake"
                    : "bg-transparent text-danger border border-danger/30 hover:bg-danger hover:text-white hover:border-danger"
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
};;

export default CarModal;
