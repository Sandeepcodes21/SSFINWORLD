import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Shield,
  User,
  Key,
  LogIn,
  AlertCircle,
  Info,
  Loader2,
  UserPlus,
  Mail,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";

const AdminLoginModal = ({ isOpen, onClose, onLogin, onRegister }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => usernameRef.current?.focus(), 200);
      setError("");
      setSuccess("");
      setUsername("");
      setPassword("");
      setEmail("");
      setFullName("");
      setConfirmPassword("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const result = await onLogin(username, password);
      if (!result.success) {
        setError(
          result.error || "❌ Galat username ya password! Dobara try karein.",
        );
        setPassword("");
        setIsLoading(false);
        setTimeout(() => usernameRef.current?.focus(), 100);
      } else {
        setIsLoading(false);
        setUsername("");
        setPassword("");
        onClose();
      }
    } catch (err) {
      setError("❌ Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const result = await onRegister({
        username,
        password,
        email,
        fullName: fullName || username,
      });

      if (!result.success) {
        setError(result.error || "❌ Registration failed. Please try again.");
        setIsLoading(false);
      } else {
        setSuccess("✅ Account created successfully!");
        setIsLoading(false);
        setUsername("");
        setPassword("");
        setEmail("");
        setFullName("");
        setConfirmPassword("");
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      setError("❌ Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[2000] flex items-center justify-center p-5 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#15130f] border border-white/16 rounded-2xl max-w-[440px] w-full p-8 md:p-11 relative transform transition-transform duration-400"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-[#f4ede0] flex items-center justify-center transition-all duration-300 hover:bg-[#eb5757] hover:border-[#eb5757] hover:rotate-90"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-16 h-16 bg-gradient-to-br from-[#e89c3e]/15 to-[#f5b800]/10 border border-[#e89c3e]/20 rounded-xl flex items-center justify-center text-2xl text-[#e89c3e] mb-6">
          {isLoginMode ? (
            <Shield className="w-7 h-7" />
          ) : (
            <UserPlus className="w-7 h-7" />
          )}
        </div>

        <h2 className="font-syne font-bold text-2xl tracking-[-0.02em] text-[#f4ede0] mb-2">
          {isLoginMode ? "Admin Access" : "Create Admin Account"}
        </h2>
        <p className="text-[#8a7f6e] text-sm mb-8 leading-relaxed">
          {isLoginMode
            ? "Car listing form ko access karne ke liye admin credentials daalein."
            : "Naya admin account banayein aur car listings manage karein."}
        </p>

        {error && (
          <div className="flex items-center gap-2.5 bg-[#eb5757]/10 border border-[#eb5757]/25 text-[#eb5757] p-3 rounded-xl text-sm font-medium mb-4 animate-shake">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2.5 bg-[#6ab04c]/10 border border-[#6ab04c]/25 text-[#6ab04c] p-3 rounded-xl text-sm font-medium mb-4 animate-fade-in">
            <CheckCircle className="w-4 h-4 flex-shrink-0" /> {success}
          </div>
        )}

        {/* Toggle Login/Register */}
        <div className="flex bg-[#1d1a14] rounded-xl p-1 mb-6">
          <button
            onClick={() => {
              setIsLoginMode(true);
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              isLoginMode
                ? "bg-[#e89c3e] text-[#0c0b0a]"
                : "text-[#8a7f6e] hover:text-[#f4ede0]"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLoginMode(false);
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              !isLoginMode
                ? "bg-[#e89c3e] text-[#0c0b0a]"
                : "text-[#8a7f6e] hover:text-[#f4ede0]"
            }`}
          >
            Register
          </button>
        </div>

        {isLoginMode ? (
          // ====== LOGIN FORM ======
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="text-[11px] text-[#8a7f6e] font-semibold uppercase tracking-[0.1em] block mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  ref={usernameRef}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Admin username daalein"
                  className="w-full bg-[#1d1a14] border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-[#f4ede0] text-sm outline-none transition-all duration-300 focus:border-[#e89c3e] focus:bg-[#28241c] focus:shadow-[0_0_0_3px_rgba(232,156,62,0.1)]"
                  required
                  autoComplete="off"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a7f6e] w-4 h-4" />
              </div>
            </div>

            <div className="mb-5">
              <label className="text-[11px] text-[#8a7f6e] font-semibold uppercase tracking-[0.1em] block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password daalein"
                  className="w-full bg-[#1d1a14] border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-[#f4ede0] text-sm outline-none transition-all duration-300 focus:border-[#e89c3e] focus:bg-[#28241c] focus:shadow-[0_0_0_3px_rgba(232,156,62,0.1)]"
                  required
                />
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a7f6e] w-4 h-4" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a7f6e] hover:text-[#f4ede0] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#e89c3e] text-[#0c0b0a] py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 hover:bg-[#f5b800] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#e89c3e]/40 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Login Karein
                </>
              )}
            </button>
          </form>
        ) : (
          // ====== REGISTER FORM ======
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-4">
              <label className="text-[11px] text-[#8a7f6e] font-semibold uppercase tracking-[0.1em] block mb-2">
                Username *
              </label>
              <div className="relative">
                <input
                  ref={usernameRef}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="w-full bg-[#1d1a14] border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-[#f4ede0] text-sm outline-none transition-all duration-300 focus:border-[#e89c3e] focus:bg-[#28241c] focus:shadow-[0_0_0_3px_rgba(232,156,62,0.1)]"
                  required
                  minLength={3}
                  autoComplete="off"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a7f6e] w-4 h-4" />
              </div>
              <p className="text-[10px] text-[#6b6356] mt-1">
                Minimum 3 characters
              </p>
            </div>

            <div className="mb-4">
              <label className="text-[11px] text-[#8a7f6e] font-semibold uppercase tracking-[0.1em] block mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-[#1d1a14] border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-[#f4ede0] text-sm outline-none transition-all duration-300 focus:border-[#e89c3e] focus:bg-[#28241c] focus:shadow-[0_0_0_3px_rgba(232,156,62,0.1)]"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a7f6e] w-4 h-4" />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-[11px] text-[#8a7f6e] font-semibold uppercase tracking-[0.1em] block mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-[#1d1a14] border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-[#f4ede0] text-sm outline-none transition-all duration-300 focus:border-[#e89c3e] focus:bg-[#28241c] focus:shadow-[0_0_0_3px_rgba(232,156,62,0.1)]"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a7f6e] w-4 h-4" />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-[11px] text-[#8a7f6e] font-semibold uppercase tracking-[0.1em] block mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Choose a password"
                  className="w-full bg-[#1d1a14] border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-[#f4ede0] text-sm outline-none transition-all duration-300 focus:border-[#e89c3e] focus:bg-[#28241c] focus:shadow-[0_0_0_3px_rgba(232,156,62,0.1)]"
                  required
                  minLength={6}
                />
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a7f6e] w-4 h-4" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a7f6e] hover:text-[#f4ede0] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[10px] text-[#6b6356] mt-1">
                Minimum 6 characters
              </p>
            </div>

            <div className="mb-5">
              <label className="text-[11px] text-[#8a7f6e] font-semibold uppercase tracking-[0.1em] block mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full bg-[#1d1a14] border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-[#f4ede0] text-sm outline-none transition-all duration-300 focus:border-[#e89c3e] focus:bg-[#28241c] focus:shadow-[0_0_0_3px_rgba(232,156,62,0.1)]"
                  required
                />
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a7f6e] w-4 h-4" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#e89c3e] text-[#0c0b0a] py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 hover:bg-[#f5b800] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#e89c3e]/40 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" /> Create Account
                </>
              )}
            </button>
          </form>
        )}

        <div className="text-center mt-5 text-xs text-[#6b6356]">
          <Info className="inline w-3.5 h-3.5 mr-1.5" />
          {isLoginMode
            ? "Don't have an account? Click Register above"
            : "Already have an account? Click Login above"}
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;
