import React, { useState, useRef } from "react";
import {
  Cloud,
  Check,
  RotateCcw,
  X,
  Upload,
  Image as ImageIcon,
  Car,
  Calendar,
  DollarSign,
  Gauge,
  Fuel,
  Cog,
  User,
  FileText,
  Sparkles,
  Shield,
  Info,
  Loader2,
} from "lucide-react";
import { uploadMultipleImages } from "../utils/cloudinary";

const CarForm = ({ isAdmin, onAddCar, showToast, onReset }) => {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    year: "",
    price: "",
    km: "",
    fuel: "",
    trans: "",
    owner: "",
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

  // ============================================
  // MANUAL INPUT HANDLERS - No dropdowns
  // ============================================
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileSelect = async (files) => {
    const imageFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (!imageFiles.length) {
      showToast("Please image files select karein", "error");
      return;
    }

    // Validate file sizes
    for (const file of imageFiles) {
      if (file.size > 5 * 1024 * 1024) {
        showToast(`${file.name} too large (max 5MB)`, "error");
        return;
      }
    }

    // Show previews immediately
    const previews = imageFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...previews]);

    // Upload to Cloudinary
    setUploading(true);
    setUploadProgress(0);

    try {
      const urls = await uploadMultipleImages(imageFiles);
      setImageUrls((prev) => [...prev, ...urls]);
      setUploadProgress(100);

      // Revoke object URLs after upload
      previews.forEach((url) => URL.revokeObjectURL(url));

      showToast(
        `${imageFiles.length} images uploaded successfully!`,
        "success",
      );
    } catch (error) {
      showToast("Image upload failed. Please try again.", "error");
      // Remove failed upload previews
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

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
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
      showToast("Sabhi fields fill karein", "error");
      return;
    }

    const yearNum = parseInt(year);
    const priceNum = parseInt(price);
    const kmNum = parseInt(km);
    if (yearNum < 1990 || yearNum > 2026) {
      showToast("Year 1990 se 2026 ke beech hona chahiye", "error");
      return;
    }
    if (priceNum <= 0 || kmNum < 0) {
      showToast("Price aur KM valid values enter karein", "error");
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
        fuel: formData.fuel.trim(),
        trans: formData.trans.trim(),
        owner: formData.owner.trim(),
        desc: formData.desc.trim(),
        images: imageUrls,
      };

      await onAddCar(newCar);

      // Reset form
      setFormData({
        title: "",
        brand: "",
        year: "",
        price: "",
        km: "",
        fuel: "",
        trans: "",
        owner: "",
        desc: "",
      });
      setImages([]);
      setImageUrls([]);
      setUploadProgress(0);
    } catch (error) {
      showToast(
        error.message || "Failed to publish listing. Please try again.",
        "error",
      );
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
      fuel: "",
      trans: "",
      owner: "",
      desc: "",
    });
    setImages([]);
    setImageUrls([]);
    setUploadProgress(0);
    if (onReset) onReset();
    showToast("Form cleared", "info");
  };

  // ============================================
  // FORM FIELDS - ALL MANUAL INPUT
  // ============================================
  const formFields = [
    {
      id: "title",
      label: "Car Title / Model Name",
      icon: Car,
      placeholder: "e.g. Hyundai Creta SX",
      type: "text",
    },
    {
      id: "brand",
      label: "Brand",
      icon: Shield,
      placeholder: "e.g. Hyundai, Toyota, BMW",
      type: "text",
    },
    {
      id: "year",
      label: "Year",
      icon: Calendar,
      placeholder: "2022",
      type: "number",
      min: 1990,
      max: 2026,
    },
    {
      id: "price",
      label: "Price (₹)",
      icon: DollarSign,
      placeholder: "850000",
      type: "number",
    },
    {
      id: "km",
      label: "KM Driven",
      icon: Gauge,
      placeholder: "45000",
      type: "number",
    },
    {
      id: "fuel",
      label: "Fuel Type",
      icon: Fuel,
      placeholder: "e.g. Petrol, Diesel, Electric",
      type: "text",
    },
    {
      id: "trans",
      label: "Transmission",
      icon: Cog,
      placeholder: "e.g. Manual, Automatic, CVT",
      type: "text",
    },
    {
      id: "owner",
      label: "Ownership",
      icon: User,
      placeholder: "e.g. 1st Owner, 2nd Owner",
      type: "text",
    },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-11 max-w-[1000px] relative overflow-hidden shadow-xl shadow-slate-200/50">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>

      {/* Background Subtle Blur Decoration */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Form Header */}
      <div className="flex items-center gap-3 mb-8 relative">
        <div className="w-11 h-11 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-[#d97706] shadow-sm">
          <Car className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-syne font-bold text-xl text-slate-900">
            Add New Listing
          </h3>
          <p className="text-slate-500 text-xs font-medium">
            Fill in the details to publish your car listing
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
            Premium Listing
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {formFields.map((field) => (
            <div key={field.id} className="flex flex-col gap-2 group">
              <label className="text-[11px] text-slate-700 font-bold uppercase tracking-[0.1em] flex items-center gap-2">
                {field.icon && (
                  <field.icon className="w-3.5 h-3.5 text-[#d97706]" />
                )}
                {field.label}
                <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <input
                  type={field.type}
                  id={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  min={field.min}
                  max={field.max}
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3.5 pl-11 text-slate-900 text-sm outline-none transition-all duration-300 focus:border-[#d97706] focus:bg-white focus:ring-2 focus:ring-amber-500/20 hover:border-slate-300 font-medium"
                  required
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#d97706] transition-colors">
                  <field.icon className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}

          {/* Description - Full Width */}
          <div className="flex flex-col gap-2 md:col-span-2 group">
            <label className="text-[11px] text-slate-700 font-bold uppercase tracking-[0.1em] flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-[#d97706]" />
              Description
            </label>
            <div className="relative">
              <textarea
                id="desc"
                value={formData.desc}
                onChange={handleChange}
                placeholder="Car ki condition, features, aur khaas baatein likhein..."
                className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 text-sm outline-none transition-all duration-300 focus:border-[#d97706] focus:bg-white focus:ring-2 focus:ring-amber-500/20 min-h-[120px] resize-y hover:border-slate-300 font-medium"
              />
              <div className="absolute bottom-3 right-3 text-[10px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <Info className="w-3 h-3 text-slate-400" /> Optional
                </span>
              </div>
            </div>
          </div>

          {/* Image Upload - Full Width */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[11px] text-slate-700 font-bold uppercase tracking-[0.1em] flex items-center gap-2">
              <ImageIcon className="w-3.5 h-3.5 text-[#d97706]" />
              Car Photos{" "}
              <span className="text-slate-400 font-normal lowercase">
                (3-4 images recommended)
              </span>
            </label>

            <div
              ref={dropzoneRef}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative border-2 border-dashed rounded-2xl p-8 md:p-11 text-center cursor-pointer transition-all duration-300 bg-slate-50/70 group ${
                isDragging
                  ? "border-[#d97706] bg-amber-50/50 scale-[1.01]"
                  : "border-slate-200 hover:border-amber-400 hover:bg-slate-100/60"
              }`}
            >
              <div className="relative z-10">
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                    isDragging
                      ? "bg-amber-100 border border-amber-300"
                      : "bg-white border border-slate-200 group-hover:border-amber-300 group-hover:bg-amber-50/50"
                  }`}
                >
                  <Upload
                    className={`w-7 h-7 transition-all duration-300 ${
                      isDragging
                        ? "text-[#d97706] scale-110"
                        : "text-slate-400 group-hover:text-[#d97706]"
                    }`}
                  />
                </div>
                <div className="text-slate-800 font-bold text-sm mt-4 mb-1">
                  {isDragging
                    ? "Drop images here!"
                    : "Drag & drop images here, ya click karke select karein"}
                </div>
                <div className="text-slate-400 text-xs font-medium">
                  JPG, PNG, WEBP — Max 5MB per image
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-[10px] text-[#d97706] font-bold">
                  <Sparkles className="w-3 h-3" /> {images.length} images
                  uploaded
                </div>

                {(uploading || (isSubmitting && uploadProgress < 100)) && (
                  <div className="mt-4 w-full max-w-xs mx-auto">
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-500 font-semibold mt-1.5 block">
                      {uploadProgress}% uploaded
                    </span>
                  </div>
                )}
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

              {isDragging && (
                <div className="absolute inset-0 rounded-2xl border-2 border-[#d97706] animate-pulse"></div>
              )}
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-[110px] h-[110px] rounded-xl overflow-hidden border border-slate-200 group/image animate-fade-in hover:scale-105 transition-transform duration-300 shadow-sm"
                  >
                    <img
                      src={img}
                      alt={`preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-slate-900/80 backdrop-blur-sm border border-white/20 rounded-full text-white flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-300 hover:bg-rose-600 hover:scale-110"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <span className="absolute bottom-1.5 left-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wide shadow-sm">
                      {idx === 0 ? "Main" : `#${idx + 1}`}
                    </span>
                    {idx === 0 && (
                      <span className="absolute top-1.5 left-1.5 w-2.5 h-2.5 bg-emerald-500 border border-white rounded-full animate-pulse shadow-sm"></span>
                    )}
                    {imageUrls[idx] && (
                      <span className="absolute bottom-1.5 right-1.5 text-[9px] text-emerald-700 bg-emerald-100 font-bold px-1.5 py-0.5 rounded border border-emerald-300">
                        ✓
                      </span>
                    )}
                  </div>
                ))}
                {images.length > 0 && (
                  <div className="flex items-center text-slate-500 text-xs ml-2 font-medium">
                    <span className="font-bold text-[#d97706]">
                      {imageUrls.length}
                    </span>
                    {" / "}
                    <span className="text-slate-400">
                      {images.length} uploaded
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-wrap gap-3 mt-8 pt-7 border-t border-slate-200">
          <button
            type="submit"
            disabled={isSubmitting || uploading || !imageUrls.length}
            className={`inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-amber-500/20 shadow-sm cursor-pointer ${
              isSubmitting || uploading || !imageUrls.length
                ? "opacity-60 cursor-not-allowed hover:scale-100"
                : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Publishing...</span>
              </>
            ) : uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Uploading Images...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 text-slate-950" />
                <span>Publish Listing</span>
                <Sparkles className="w-4 h-4 text-slate-950" />
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-bold text-sm transition-all duration-300 hover:bg-slate-200/80 hover:text-slate-900 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Clear Form
          </button>

          {/* Form Status */}
          <div className="ml-auto flex items-center gap-2 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              All fields required
            </span>
            <span className="w-px h-4 bg-slate-200"></span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#d97706]" />
              Secure upload
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
