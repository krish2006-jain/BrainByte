# 📐 Bharat AI Portal — UI/UX Design Requirements

> Based on **"Refactoring UI"** by Adam Wathan & Steve Schoger  
> Last Updated: March 4, 2026

---

## ⚠️ GLOBAL RULES FOR THIS PROJECT

1. **NO DARK/LIGHT TOGGLE** — Remove the theme switcher entirely. The app uses **one single light theme** only.
2. **NO AI-LOOKING UI** — No neural grids, scan lines, data streams, floating orbs, or "techy" backgrounds. This is a **government services portal**, not an AI chatbot.
3. **LIGHT, PROFESSIONAL PALETTE** — Cool, calming colors that feel trustworthy and professional (blues, teals, soft indigos). NOT dark mode, NOT black backgrounds.
4. **ALL EFFECTS MUST BE CLEARLY VISIBLE** — Hover effects, transitions, and animations must be obvious on a light background. Subtle dark-mode glows are not acceptable.
5. **CSS FEATURES REQUIRED** — Proper hover states, focus states, typing animations, auto-rotating text, smooth transitions, background gradients, and micro-interactions on every interactive element.

---

## 🎨 PROJECT COLOR PALETTE (Light Theme Only)

```
Primary:        #4F46E5 (Indigo 600)          — Main actions, links, brand
Primary Hover:  #4338CA (Indigo 700)          — Hover state for primary
Primary Light:  #EEF2FF (Indigo 50)           — Light backgrounds, badges
Primary Soft:   #C7D2FE (Indigo 200)          — Borders, rings

Accent:         #0D9488 (Teal 600)            — Secondary actions, highlights  
Accent Light:   #F0FDFA (Teal 50)             — Accent backgrounds
Accent Soft:    #99F6E4 (Teal 200)            — Accent borders

Success:        #059669 (Emerald 600)         — Positive actions
Warning:        #D97706 (Amber 600)           — Warnings
Danger:         #DC2626 (Red 600)             — Errors, destructive

Background:     #FAFBFF                       — Page background (slight blue tint)
Surface:        #FFFFFF                       — Cards, panels
Surface Alt:    #F1F5F9 (Slate 100)           — Alternate card backgrounds

Text Primary:   #1E293B (Slate 800)           — Headings, body text
Text Secondary: #64748B (Slate 500)           — Descriptions, labels
Text Muted:     #94A3B8 (Slate 400)           — Placeholders, captions

Border:         #E2E8F0 (Slate 200)           — Default borders  
Border Focus:   #A5B4FC (Indigo 300)          — Focus rings
Shadow:         rgba(99,102,241,0.08)         — Indigo-tinted shadows
```

---

## 🔤 TYPOGRAPHY SYSTEM

```
Font Family:    'Outfit', 'Inter', system-ui, sans-serif
Code Font:      'JetBrains Mono', 'Fira Code', monospace

Display (H1):   48–72px / 800–900 weight / -0.02em tracking / Slate 800
Heading (H2):   30–36px / 700 weight / -0.01em tracking / Slate 800
Subhead (H3):   20–24px / 600 weight / normal tracking / Slate 700
Body:           16px / 400 weight / normal / Slate 700
Small:          14px / 400–500 weight / Slate 500
Caption:        12px / 500 weight / uppercase + wide tracking / Slate 400
```

---

# Section 1: Starting from Scratch

## Rule: Start with a Feature, Not a Layout

**Explanation:** Don't begin by designing your navigation, sidebar, or footer. Start with the actual feature the user needs — a form, a card, a dashboard widget. Once the feature works, wrap it in layout.

**Example:**
```
❌ Start by designing the sidebar + header shell
✅ Start by designing the "SarkariDost Document Upload" card in isolation
```

**For This Project:** Design each feature (SarkariDost, SevaSummary, Vidyarthi) as a standalone card first. Then compose them into the landing page grid.

---

## Rule: Detail Comes Later

**Explanation:** Start with low-fidelity — no colors, no shadows, no icons. Get the structure right. Add visual polish only after the layout and functionality are solid.

**Example:**
```
Step 1: Gray boxes with text → layout check
Step 2: Add the proper spacing and font sizes
Step 3: Add colors, shadows, icons, hover effects
```

---

## Rule: Don't Design Too Much

**Explanation:** Design only what you're building right now. Don't create wireframes for 10 pages when you only need 1. Built designs are 10× better than wireframe designs.

---

## Rule: Choose a Personality

**Explanation:** Every interface has a personality. Decide early: is this playful? Serious? Elegant? Minimal? Then apply it consistently.

**For This Project:**
```
Personality: Professional + Trustworthy + Warm
Fonts:       Rounded sans-serif (Outfit) — approachable but clean
Colors:      Cool indigos + teals — calming, trustworthy  
Spacing:     Generous — feels calm, not cluttered
Borders:     Subtle, soft radius (12px–16px) — friendly, not harsh
```

---

## Rule: Limit Your Choices

**Explanation:** Pre-define every design decision (colors, spacing, font sizes, border radii, shadows). Don't pick values on the fly. Use a system.

**Spacing Scale:**
```css
/* 4px base unit system */
--space-1:  4px;    --space-2:  8px;    --space-3:  12px;
--space-4:  16px;   --space-5:  20px;   --space-6:  24px;
--space-8:  32px;   --space-10: 40px;   --space-12: 48px;
--space-16: 64px;   --space-20: 80px;   --space-24: 96px;
```

**Border Radius Scale:**
```css
--radius-sm:   6px;
--radius-md:   10px;
--radius-lg:   14px;
--radius-xl:   18px;
--radius-2xl:  24px;
--radius-full: 9999px;
```

**Shadow Scale:**
```css
--shadow-sm:    0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(99,102,241,0.04);
--shadow-md:    0 4px 12px rgba(0,0,0,0.06), 0 2px 6px rgba(99,102,241,0.06);
--shadow-lg:    0 10px 30px rgba(0,0,0,0.08), 0 4px 12px rgba(99,102,241,0.08);
--shadow-xl:    0 20px 50px rgba(0,0,0,0.1), 0 8px 24px rgba(99,102,241,0.1);
--shadow-hover: 0 14px 40px rgba(99,102,241,0.15), 0 6px 16px rgba(0,0,0,0.08);
```

---

# Section 2: Hierarchy is Everything

## Rule: Not Everything Is Equally Important

**Explanation:** Every page needs a primary action, secondary content, and tertiary/supporting content. Use size, weight, color, and spacing to communicate importance.

**Example:**
```
PRIMARY:     "Get Started Free" button → Bold, filled, indigo → big and obvious
SECONDARY:   "Sign In" button → Outlined, smaller → visible but not dominant
TERTIARY:    "Continue as Guest" link → Text-only, muted → there if needed
```

---

## Rule: Size Isn't Everything — Use Weight and Color

**Explanation:** Instead of making everything bigger to make it stand out, use bolder font weight, darker color, or colored accents. Big but gray text feels less important than small but dark text.

**Example:**
```css
/* Don't make labels big. Make them small, uppercase, and bold */
.label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748B;  /* Slate 500 */
}

/* Make values large AND dark */
.value {
  font-size: 28px;
  font-weight: 700;
  color: #1E293B;  /* Slate 800 */
}
```

---

## Rule: Don't Use Grey Text on Colored Backgrounds

**Explanation:** On a colored background, reduce opacity instead of changing text to grey. Grey on color looks washed out; white at 70% opacity looks natural.

**Example:**
```css
/* ❌ Bad */
.hero-banner p { color: #94A3B8; }

/* ✅ Good — on a colored section */
.hero-banner p { color: rgba(255,255,255,0.75); }

/* ✅ Good — on light background */
.section p { color: #64748B; }
```

---

## Rule: Emphasize by De-Emphasizing

**Explanation:** If something needs to stand out, sometimes the best approach is to make everything else less prominent rather than making the focal element louder.

**Example:**
```
Instead of making the CTA button bigger and bolder,
make the surrounding text lighter and smaller.
The button naturally becomes the focus.
```

---

## Rule: Labels Are a Last Resort

**Explanation:** Don't add labels unless necessary. Often the data speaks for itself. "krish@email.com" doesn't need a "Email:" label — the format is obvious.

---

## Rule: Separate Visual Hierarchy from Document Hierarchy

**Explanation:** Just because something is an `<h3>` doesn't mean it needs to be prominently styled. Use semantic HTML for accessibility but style for the visual hierarchy you want.

---

## Rule: Balance Weight and Size

**Explanation:** An icon that is the same pixel-size as text next to it will look bigger because icons are denser. Scale icons down slightly or use a lighter weight to match them visually with text.

**Example:**
```css
/* Icon next to 14px text should be ~16px, not 20px */
.nav-link svg { width: 16px; height: 16px; }
.nav-link span { font-size: 14px; }
```

---

# Section 3: Layout and Spacing

## Rule: Start with Too Much White Space

**Explanation:** It's easier to take away space than to add it. Designs that feel cramped are much harder to fix than designs that feel a bit airy. Start generous, then tighten.

**For This Project:**
```css
/* Page padding */
.page { padding: 32px 24px; }

/* Card internal padding */
.card { padding: 28px–32px; }

/* Section spacing */
.section + .section { margin-top: 64px; }

/* Form element spacing */
.form-group + .form-group { margin-top: 20px; }
```

---

## Rule: Establish a Spacing/Sizing System

**Explanation:** Never use arbitrary values like 13px or 7px. Use a consistent scale based on multiples of 4 or 8. This creates rhythm and harmony.

---

## Rule: You Don't Have to Fill the Whole Screen

**Explanation:** Wide monitors don't mean your content should stretch edge-to-edge. Use max-width to keep content readable and comfortable.

**Example:**
```css
.content-area { max-width: 960px; margin: 0 auto; }
.narrow-content { max-width: 640px; margin: 0 auto; }
.form-container { max-width: 480px; margin: 0 auto; }
```

---

## Rule: Grids Are Not One-Size-Fits-All

**Explanation:** Not everything needs a 12-column grid. Sidebars can be fixed width. Cards can use auto-fill. Choose the right layout for each situation.

---

## Rule: Relative Sizing Doesn't Scale

**Explanation:** Don't use `em` for everything and expect it to scale proportionally. When an element gets bigger, the padding and font-size often need different ratios, not the same multiplier.

---

# Section 4: Designing Text

## Rule: Keep Your Line Length in Check

**Explanation:** Optimal reading line length is 45–75 characters. Long lines are tiring to read. Use max-width on text containers.

**Example:**
```css
p, .description { max-width: 580px; }  /* ~65 chars at 16px */
```

---

## Rule: Baseline, Not Center — Align Mixed Text Sizes

**Explanation:** When text of different sizes sits on the same line, align them by baseline (bottom of the letters), not by center. Otherwise it looks unbalanced.

---

## Rule: Line Height Is Proportional

**Explanation:** Large text needs less line-height; small text needs more. Don't use one line-height for everything.

**Example:**
```css
h1 { font-size: 48px; line-height: 1.1; }
h2 { font-size: 30px; line-height: 1.25; }
p  { font-size: 16px; line-height: 1.65; }
small { font-size: 14px; line-height: 1.7; }
```

---

## Rule: Not Every Link Needs a Color

**Explanation:** Links in navigation or buttons don't need to be blue and underlined. Reserve link-style treatment for inline links within body text.

---

## Rule: Align with Readability, Not Symmetry

**Explanation:** Left-aligned text is easier to read than centered text for long content. Only center short headings or taglines. Body text should always be left-aligned.

---

## Rule: Use Letter Spacing Effectively

**Explanation:** Tighten letter-spacing on large headings (they look better dense). Widen it on small uppercase labels (improves readability).

**Example:**
```css
h1 { letter-spacing: -0.02em; }
.label-uppercase { letter-spacing: 0.08em; text-transform: uppercase; }
```

---

# Section 5: Working with Color

## Rule: Ditch Hex Hurdles — Use HSL

**Explanation:** HSL (Hue, Saturation, Lightness) makes it easy to create color palettes. To make a darker shade, lower lightness. To make a softer shade, lower saturation. Hex makes this guesswork.

---

## Rule: You Need More Colors Than You Think (Build a Palette of 8–10 Shades Per Color)

**Explanation:** One primary color isn't enough. You need 8–10 shades from very light (backgrounds) to very dark (text). Generate a full scale.

**For This Project — Indigo Scale:**
```
Indigo 50:  #EEF2FF   (backgrounds, badges)
Indigo 100: #E0E7FF   (hover backgrounds)
Indigo 200: #C7D2FE   (light borders, focus rings)
Indigo 300: #A5B4FC   (secondary icons)
Indigo 400: #818CF8   (active states)
Indigo 500: #6366F1   (default accents)
Indigo 600: #4F46E5   (primary button, links) ← MAIN
Indigo 700: #4338CA   (hover states)
Indigo 800: #3730A3   (active/pressed states)
Indigo 900: #312E81   (dark text on light)
```

---

## Rule: Define Your Colors in Advance

**Explanation:** Pre-define grays, primary, and accent colors BEFORE you start designing. Having a color system eliminates guesswork and ensures consistency.

---

## Rule: Grays Don't Have to Be Gray

**Explanation:** Pure grays (#888) feel cold and lifeless. Add a hint of blue or warmth to your grays. All grays in this project should have a blue undertone (use Slate palette, not Gray).

**Example:**
```css
/* ❌ Pure gray — flat and lifeless */
color: #808080;

/* ✅ Blue-tinted gray — professional and warm */
color: #64748B;  /* Slate 500 */
```

---

## Rule: Accessible Colors Are Non-Negotiable

**Explanation:** Text must have at least 4.5:1 contrast ratio against its background (WCAG AA). Use WebAIM contrast checker. Light-colored text on light backgrounds is unacceptable.

---

## Rule: Don't Rely on Color Alone

**Explanation:** Use icons, text, and shape in addition to color. A red circle and a green circle mean nothing to a colorblind user – add ✓ and ✕ inside them.

---

# Section 6: Creating Depth

## Rule: Use Shadows to Convey Elevation

**Explanation:** Raised elements (cards, modals) get bigger shadows. Inset elements (inputs, wells) get inset shadows or darker backgrounds. Flat elements get no shadow.

**For This Project:**
```css
/* Cards — elevated */
.card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06), 0 2px 6px rgba(99,102,241,0.06);
}

/* Cards on hover — elevated more */
.card:hover {
  box-shadow: 0 14px 40px rgba(99,102,241,0.15), 0 6px 16px rgba(0,0,0,0.08);
  transform: translateY(-4px);
  border-color: #C7D2FE;
}

/* Input fields — inset feel */
.input {
  background: #F8FAFC;
  border: 1.5px solid #E2E8F0;
}

/* Input focus — glowing elevation */
.input:focus {
  border-color: #818CF8;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
  background: #FFFFFF;
}
```

---

## Rule: Shadows Can Have Two Layers

**Explanation:** Use two shadows: one tight and dark (defines the edge) and one large and soft (creates the glow). This looks much more realistic than one big shadow.

**Example:**
```css
box-shadow: 
  0 1px 3px rgba(0,0,0,0.08),     /* tight, defines edge */
  0 8px 24px rgba(0,0,0,0.06);    /* soft, creates glow */
```

---

## Rule: Shadows, Not Borders

**Explanation:** Borders can make elements feel heavy. Consider using a subtle shadow instead of a border for separation. If you must use a border, keep it lighter than you think.

---

## Rule: Overlap Elements to Create Layers

**Explanation:** Overlapping elements (cards overlapping hero sections, avatars overlapping cards) create a sense of depth and make UI feel layered and dynamic.

---

## Rule: Flat Design Can Still Have Depth

**Explanation:** Even "flat" design benefits from background color variation, subtle shadows, and spacing to create visual layers. Completely flat = boring.

---

# Section 7: Working with Images

## Rule: Use Good Photos

**Explanation:** Bad stock photos ruin good design. If you can't find a good photo, don't use one. Use illustrations, icons, or patterns instead.

**For This Project:**
```
✅ Use clean vector illustrations for features
✅ Use Lucide icons (already in project)
✅ Use abstract geometric patterns for backgrounds
❌ No generic AI robot images
❌ No stock photos of people at computers
```

---

## Rule: Text Needs Consistent Contrast Over Images

**Explanation:** If placing text over an image, add a dark overlay or place text on a solid-colored panel. Don't put text directly on a busy image.

---

## Rule: Don't Scale Up Icons — They Get Blurry

**Explanation:** Icons designed at 16px look bad at 64px. Use illustration-sized assets for large displays, not blown-up icons.

---

## Rule: Control Image Shape and Focus

**Explanation:** Crop images to focus on the important part. Use consistent aspect ratios across a grid. Don't let images dictate layout — layout should dictate image shapes.

---

# Section 8: Finishing Touches

## Rule: Supercharge the Defaults

**Explanation:** Replace browser defaults with custom-styled elements. Checkboxes, radio buttons, selects, and links should all match your design system.

---

## Rule: Add Color with Accent Borders

**Explanation:** A simple top or left border with your primary color can transform a plain card into something with personality.

**Example:**
```css
.card-accent {
  border-left: 4px solid #4F46E5;
}

.section-highlight {
  border-top: 3px solid;
  border-image: linear-gradient(90deg, #4F46E5, #0D9488) 1;
}
```

---

## Rule: Decorate Your Backgrounds

**Explanation:** Don't leave backgrounds plain white. Use subtle patterns, gradients, or colored sections to add visual interest.

**For This Project:**
```css
/* Page background — light with subtle warm tint */
body {
  background: #FAFBFF;
  background-image: 
    radial-gradient(ellipse 80% 50% at 20% 0%, rgba(99,102,241,0.04) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 100%, rgba(13,148,136,0.03) 0%, transparent 60%);
}

/* Hero section — gradient */
.hero {
  background: linear-gradient(135deg, #EEF2FF 0%, #F0FDFA 50%, #FAFBFF 100%);
}
```

---

## Rule: Don't Overlook Empty States

**Explanation:** Empty lists, zero results, new accounts — these all need designed states. Don't show a blank page. Use illustrations and helpful messages.

---

## Rule: Use Fewer Borders

**Explanation:** Borders can clutter. Try using spacing, background color changes, or shadows to separate sections instead of borders everywhere.

---

## Rule: Think Outside the Box (Literally)

**Explanation:** Not everything needs to be in a rectangular card. Use creative shapes, offsets, and overlaps to add visual interest.

---

---

# 🎬 REQUIRED CSS FEATURES & ANIMATIONS

These features must be present across the project. They are what make the UI feel alive, professional, and engaging.

---

## 1. HOVER EFFECTS (Every Interactive Element)

Every button, card, link, and interactive element MUST have a visible hover effect.

```css
/* ── Button Hover ── */
.btn-primary {
  background: #4F46E5;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  background: #4338CA;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(79,70,229,0.35);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(79,70,229,0.25);
}

/* ── Card Hover ── */
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #E2E8F0;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(99,102,241,0.12), 0 8px 20px rgba(0,0,0,0.06);
  border-color: #C7D2FE;
}

/* ── Link Hover ── */
.nav-link {
  color: #64748B;
  transition: color 0.2s ease, transform 0.2s ease;
}

.nav-link:hover {
  color: #4F46E5;
  transform: translateX(2px);
}

/* ── Icon Button Hover ── */
.icon-btn {
  color: #94A3B8;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  color: #4F46E5;
  background: rgba(99,102,241,0.08);
  border-radius: 8px;
}
```

---

## 2. FOCUS STATES (Accessibility)

```css
/* Input Focus */
.input:focus {
  outline: none;
  border-color: #818CF8;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.15), 0 0 12px rgba(99,102,241,0.08);
  background: #FFFFFF;
}

/* Button Focus */
.btn:focus-visible {
  outline: 2px solid #4F46E5;
  outline-offset: 2px;
}
```

---

## 3. TYPING ANIMATION (Auto-Typing Text)

Used on hero section to show rotating phrases that type themselves.

```css
/* ── Typing Animation ── */
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blinkCaret {
  0%, 100% { border-color: #4F46E5; }
  50% { border-color: transparent; }
}

.typing-text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid #4F46E5;
  animation: 
    typing 2.5s steps(30, end),
    blinkCaret 0.75s step-end infinite;
  font-weight: 600;
  color: #4F46E5;
}
```

**React Implementation for Typing Effect:**
```tsx
// Auto-rotating phrases in the hero section
const phrases = [
  "Navigate Government Services",
  "Analyze Your Documents",
  "Learn Anything with AI",
  "Fill Forms Effortlessly",
];

// Cycle through phrases with typing + deleting animation
// Use setInterval to change the active phrase every 4 seconds
// Display with the .typing-text CSS class
```

---

## 4. AUTO-CHANGING TEXT (Word Rotation)

Smooth word-swap animation for hero taglines.

```css
/* ── Word Rotation ── */
@keyframes slideUp {
  0% { transform: translateY(100%); opacity: 0; }
  10% { transform: translateY(0); opacity: 1; }
  90% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-100%); opacity: 0; }
}

.rotating-word {
  display: inline-block;
  animation: slideUp 3s ease-in-out;
  position: absolute;
  left: 0;
  color: #4F46E5;
  font-weight: 700;
}

/* Container for rotating words */
.rotating-word-container {
  display: inline-block;
  position: relative;
  min-width: 250px;
  height: 1.3em;
  overflow: hidden;
  vertical-align: bottom;
}
```

---

## 5. BACKGROUND EFFECTS (Light Theme)

```css
/* ── Subtle Animated Gradient Background ── */
@keyframes gradientDrift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.page-bg {
  background: 
    linear-gradient(135deg, #FAFBFF 0%, #EEF2FF 25%, #F0FDFA 50%, #FFF7ED 75%, #FAFBFF 100%);
  background-size: 400% 400%;
  animation: gradientDrift 20s ease infinite;
}

/* ── Soft Floating Blobs (NOT AI orbs) ── */
.bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  pointer-events: none;
}

.bg-blob-1 {
  width: 400px; height: 400px;
  background: rgba(99,102,241,0.08);
  top: -100px; left: -100px;
  animation: blobFloat 25s ease-in-out infinite;
}

.bg-blob-2 {
  width: 350px; height: 350px;
  background: rgba(13,148,136,0.06);
  bottom: -80px; right: -80px;
  animation: blobFloat 30s ease-in-out infinite reverse;
}

@keyframes blobFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.05); }
  66% { transform: translate(-20px, 15px) scale(0.95); }
}
```

---

## 6. SMOOTH TRANSITIONS (Global)

```css
/* Apply smooth transitions globally */
* {
  transition-property: color, background-color, border-color, box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0ms; /* Default off */
}

/* Interactive elements get transitions */
a, button, input, textarea, select,
[role="button"], .card, .interactive {
  transition-duration: 200ms;
}

/* Longer transitions for layout elements */
.card, .panel, .modal {
  transition-duration: 300ms;
}
```

---

## 7. SCROLL-TRIGGERED ANIMATIONS (Feature Cards, Sections)

```css
/* Elements fade-slide-in when entering viewport */
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-reveal {
  opacity: 0;
}

.scroll-reveal.visible {
  animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Stagger children */
.scroll-reveal.visible:nth-child(1) { animation-delay: 0ms; }
.scroll-reveal.visible:nth-child(2) { animation-delay: 100ms; }
.scroll-reveal.visible:nth-child(3) { animation-delay: 200ms; }
```

**React Implementation:**
```tsx
// Use IntersectionObserver to add 'visible' class
// when elements enter the viewport
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    }),
    { threshold: 0.15 }
  );
  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  return () => observer.disconnect();
}, []);
```

---

## 8. BUTTON SHIMMER EFFECT (Light Theme Visible)

```css
/* Shimmer on hover — visible on light backgrounds */
.btn-shimmer {
  position: relative;
  overflow: hidden;
}

.btn-shimmer::after {
  content: "";
  position: absolute;
  top: 0; left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.4),
    transparent
  );
  transform: skewX(-25deg);
  transition: left 0.5s ease;
}

.btn-shimmer:hover::after {
  left: 125%;
}
```

---

## 9. MICRO-INTERACTIONS

```css
/* ── Checkbox toggle ── */
.checkbox:checked + .checkbox-label::after {
  transform: scale(1);
  opacity: 1;
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* ── Notification badge bounce ── */
@keyframes badgeBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.badge-new {
  animation: badgeBounce 0.5s ease;
}

/* ── Success animation ── */
@keyframes checkDraw {
  0% { stroke-dashoffset: 24; }
  100% { stroke-dashoffset: 0; }
}

.success-icon path {
  stroke-dasharray: 24;
  animation: checkDraw 0.4s ease forwards;
}

/* ── Loading skeleton ── */
@keyframes skeletonShimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg, 
    #F1F5F9 25%, 
    #E2E8F0 50%, 
    #F1F5F9 75%
  );
  background-size: 200% 100%;
  animation: skeletonShimmer 1.5s ease infinite;
  border-radius: 8px;
}

/* ── Tooltip fade ── */
.tooltip {
  opacity: 0;
  transform: translateY(4px);
  transition: all 0.2s ease;
  pointer-events: none;
}

.trigger:hover .tooltip {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

---

## 10. NAVIGATION EFFECTS

```css
/* ── Sticky nav with blur ── */
.nav {
  background: rgba(250,251,255,0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(226,232,240,0.8);
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  transition: all 0.3s ease;
}

/* Nav on scroll — slightly more opaque */
.nav.scrolled {
  background: rgba(250,251,255,0.95);
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

/* Nav link active indicator */
.nav-link.active {
  color: #4F46E5;
  position: relative;
}

.nav-link.active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0; right: 0;
  height: 2px;
  background: #4F46E5;
  border-radius: 1px;
}
```

---

## 11. FORM INTERACTIONS

```css
/* ── Floating Labels ── */
.form-group {
  position: relative;
}

.form-group label {
  position: absolute;
  left: 14px; top: 50%;
  transform: translateY(-50%);
  color: #94A3B8;
  font-size: 14px;
  transition: all 0.2s ease;
  pointer-events: none;
  background: transparent;
  padding: 0 4px;
}

.form-group input:focus + label,
.form-group input:not(:placeholder-shown) + label {
  top: 0;
  font-size: 11px;
  font-weight: 600;
  color: #4F46E5;
  background: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ── Input validation states ── */
.input-success {
  border-color: #059669;
  box-shadow: 0 0 0 3px rgba(5,150,105,0.12);
}

.input-error {
  border-color: #DC2626;
  box-shadow: 0 0 0 3px rgba(220,38,38,0.12);
}

/* ── Error message slide-in ── */
@keyframes errorSlide {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.error-message {
  animation: errorSlide 0.25s ease;
  color: #DC2626;
  font-size: 13px;
  margin-top: 6px;
}
```

---

## 12. CARD ACCENT BORDERS

```css
/* Feature cards with colored left border */
.feature-card {
  border-left: 4px solid transparent;
  transition: all 0.3s ease;
}

.feature-card.indigo  { border-left-color: #4F46E5; }
.feature-card.teal    { border-left-color: #0D9488; }
.feature-card.amber   { border-left-color: #D97706; }

/* Gradient top border for sections */
.section-featured {
  border-top: 3px solid;
  border-image: linear-gradient(90deg, #4F46E5, #0D9488) 1;
}
```

---

## 13. MODAL / OVERLAY ANIMATIONS

```css
/* ── Backdrop ── */
.modal-backdrop {
  background: rgba(15,23,42,0.5);
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;
}

/* ── Modal entrance ── */
@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal {
  animation: modalEnter 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: #FFFFFF;
  border-radius: 18px;
  box-shadow: 0 25px 60px rgba(0,0,0,0.15);
}
```

---

## 14. COUNTER / NUMBER ANIMATION

```css
/* Animated counting numbers for stats */
/* Implement in JS with requestAnimationFrame */
/* Start from 0 and count up to the target value over ~2 seconds */
/* Use ease-out timing for a natural feel */
```

```tsx
// React hook for animated counting
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}
```

---

# ✅ COMPONENT CHECKLIST

Apply these rules to every component in the project:

| Component | Hover Effect | Focus State | Animation | Shadow | Border Radius |
|-----------|:----------:|:---------:|:---------:|:------:|:------------:|
| Primary Button | ✅ lift + darken | ✅ ring | ✅ shimmer | ✅ colored | 12px |
| Secondary Button | ✅ bg change | ✅ ring | — | ✅ subtle | 12px |
| Card | ✅ lift + glow | — | ✅ scale-in | ✅ layered | 14px |
| Input | ✅ border glow | ✅ ring + glow | — | ✅ inset feel | 10px |
| Nav Link | ✅ color + shift | ✅ underline | — | — | — |
| Badge | — | — | ✅ bounce-in | — | 9999px |
| Modal | — | — | ✅ scale + slide | ✅ large | 18px |
| Dropdown | — | — | ✅ fade-slide | ✅ medium | 12px |
| Toast | — | — | ✅ slide-in | ✅ large | 12px |
| Tooltip | — | — | ✅ fade-up | ✅ small | 8px |

---

# 🚫 THINGS TO REMOVE

1. **Theme toggle button** (Sun/Moon pill switch in Navigation)
2. **`ThemeContext.tsx`** — Replace with simple light-only constants or remove entirely
3. **All `isDark` conditional logic** — Replace with single light-theme values
4. **AI background**: neural grids, scan lines, data streams, neural nodes, floating orbs
5. **`aiGlow`**, **`neuralPulse`**, **`scanLine`**, **`dataStream`** keyframes
6. **`[data-ai="..."]`** CSS selectors
7. **Dark mode CSS variables** in `:root` (keep only light mode values)
8. **`.light` class-based overrides** (not needed when there's only one theme)

---

# 🎯 THINGS TO ADD/KEEP

1. **Typing animation** on hero heading (auto-cycles phrases)
2. **Hover lift + shadow** on all cards
3. **Shimmer effect** on primary CTA buttons
4. **Smooth scroll-reveal** animations (IntersectionObserver)
5. **Focus ring glow** on all inputs
6. **Floating label** on form inputs
7. **Gradient backgrounds** — subtle, warm, light
8. **Accent left-borders** on feature cards
9. **Counter animation** for stats (if any)
10. **Skeleton loaders** for async content
11. **Proper `cursor: pointer`** on all clickable elements
12. **`transition`** on everything interactive (200–300ms)
13. **Active/pressed states** for buttons (scale down slightly)
14. **Dropdown slide-in** animations
15. **Toast notifications** with slide-in

---

> **This document is the single source of truth for all UI/UX decisions in the project.**  
> Every component, page, and interaction must follow these rules.
