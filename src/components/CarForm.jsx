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
    if (yearNum < 1990 || yearNum > 2025) {
      showToast("Year 1990 se 2025 ke beech hona chahiye", "error");
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
      placeholder: "2020",
      type: "number",
      min: 1990,
      max: 2025,
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
    <div className="bg-gradient-to-br from-[#15130f] to-[#1d1a14] border border-white/10 rounded-2xl p-6 md:p-11 max-w-[1000px] relative overflow-hidden shadow-2xl">
      {/* Animated Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#e89c3e] to-transparent animate-gradient"></div>

      {/* Background Decoration */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#e89c3e]/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#f5b800]/5 rounded-full blur-3xl"></div>

      {/* Form Header */}
      <div className="flex items-center gap-3 mb-8 relative">
        <div className="w-10 h-10 bg-gradient-to-br from-[#e89c3e]/20 to-[#f5b800]/20 border border-[#e89c3e]/30 rounded-xl flex items-center justify-center">
          <Car className="w-5 h-5 text-[#e89c3e]" />
        </div>
        <div>
          <h3 className="font-syne font-bold text-xl text-[#f4ede0]">
            Add New Listing
          </h3>
          <p className="text-[#8a7f6e] text-xs">
            Fill in the details to publish your car listing
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-[#6ab04c]/10 border border-[#6ab04c]/20 rounded-full">
          <Sparkles className="w-3 h-3 text-[#6ab04c]" />
          <span className="text-[#6ab04c] text-[10px] font-medium">
            Premium Listing
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {formFields.map((field) => (
            <div key={field.id} className="flex flex-col gap-2 group">
              <label className="text-[11px] text-[#8a7f6e] font-semibold uppercase tracking-[0.1em] flex items-center gap-2">
                {field.icon && (
                  <field.icon className="w-3 h-3 text-[#e89c3e]" />
                )}
                {field.label}
                <span className="text-[#eb5757]">*</span>
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
                  className="w-full bg-[#1d1a14] border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-[#f4ede0] text-sm outline-none transition-all duration-300 focus:border-[#e89c3e] focus:bg-[#28241c] focus:shadow-[0_0_0_3px_rgba(232,156,62,0.1)] hover:border-white/20"
                  required
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                  <field.icon className="w-4 h-4 text-[#f4ede0]" />
                </div>
              </div>
            </div>
          ))}

          {/* Description - Full Width */}
          <div className="flex flex-col gap-2 md:col-span-2 group">
            <label className="text-[11px] text-[#8a7f6e] font-semibold uppercase tracking-[0.1em] flex items-center gap-2">
              <FileText className="w-3 h-3 text-[#e89c3e]" />
              Description
            </label>
            <div className="relative">
              <textarea
                id="desc"
                value={formData.desc}
                onChange={handleChange}
                placeholder="Car ki condition, features, aur khaas baatein likhein..."
                className="w-full bg-[#1d1a14] border border-white/10 rounded-xl px-4 py-3.5 text-[#f4ede0] text-sm outline-none transition-all duration-300 focus:border-[#e89c3e] focus:bg-[#28241c] focus:shadow-[0_0_0_3px_rgba(232,156,62,0.1)] min-h-[120px] resize-y hover:border-white/20"
              />
              <div className="absolute bottom-3 right-3 text-[10px] text-[#6b6356]">
                <span className="flex items-center gap-1">
                  <Info className="w-3 h-3" /> Optional
                </span>
              </div>
            </div>
          </div>

          {/* Image Upload - Full Width */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[11px] text-[#8a7f6e] font-semibold uppercase tracking-[0.1em] flex items-center gap-2">
              <ImageIcon className="w-3 h-3 text-[#e89c3e]" />
              Car Photos{" "}
              <span className="text-[#6b6356] font-normal lowercase">
                (3-4 images recommended)
              </span>
            </label>

            <div
              ref={dropzoneRef}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative border-2 border-dashed rounded-2xl p-8 md:p-11 text-center cursor-pointer transition-all duration-300 bg-[#1d1a14] group ${
                isDragging
                  ? "border-[#e89c3e] bg-[#e89c3e]/10 scale-[1.02]"
                  : "border-white/10 hover:border-[#e89c3e] hover:bg-[#e89c3e]/5 hover:scale-[1.01]"
              }`}
            >
              <div className="relative z-10">
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isDragging
                      ? "bg-[#e89c3e]/20"
                      : "bg-[#28241c] group-hover:bg-[#e89c3e]/10"
                  }`}
                >
                  <Upload
                    className={`w-8 h-8 transition-all duration-300 ${
                      isDragging
                        ? "text-[#e89c3e] scale-110"
                        : "text-[#8a7f6e] group-hover:text-[#e89c3e]"
                    }`}
                  />
                </div>
                <div className="text-[#f4ede0] font-semibold text-sm mt-4 mb-1.5">
                  {isDragging
                    ? "Drop images here!"
                    : "Drag & drop images here, ya click karke select karein"}
                </div>
                <div className="text-[#8a7f6e] text-xs">
                  JPG, PNG, WEBP — Max 5MB per image
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#e89c3e]/10 border border-[#e89c3e]/20 rounded-full text-[10px] text-[#e89c3e]">
                  <Sparkles className="w-3 h-3" /> {images.length} images
                  uploaded
                </div>
                {(uploading || (isSubmitting && uploadProgress < 100)) && (
                  <div className="mt-3 w-full max-w-xs mx-auto">
                    <div className="h-1.5 bg-[#1d1a14] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#e89c3e] to-[#f5b800] transition-all duration-300 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-[#8a7f6e] mt-1 block">
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
                <div className="absolute inset-0 rounded-2xl border-2 border-[#e89c3e] animate-pulse"></div>
              )}
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4 p-3 bg-[#1d1a14]/50 rounded-xl border border-white/5">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-[110px] h-[110px] rounded-xl overflow-hidden border border-white/10 group/image animate-fade-in hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={img}
                      alt={`preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/80 backdrop-blur-sm border border-white/10 rounded-full text-white flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-300 hover:bg-[#eb5757] hover:scale-110"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <span className="absolute bottom-1.5 left-1.5 bg-gradient-to-r from-[#e89c3e] to-[#f5b800] text-[#0c0b0a] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-[0.05em]">
                      {idx === 0 ? "Main" : `#${idx + 1}`}
                    </span>
                    {idx === 0 && (
                      <span className="absolute top-1.5 left-1.5 w-2 h-2 bg-[#6ab04c] rounded-full animate-pulse"></span>
                    )}
                    {imageUrls[idx] && (
                      <span className="absolute bottom-1.5 right-1.5 text-[8px] text-[#6ab04c] bg-black/60 px-1.5 py-0.5 rounded">
                        ✓
                      </span>
                    )}
                  </div>
                ))}
                {images.length > 0 && (
                  <div className="flex items-center text-[#8a7f6e] text-xs ml-2">
                    <span className="font-medium text-[#e89c3e]">
                      {imageUrls.length}
                    </span>
                    {" / "}
                    <span className="text-[#6b6356]">
                      {images.length} uploaded
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-wrap gap-3 mt-8 pt-7 border-t border-white/10">
          <button
            type="submit"
            disabled={isSubmitting || uploading || !imageUrls.length}
            className={`inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#e89c3e] to-[#f5b800] text-[#0c0b0a] rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#e89c3e]/40 relative overflow-hidden ${
              isSubmitting || uploading || !imageUrls.length
                ? "opacity-60 cursor-not-allowed"
                : ""
            }`}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#f5b800] to-[#e89c3e] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 relative z-10 animate-spin" />
                <span className="relative z-10">Publishing...</span>
              </>
            ) : uploading ? (
              <>
                <Loader2 className="w-4 h-4 relative z-10 animate-spin" />
                <span className="relative z-10">Uploading Images...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Publish Listing</span>
                <Sparkles className="w-4 h-4 relative z-10" />
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-transparent text-[#f4ede0] border border-white/16 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-[#1d1a14] hover:border-[#e89c3e] hover:shadow-lg hover:shadow-[#e89c3e]/10"
          >
            <RotateCcw className="w-4 h-4" /> Clear Form
          </button>

          {/* Form Status */}
          <div className="ml-auto flex items-center gap-2 text-[10px] text-[#6b6356]">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#6ab04c] rounded-full"></span>
              All fields required
            </span>
            <span className="w-px h-4 bg-white/10"></span>
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#e89c3e]" />
              Secure upload
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
