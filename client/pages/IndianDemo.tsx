import "./IndianDemo.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "@/lib/ThemeContext";
import Navigation from "@/components/Navigation";
import {
    FileText,
    Stethoscope,
    BookOpen,
    ArrowRight,
    Sparkles,
    Users,
    Globe,
    ShieldCheck,
    ChevronDown,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════ */
/*  SCROLL-REVEAL HOOK — IntersectionObserver-powered                    */
/* ═══════════════════════════════════════════════════════════════════════ */
function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = ref.current;
        if (!root) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        // Observe all scroll-reveal elements inside this container
        const targets = root.querySelectorAll(
            ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-scale"
        );
        targets.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return ref;
}

/* ─── Mandala SVG ──────────────────────────────────────────────────────── */
function MandalaSVG({ size, className }: { size: number; className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="mandalaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4A017" />
                    <stop offset="100%" stopColor="#FF6B00" />
                </linearGradient>
            </defs>
            <g fill="none" stroke="url(#mandalaGrad)" strokeWidth="0.5" opacity="0.6">
                {[...Array(12)].map((_, i) => (
                    <g key={i} transform={`rotate(${i * 30} 100 100)`}>
                        <ellipse cx="100" cy="50" rx="18" ry="35" />
                        <circle cx="100" cy="30" r="3" fill="url(#mandalaGrad)" opacity="0.4" />
                    </g>
                ))}
                <circle cx="100" cy="100" r="80" />
                <circle cx="100" cy="100" r="60" />
                <circle cx="100" cy="100" r="40" />
                <circle cx="100" cy="100" r="20" />
                <circle cx="100" cy="100" r="6" fill="url(#mandalaGrad)" opacity="0.5" />
                {[...Array(8)].map((_, i) => (
                    <g key={`p${i}`} transform={`rotate(${i * 45} 100 100)`}>
                        <path d="M100 20 Q115 60 100 80 Q85 60 100 20Z" opacity="0.3" fill="url(#mandalaGrad)" />
                    </g>
                ))}
            </g>
        </svg>
    );
}

/* ─── Lotus SVG ────────────────────────────────────────────────────────── */
function LotusSVG({ size = 48, className }: { size?: number; className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="lotusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4A017" />
                    <stop offset="50%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#FF9933" />
                </linearGradient>
            </defs>
            <path d="M32 8 Q38 24 32 38 Q26 24 32 8Z" fill="url(#lotusGrad)" opacity="0.9" />
            <path d="M32 38 Q20 22 10 30 Q20 34 32 38Z" fill="url(#lotusGrad)" opacity="0.7" />
            <path d="M32 38 Q44 22 54 30 Q44 34 32 38Z" fill="url(#lotusGrad)" opacity="0.7" />
            <path d="M32 38 Q14 28 6 38 Q16 40 32 42Z" fill="url(#lotusGrad)" opacity="0.5" />
            <path d="M32 38 Q50 28 58 38 Q48 40 32 42Z" fill="url(#lotusGrad)" opacity="0.5" />
            <ellipse cx="32" cy="46" rx="18" ry="5" fill="url(#lotusGrad)" opacity="0.3" />
        </svg>
    );
}

/* ─── Temple Arch SVG Decoration ───────────────────────────────────────── */
function TempleArch({ isDark }: { isDark: boolean }) {
    const color = isDark ? "rgba(212,160,23,0.1)" : "rgba(212,160,23,0.15)";
    return (
        <svg className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" width="600" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.6 }}>
            <path d="M0 200 Q300 -40 600 200" fill="none" stroke={color} strokeWidth="2" />
            <path d="M40 200 Q300 0 560 200" fill="none" stroke={color} strokeWidth="1.5" />
            <path d="M80 200 Q300 30 520 200" fill="none" stroke={color} strokeWidth="1" />
        </svg>
    );
}

/* ─── Sacred Heartbeat Pulse ───────────────────────────────────────────── */
function HeartbeatPulse({ isDark }: { isDark: boolean }) {
    const strokeColor = isDark ? "#D4A017" : "#B8860B";
    const glowColor = isDark ? "rgba(212,160,23,0.4)" : "rgba(212,160,23,0.3)";
    return (
        <div className="flex items-center justify-center py-8 sm:py-12">
            <svg width="320" height="50" viewBox="0 0 320 50" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
                <defs>
                    <linearGradient id="heartbeatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="20%" stopColor={strokeColor} stopOpacity="0.3" />
                        <stop offset="50%" stopColor={strokeColor} />
                        <stop offset="80%" stopColor={strokeColor} stopOpacity="0.3" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <filter id="heartGlow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {/* Baseline */}
                <line x1="0" y1="25" x2="320" y2="25" stroke={strokeColor} strokeWidth="0.5" opacity="0.15" />
                {/* Heartbeat wave — drawn as a static path that pulses */}
                <g filter="url(#heartGlow)">
                    <path
                        d="M0,25 L80,25 L95,25 L105,8 L115,42 L125,15 L135,35 L145,25 L160,25 L175,25 L185,12 L195,38 L205,18 L215,32 L225,25 L240,25 L320,25"
                        fill="none"
                        stroke="url(#heartbeatGrad)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="sacred-heartbeat"
                    />
                </g>
                {/* Center dot that pulses */}
                <circle cx="160" cy="25" r="3" fill={strokeColor} className="sacred-heartbeat" opacity="0.7" />
                {/* Side lotus dots */}
                <circle cx="60" cy="25" r="2" fill={strokeColor} opacity="0.2" />
                <circle cx="260" cy="25" r="2" fill={strokeColor} opacity="0.2" />
            </svg>
        </div>
    );
}

/* ─── Ornamental Divider Component ─────────────────────────────────────── */
function OrnamentDivider() {
    return (
        <div className="ornament-divider">
            <div className="ornament-divider__line" />
            <div className="ornament-divider__diamond" />
            <LotusSVG size={24} className="lotus-pulse" />
            <div className="ornament-divider__diamond" />
            <div className="ornament-divider__line" />
        </div>
    );
}

/* ─── Diya (Oil Lamp) ──────────────────────────────────────────────────── */
function Diya({ style }: { style?: React.CSSProperties }) {
    return (
        <div className="float-particle diya-glow" style={{ width: 6, height: 6, ...style }} />
    );
}

/* ─── Background ───────────────────────────────────────────────────────── */
function IndianBackground({ isDark }: { isDark: boolean }) {
    return (
        <div className="indian-bg" aria-hidden>
            <div className={`absolute inset-0 ${isDark ? "indian-bg__gradient-dark" : "indian-bg__gradient-light"}`} />
            <div className={`absolute inset-0 ${isDark ? "dot-pattern" : "dot-pattern-light"}`} />

            {/* Mandala decorations */}
            <div className="mandala-ring" style={{ top: "-15%", right: "-10%", width: 700, height: 700 }}>
                <MandalaSVG size={700} />
            </div>
            <div className="mandala-ring mandala-ring--reverse" style={{ bottom: "-20%", left: "-12%", width: 550, height: 550 }}>
                <MandalaSVG size={550} />
            </div>

            {/* Floating diyas */}
            {[
                { top: "15%", left: "8%", delay: "0s" },
                { top: "25%", right: "12%", delay: "2s" },
                { top: "60%", left: "5%", delay: "4s" },
                { top: "70%", right: "8%", delay: "1s" },
                { top: "45%", left: "80%", delay: "3s" },
                { top: "85%", left: "20%", delay: "5s" },
            ].map((pos, i) => (
                <Diya key={i} style={{ ...pos, animationDelay: pos.delay } as React.CSSProperties} />
            ))}

            {/* Warm ambient orbs */}
            <div
                className="absolute rounded-full"
                style={{
                    width: 500, height: 500, top: "10%", left: "15%",
                    background: isDark
                        ? "radial-gradient(circle, rgba(212,160,23,0.06) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(212,160,23,0.08) 0%, transparent 70%)",
                    filter: "blur(80px)",
                    animation: "floatParticle 20s ease-in-out infinite",
                }}
            />
            <div
                className="absolute rounded-full"
                style={{
                    width: 400, height: 400, bottom: "5%", right: "10%",
                    background: isDark
                        ? "radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 70%)",
                    filter: "blur(70px)",
                    animation: "floatParticle 25s ease-in-out infinite 3s",
                }}
            />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/* MAIN DEMO PAGE                                                       */
/* ═══════════════════════════════════════════════════════════════════════ */

export default function IndianDemo() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const containerRef = useScrollReveal();

    /* ─── Feature data ─────────────────────────────────────────────── */
    const features = [
        {
            id: "sarkari-dost",
            title: "Sarkari Dost",
            subtitle: "सरकारी दोस्त",
            description: "Navigate government schemes and benefits with AI-powered guidance. Simplifying bureaucracy for every citizen of India.",
            icon: FileText,
            accent: "#6366f1",
            gradient: "linear-gradient(135deg, #6366f1, #4f46e5)",
            glowColor: "rgba(99,102,241,0.25)",
            path: "/sarkari-dost",
            tag: "Government AI",
        },
        {
            id: "seva-summary",
            title: "Seva Summary",
            subtitle: "सेवा सारांश",
            description: "Transform complex medical reports into clear, actionable summaries in your language. Healthcare made accessible.",
            icon: Stethoscope,
            accent: "#10b981",
            gradient: "linear-gradient(135deg, #10b981, #059669)",
            glowColor: "rgba(16,185,129,0.25)",
            path: "/seva-summary",
            tag: "Health AI",
        },
        {
            id: "vidyarthi-ai",
            title: "Vidyarthi AI",
            subtitle: "विद्यार्थी AI",
            description: "Personalized learning companion for every student. Study smarter with AI that adapts to your pace and style.",
            icon: BookOpen,
            accent: "#f59e0b",
            gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
            glowColor: "rgba(245,158,11,0.25)",
            path: "/vidyarthi-ai",
            tag: "Education AI",
        },
    ];

    const stats = [
        { value: "1.4B+", label: "Citizens Served", icon: Users },
        { value: "22+", label: "Languages", icon: Globe },
        { value: "100%", label: "Secure & Private", icon: ShieldCheck },
    ];

    return (
        <div className="min-h-screen flex flex-col relative" ref={containerRef}>
            <IndianBackground isDark={isDark} />

            {/* ── Content ─────────────────────────────────────────────────── */}
            <div className="relative z-10 flex flex-col min-h-screen" style={{ scrollBehavior: "smooth" }}>
                <Navigation />

                <main className="flex-1">

                    {/* ═══ HERO SECTION ═══════════════════════════════════════ */}
                    <section className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 lg:pt-20 pb-6 sm:pb-10">
                        <div className="max-w-5xl mx-auto w-full text-center relative">

                            {/* Temple arch decoration */}
                            <TempleArch isDark={isDark} />

                            {/* Lotus badge */}
                            <div className="flex justify-center mb-6 reveal-up">
                                <div
                                    className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em]"
                                    style={{
                                        background: isDark ? "rgba(212,160,23,0.1)" : "rgba(212,160,23,0.08)",
                                        border: `1px solid ${isDark ? "rgba(212,160,23,0.25)" : "rgba(212,160,23,0.3)"}`,
                                        color: isDark ? "#F5D060" : "#B8860B",
                                    }}
                                >
                                    <LotusSVG size={18} className="lotus-pulse" />
                                    <span>Bharat AI Portal</span>
                                    <Sparkles className="w-3.5 h-3.5" style={{ color: isDark ? "#F5D060" : "#D4A017" }} />
                                </div>
                            </div>

                            {/* Main heading */}
                            <h1
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-5 leading-[1.1] reveal-up"
                                style={{ animationDelay: "0.1s" }}
                            >
                                <span className="gold-text">AI for Every</span>
                                <br />
                                <span style={{ color: isDark ? "rgba(255,253,245,0.92)" : "rgba(26,10,46,0.92)" }}>
                                    Citizen of{" "}
                                </span>
                                <span className="saffron-text">Bharat</span>
                            </h1>

                            {/* Subtitle */}
                            <p
                                className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light leading-relaxed reveal-up"
                                style={{
                                    color: isDark ? "rgba(255,253,245,0.55)" : "rgba(26,10,46,0.6)",
                                    animationDelay: "0.2s",
                                }}
                            >
                                Bridging the digital divide with AI-powered tools — from government services to healthcare to education.
                                Built with the spirit of{" "}
                                <span style={{ color: isDark ? "#F5D060" : "#D4A017", fontWeight: 500 }}>Seva</span> (selfless service).
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 reveal-up" style={{ animationDelay: "0.3s" }}>
                                <Link
                                    to="/landing"
                                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-white transition-all duration-300 hover:scale-[1.03] btn-shimmer"
                                    style={{
                                        background: "linear-gradient(135deg, #D4A017, #FF6B00)",
                                        boxShadow: "0 4px 24px rgba(212,160,23,0.3), 0 1px 3px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    Get Started
                                    <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                                <a
                                    href="#features"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-[1.02]"
                                    style={{
                                        background: isDark ? "rgba(212,160,23,0.08)" : "rgba(212,160,23,0.06)",
                                        border: `1px solid ${isDark ? "rgba(212,160,23,0.2)" : "rgba(212,160,23,0.25)"}`,
                                        color: isDark ? "#F5D060" : "#B8860B",
                                    }}
                                >
                                    Explore Features
                                    <ChevronDown className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* ═══ HEARTBEAT SECTION — sacred pulse transition ═══════ */}
                    <section className="scroll-reveal">
                        <HeartbeatPulse isDark={isDark} />
                    </section>

                    {/* ═══ STATS ROW ══════════════════════════════════════════ */}
                    <section className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
                            {stats.map((stat, i) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={i}
                                        className={`scroll-reveal delay-${i + 1} flex flex-col items-center gap-2 py-6 px-4 rounded-2xl transition-all duration-300 hover:scale-[1.03]`}
                                        style={{
                                            background: isDark ? "rgba(212,160,23,0.05)" : "rgba(212,160,23,0.04)",
                                            border: `1px solid ${isDark ? "rgba(212,160,23,0.1)" : "rgba(212,160,23,0.12)"}`,
                                        }}
                                    >
                                        <Icon className="w-5 h-5" style={{ color: isDark ? "#F5D060" : "#D4A017" }} />
                                        <span className="text-2xl sm:text-3xl font-black gold-text stat-value">{stat.value}</span>
                                        <span
                                            className="text-xs font-medium uppercase tracking-wider"
                                            style={{ color: isDark ? "rgba(255,253,245,0.45)" : "rgba(26,10,46,0.5)" }}
                                        >
                                            {stat.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* ═══ FEATURES SECTION ═══════════════════════════════════ */}
                    <section id="features" className="regal-section px-4 sm:px-6 lg:px-8 temple-columns">
                        <div className="max-w-6xl mx-auto">

                            {/* Section header */}
                            <div className="text-center mb-12 sm:mb-16 scroll-reveal">
                                <h2
                                    className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
                                    style={{ color: isDark ? "rgba(255,253,245,0.9)" : "rgba(26,10,46,0.9)" }}
                                >
                                    Our <span className="gold-text">Seva</span> to You
                                </h2>
                                <p
                                    className="text-base sm:text-lg max-w-xl mx-auto"
                                    style={{ color: isDark ? "rgba(255,253,245,0.45)" : "rgba(26,10,46,0.55)" }}
                                >
                                    Three powerful AI tools designed for the people of India
                                </p>
                                <div className="mt-6">
                                    <OrnamentDivider />
                                </div>
                            </div>

                            {/* Feature cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                                {features.map((feature, idx) => {
                                    const Icon = feature.icon;
                                    return (
                                        <Link key={feature.id} to={feature.path} className={`group block scroll-reveal delay-${idx + 1}`}>
                                            <div
                                                className="indian-card rangoli-border h-full rounded-2xl p-6 sm:p-8 flex flex-col relative overflow-hidden"
                                                style={{
                                                    background: isDark ? "rgba(26,10,46,0.55)" : "rgba(255,253,245,0.7)",
                                                    backdropFilter: "blur(24px)",
                                                    border: isDark ? "1px solid rgba(212,160,23,0.1)" : "1px solid rgba(212,160,23,0.15)",
                                                    boxShadow: isDark
                                                        ? "0 4px 32px rgba(0,0,0,0.3)"
                                                        : "0 4px 32px rgba(212,160,23,0.08)",
                                                }}
                                                onMouseEnter={e => {
                                                    const el = e.currentTarget;
                                                    el.style.border = `1px solid ${feature.accent}50`;
                                                    el.style.boxShadow = `0 12px 48px ${feature.glowColor}, 0 4px 24px rgba(0,0,0,0.15)`;
                                                }}
                                                onMouseLeave={e => {
                                                    const el = e.currentTarget;
                                                    el.style.border = isDark ? "1px solid rgba(212,160,23,0.1)" : "1px solid rgba(212,160,23,0.15)";
                                                    el.style.boxShadow = isDark ? "0 4px 32px rgba(0,0,0,0.3)" : "0 4px 32px rgba(212,160,23,0.08)";
                                                }}
                                            >
                                                {/* Accent bar at top */}
                                                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: feature.gradient }} />

                                                {/* Tag */}
                                                <span
                                                    className="inline-block self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-5"
                                                    style={{
                                                        background: `${feature.accent}15`,
                                                        color: feature.accent,
                                                        border: `1px solid ${feature.accent}25`,
                                                    }}
                                                >
                                                    {feature.tag}
                                                </span>

                                                {/* Icon */}
                                                <div
                                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 flex-shrink-0 transition-all duration-300 group-hover:scale-110 feature-icon-ring"
                                                    style={{
                                                        background: feature.gradient,
                                                        boxShadow: `0 6px 24px ${feature.glowColor}`,
                                                    }}
                                                >
                                                    <Icon className="w-8 h-8 text-white" />
                                                </div>

                                                {/* Content */}
                                                <h3
                                                    className="text-xl sm:text-2xl font-bold mb-1 text-left"
                                                    style={{ color: isDark ? "rgba(255,253,245,0.92)" : "rgba(26,10,46,0.92)" }}
                                                >
                                                    {feature.title}
                                                </h3>
                                                <p className="text-sm font-semibold mb-3 text-left" style={{ color: feature.accent }}>
                                                    {feature.subtitle}
                                                </p>
                                                <p
                                                    className="text-sm text-left mb-6 flex-1 leading-relaxed"
                                                    style={{ color: isDark ? "rgba(255,253,245,0.5)" : "rgba(26,10,46,0.6)" }}
                                                >
                                                    {feature.description}
                                                </p>

                                                {/* CTA */}
                                                <div
                                                    className="w-full py-3 px-5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all duration-300 group-hover:gap-3 btn-shimmer"
                                                    style={{
                                                        background: feature.gradient,
                                                        boxShadow: `0 3px 16px ${feature.glowColor}`,
                                                    }}
                                                >
                                                    Explore Tool
                                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* ═══ HEARTBEAT TRANSITION ══════════════════════════════ */}
                    <section className="scroll-reveal">
                        <HeartbeatPulse isDark={isDark} />
                    </section>

                    {/* ═══ PHILOSOPHY SECTION ═════════════════════════════════ */}
                    <section className="regal-section px-4 sm:px-6 lg:px-8">
                        <div className="max-w-5xl mx-auto">
                            <div
                                className="scroll-reveal-scale rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden"
                                style={{
                                    background: isDark
                                        ? "linear-gradient(135deg, rgba(212,160,23,0.06), rgba(255,107,0,0.04))"
                                        : "linear-gradient(135deg, rgba(212,160,23,0.06), rgba(255,107,0,0.03))",
                                    border: `1px solid ${isDark ? "rgba(212,160,23,0.12)" : "rgba(212,160,23,0.18)"}`,
                                }}
                            >
                                {/* Corner lotus */}
                                <div className="absolute top-6 right-6 opacity-20">
                                    <LotusSVG size={64} className="lotus-pulse" />
                                </div>

                                <div className="max-w-3xl">
                                    <span
                                        className="scroll-reveal-left text-xs font-bold uppercase tracking-[0.25em] mb-4 inline-block"
                                        style={{ color: isDark ? "#F5D060" : "#D4A017" }}
                                    >
                                        Our Philosophy
                                    </span>
                                    <h2
                                        className="scroll-reveal delay-1 text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight"
                                        style={{ color: isDark ? "rgba(255,253,245,0.9)" : "rgba(26,10,46,0.9)" }}
                                    >
                                        Technology as{" "}
                                        <span className="gold-text">Seva</span>
                                    </h2>
                                    <blockquote
                                        className="scroll-reveal delay-2 text-lg sm:text-xl mb-6 leading-relaxed italic"
                                        style={{
                                            color: isDark ? "rgba(255,253,245,0.6)" : "rgba(26,10,46,0.65)",
                                            borderLeft: `3px solid ${isDark ? "rgba(212,160,23,0.3)" : "rgba(212,160,23,0.4)"}`,
                                            paddingLeft: "1.5rem",
                                        }}
                                    >
                                        "The best way to find yourself is to lose yourself in the service of others."
                                        <span className="block mt-2 text-sm not-italic font-semibold" style={{ color: isDark ? "#F5D060" : "#D4A017" }}>
                                            — Mahatma Gandhi
                                        </span>
                                    </blockquote>
                                    <p
                                        className="scroll-reveal delay-3 text-base leading-relaxed mb-8"
                                        style={{ color: isDark ? "rgba(255,253,245,0.45)" : "rgba(26,10,46,0.55)" }}
                                    >
                                        BrainByte is built on the principle that advanced AI should serve every citizen, regardless of language, literacy, or location. Our tools are designed with deep cultural sensitivity, multilingual support for 22+ Indian languages, and an unwavering commitment to accessibility and privacy.
                                    </p>

                                    {/* Feature pills */}
                                    <div className="scroll-reveal delay-4 flex flex-wrap gap-3">
                                        {["Multilingual", "Accessible", "Private", "Open Source", "Made in India"].map((pill) => (
                                            <span
                                                key={pill}
                                                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                                                style={{
                                                    background: isDark ? "rgba(212,160,23,0.08)" : "rgba(212,160,23,0.06)",
                                                    border: `1px solid ${isDark ? "rgba(212,160,23,0.15)" : "rgba(212,160,23,0.2)"}`,
                                                    color: isDark ? "#F5D060" : "#B8860B",
                                                }}
                                            >
                                                {pill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ═══ HEARTBEAT TRANSITION ══════════════════════════════ */}
                    <section className="scroll-reveal">
                        <HeartbeatPulse isDark={isDark} />
                    </section>

                    {/* ═══ BOTTOM CTA ═════════════════════════════════════════ */}
                    <section className="regal-section px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="scroll-reveal">
                                <OrnamentDivider />
                            </div>
                            <h2
                                className="scroll-reveal delay-1 text-2xl sm:text-3xl lg:text-4xl font-black mt-8 mb-4"
                                style={{ color: isDark ? "rgba(255,253,245,0.9)" : "rgba(26,10,46,0.9)" }}
                            >
                                Ready to experience <span className="gold-text">Digital India</span>?
                            </h2>
                            <p
                                className="scroll-reveal delay-2 text-base sm:text-lg mb-8"
                                style={{ color: isDark ? "rgba(255,253,245,0.45)" : "rgba(26,10,46,0.55)" }}
                            >
                                Join millions of citizens using AI to simplify their daily lives.
                            </p>
                            <div className="scroll-reveal delay-3">
                                <Link
                                    to="/landing"
                                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white transition-all duration-300 hover:scale-[1.03] btn-shimmer"
                                    style={{
                                        background: "linear-gradient(135deg, #D4A017, #FF6B00)",
                                        boxShadow: "0 4px 24px rgba(212,160,23,0.3)",
                                    }}
                                >
                                    Start Your Journey
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>

                {/* ═══ FOOTER ════════════════════════════════════════════════ */}
                <footer
                    className="border-t py-8 sm:py-10"
                    style={{
                        borderColor: isDark ? "rgba(212,160,23,0.1)" : "rgba(212,160,23,0.15)",
                        background: isDark ? "rgba(13,2,33,0.85)" : "rgba(255,253,245,0.85)",
                        backdropFilter: "blur(16px)",
                    }}
                >
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <LotusSVG size={28} />
                                <span
                                    className="font-bold text-lg"
                                    style={{ color: isDark ? "rgba(255,253,245,0.7)" : "rgba(26,10,46,0.7)" }}
                                >
                                    BrainByte
                                </span>
                            </div>
                            <p
                                className="text-sm font-medium"
                                style={{ color: isDark ? "rgba(255,253,245,0.35)" : "rgba(26,10,46,0.4)" }}
                            >
                                © 2026 BrainByte — Made with ❤️ in India
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
