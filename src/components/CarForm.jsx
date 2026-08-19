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
  AlertCircle,
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
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-600">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Add New Car Listing
            </h1>
            <p className="text-slate-500 text-xs font-medium">
              Create a high-converting vehicle post for buyers
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-xs font-bold">
          <Sparkles className="w-4 h-4" /> ADMIN PANEL
        </div>
      </div>

      {/* Main Grid: Left Sidebar + Right Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Guidelines & Live Preview Card (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl"></div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-400">
              <Info className="w-5 h-5" /> Quick Tips
            </h3>
            <ul className="space-y-3 text-slate-300 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Clear & daylight photos upload karein for best response.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Title me exact Variant aur Year mention karein.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Kilometers true & accurate fill karein.</span>
              </li>
            </ul>
          </div>

          {/* Live Preview Mini Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Live Preview
            </span>
            <div className="h-40 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-100 flex items-center justify-center">
              {images[0] ? (
                <img
                  src={images[0]}
                  alt="Car"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-slate-400 flex flex-col items-center gap-1">
                  <ImageIcon className="w-8 h-8 stroke-1" />
                  <span className="text-xs">No main image</span>
                </div>
              )}
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-base">
                {formData.title || "Car Title Here"}
              </h4>
              <p className="text-amber-600 font-extrabold text-lg">
                ₹{" "}
                {formData.price
                  ? Number(formData.price).toLocaleString("en-IN")
                  : "0"}
              </p>
              <div className="flex gap-2 text-[11px] text-slate-500 font-medium mt-2">
                <span className="bg-slate-100 px-2 py-1 rounded-md">
                  {formData.year || "YYYY"}
                </span>
                <span className="bg-slate-100 px-2 py-1 rounded-md">
                  {formData.fuel}
                </span>
                <span className="bg-slate-100 px-2 py-1 rounded-md">
                  {formData.km ? `${formData.km} KM` : "0 KM"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Main Form Container (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl">
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
                  placeholder="e.g. Hyundai Creta SX"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium transition-all"
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
                  placeholder="e.g. Hyundai, Tata"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium transition-all"
                  required
                />
              </div>

              {/* Year */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" /> Year *
                </label>
                <input
                  type="number"
                  id="year"
                  min="1990"
                  max="2026"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="e.g. 2022"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium transition-all"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium transition-all"
                  required
                />
              </div>

              {/* KM */}
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium transition-all"
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium appearance-none transition-all"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric</option>
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium appearance-none transition-all"
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
                placeholder="Vehicle condition, service history..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium transition-all resize-y"
              />
            </div>

            {/* Image Upload Area */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-amber-600" /> Images *
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-amber-500 bg-slate-50/50 hover:bg-slate-50 rounded-2xl p-6 text-center cursor-pointer transition-all"
              >
                <Upload className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">
                  Click to upload photos
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  PNG, JPG up to 5MB
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

              {/* Image Previews */}
              {images.length > 0 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-2">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-20 rounded-xl overflow-hidden border border-slate-200 group"
                    >
                      <img
                        src={img}
                        alt="car"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 w-5 h-5 bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSubmitting || uploading}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                <span>Publish Listing</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarForm;
