import React, { useState, useRef, useEffect } from "react";
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
  Trash2,
  Eye,
  EyeOff,
  Award,
  TrendingUp,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  ThumbsUp,
  Heart,
  Settings,
  Zap,
  Crown,
  Medal,
  Rocket,
  Target,
  Gem,
  Compass,
  Navigation,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Camera,
  Video,
  Music,
  Mic,
  Headphones,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Tv,
  Watch,
  Speaker,
  Printer,
  Scanner,
  Copy,
  Cut,
  Paste,
  Undo,
  Redo,
  Save,
  Folder,
  File,
  Archive,
  Bookmark,
  Flag,
  HeartHandshake,
  Handshake,
  Users,
  UserCircle,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  UserCog,
  UserRound,
  UserRoundPlus,
  UserRoundMinus,
  UserRoundCheck,
  UserRoundX,
  UserRoundCog,
  User2,
  User2Plus,
  User2Minus,
  User2Check,
  User2X,
  User2Cog,
  UserSquare,
  UserSquarePlus,
  UserSquareMinus,
  UserSquareCheck,
  UserSquareX,
  UserSquareCog,
  UserIcon,
  UserIconPlus,
  UserIconMinus,
  UserIconCheck,
  UserIconX,
  UserIconCog,
  UsersRound,
  UsersRoundPlus,
  UsersRoundMinus,
  UsersRoundCheck,
  UsersRoundX,
  UsersRoundCog,
  Users2,
  Users2Plus,
  Users2Minus,
  Users2Check,
  Users2X,
  Users2Cog,
  UsersIcon,
  UsersIconPlus,
  UsersIconMinus,
  UsersIconCheck,
  UsersIconX,
  UsersIconCog
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
    location: "",
    contact: "",
    features: "",
  });

  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Validate form on change
  useEffect(() => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.brand.trim()) errors.brand = "Brand is required";
    if (!formData.year) errors.year = "Year is required";
    if (formData.year && (parseInt(formData.year) < 1990 || parseInt(formData.year) > 2026)) {
      errors.year = "Year must be between 1990-2026";
    }
    if (!formData.price) errors.price = "Price is required";
    if (formData.price && parseInt(formData.price) <= 0) {
      errors.price = "Price must be greater than 0";
    }
    if (!formData.km) errors.km = "KM is required";
    if (formData.km && parseInt(formData.km) < 0) {
      errors.km = "KM cannot be negative";
    }
    if (!imageUrls.length && !images.length) errors.images = "At least 1 image required";
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [formData, images, imageUrls]);

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

    // Validate file sizes
    const oversized = imageFiles.filter(f => f.size > 5 * 1024 * 1024);
    if (oversized.length) {
      showToast(`${oversized.length} image(s) too large (max 5MB)`, "error");
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
      setUploadProgress(0);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
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
    if (!isFormValid) {
      showToast("Please fill all required fields correctly", "error");
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
        features: formData.features ? formData.features.split(',').map(f => f.trim()) : [],
        createdAt: Date.now(),
      };
      await onAddCar(newCar);
      showToast("🚗 Car listing published successfully!", "success");
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
      location: "",
      contact: "",
      features: "",
    });
    setImages([]);
    setImageUrls([]);
    setFormErrors({});
    if (onReset) onReset();
    showToast("Form cleared", "info");
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-gradient-to-r from-white to-amber-50/50 p-6 rounded-3xl border border-amber-200/50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
            <Car className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              Add New Car Listing
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Premium</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Create a high-converting vehicle post for buyers
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-700 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" /> ADMIN PANEL
          </div>
          {isAdmin && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-600 text-[10px] font-bold">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              Active
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-sm">
        <button
          onClick={() => setActiveTab("basic")}
          className={`flex-1 min-w-[100px] px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "basic"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <Car className="w-4 h-4" /> Basic Details
          </span>
        </button>
        <button
          onClick={() => setActiveTab("images")}
          className={`flex-1 min-w-[100px] px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "images"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <ImageIcon className="w-4 h-4" /> Images
            {images.length > 0 && (
              <span className="bg-amber-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {images.length}
              </span>
            )}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 min-w-[100px] px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "preview"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" /> Preview
          </span>
        </button>
      </div>

      {/* Main Grid: Left Sidebar + Right Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Guidelines & Live Preview Card (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-amber-500/5 rounded-full blur-2xl"></div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-400">
              <Zap className="w-5 h-5" /> Pro Tips
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex items-start gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <Camera className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Clear Photos</span>
                  <p className="text-slate-400 text-xs">Daylight photos get 3x more responses</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <Target className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Accurate Title</span>
                  <p className="text-slate-400 text-xs">Include variant & year for better search</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <Gauge className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Honest KM</span>
                  <p className="text-slate-400 text-xs">True mileage builds buyer trust</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <Rocket className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Fast Selling</span>
                  <p className="text-slate-400 text-xs">Premium listings sell 2x faster</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Live Preview Mini Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Eye className="w-3.5 h-3.5" /> Live Preview
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Auto-update</span>
            </div>
            <div className="h-48 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-100 flex items-center justify-center group">
              {images[0] ? (
                <img
                  src={images[0]}
                  alt="Car"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-slate-400 flex flex-col items-center gap-2">
                  <ImageIcon className="w-12 h-12 stroke-1" />
                  <span className="text-sm font-medium">No main image</span>
                  <span className="text-xs text-slate-300">Upload photos to see preview</span>
                </div>
              )}
              {images.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" /> {images.length}
                </div>
              )}
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-base truncate">
                {formData.title || "Car Title Here"}
              </h4>
              <p className="text-amber-600 font-extrabold text-2xl">
                ₹{" "}
                {formData.price
                  ? Number(formData.price).toLocaleString("en-IN")
                  : "0"}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-700">
                  {formData.year || "YYYY"}
                </span>
                <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-700">
                  {formData.fuel || "Fuel"}
                </span>
                <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-700">
                  {formData.km ? `${Number(formData.km).toLocaleString()} KM` : "0 KM"}
                </span>
                <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-700">
                  {formData.owner || "Owner"}
                </span>
              </div>
              {formData.brand && (
                <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>{formData.brand}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-2xl font-bold text-amber-600">
                {images.length}
              </div>
              <div className="text-xs text-slate-500 font-medium">Images Uploaded</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className={`text-2xl font-bold ${isFormValid ? 'text-emerald-600' : 'text-red-500'}`}>
                {isFormValid ? '✓' : '!'}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {isFormValid ? 'Ready to Publish' : `${Object.keys(formErrors).length} errors`}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Main Form Container (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Details Tab */}
            {activeTab === "basic" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Title */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-amber-600" /> Car Title / Model *
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Hyundai Creta SX"
                      className={`w-full bg-slate-50 border ${formErrors.title ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium transition-all`}
                      required
                    />
                    {formErrors.title && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.title}
                      </p>
                    )}
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
                      className={`w-full bg-slate-50 border ${formErrors.brand ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium transition-all`}
                      required
                    />
                    {formErrors.brand && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.brand}
                      </p>
                    )}
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
                      className={`w-full bg-slate-50 border ${formErrors.year ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium transition-all`}
                      required
                    />
                    {formErrors.year && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.year}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <IndianRupee className="w-3.5 h-3.5 text-amber-600" /> Price (₹) *
                    </label>
                    <input
                      type="number"
                      id="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g. 850000"
                      className={`w-full bg-slate-50 border ${formErrors.price ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium transition-all`}
                      required
                    />
                    {formErrors.price && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.price}
                      </p>
                    )}
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
                      className={`w-full bg-slate-50 border ${formErrors.km ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium transition-all`}
                      required
                    />
                    {formErrors.km && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.km}
                      </p>
                    )}
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
                        <option value="Hybrid">Hybrid</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Ownership */}
                  <div className="flex flex-col gap-1.5">
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

                {/* Extra Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" /> Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai, Maharashtra"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-600" /> Contact Number
                    </label>
                    <input
                      type="text"
                      id="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium transition-all"
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-600" /> Key Features
                  </label>
                  <input
                    type="text"
                    id="features"
                    value={formData.features}
                    onChange={handleChange}
                    placeholder="e.g. Sunroof, Leather Seats, Reverse Camera (comma separated)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium transition-all"
                  />
                  <p className="text-[10px] text-slate-400">Separate features with commas</p>
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
                    rows={4}
                    placeholder="Vehicle condition, service history, any accessories included..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-500 focus:bg-white outline-none font-medium transition-all resize-y"
                  />
                </div>
              </div>
            )}

            {/* Images Tab */}
            {activeTab === "images" && (
              <div className="space-y-5">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-amber-600" /> Upload Images *
                    </label>
                    <span className="text-xs text-slate-400">{images.length} uploaded</span>
                  </div>

                  <div
                    ref={dropZoneRef}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                      isDragging
                        ? "border-amber-500 bg-amber-50/50 scale-[1.01]"
                        : "border-slate-200 hover:border-amber-500 hover:bg-slate-50/50"
                    }`}
                  >
                    <Upload className={`w-12 h-12 mx-auto mb-3 transition-all ${isDragging ? 'text-amber-500 scale-110' : 'text-amber-600'}`} />
                    <p className="text-sm font-semibold text-slate-700">
                      {isDragging ? "Drop images here!" : "Click or drag & drop to upload"}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      PNG, JPG, WEBP up to 5MB each
                    </p>
                    <p className="text-xs text-amber-600 mt-2 font-medium">
                      Recommended: 3-5 clear photos
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) {
                          handleFileSelect(e.target.files);
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>

                  {uploading && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Image Previews */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-2">
                      {images.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative h-24 rounded-xl overflow-hidden border-2 border-slate-200 group hover:border-amber-500 transition-all"
                        >
                          <img
                            src={img}
                            alt={`Car ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/70 backdrop-blur-sm text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          {idx === 0 && (
                            <span className="absolute bottom-1.5 left-1.5 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                              Main
                            </span>
                          )}
                          {imageUrls[idx] && (
                            <span className="absolute bottom-1.5 right-1.5 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                              ✓
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {formErrors.images && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.images}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Preview Tab */}
            {activeTab === "preview" && (
              <div className="space-y-5">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-amber-600" /> Listing Preview
                  </h3>
                  
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
                    {images[0] ? (
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={images[0]}
                          alt={formData.title || "Car"}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" /> {images.length} Photos
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 bg-slate-100 flex items-center justify-center text-slate-400">
                        <div className="text-center">
                          <ImageIcon className="w-16 h-16 mx-auto mb-2 opacity-50" />
                          <p>No images uploaded</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-slate-900">
                            {formData.title || "Car Title"}
                          </h2>
                          <p className="text-sm text-slate-500 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-amber-500" />
                            {formData.brand || "Brand"} • {formData.year || "YYYY"} • {formData.fuel || "Fuel"}
                          </p>
                        </div>
                        <p className="text-3xl font-extrabold text-amber-600">
                          ₹ {formData.price ? Number(formData.price).toLocaleString("en-IN") : "0"}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3 py-3 border-t border-b border-slate-100">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Gauge className="w-4 h-4 text-amber-500" />
                          <span>{formData.km ? Number(formData.km).toLocaleString() : "0"} KM</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <User className="w-4 h-4 text-amber-500" />
                          <span>{formData.owner || "Owner"}</span>
                        </div>
                        {formData.location && (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin className="w-4 h-4 text-amber-500" />
                            <span>{formData.location}</span>
                          </div>
                        )}
                      </div>

                      {formData.features && (
                        <div>
                          <p className="text-sm font-semibold text-slate-700 mb-2">Key Features</p>
                          <div className="flex flex-wrap gap-2">
                            {formData.features.split(',').map((feature, idx) => (
                              feature.trim() && (
                                <span key={idx} className="bg-amber-50 text-amber-700 text-xs font-medium px-3 py-1 rounded-full border border-amber-200">
                                  {feature.trim()}
                                </span>
                              )
                            ))}
                          </div>
                        </div>
                      )}

                      {formData.desc && (
                        <div>
                          <p className="text-sm font-semibold text-slate-700 mb-1">Description</p>
                          <p className="text-sm text-slate-600 leading-relaxed">{formData.desc}</p>
                        </div>
                      )}

                      {formData.contact && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="w-4 h-4 text-amber-500" />
                          <span>{formData.contact}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Validation Summary */}
            {Object.keys(formErrors).length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Please fix the following errors:
                </p>
                <ul className="mt-2 space-y-1">
                  {Object.values(formErrors).map((error, idx) => (
                    <li key={idx} className="text-xs text-red-600 flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-red-400 rounded-full" /> {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSubmitting || uploading || !isFormValid}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all cursor-pointer ${
                  isSubmitting || uploading || !isFormValid
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading Images...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Publish Listing</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all cursor-pointer"
                title="Clear all fields"
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