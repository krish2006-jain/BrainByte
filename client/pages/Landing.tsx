"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { useTranslation } from "@/hooks/useTranslation";
import Navigation from "@/components/Navigation";
import { ArchitectureModal } from "@/components/ArchitectureModal";
import { SystemStatusBadge } from "@/components/SystemStatusBadge";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Zap, Shield, BookOpen } from "lucide-react";

type AuthMode = "initial" | "login" | "signup";

// ── Typing Animation Hook ─────────────────────────────────────────────────────
function useTypingAnimation(phrases: string[], typingSpeed = 60, deletingSpeed = 40, pauseMs = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1));
        } else {
          // Pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseMs);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(current.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIdx((phraseIdx + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseMs]);

  return displayText;
}

// ── Light Background ───────────────────────────────────────────────────────────
function LightBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {/* Animated gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #FAFBFF 0%, #EEF2FF 25%, #F0FDFA 50%, #FFF7ED 75%, #FAFBFF 100%)",
          backgroundSize: "400% 400%",
          animation: "gradientDrift 20s ease infinite",
        }}
      />

      {/* Soft indigo blob */}
      <div
        className="absolute rounded-full"
        style={{
          width: "500px", height: "500px",
          top: "-80px", left: "-100px",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "blobFloat 25s ease-in-out infinite",
        }}
      />
      {/* Soft teal blob */}
      <div
        className="absolute rounded-full"
        style={{
          width: "400px", height: "400px",
          top: "35%", right: "-80px",
          background: "radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "blobFloat 30s ease-in-out infinite reverse",
        }}
      />
      {/* Warm accent blob */}
      <div
        className="absolute rounded-full"
        style={{
          width: "350px", height: "350px",
          bottom: "-60px", left: "30%",
          background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "blobFloat 28s ease-in-out infinite 5s",
        }}
      />
    </div>
  );
}

// ── Input Field Component ─────────────────────────────────────────────────────
function AuthInput({
  label, type, value, onChange, placeholder, icon: Icon,
  rightElement,
}: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  icon: React.ElementType; rightElement?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
        style={{ color: "#6B6B75" }}
      >
        {label}
      </label>
      <div
        className="relative flex items-center rounded-xl transition-all duration-300"
        style={{
          background: focused ? "#FFFFFF" : "#F8FAFC",
          border: focused
            ? "1.5px solid #818CF8"
            : "1.5px solid #D6D6DE",
          boxShadow: focused
            ? "0 0 0 3px rgba(99,102,241,0.12), 0 0 16px rgba(99,102,241,0.06)"
            : "none",
        }}
      >
        <Icon
          className="absolute left-3.5 w-4 h-4"
          style={{ color: focused ? "#8B7FE8" : "#6B6B75" }}
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
            color: "#1E293B",
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
  icon, title, desc, items, accent,
}: {
  icon: string; title: string; desc: string; items: string[]; accent: string;
}) {
  return (
    <div className="p-6 rounded-2xl flex flex-col h-full bg-card border border-border/50 hover:bg-secondary hover:border-border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="text-2xl mb-4 w-12 h-12 rounded-xl flex items-center justify-center bg-background border border-border">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
        {desc}
      </p>
      <ul className="space-y-1.5">
        {items.map(item => (
          <li
            key={item}
            className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
          >
            <span className="text-primary">✓</span>
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

  // Typing animation phrases
  const typedText = useTypingAnimation([
    "Navigate Government Services",
    "Analyze Your Documents",
    "Learn Anything with AI",
    "Fill Forms Effortlessly",
  ]);

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
      icon: "🏛️", title: t("features.sarkaridost.title"), accent: "#8B7FE8",
      desc: t("features.sarkaridost.description"),
      items: ["Document Verification", "Guided Instructions", "Error Detection"],
    },
    {
      icon: "📊", title: t("features.sevasummary.title"), accent: "#0D9488",
      desc: t("features.sevasummary.description"),
      items: ["Document Upload", "AI Analysis", "Chat Interface"],
    },
    {
      icon: "📚", title: t("features.vidyarthi.title"), accent: "#D97706",
      desc: t("features.vidyarthi.description"),
      items: ["Study Materials", "AI Insights", "Quiz Generation"],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <Navigation showAuth={true} />
        </div>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">

            {/* ── Hero / Initial Screen ── */}
            {authMode === "initial" && (
              <div className="animate-slide-up">
                {/* Hero text */}
                <div className="text-center mb-16 scroll-reveal is-visible">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                    <Zap className="w-3 h-3" />
                    Digital India Services
                  </div>

                  <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-none text-foreground">
                    {t("nav.appName")}
                  </h1>

                  {/* Typing animation subtitle */}
                  <p className="text-xl sm:text-2xl font-light mb-2 max-w-2xl mx-auto text-muted-foreground">
                    {t("home.hero.title")}
                  </p>
                  <div className="text-lg sm:text-xl font-semibold mb-6 max-w-3xl mx-auto flex items-center justify-center gap-1 text-primary" style={{ minHeight: "2em" }}>
                    <span>{typedText}</span>
                    <span className="typing-cursor" />
                  </div>

                  <p className="text-sm max-w-xl mx-auto mb-10 text-muted-foreground">
                    Empowering citizens with intelligent tools for document analysis, government services, and personalized learning.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setAuthMode("signup")}
                      className="flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl text-sm transition-all duration-200 hover:opacity-90 hover:shadow-md hover:-translate-y-0.5"
                    >
                      Get Started Free <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setAuthMode("login")}
                      className="flex items-center justify-center gap-2 px-8 py-3.5 font-semibold rounded-xl text-sm transition-all duration-200 bg-secondary text-secondary-foreground hover:bg-accent border border-border hover:-translate-y-0.5"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={handleGuest}
                      className="flex items-center justify-center gap-2 px-8 py-3.5 font-semibold rounded-xl text-sm transition-all duration-200 bg-transparent text-foreground border border-border hover:bg-accent hover:-translate-y-0.5"
                    >
                      <User className="w-4 h-4" />
                      Continue as Guest
                    </button>
                  </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16 scroll-reveal is-visible delay-1">
                  {features.map(f => (
                    <FeatureCard key={f.title} {...f} />
                  ))}
                </div>

                {/* Technologies Used */}
                <div className="mb-16 scroll-reveal is-visible delay-2">
                  <h2 className="text-xl font-bold text-center text-foreground mb-8">
                    Built With Modern Technologies
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                      { name: "React", icon: "⚛️", desc: "UI Framework" },
                      { name: "Vite", icon: "⚡", desc: "Build Tool" },
                      { name: "TypeScript", icon: "🔷", desc: "Type Safety" },
                      { name: "Tailwind CSS", icon: "🎨", desc: "Styling" },
                      { name: "Node.js", icon: "🟢", desc: "Backend" },
                      { name: "Gemini AI", icon: "✨", desc: "AI Engine" },
                    ].map(tech => (
                      <div
                        key={tech.name}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/50 hover:border-border hover:shadow-md transition-all duration-300"
                      >
                        <span className="text-2xl">{tech.icon}</span>
                        <span className="text-sm font-semibold text-foreground">{tech.name}</span>
                        <span className="text-xs text-muted-foreground">{tech.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* About strip */}
                <div className="rounded-2xl p-8 text-center bg-card border border-border scroll-reveal is-visible delay-2">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">
                      About Bharat AI Portal
                    </h2>
                  </div>
                  <p className="text-sm leading-relaxed max-w-3xl mx-auto text-muted-foreground">
                    Bharat AI Portal is a comprehensive platform designed to empower Indian citizens and students.
                    Whether you need help navigating government services, analyzing documents, or learning new subjects,
                    our AI-powered tools are here to make your life easier. All tools are free to access.
                  </p>
                </div>

                {/* Footer note */}
                <p
                  className="text-center text-xs mt-8"
                  style={{ color: "#6B6B75" }}
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
                  style={{ color: "#6B6B75" }}
                >
                  ← Back to Home
                </button>

                {/* Auth Card */}
                <div
                  className="rounded-2xl p-8"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #D6D6DE",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(99,102,241,0.06)",
                  }}
                >
                  {/* Card header */}
                  <div className="text-center mb-8">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"
                      style={{
                        background: "linear-gradient(135deg, rgba(79,70,229,0.1), rgba(13,148,136,0.1))",
                        border: "1px solid rgba(79,70,229,0.2)",
                      }}
                    >
                      {authMode === "login" ? "🔐" : "✨"}
                    </div>
                    <h2
                      className="text-2xl font-black mb-1.5"
                      style={{ color: "#1E293B" }}
                    >
                      {authMode === "login" ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p
                      className="text-sm"
                      style={{ color: "#6B6B75" }}
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
                        background: "rgba(220,38,38,0.06)",
                        border: "1px solid rgba(220,38,38,0.2)",
                        color: "#DC2626",
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
                        icon={User}
                      />
                    )}

                    <AuthInput
                      label="Email Address" type="email" value={email}
                      onChange={setEmail} placeholder="your@email.com"
                      icon={Mail}
                    />

                    <AuthInput
                      label="Password" type={showPassword ? "text" : "password"} value={password}
                      onChange={setPassword} placeholder="••••••••"
                      icon={Lock}
                      rightElement={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="transition-colors duration-150"
                          style={{ color: "#6B6B75" }}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      }
                    />

                    {authMode === "signup" && (
                      <AuthInput
                        label="Confirm Password" type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword} onChange={setConfirmPassword}
                        placeholder="••••••••" icon={Lock}
                        rightElement={
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="transition-colors duration-150"
                            style={{ color: "#6B6B75" }}
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
                          ? "rgba(79,70,229,0.5)"
                          : "linear-gradient(135deg, #8B7FE8, #A99CEB)",
                        boxShadow: isLoading ? "none" : "0 4px 20px rgba(79,70,229,0.35)",
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
                    style={{ color: "#6B6B75" }}
                  >
                    {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={() => { setAuthMode(authMode === "login" ? "signup" : "login"); setError(""); }}
                      className="font-semibold transition-colors duration-150"
                      style={{ color: "#8B7FE8" }}
                    >
                      {authMode === "login" ? "Sign Up" : "Sign In"}
                    </button>
                  </p>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px" style={{ background: "#D6D6DE" }} />
                    <span className="text-xs font-medium" style={{ color: "#6B6B75" }}>or</span>
                    <div className="flex-1 h-px" style={{ background: "#D6D6DE" }} />
                  </div>

                  {/* Guest button */}
                  <button
                    onClick={() => { handleGuest(); setAuthMode("initial"); }}
                    className="w-full py-3 font-semibold rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                    style={{
                      border: "1px solid #D6D6DE",
                      color: "#6B6B75",
                      background: "transparent",
                    }}
                  >
                    <User className="w-4 h-4" />
                    Continue as Guest
                  </button>

                  <p
                    className="text-center text-xs mt-4"
                    style={{ color: "#6B6B75" }}
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
