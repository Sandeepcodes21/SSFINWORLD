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
  const dropzoneRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileSelect = async (files) => {
    const imageFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (!imageFiles.length) {
      showToast("Kripya image files select karein", "error");
      return;
    }

    for (const file of imageFiles) {
      if (file.size > 5 * 1024 * 1024) {
        showToast(`${file.name} ka size 5MB se chhota hona chahiye`, "error");
        return;
      }
    }

    const previews = imageFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...previews]);

    setUploading(true);
    setUploadProgress(20);

    try {
      const urls = await uploadMultipleImages(imageFiles);
      setImageUrls((prev) => [...prev, ...urls]);
      setUploadProgress(100);

      previews.forEach((url) => URL.revokeObjectURL(url));
      showToast(`${imageFiles.length} images successfully upload ho gayi!`, "success");
    } catch (error) {
      showToast("Image upload fail ho gaya. Kripya punah prayas karein.", "error");
      setImages((prev) => prev.slice(0, prev.length - imageFiles.length));
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isAdmin) {
      showToast("Pehle admin login karein!", "error");
      return;
    }
    await handleFileSelect(e.dataTransfer.files);
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

    const { title, year, price, km } = formData;
    if (!title || !year || !price || !km) {
      showToast("Sabhi zaroori fields fill karein", "error");
      return;
    }

    const yearNum = parseInt(year);
    const priceNum = parseInt(price);
    const kmNum = parseInt(km);

    if (yearNum < 1990 || yearNum > 2026) {
      showToast("Year 1990 se 2026 ke beech hona chahiye", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const newCar = {
        title: formData.title.trim(),
        brand: formData.brand.trim(),
        year: yearNum,
        price: priceNum,
        km: kmNum,
        fuel: formData.fuel,
        owner: formData.owner,
        desc: formData.desc.trim(),
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
    setUploadProgress(0);
    if (onReset) onReset();
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-10 max-w-[960px] mx-auto relative overflow-hidden shadow-2xl shadow-slate-200/60 transition-all">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-amber-50 border border-amber-200/60 rounded-2xl flex items-center justify-center text-[#d97706] shadow-xs">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-syne font-bold text-xl text-slate-900 tracking-tight">
              Add New Car Listing
            </h3>
            <p className="text-slate-500 text-xs font-medium mt-0.5">
              Enter vehicle specifications and photos to publish
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-50/80 border border-amber-200/70 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
          <span className="text-[#b45309] text-[11px] font-bold tracking-wide uppercase">
            Admin Console
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-[#d97706]" />
              Car Title / Model <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Hyundai Creta SX (O)"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition-all duration-200 focus:border-[#d97706] focus:bg-white focus:ring-3 focus:ring-amber-500/15 font-medium"
              required
            />
          </div>

          {/* Brand */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d97706]" />
              Brand <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g. Hyundai, Tata, Mahindra"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition-all duration-200 focus:border-[#d97706] focus:bg-white focus:ring-3 focus:ring-amber-500/15 font-medium"
              required
            />
          </div>

          {/* Manufacturing Year */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#d97706]" />
              Year <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              id="year"
              min="1990"
              max="2026"
              value={formData.year}
              onChange={handleChange}
              placeholder="e.g. 2022"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition-all duration-200 focus:border-[#d97706] focus:bg-white focus:ring-3 focus:ring-amber-500/15 font-medium"
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-[#d97706]" />
              Price (₹) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 850000"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition-all duration-200 focus:border-[#d97706] focus:bg-white focus:ring-3 focus:ring-amber-500/15 font-medium"
              required
            />
          </div>

          {/* Kilometers Driven */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-[#d97706]" />
              KM Driven <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              id="km"
              value={formData.km}
              onChange={handleChange}
              placeholder="e.g. 35000"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition-all duration-200 focus:border-[#d97706] focus:bg-white focus:ring-3 focus:ring-amber-500/15 font-medium"
              required
            />
          </div>

          {/* Fuel Type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-[#d97706]" />
              Fuel Type <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                id="fuel"
                value={formData.fuel}
                onChange={handleChange}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none appearance-none transition-all duration-200 focus:border-[#d97706] focus:bg-white focus:ring-3 focus:ring-amber-500/15 font-medium"
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
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#d97706]" />
              Ownership <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                id="owner"
                value={formData.owner}
                onChange={handleChange}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none appearance-none transition-all duration-200 focus:border-[#d97706] focus:bg-white focus:ring-3 focus:ring-amber-500/15 font-medium"
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
            <FileText className="w-3.5 h-3.5 text-[#d97706]" />
            Description
          </label>
          <textarea
            id="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Car condition, service history, extra features..."
            rows={3}
            className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition-all duration-200 focus:border-[#d97706] focus:bg-white focus:ring-3 focus:ring-amber-500/15 font-medium resize-y"
          />
        </div>

        {/* Image Upload Zone */}
        <div className="flex flex-col gap-2 pt-2">
          <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-[#d97706]" />
              Car Images <span className="text-rose-500">*</span>
            </span>
            <span className="text-slate-400 font-medium normal-case text-[11px]">
              {images.length} selected
            </span>
          </label>

          <div
            ref={dropzoneRef}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? "border-[#d97706] bg-amber-50/60 scale-[0.99]"
                : "border-slate-200 bg-slate-50/50 hover:border-amber-400 hover:bg-slate-50"
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-amber-100/70 text-[#d97706] flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-800 text-sm font-semibold">
                  Click to upload or drag & drop images
                </p>
                <p className="text-slate-400 text-xs mt-0.5 font-medium">
                  PNG, JPG, WEBP up to 5MB each
                </p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                if (!isAdmin) {
                  showToast("Pehle admin login karein!", "error");
                  e.target.value = "";
                  return;
                }
                await handleFileSelect(e.target.files);
                e.target.value = "";
              }}
            />
          </div>

          {/* Upload Progress Bar */}
          {uploading && (
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-[#d97706] h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {/* Image Previews */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group h-24 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100"
                >
                  <img
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-slate-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-1 left-1 bg-[#d97706] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      Main
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isSubmitting || uploading || !imageUrls.length}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-xl font-bold text-sm shadow-md shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Publish Listing</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-100 text-slate-700 hover:bg-slate-200/80 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;