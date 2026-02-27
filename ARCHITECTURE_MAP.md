# Bharat AI Platform - Component Architecture & Integration Map

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         App.tsx (Root)                          │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ThemeProvider → AuthProvider → LanguageProvider         │  │
│  │ ↓                                                        │  │
│  │ ┌────────────────────────────────────────────────────┐  │  │
│  │ │ QueryClientProvider → TooltipProvider             │  │  │
│  │ │ ↓                                                  │  │  │
│  │ │ ┌──────────────────────────────────────────────┐  │  │  │
│  │ │ │ LoadingProvider ← [NEW]                      │  │  │  │
│  │ │ │ ↓                                            │  │  │  │
│  │ │ │ ┌────────────────────────────────────────┐  │  │  │  │
│  │ │ │ │ Toaster + Sonner + LoadingSpinner     │  │  │  │  │
│  │ │ │ │ [NEW]                                 │  │  │  │  │
│  │ │ │ │ ↓                                     │  │  │  │  │
│  │ │ │ │ BrowserRouter (Routes)               │  │  │  │  │
│  │ │ │ └────────────────────────────────────────┘  │  │  │  │
│  │ │ └──────────────────────────────────────────────┘  │  │  │
│  │ └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Components Map

### 🎨 UI Components

```
Components/
│
├── LoadingSpinner [NEW]
│   ├── Props: message, size, fullScreen
│   ├── Context: useLoading()
│   └── Usage: App-wide loading state
│
├── FeatureDescriptionCard [NEW]
│   ├── Props: title, description, features, icon
│   ├── Used in: VidyarthiAI, SevaS Summary, SarkariDost
│   └── Animation: Hover glow + slide-up
│
├── ArchitectureModal [NEW]
│   ├── Props: isOpen, onClose
│   ├── Used in: Landing page
│   └── Features: Backend visualization + key features
│
├── SystemStatusBadge [NEW]
│   ├── Props: showDetails
│   ├── Used in: Landing page header
│   └── Data: Service health + latency
│
├── UploadProgress [NEW]
│   ├── Props: fileName, progress, status, errorMessage
│   ├── Statuses: uploading | success | error
│   └── Animation: Progress bar fill
│
├── TryDemoButton [NEW]
│   ├── Props: onDemoLoad, toolType
│   ├── Types: vidyarthi | seva | sarkari
│   └── Behavior: Simulates file upload
│
├── Notification [NEW]
│   ├── Hook: useNotifications()
│   ├── Types: success | error | warning | info
│   ├── Features: Auto-dismiss, container, stacking
│   └── Animation: Slide-in + fade-out
│
└── Navigation (existing)
    ├── Custom integration with themes
    └── Works with LoadingProvider
```

---

## Context & Hooks Map

```
Lib/
│
├── LoadingContext [NEW]
│   ├── Provider: LoadingProvider
│   ├── Hook: useLoading()
│   ├── State: isLoading, loadingMessage
│   └── Methods: showLoading(msg), hideLoading()
│
├── AuthContext (existing)
│   └── Used with new components
│
├── ThemeContext (existing)
│   └── Controls dark/light mode
│
└── LanguageContext (existing)
    └── Internationalization support
```

---

## Page Integration Map

### Landing Page

```
Landing.tsx
├── Hero Section
│   ├── Title + Subtitle [ENHANCED]
│   ├── CTA Buttons [3 buttons]
│   └── View Architecture Button [NEW]
│       ↓
├── SystemStatusBadge [NEW - top-right]
├── ArchitectureModal [NEW - modal component]
└── Feature Cards [existing grid]
```

### Vidyarthi AI Page

```
VidyarthiAINew.tsx
├── Header [existing]
├── FeatureDescriptionCard [NEW]
│   ├── Title: 📚 Vidyarthi AI
│   ├── Description: Study companion
│   └── Features: [4 bullet points]
├── Content Section [existing]
│   └── Uses LoadingSpinner when: showLoading()
└── Loading integration [NEW]
    └── useLoading() hook for uploads
```

### Seva Summary Page

```
SevaSummaryNew.tsx
├── Header [existing]
├── FeatureDescriptionCard [NEW]
│   ├── Title: 🏥 Seva Summary AI
│   ├── Description: Document analysis
│   └── Features: [4 bullet points]
├── Three-Column Layout [existing]
└── Loading integration [NEW]
    └── useLoading() hook for processing
```

### Sarkari Dost Page

```
SarkariDostNew.tsx
├── Header Bar [existing]
├── FeatureDescriptionCard [NEW]
│   ├── Title: 🏛️ Sarkari Dost AI
│   ├── Description: Government services
│   └── Features: [4 bullet points]
├── Service Selection [existing]
└── Loading integration [NEW]
    └── useLoading() hook for verification
```

---

## Data Flow Diagram

### Loading State Flow

```
User Action (Upload)
        ↓
showLoading("Uploading...")
        ↓
LoadingContext.setState(true)
        ↓
App.tsx renders LoadingSpinner
        ↓
[Processing...]
        ↓
hideLoading()
        ↓
LoadingContext.setState(false)
        ↓
LoadingSpinner disappears
```

### Notification Flow

```
User Action (Error/Success)
        ↓
showSuccess() / showError()
        ↓
Notification added to array
        ↓
NotificationContainer renders
        ↓
Notification component with animation
        ↓
[Auto-dismiss after duration]
        ↓
removeNotification(id)
        ↓
Notification removed from array
```

---

## File Organization

```
BrainByte/
│
├── client/
│   ├── App.tsx [MODIFIED]
│   │   ├── LoadingProvider integration
│   │   └── AppRoutes component
│   │
│   ├── components/
│   │   ├── LoadingSpinner.tsx [NEW] ✓
│   │   ├── FeatureDescriptionCard.tsx [NEW] ✓
│   │   ├── ArchitectureModal.tsx [NEW] ✓
│   │   ├── SystemStatusBadge.tsx [NEW] ✓
│   │   ├── UploadProgress.tsx [NEW] ✓
│   │   ├── TryDemoButton.tsx [NEW] ✓
│   │   ├── Notification.tsx [NEW] ✓
│   │   ├── index.ts [NEW] ✓ (exports)
│   │   ├── Navigation.tsx
│   │   └── ui/
│   │
│   ├── lib/
│   │   ├── LoadingContext.tsx [NEW] ✓
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── LanguageContext.tsx
│   │
│   ├── pages/
│   │   ├── Landing.tsx [MODIFIED] ✓
│   │   ├── VidyarthiAINew.tsx [MODIFIED] ✓
│   │   ├── SevaSummaryNew.tsx [MODIFIED] ✓
│   │   ├── SarkariDostNew.tsx [MODIFIED] ✓
│   │   └── ...
│   │
│   └── global.css [MODIFIED] ✓
│
├── UPGRADE_GUIDE.md [NEW]
├── COMPONENTS_QUICK_START.md [NEW]
└── COMPLETION_SUMMARY.md [NEW]
```

---

## Component Dependencies

```
LoadingSpinner
├── Depends: React, lucide-react (Loader2)
├── Used in: App.tsx
└── Context: useLoading

FeatureDescriptionCard
├── Depends: React
├── Used in: VidyarthiAI, SevaS, Sarkari pages
└── Props: title, description, features, icon

ArchitectureModal
├── Depends: React, lucide-react (X icon)
├── Used in: Landing.tsx
└── Props: isOpen, onClose

SystemStatusBadge
├── Depends: React, lucide-react (Activity, AlertCircle, CheckCircle)
├── Used in: Landing.tsx
└── Props: showDetails

UploadProgress
├── Depends: React, lucide-react (CheckCircle, AlertCircle, Loader2)
├── Used in: Optional in tool pages
└── Props: fileName, progress, status, errorMessage

TryDemoButton
├── Depends: React, lucide-react (Zap)
├── Used in: Optional in tool pages
└── Props: onDemoLoad, toolType

Notification
├── Depends: React, lucide-react (icons)
├── Used in: Components via useNotifications hook
└── Hook: useNotifications()

LoadingContext
├── Depends: React
├── Provider: App.tsx
└── Hook: useLoading()
```

---

## CSS Animation Classes Reference

### Entrance Animations
```css
.animate-slide-up      /* Slides in from bottom */
.animate-slide-down    /* Slides in from top */
.animate-fade-in       /* Fades in smoothly */
.animate-scale-in      /* Scales in with bounce */
```

### Interactive Animations
```css
.animate-lift          /* Lifts on hover */
.animate-glow          /* Continuous glow */
.animate-pulse-glow    /* Pulsing glow effect */
.animate-ripple        /* Ripple effect on click */
```

### Status Animations
```css
.animate-progress      /* Progress bar fill */
.animate-check         /* Success checkmark */
.animate-toast         /* Toast slide-in */
.animate-spin          /* Rotating spinner */
```

---

## Usage Patterns

### Pattern 1: Simple Loading

```tsx
import { useLoading } from "@/lib/LoadingContext";

const MyComponent = () => {
  const { showLoading, hideLoading } = useLoading();

  const handleAction = async () => {
    showLoading("Processing...");
    await doSomething();
    hideLoading();
  };
};
```

### Pattern 2: Feature Description

```tsx
import { FeatureDescriptionCard } from "@/components";

<FeatureDescriptionCard
  title="🎯 My Tool"
  description="What it does"
  features={["Feature 1", "Feature 2"]}
  icon="🔧"
/>
```

### Pattern 3: Notifications

```tsx
import { useNotifications, NotificationContainer } from "@/components";

const App = () => {
  const { notifications, removeNotification, showSuccess } = useNotifications();

  return (
    <>
      <button onClick={() => showSuccess("Done!")}>Action</button>
      <NotificationContainer 
        notifications={notifications}
        onDismiss={removeNotification}
      />
    </>
  );
};
```

---

## Performance Optimizations

### CSS-Based Animations
- Hardware accelerated
- No layout thrashing
- Minimal repaints
- Smooth 60 FPS

### Component Optimization
- Functional components with hooks
- Proper dependency arrays
- Lazy loading where applicable
- Memoization for expensive renders

### Bundle Size
- Tree-shakeable exports
- Minimal dependencies
- Modular imports
- No unused code

---

## Testing Strategy

### Unit Tests
- Component rendering
- Hook behavior
- Event handling
- State management

### Integration Tests
- Provider wrapping
- Context propagation
- Navigation between pages
- Loading states

### Visual Tests
- Animation smoothness
- Responsive design
- Dark theme consistency
- Accessibility

### Performance Tests
- Animation frame rate
- Memory usage
- Load times
- Interaction responsiveness

---

## Deployment Checklist

- [ ] All files in correct locations
- [ ] No console errors
- [ ] Animations smooth on target devices
- [ ] Responsive design verified
- [ ] Dark theme consistent
- [ ] All links functional
- [ ] Loading states working
- [ ] Notifications appearing
- [ ] Feature cards displaying
- [ ] Documentation in place

---

## Quick Reference

| Component | Lines | Import Path | Used In |
|-----------|-------|-------------|---------|
| LoadingSpinner | 161 | @/components/LoadingSpinner | App.tsx |
| FeatureDescriptionCard | 75 | @/components/FeatureDescriptionCard | 3 pages |
| ArchitectureModal | 210 | @/components/ArchitectureModal | Landing |
| SystemStatusBadge | 146 | @/components/SystemStatusBadge | Landing |
| UploadProgress | 82 | @/components/UploadProgress | Optional |
| TryDemoButton | 69 | @/components/TryDemoButton | Optional |
| Notification | 156 | @/components/Notification | Any page |
| LoadingContext | 36 | @/lib/LoadingContext | All |

---

**Version:** 2.0 (Production)  
**Last Updated:** February 27, 2026  
**Status:** ✅ Complete
