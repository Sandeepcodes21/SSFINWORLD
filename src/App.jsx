import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AdminLoginModal from "./components/AdminLoginModal";
import SellSection from "./components/SellSection";
import CarForm from "./components/CarForm";
import Inventory from "./components/Inventory";
import CarModal from "./components/CarModal";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Toast from "./components/Toast";
import Footer from "./components/Footer";
import { useCars } from "./hooks/useCars";
import { useAuth } from "./hooks/useAuth";

function App() {
  const {
    isAdmin,
    loading: authLoading,
    login,
    register,
    logout,
    checkAuth,
  } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [toasts, setToasts] = useState([]);
  const {
    cars,
    loading: carsLoading,
    addCar,
    deleteCar,
    loadCars,
    error,
  } = useCars();

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Show error toast if car loading fails
  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error]);

  const handleLogin = async (username, password) => {
    const result = await login(username, password);
    if (result.success) {
      setShowLoginModal(false);
      showToast("✅ Admin login successful!", "success");
      await loadCars(); // Refresh car data after login
      return result;
    }
    showToast(result.error || "Login failed", "error");
    return result;
  };

  const handleRegister = async (userData) => {
    const result = await register(userData);
    if (result.success) {
      setShowLoginModal(false);
      showToast("✅ Account created successfully!", "success");
      await loadCars(); // Refresh car data after registration
      return result;
    }
    showToast(result.error || "Registration failed", "error");
    return result;
  };

  const handleLogout = () => {
    logout();
    showToast("👋 Logged out successfully", "info");
    // Clear cars on logout
    // loadCars(); // Optional: Reload cars as guest
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const showToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const openCarModal = (car) => {
    setSelectedCar(car);
  };

  const closeCarModal = () => {
    setSelectedCar(null);
  };

  const handleAddCar = async (carData) => {
    try {
      await addCar(carData);
      showToast(`"${carData.title}" listing published!`, "success");
    } catch (error) {
      showToast(error.message || "Failed to publish listing", "error");
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await deleteCar(carId);
      closeCarModal();
      showToast("Listing deleted successfully", "success");
    } catch (error) {
      showToast(error.message || "Failed to delete listing", "error");
    }
  };

  if (authLoading || carsLoading) {
    return (
      <div className="min-h-screen bg-[#0c0b0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#e89c3e] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-[#8a7f6e] mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Navbar
        isAdmin={isAdmin}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      <Hero isAdmin={isAdmin} onUploadClick={() => setShowLoginModal(true)} />

      <SellSection isAdmin={isAdmin}>
        <CarForm
          isAdmin={isAdmin}
          onAddCar={handleAddCar}
          showToast={showToast}
        />
      </SellSection>

      <Inventory
        cars={cars}
        onCarClick={openCarModal}
        isAdmin={isAdmin}
        onDeleteCar={handleDeleteCar}
      />

      <AboutSection />
      <ContactSection />

      <CarModal
        car={selectedCar}
        onClose={closeCarModal}
        isAdmin={isAdmin}
        onDelete={handleDeleteCar}
      />

      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <Toast toasts={toasts} />
      <Footer />
    </div>
  );
}

export default App;
