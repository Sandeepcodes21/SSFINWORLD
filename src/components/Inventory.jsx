import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Car,
  TrendingUp,
  Sparkles,
  Grid3x3,
  List,
  ChevronDown,
  X,
  SortAsc,
  Fuel,
  Gauge,
  Trash2,
} from "lucide-react";
import CarCard from "./CarCard";

const Inventory = ({ cars, onCarClick, isAdmin, onDeleteCar }) => {
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [fuelFilter, setFuelFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleteTimer, setDeleteTimer] = useState(null);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (brandFilter) count++;
    if (fuelFilter) count++;
    if (sortBy !== "newest") count++;
    setActiveFiltersCount(count);
  }, [brandFilter, fuelFilter, sortBy]);

  const filteredCars = cars.filter((car) => {
    const matchSearch =
      !search ||
      car.title.toLowerCase().includes(search.toLowerCase()) ||
      car.brand.toLowerCase().includes(search.toLowerCase()) ||
      car.fuel.toLowerCase().includes(search.toLowerCase()) ||
      car.trans.toLowerCase().includes(search.toLowerCase());
    const matchBrand = !brandFilter || car.brand === brandFilter;
    const matchFuel = !fuelFilter || car.fuel === fuelFilter;
    return matchSearch && matchBrand && matchFuel;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.createdAt - a.createdAt;
      case "oldest":
        return a.createdAt - b.createdAt;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "km-low":
        return a.km - b.km;
      default:
        return 0;
    }
  });

  const brands = [...new Set(cars.map((c) => c.brand))].sort();
  const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid", "LPG"];

  const clearFilters = () => {
    setBrandFilter("");
    setFuelFilter("");
    setSortBy("newest");
    setSearch("");
  };

  const handleDeleteClick = (carId, e) => {
    e.stopPropagation();

    if (deleteConfirm === carId) {
      // Second click - confirm delete
      if (deleteTimer) {
        clearTimeout(deleteTimer);
        setDeleteTimer(null);
      }
      onDeleteCar(carId);
      setDeleteConfirm(null);
    } else {
      // First click - show confirm
      setDeleteConfirm(carId);
      // Auto-reset after 3 seconds
      const timer = setTimeout(() => {
        setDeleteConfirm(null);
      }, 3000);
      setDeleteTimer(timer);
    }
  };

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "km-low", label: "KM: Low to High" },
  ];

  return (
    <section
      id="inventory"
      className="py-16 md:py-24 px-6 md:px-10 relative z-1 bg-slate-50/80"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#e89c3e]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#f5b800]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="flex flex-wrap justify-between items-end gap-6 mb-12 relative">
        <div>
          <div className="inline-flex items-center gap-2.5 text-[11px] text-[#d97706] font-bold uppercase tracking-[0.25em] mb-3.5">
            <span className="w-6 h-px bg-[#d97706]"></span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Step 02 — Browse
            </span>
          </div>
          <h2 className="font-syne font-bold text-[clamp(32px,5vw,60px)] tracking-[-0.03em] leading-none text-slate-900">
            Current <span className="text-[#d97706]">Inventory</span>
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
            <Car className="w-4 h-4 text-[#d97706]" />
            <span className="font-semibold text-slate-900">
              {sortedCars.length}
            </span>
            <span className="text-xs text-slate-500">vehicles</span>
          </div>
          {isAdmin && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 border border-rose-200 rounded-full">
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span className="text-rose-700 text-[10px] font-semibold">
                Admin Mode
              </span>
            </div>
          )}
          <div className="hidden md:flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-[#e89c3e] text-slate-950 font-bold"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-[#e89c3e] text-slate-950 font-bold"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="relative mb-8">
        {/* Main Search Bar */}
        <div
          className={`flex flex-wrap gap-3 transition-all duration-300 ${
            showFilters ? "mb-4" : ""
          }`}
        >
          <div className="flex-1 min-w-[200px] relative">
            <div
              className={`relative transition-all duration-300 ${
                isSearchFocused ? "scale-[1.01]" : ""
              }`}
            >
              <Search
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                  isSearchFocused ? "text-[#d97706]" : "text-slate-400"
                }`}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search cars by name, brand, fuel type..."
                className="w-full bg-white border border-slate-200 shadow-sm rounded-xl pl-11 pr-4 py-3.5 text-slate-800 text-sm placeholder-slate-400 outline-none transition-all duration-300 focus:border-[#d97706] focus:bg-white focus:ring-2 focus:ring-[#e89c3e]/20"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-sm ${
              showFilters || activeFiltersCount > 0
                ? "bg-[#e89c3e] text-slate-950"
                : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-slate-950/10 rounded-full">
                {activeFiltersCount}
              </span>
            )}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Sort Dropdown */}
          <div className="relative min-w-[160px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3.5 pl-11 text-slate-800 text-sm outline-none transition-all duration-300 focus:border-[#d97706] appearance-none cursor-pointer hover:border-slate-300 font-medium"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <SortAsc className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {(brandFilter || fuelFilter || search) && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 text-slate-500 font-medium text-sm hover:text-rose-600 transition-colors"
            >
              <X className="w-4 h-4" /> Clear All
            </button>
          )}
        </div>

        {/* Expanded Filters */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-3 transition-all duration-300 overflow-hidden ${
            showFilters ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
          }`}
        >
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-slate-800 text-sm outline-none transition-all duration-300 focus:border-[#d97706]"
          >
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <select
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-slate-800 text-sm outline-none transition-all duration-300 focus:border-[#d97706]"
          >
            <option value="">All Fuel Types</option>
            {fuelTypes.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Active Filter Tags */}
        {(brandFilter || fuelFilter) && (
          <div className="flex flex-wrap gap-2 mt-3">
            {brandFilter && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-medium text-[#b45309]">
                Brand: {brandFilter}
                <button
                  onClick={() => setBrandFilter("")}
                  className="hover:text-slate-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {fuelFilter && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-medium text-[#b45309]">
                Fuel: {fuelFilter}
                <button
                  onClick={() => setFuelFilter("")}
                  className="hover:text-slate-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
          <span className="font-bold text-slate-900">{sortedCars.length}</span>
          {sortedCars.length === 1 ? "car found" : "cars found"}
          {search && (
            <span className="text-xs text-slate-400">for "{search}"</span>
          )}
        </div>
        {sortedCars.length > 0 && (
          <div className="text-xs text-slate-400">
            Showing {sortedCars.length} of {cars.length} listings
          </div>
        )}
      </div>

      {/* Car Grid / List */}
      {sortedCars.length === 0 ? (
        <div className="text-center py-20 text-slate-500 col-span-full bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-6xl mb-5">
            <Car className="w-20 h-20 mx-auto text-slate-300" />
          </div>
          <h3 className="font-syne text-slate-800 font-bold text-2xl mb-2">
            No cars found
          </h3>
          <p className="text-slate-500">
            Apni filters change karein ya new car listing add karein.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-[#e89c3e] text-slate-950 rounded-xl font-semibold text-sm hover:bg-[#f5b800] transition-all duration-300 shadow-sm"
          >
            <Filter className="w-4 h-4" /> Clear Filters
          </button>
        </div>
      ) : (
        <div
          className={`grid gap-7 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {sortedCars.map((car, idx) => (
            <CarCard
              key={car.id}
              car={car}
              index={idx}
              onClick={() => onCarClick(car)}
              isAdmin={isAdmin}
              viewMode={viewMode}
              onDelete={handleDeleteClick}
              deleteConfirm={deleteConfirm}
            />
          ))}
        </div>
      )}

      {/* Quick Stats Footer */}
      {sortedCars.length > 0 && (
        <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-[#d97706]" />
              {new Set(sortedCars.map((c) => c.fuel)).size} fuel types
            </span>
            <span className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-[#d97706]" />
              Avg:{" "}
              {Math.round(
                sortedCars.reduce((acc, c) => acc + c.km, 0) /
                  sortedCars.length,
              ).toLocaleString()}{" "}
              km
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>{sortedCars.length} listings available</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Inventory;
