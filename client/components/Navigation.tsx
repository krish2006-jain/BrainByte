import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Globe, LogOut, Sun, Moon, User, ChevronDown, Settings } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Language, getTranslation } from "@/lib/translations";
import { useAuth } from "@/lib/AuthContext";
import { useTheme } from "@/lib/ThemeContext";

export default function Navigation({ showAuth = true }: { showAuth?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const { user, isGuest, logout, guestLogin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const languageOptions: { code: Language; label: string }[] = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "ta", label: "தமிழ்" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/landing");
    setShowSettings(false);
    setShowUserMenu(false);
  };

  const isDark = theme === "dark";

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: isDark
          ? "rgba(10, 10, 30, 0.8)"
          : "rgba(255, 255, 255, 0.82)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: isDark
          ? "1px solid rgba(99, 102, 241, 0.18)"
          : "1px solid rgba(99, 102, 241, 0.15)",
        boxShadow: isDark
          ? "0 4px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(99,102,241,0.12)"
          : "0 4px 24px rgba(0,0,0,0.06), 0 1px 0 rgba(99,102,241,0.1)",
      }}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            {/* Animated logo icon */}
            <div className="relative w-9 h-9">
              <div
                className="absolute inset-0 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
                  boxShadow: "0 0 16px rgba(99,102,241,0.5)",
                  animation: "aiGlow 3s ease-in-out infinite",
                }}
              />
              <div className="relative w-full h-full rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg leading-none">⚡</span>
              </div>
            </div>

            {/* Brand text */}
            <div className="hidden sm:flex flex-col leading-none">
              <span
                className="font-black text-lg tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "textGradient 4s ease infinite",
                }}
              >
                Bharat AI
              </span>
              <span
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: isDark ? "rgba(148,163,184,0.8)" : "rgba(71,85,105,0.8)" }}
              >
                Portal
              </span>
            </div>
          </Link>

          {/* ── Right Side ── */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Auth Buttons — not logged in */}
            {showAuth && !user && (
              <div className="flex items-center gap-2">
                {/* Login */}
                <button
                  onClick={() => {
                    if (window.location.pathname === "/landing") {
                      window.dispatchEvent(new CustomEvent("showLogin"));
                    } else {
                      navigate("/landing");
                    }
                  }}
                  className="btn-shimmer relative px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hidden sm:flex items-center gap-1.5"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                    boxShadow: "0 2px 12px rgba(99,102,241,0.35)",
                  }}
                >
                  Login
                </button>

                {/* Sign Up */}
                <button
                  onClick={() => {
                    if (window.location.pathname === "/landing") {
                      window.dispatchEvent(new CustomEvent("showSignup"));
                    } else {
                      navigate("/landing");
                    }
                  }}
                  className="btn-shimmer relative px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hidden sm:flex items-center gap-1.5"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    boxShadow: "0 2px 12px rgba(16,185,129,0.35)",
                  }}
                >
                  Sign Up
                </button>

                {/* Guest */}
                <button
                  onClick={() => {
                    guestLogin();
                    navigate("/");
                  }}
                  className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 hover:scale-105 border hidden sm:flex items-center gap-1.5"
                  style={{
                    borderColor: isDark ? "rgba(148,163,184,0.3)" : "rgba(100,116,139,0.35)",
                    color: isDark ? "rgba(203,213,225,0.9)" : "rgba(51,65,85,0.9)",
                    background: "transparent",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = isDark
                      ? "rgba(148,163,184,0.1)"
                      : "rgba(100,116,139,0.08)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}
                >
                  <User className="w-3.5 h-3.5" />
                  Guest
                </button>

                {/* Mobile: combined button */}
                <button
                  onClick={() => navigate("/landing")}
                  className="sm:hidden btn-shimmer px-3 py-2 text-xs font-semibold text-white rounded-lg"
                  style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
                >
                  Sign In
                </button>
              </div>
            )}

            {/* Theme Toggle — pill switch */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center rounded-full p-1 transition-all duration-300"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              style={{
                width: "52px",
                height: "28px",
                background: isDark
                  ? "linear-gradient(135deg, #1e1b4b, #312e81)"
                  : "linear-gradient(135deg, #e0f2fe, #bae6fd)",
                border: isDark
                  ? "1px solid rgba(99,102,241,0.4)"
                  : "1px solid rgba(56,189,248,0.5)",
                boxShadow: isDark
                  ? "inset 0 1px 4px rgba(0,0,0,0.4)"
                  : "inset 0 1px 4px rgba(0,0,0,0.1)",
              }}
            >
              <span
                className="absolute flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300"
                style={{
                  left: isDark ? "calc(100% - 22px)" : "3px",
                  background: isDark
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  boxShadow: isDark
                    ? "0 0 8px rgba(99,102,241,0.6)"
                    : "0 0 8px rgba(251,191,36,0.6)",
                }}
              >
                {isDark
                  ? <Moon className="w-3 h-3 text-white" />
                  : <Sun className="w-3 h-3 text-white" />
                }
              </span>
            </button>

            {/* User Menu — when authenticated */}
            {showAuth && user && (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200 hover:scale-105"
                  style={{
                    background: isDark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.08)",
                    border: isDark ? "1px solid rgba(99,102,241,0.25)" : "1px solid rgba(99,102,241,0.2)",
                  }}
                >
                  {/* Avatar circle */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                  >
                    {isGuest ? "G" : (user.name?.charAt(0).toUpperCase() || "U")}
                  </div>
                  <span
                    className="text-sm font-medium hidden sm:inline max-w-24 truncate"
                    style={{ color: isDark ? "rgba(203,213,225,0.9)" : "rgba(30,41,59,0.9)" }}
                  >
                    {isGuest ? "Guest" : user.name}
                  </span>
                  <ChevronDown
                    className="w-3.5 h-3.5 transition-transform duration-200"
                    style={{
                      color: isDark ? "rgba(148,163,184,0.7)" : "rgba(100,116,139,0.7)",
                      transform: showUserMenu ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                {showUserMenu && (
                  <div
                    className="absolute right-0 mt-2 w-44 rounded-xl overflow-hidden z-50 animate-scale-in"
                    style={{
                      background: isDark ? "rgba(15,15,40,0.95)" : "rgba(255,255,255,0.97)",
                      backdropFilter: "blur(20px)",
                      border: isDark ? "1px solid rgba(99,102,241,0.2)" : "1px solid rgba(0,0,0,0.08)",
                      boxShadow: isDark
                        ? "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)"
                        : "0 8px 32px rgba(0,0,0,0.12)",
                    }}
                  >
                    <div
                      className="px-4 py-3 border-b text-xs font-medium truncate"
                      style={{
                        borderColor: isDark ? "rgba(99,102,241,0.15)" : "rgba(0,0,0,0.06)",
                        color: isDark ? "rgba(148,163,184,0.8)" : "rgba(100,116,139,0.8)",
                      }}
                    >
                      {isGuest ? "Browsing as Guest" : user.email || user.name}
                    </div>
                    <div className="p-1.5">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                        style={{ color: "#ef4444" }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = isDark ? "rgba(239,68,68,0.1)" : "rgba(239,68,68,0.06)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        }}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Settings (Language) Dropdown */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg transition-all duration-200"
                title="Language Settings"
                style={{
                  color: isDark ? "rgba(148,163,184,0.8)" : "rgba(71,85,105,0.8)",
                  background: showSettings
                    ? (isDark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.08)")
                    : "transparent",
                }}
                onMouseEnter={e => {
                  if (!showSettings)
                    (e.currentTarget as HTMLButtonElement).style.background = isDark
                      ? "rgba(99,102,241,0.1)"
                      : "rgba(99,102,241,0.06)";
                }}
                onMouseLeave={e => {
                  if (!showSettings)
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                <Globe className="w-4.5 h-4.5" style={{ width: "18px", height: "18px" }} />
              </button>

              {showSettings && (
                <div
                  className="absolute right-0 mt-2 w-40 rounded-xl overflow-hidden z-50 animate-scale-in"
                  style={{
                    background: isDark ? "rgba(15,15,40,0.95)" : "rgba(255,255,255,0.97)",
                    backdropFilter: "blur(20px)",
                    border: isDark ? "1px solid rgba(99,102,241,0.2)" : "1px solid rgba(0,0,0,0.08)",
                    boxShadow: isDark
                      ? "0 8px 32px rgba(0,0,0,0.5)"
                      : "0 8px 32px rgba(0,0,0,0.12)",
                  }}
                >
                  <div
                    className="px-4 py-2.5 border-b"
                    style={{
                      borderColor: isDark ? "rgba(99,102,241,0.15)" : "rgba(0,0,0,0.06)",
                    }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: isDark ? "rgba(148,163,184,0.7)" : "rgba(100,116,139,0.7)" }}
                    >
                      Language
                    </p>
                  </div>
                  <div className="p-1.5 space-y-0.5">
                    {languageOptions.map((option) => (
                      <button
                        key={option.code}
                        onClick={() => { setLanguage(option.code); setShowSettings(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                        style={{
                          background: language === option.code
                            ? "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))"
                            : "transparent",
                          color: language === option.code
                            ? (isDark ? "#a5b4fc" : "#4f46e5")
                            : (isDark ? "rgba(203,213,225,0.85)" : "rgba(30,41,59,0.85)"),
                        }}
                        onMouseEnter={e => {
                          if (language !== option.code)
                            (e.currentTarget as HTMLButtonElement).style.background = isDark
                              ? "rgba(99,102,241,0.1)"
                              : "rgba(99,102,241,0.06)";
                        }}
                        onMouseLeave={e => {
                          if (language !== option.code)
                            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}
