import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Globe, LogOut, User, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Language, getTranslation } from "@/lib/translations";
import { useAuth } from "@/lib/AuthContext";

export default function Navigation({ showAuth = true }: { showAuth?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const { user, isGuest, logout, guestLogin } = useAuth();
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

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            {/* Logo icon */}
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-xl transition-all duration-300 bg-primary group-hover:shadow-md" />
              <div className="relative w-full h-full rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-black text-lg leading-none">⚡</span>
              </div>
            </div>

            {/* Brand text */}
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-extrabold text-lg tracking-tight text-foreground">
                Bharat AI
              </span>
              <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
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
                  className="px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg transition-all duration-200 hover:opacity-90 hover:shadow-sm hidden sm:flex items-center gap-1.5"
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
                  className="px-4 py-2 text-sm font-semibold bg-secondary text-secondary-foreground rounded-lg transition-all duration-200 hover:bg-accent hover:text-accent-foreground hidden sm:flex items-center gap-1.5 border border-border"
                >
                  Sign Up
                </button>

                {/* Guest */}
                <button
                  onClick={() => {
                    guestLogin();
                    navigate("/");
                  }}
                  className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-accent hidden sm:flex items-center gap-1.5 border border-border text-foreground bg-transparent"
                >
                  <User className="w-3.5 h-3.5" />
                  Guest
                </button>

                {/* Mobile: combined button */}
                <button
                  onClick={() => navigate("/landing")}
                  className="sm:hidden px-3 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-lg"
                >
                  Sign In
                </button>
              </div>
            )}

            {/* User Menu — when authenticated */}
            {showAuth && user && (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200 hover:bg-accent bg-background border border-border"
                >
                  {/* Avatar circle */}
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">
                    {isGuest ? "G" : (user.name?.charAt(0).toUpperCase() || "U")}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline max-w-24 truncate text-foreground">
                    {isGuest ? "Guest" : user.name}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${showUserMenu ? "rotate-180" : "rotate-0"}`}
                  />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-44 rounded-xl overflow-hidden z-50 animate-scale-in bg-popover border border-border shadow-md">
                    <div className="px-4 py-3 border-b border-border text-xs font-medium truncate text-muted-foreground">
                      {isGuest ? "Browsing as Guest" : user.email || user.name}
                    </div>
                    <div className="p-1.5">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 text-destructive hover:bg-destructive/10"
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
                className={`p-2 rounded-lg transition-all duration-200 text-muted-foreground hover:bg-accent hover:text-accent-foreground ${showSettings ? "bg-accent" : "bg-transparent"}`}
                title="Language Settings"
              >
                <Globe className="w-4.5 h-4.5" style={{ width: "18px", height: "18px" }} />
              </button>

              {showSettings && (
                <div
                  className="absolute right-0 mt-2 w-40 rounded-xl overflow-hidden z-50 animate-scale-in"
                  style={{
                    background: "rgba(255,255,255,0.97)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid #D6D6DE",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(99,102,241,0.06)",
                  }}
                >
                  <div
                    className="px-4 py-2.5 border-b"
                    style={{ borderColor: "#D6D6DE" }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: "#6B6B75" }}
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
                            ? "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(13,148,136,0.08))"
                            : "transparent",
                          color: language === option.code ? "#8B7FE8" : "#1F1F24",
                        }}
                        onMouseEnter={e => {
                          if (language !== option.code)
                            (e.currentTarget as HTMLButtonElement).style.background = "rgba(99,102,241,0.06)";
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
