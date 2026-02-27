"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { useTheme } from "@/lib/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import Navigation from "@/components/Navigation";
import { ArchitectureModal } from "@/components/ArchitectureModal";
import { SystemStatusBadge } from "@/components/SystemStatusBadge";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Zap, Shield, BookOpen } from "lucide-react";

type AuthMode = "initial" | "login" | "signup";

// ── AI Animated Background ────────────────────────────────────────────────────
function AIBackground({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 80%, rgba(139,92,246,0.1) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 50% 50%, rgba(6,182,212,0.06) 0%, transparent 70%)"
            : "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(99,102,241,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 80%, rgba(139,92,246,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Neural grid lines — SVG based */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isDark ? 0.06 : 0.04 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke={isDark ? "#6366f1" : "#4f46e5"} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating orbs */}
      <div
        data-ai="orb1"
        className="absolute rounded-full"
        style={{
          width: "480px", height: "480px",
          top: "-80px", left: "-100px",
          background: isDark
            ? "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        data-ai="orb2"
        className="absolute rounded-full"
        style={{
          width: "400px", height: "400px",
          top: "35%", right: "-80px",
          background: isDark
            ? "radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        data-ai="orb3"
        className="absolute rounded-full"
        style={{
          width: "360px", height: "360px",
          bottom: "-60px", left: "30%",
          background: isDark
            ? "radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        data-ai="orb4"
        className="absolute rounded-full"
        style={{
          width: "300px", height: "300px",
          top: "60%", left: "10%",
          background: isDark
            ? "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Scan line */}
      <div data-ai="scan" />

      {/* Data streams */}
      <div data-ai="stream1" style={{ left: "15%", top: 0 }} />
      <div data-ai="stream2" style={{ left: "45%", top: 0 }} />
      <div data-ai="stream3" style={{ left: "75%", top: 0 }} />
      <div data-ai="stream4" style={{ left: "88%", top: 0 }} />

      {/* Neural nodes */}
      {[
        { x: "12%", y: "20%" }, { x: "85%", y: "15%" }, { x: "25%", y: "75%" },
        { x: "70%", y: "60%" }, { x: "55%", y: "30%" }, { x: "40%", y: "85%" },
      ].map((pos, i) => (
        <div
          key={i}
          data-ai={`node${i + 1}`}
          className="absolute rounded-full"
          style={{
            left: pos.x, top: pos.y,
            width: "6px", height: "6px",
            background: isDark ? "rgba(99,102,241,0.7)" : "rgba(99,102,241,0.4)",
            boxShadow: isDark ? "0 0 12px rgba(99,102,241,0.8)" : "0 0 8px rgba(99,102,241,0.4)",
          }}
        />
      ))}
    </div>
  );
}

// ── Input Field Component ─────────────────────────────────────────────────────
function AuthInput({
  label, type, value, onChange, placeholder, icon: Icon, isDark,
  rightElement,
}: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  icon: React.ElementType; isDark: boolean; rightElement?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
        style={{ color: isDark ? "rgba(148,163,184,0.8)" : "rgba(71,85,105,0.8)" }}
      >
        {label}
      </label>
      <div
        className="relative flex items-center rounded-xl transition-all duration-300"
        style={{
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
          border: focused
            ? "1.5px solid rgba(99,102,241,0.7)"
            : isDark ? "1.5px solid rgba(255,255,255,0.1)" : "1.5px solid rgba(0,0,0,0.1)",
          boxShadow: focused
            ? isDark ? "0 0 0 3px rgba(99,102,241,0.15), 0 0 20px rgba(99,102,241,0.1)" : "0 0 0 3px rgba(99,102,241,0.1)"
            : "none",
        }}
      >
        <Icon
          className="absolute left-3.5 w-4 h-4"
          style={{ color: focused ? "#6366f1" : isDark ? "rgba(148,163,184,0.5)" : "rgba(100,116,139,0.5)" }}
        />
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent pl-10 pr-4 py-3 text-sm font-medium outline-none"
          style={{
            color: isDark ? "rgba(226,232,240,0.95)" : "rgba(15,23,42,0.95)",
            paddingRight: rightElement ? "44px" : "16px",
          }}
          required
        />
        {rightElement && (
          <div className="absolute right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Feature Card ──────────────────────────────────────────────────────────────
function FeatureCard({
  icon, title, desc, items, accent, isDark,
}: {
  icon: string; title: string; desc: string; items: string[]; accent: string; isDark: boolean;
}) {
  return (
    <div
      className="group relative rounded-2xl p-7 transition-all duration-300 hover:scale-[1.02] cursor-default"
      style={{
        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
        backdropFilter: "blur(16px)",
        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
        boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.2)" : "0 4px 24px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.border = `1px solid ${accent}40`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px ${accent}22`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.border = isDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(0,0,0,0.06)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = isDark
          ? "0 4px 24px rgba(0,0,0,0.2)"
          : "0 4px 24px rgba(0,0,0,0.06)";
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
        style={{ background: `${accent}22`, border: `1px solid ${accent}40` }}
      >
        {icon}
      </div>
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: isDark ? "rgba(226,232,240,0.95)" : "rgba(15,23,42,0.95)" }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: isDark ? "rgba(148,163,184,0.8)" : "rgba(71,85,105,0.8)" }}
      >
        {desc}
      </p>
      <ul className="space-y-1.5">
        {items.map(item => (
          <li
            key={item}
            className="flex items-center gap-2 text-xs font-medium"
            style={{ color: isDark ? "rgba(148,163,184,0.7)" : "rgba(100,116,139,0.8)" }}
          >
            <span style={{ color: accent }}>✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Landing() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { login, signup, guestLogin } = useAuth();
  const t = useTranslation();
  const [authMode, setAuthMode] = useState<AuthMode>("initial");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);

  const isDark = theme === "dark";

  useEffect(() => {
    const handleShowLogin = () => setAuthMode("login");
    const handleShowSignup = () => setAuthMode("signup");
    window.addEventListener("showLogin", handleShowLogin);
    window.addEventListener("showSignup", handleShowSignup);
    return () => {
      window.removeEventListener("showLogin", handleShowLogin);
      window.removeEventListener("showSignup", handleShowSignup);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setIsLoading(true);
    try {
      await signup(name, email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuest = () => { guestLogin(); navigate("/"); };

  const features = [
    {
      icon: "🏛️", title: t("features.sarkaridost.title"), accent: "#6366f1",
      desc: t("features.sarkaridost.description"),
      items: ["Document Verification", "Guided Instructions", "Error Detection"],
    },
    {
      icon: "📊", title: t("features.sevasummary.title"), accent: "#10b981",
      desc: t("features.sevasummary.description"),
      items: ["Document Upload", "AI Analysis", "Chat Interface"],
    },
    {
      icon: "📚", title: t("features.vidyarthi.title"), accent: "#f59e0b",
      desc: t("features.vidyarthi.description"),
      items: ["Study Materials", "AI Insights", "Quiz Generation"],
    },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #050510 0%, #0a0a1a 40%, #0d0820 70%, #080814 100%)"
          : "linear-gradient(135deg, #f0f4ff 0%, #f8faff 40%, #f3f0ff 70%, #f0f8ff 100%)",
      }}
    >
      <AIBackground isDark={isDark} />

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <Navigation showAuth={true} />
          <SystemStatusBadge showDetails={true} />
        </div>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">

            {/* ── Hero / Initial Screen ── */}
            {authMode === "initial" && (
              <div className="animate-slide-up">
                {/* Hero text */}
                <div className="text-center mb-16">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest"
                    style={{
                      background: isDark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.1)",
                      border: isDark ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(99,102,241,0.2)",
                      color: isDark ? "#a5b4fc" : "#4f46e5",
                    }}
                  >
                    <Zap className="w-3 h-3" />
                    Powered by Advanced AI
                  </div>

                  <h1
                    className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-none"
                    style={{
                      background: isDark
                        ? "linear-gradient(135deg, #e2e8f0 0%, #a5b4fc 50%, #818cf8 100%)"
                        : "linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #6366f1 100%)",
                      backgroundSize: "200% 200%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "textGradient 5s ease infinite",
                    }}
                  >
                    {t("nav.appName")}
                  </h1>
                  <p
                    className="text-xl sm:text-2xl font-light mb-4 max-w-2xl mx-auto"
                    style={{ color: isDark ? "rgba(148,163,184,0.9)" : "rgba(71,85,105,0.9)" }}
                  >
                    {t("home.hero.title")}
                  </p>
                  <p
                    className="text-base sm:text-lg font-medium mb-6 max-w-3xl mx-auto"
                    style={{ color: isDark ? "rgba(99,102,241,0.8)" : "rgba(99,102,241,0.75)" }}
                  >
                    {t("home.hero.subtitle")}
                  </p>
                  <p
                    className="text-sm max-w-xl mx-auto mb-10"
                    style={{ color: isDark ? "rgba(100,116,139,0.9)" : "rgba(100,116,139,0.85)" }}
                  >
                    Empowering citizens with intelligent tools for document analysis, government services, and personalized learning.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setAuthMode("signup")}
                      className="btn-shimmer flex items-center justify-center gap-2 px-8 py-3.5 text-white font-semibold rounded-xl text-sm transition-all duration-200 hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                        boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
                      }}
                    >
                      Get Started Free <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setAuthMode("login")}
                      className="flex items-center justify-center gap-2 px-8 py-3.5 font-semibold rounded-xl text-sm transition-all duration-200 hover:scale-105 border"
                      style={{
                        borderColor: isDark ? "rgba(99,102,241,0.4)" : "rgba(99,102,241,0.35)",
                        color: isDark ? "#a5b4fc" : "#4f46e5",
                        background: isDark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.05)",
                      }}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={handleGuest}
                      className="flex items-center justify-center gap-2 px-8 py-3.5 font-semibold rounded-xl text-sm transition-all duration-200 hover:scale-105 border"
                      style={{
                        borderColor: isDark ? "rgba(148,163,184,0.25)" : "rgba(100,116,139,0.25)",
                        color: isDark ? "rgba(148,163,184,0.85)" : "rgba(71,85,105,0.85)",
                        background: "transparent",
                      }}
                    >
                      <User className="w-4 h-4" />
                      Continue as Guest
                    </button>
                  </div>

                  {/* Architecture Button */}
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setShowArchitecture(true)}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 font-medium rounded-lg text-sm transition-all duration-200 hover:scale-105 border"
                      style={{
                        borderColor: isDark ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.25)",
                        color: isDark ? "rgba(196,181,253,0.9)" : "rgba(139,92,246,0.85)",
                        background: isDark ? "rgba(139,92,246,0.08)" : "rgba(139,92,246,0.05)",
                      }}
                    >
                      🏗️ View Architecture
                    </button>
                  </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
                  {features.map(f => (
                    <FeatureCard key={f.title} {...f} isDark={isDark} />
                  ))}
                </div>

                {/* About strip */}
                <div
                  className="rounded-2xl p-8 text-center"
                  style={{
                    background: isDark ? "rgba(99,102,241,0.07)" : "rgba(99,102,241,0.05)",
                    border: isDark ? "1px solid rgba(99,102,241,0.18)" : "1px solid rgba(99,102,241,0.15)",
                  }}
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Shield className="w-5 h-5" style={{ color: isDark ? "#a5b4fc" : "#4f46e5" }} />
                    <h2
                      className="text-xl font-bold"
                      style={{ color: isDark ? "rgba(226,232,240,0.95)" : "rgba(15,23,42,0.95)" }}
                    >
                      About Bharat AI Portal
                    </h2>
                  </div>
                  <p
                    className="text-sm leading-relaxed max-w-3xl mx-auto"
                    style={{ color: isDark ? "rgba(148,163,184,0.8)" : "rgba(71,85,105,0.8)" }}
                  >
                    Bharat AI Portal is a comprehensive platform designed to empower Indian citizens and students.
                    Whether you need help navigating government services, analyzing documents, or learning new subjects,
                    our AI-powered tools are here to make your life easier. All tools are free to access.
                  </p>
                </div>

                {/* Footer note */}
                <p
                  className="text-center text-xs mt-8"
                  style={{ color: isDark ? "rgba(100,116,139,0.6)" : "rgba(148,163,184,0.8)" }}
                >
                  Created with ❤️ for empowering India with AI
                </p>
              </div>
            )}

            {/* ── Auth Forms ── */}
            {authMode !== "initial" && (
              <div className="max-w-md mx-auto animate-scale-in">
                {/* Back button */}
                <button
                  onClick={() => { setAuthMode("initial"); setError(""); }}
                  className="mb-6 flex items-center gap-1.5 text-sm font-medium transition-all duration-200 hover:gap-2.5"
                  style={{ color: isDark ? "rgba(148,163,184,0.8)" : "rgba(71,85,105,0.8)" }}
                >
                  ← Back to Home
                </button>

                {/* Auth Card */}
                <div
                  className="rounded-2xl p-8"
                  style={{
                    background: isDark ? "rgba(15,15,40,0.85)" : "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(32px)",
                    WebkitBackdropFilter: "blur(32px)",
                    border: isDark ? "1px solid rgba(99,102,241,0.2)" : "1px solid rgba(0,0,0,0.08)",
                    boxShadow: isDark
                      ? "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.05)"
                      : "0 24px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(99,102,241,0.08)",
                  }}
                >
                  {/* Card header */}
                  <div className="text-center mb-8">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"
                      style={{
                        background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
                        border: "1px solid rgba(99,102,241,0.3)",
                        boxShadow: "0 0 24px rgba(99,102,241,0.2)",
                      }}
                    >
                      {authMode === "login" ? "🔐" : "✨"}
                    </div>
                    <h2
                      className="text-2xl font-black mb-1.5"
                      style={{ color: isDark ? "rgba(226,232,240,0.98)" : "rgba(15,23,42,0.98)" }}
                    >
                      {authMode === "login" ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p
                      className="text-sm"
                      style={{ color: isDark ? "rgba(100,116,139,0.9)" : "rgba(100,116,139,0.85)" }}
                    >
                      {authMode === "login"
                        ? "Sign in to access your Bharat AI portal"
                        : "Join thousands of citizens using Bharat AI"}
                    </p>
                  </div>

                  {/* Error */}
                  {error && (
                    <div
                      className="mb-6 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in"
                      style={{
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.3)",
                        color: "#f87171",
                      }}
                    >
                      {error}
                    </div>
                  )}

                  {/* Form */}
                  <form
                    onSubmit={authMode === "login" ? handleLogin : handleSignup}
                    className="space-y-4"
                  >
                    {authMode === "signup" && (
                      <AuthInput
                        label="Full Name" type="text" value={name}
                        onChange={setName} placeholder="Your full name"
                        icon={User} isDark={isDark}
                      />
                    )}

                    <AuthInput
                      label="Email Address" type="email" value={email}
                      onChange={setEmail} placeholder="your@email.com"
                      icon={Mail} isDark={isDark}
                    />

                    <AuthInput
                      label="Password" type={showPassword ? "text" : "password"} value={password}
                      onChange={setPassword} placeholder="••••••••"
                      icon={Lock} isDark={isDark}
                      rightElement={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="transition-colors duration-150"
                          style={{ color: isDark ? "rgba(148,163,184,0.5)" : "rgba(100,116,139,0.5)" }}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      }
                    />

                    {authMode === "signup" && (
                      <AuthInput
                        label="Confirm Password" type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword} onChange={setConfirmPassword}
                        placeholder="••••••••" icon={Lock} isDark={isDark}
                        rightElement={
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="transition-colors duration-150"
                            style={{ color: isDark ? "rgba(148,163,184,0.5)" : "rgba(100,116,139,0.5)" }}
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        }
                      />
                    )}

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-shimmer w-full py-3.5 text-white font-bold rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2 flex items-center justify-center gap-2"
                      style={{
                        background: isLoading
                          ? "rgba(99,102,241,0.5)"
                          : "linear-gradient(135deg, #6366f1, #4f46e5)",
                        boxShadow: isLoading ? "none" : "0 4px 20px rgba(99,102,241,0.4)",
                      }}
                    >
                      {isLoading ? (
                        <>
                          <div
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            style={{ animation: "spin 0.8s linear infinite" }}
                          />
                          Processing...
                        </>
                      ) : authMode === "login" ? (
                        "Sign In"
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </form>

                  {/* Switch mode */}
                  <p
                    className="text-center text-sm mt-5"
                    style={{ color: isDark ? "rgba(100,116,139,0.9)" : "rgba(100,116,139,0.85)" }}
                  >
                    {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={() => { setAuthMode(authMode === "login" ? "signup" : "login"); setError(""); }}
                      className="font-semibold transition-colors duration-150"
                      style={{ color: isDark ? "#a5b4fc" : "#4f46e5" }}
                    >
                      {authMode === "login" ? "Sign Up" : "Sign In"}
                    </button>
                  </p>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-5">
                    <div
                      className="flex-1 h-px"
                      style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
                    />
                    <span
                      className="text-xs font-medium"
                      style={{ color: isDark ? "rgba(100,116,139,0.7)" : "rgba(148,163,184,0.9)" }}
                    >
                      or
                    </span>
                    <div
                      className="flex-1 h-px"
                      style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
                    />
                  </div>

                  {/* Guest button */}
                  <button
                    onClick={() => { handleGuest(); setAuthMode("initial"); }}
                    className="w-full py-3 font-semibold rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 border"
                    style={{
                      borderColor: isDark ? "rgba(148,163,184,0.2)" : "rgba(100,116,139,0.2)",
                      color: isDark ? "rgba(148,163,184,0.85)" : "rgba(71,85,105,0.85)",
                      background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                    }}
                  >
                    <User className="w-4 h-4" />
                    Continue as Guest
                  </button>

                  <p
                    className="text-center text-xs mt-4"
                    style={{ color: isDark ? "rgba(100,116,139,0.5)" : "rgba(148,163,184,0.7)" }}
                  >
                    Guest mode has limited access to features
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Architecture Modal */}
      <ArchitectureModal isOpen={showArchitecture} onClose={() => setShowArchitecture(false)} />
    </div>
  );
}
