import React, { useState, useRef } from "react";
import {
  Check,
  RotateCcw,
  X,
  Upload,
  Image as ImageIcon,
  Car,
  Calendar,
  IndianRupee,
  Gauge,
  Fuel,
  User,
  FileText,
  Sparkles,
  ShieldCheck,
  Loader2,
  ChevronDown,
  Info,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { uploadMultipleImages } from "../utils/cloudinary";

const CarForm = ({ isAdmin, onAddCar, showToast, onReset }) => {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    year: "",
    price: "",
    km: "",
    fuel: "Petrol",
    owner: "1st Owner",
    desc: "",
  });

  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileSelect = async (files) => {
    const imageFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (!imageFiles.length) {
      showToast("Kripya image files select karein", "error");
      return;
    }

    const previews = imageFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...previews]);

    setUploading(true);
    setUploadProgress(20);

    try {
      const urls = await uploadMultipleImages(imageFiles);
      setImageUrls((prev) => [...prev, ...urls]);
      setUploadProgress(100);
      showToast(`${imageFiles.length} images upload ho gayi!`, "success");
    } catch (error) {
      showToast("Image upload fail ho gaya.", "error");
      setImages((prev) => prev.slice(0, prev.length - imageFiles.length));
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      showToast("Pehle admin login karein!", "error");
      return;
    }
    if (!imageUrls.length) {
      showToast("Kam se kam 1 image upload karein", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const newCar = {
        ...formData,
        year: parseInt(formData.year),
        price: parseInt(formData.price),
        km: parseInt(formData.km),
        images: imageUrls,
      };
      await onAddCar(newCar);
      handleReset();
    } catch (error) {
      showToast(error.message || "Listing add nahi ho payi.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      brand: "",
      year: "",
      price: "",
      km: "",
      fuel: "Petrol",
      owner: "1st Owner",
      desc: "",
    });
    setImages([]);
    setImageUrls([]);
    if (onReset) onReset();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:px-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-6 rounded-3xl border border-amber-500/20 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 font-bold">
            <Car className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Publish New Vehicle
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
              Fill in details below to list a new vehicle in your catalog
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-700 text-xs font-bold tracking-wide">
          <Sparkles className="w-4 h-4 text-amber-600" /> ADMIN PANEL
        </div>
      </div>

      {/* Grid Layout: Left Live Preview + Right Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Live Preview & Tips */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
          {/* Live Preview Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Live Preview
              </span>
              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                Realtime
              </span>
            </div>

            <div className="h-44 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200/60 flex items-center justify-center">
              {images[0] ? (
                <img
                  src={images[0]}
                  alt="Car Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-slate-400 flex flex-col items-center gap-2">
                  <ImageIcon className="w-8 h-8 stroke-1" />
                  <span className="text-xs font-medium">
                    Image preview zone
                  </span>
                </div>
              )}
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                {formData.brand || "BRAND"}
              </span>
              <h4 className="font-bold text-slate-900 text-lg mt-1 truncate">
                {formData.title || "Vehicle Title Here"}
              </h4>
              <p className="text-amber-600 font-extrabold text-xl mt-1">
                ₹{" "}
                {formData.price
                  ? Number(formData.price).toLocaleString("en-IN")
                  : "0"}
              </p>

              <div className="flex flex-wrap gap-2 text-[11px] text-slate-600 font-medium mt-3 pt-3 border-t border-slate-100">
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">
                  {formData.year || "YYYY"}
                </span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">
                  {formData.fuel}
                </span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">
                  {formData.km ? `${formData.km} KM` : "0 KM"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Tips Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
            <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-amber-400">
              <Info className="w-4 h-4" /> Best Practices
            </h3>
            <ul className="space-y-2.5 text-slate-300 text-xs font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Upload high-resolution images taken in proper lighting.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Specify precise variant name along with model title.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Main Form Container */}
        <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-amber-600" /> Car Title /
                  Model *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Hyundai Creta SX (O)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 outline-none font-medium transition-all"
                  required
                />
              </div>

              {/* Brand */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Brand *
                </label>
                <input
                  type="text"
                  id="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g. Hyundai, Tata, Mahindra"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 outline-none font-medium transition-all"
                  required
                />
              </div>

              {/* Year */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />{" "}
                  Manufacturing Year *
                </label>
                <input
                  type="number"
                  id="year"
                  min="1990"
                  max="2026"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="e.g. 2022"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 outline-none font-medium transition-all"
                  required
                />
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-amber-600" /> Price
                  (₹) *
                </label>
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 850000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 outline-none font-medium transition-all"
                  required
                />
              </div>

              {/* KM Driven */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-amber-600" /> KM Driven *
                </label>
                <input
                  type="number"
                  id="km"
                  value={formData.km}
                  onChange={handleChange}
                  placeholder="e.g. 35000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 outline-none font-medium transition-all"
                  required
                />
              </div>

              {/* Fuel Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Fuel className="w-3.5 h-3.5 text-amber-600" /> Fuel Type *
                </label>
                <div className="relative">
                  <select
                    id="fuel"
                    value={formData.fuel}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 outline-none font-medium appearance-none transition-all cursor-pointer"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Ownership */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-600" /> Ownership *
                </label>
                <div className="relative">
                  <select
                    id="owner"
                    value={formData.owner}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 outline-none font-medium appearance-none transition-all cursor-pointer"
                  >
                    <option value="1st Owner">1st Owner</option>
                    <option value="2nd Owner">2nd Owner</option>
                    <option value="3rd Owner">3rd Owner</option>
                    <option value="4th Owner+">4th Owner+</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-600" /> Description
              </label>
              <textarea
                id="desc"
                value={formData.desc}
                onChange={handleChange}
                rows={3}
                placeholder="Vehicle condition, service history, special features..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 outline-none font-medium transition-all resize-y"
              />
            </div>

            {/* Image Upload Area */}
            <div className="flex flex-col gap-2 pt-2">
              <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-600" /> Vehicle
                  Images *
                </span>
                <span className="text-slate-400 text-[11px] font-semibold">
                  {images.length} Selected
                </span>
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-amber-500 bg-slate-50/50 hover:bg-amber-50/30 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100/70 text-amber-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-800">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  PNG, JPG, WEBP up to 5MB each
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files)}
                />
              </div>

              {/* Progress Bar */}
              {uploading && (
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-amber-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}

              {/* Image Thumbnails Grid */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-3">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-24 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group bg-slate-100"
                    >
                      <img
                        src={img}
                        alt={`car-${idx}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-slate-900/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-1.5 left-1.5 bg-amber-500 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                          Main
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Action Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSubmitting || uploading}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm rounded-2xl shadow-lg shadow-amber-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Publish Listing</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarForm;
