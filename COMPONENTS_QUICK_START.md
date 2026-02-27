# Quick Start Guide - New Components

## 🚀 Using the New Components

### 1. Loading Spinner

```tsx
import { useLoading } from "@/lib/LoadingContext";

export const MyComponent = () => {
  const { showLoading, hideLoading } = useLoading();

  const handleAction = async () => {
    showLoading("Processing your request...");
    await someAsyncTask();
    hideLoading();
  };

  return <button onClick={handleAction}>Process</button>;
};
```

---

### 2. Feature Description Card

```tsx
import { FeatureDescriptionCard } from "@/components/FeatureDescriptionCard";

<FeatureDescriptionCard
  title="🎓 Your Tool Name"
  description="Brief description of what this tool does"
  features={[
    "Feature 1",
    "Feature 2", 
    "Feature 3",
    "Feature 4",
  ]}
  icon="🔧"
/>
```

---

### 3. Architecture Modal

```tsx
import { ArchitectureModal } from "@/components/ArchitectureModal";
import { useState } from "react";

export const MyPage = () => {
  const [showArch, setShowArch] = useState(false);

  return (
    <>
      <button onClick={() => setShowArch(true)}>
        View Architecture
      </button>
      <ArchitectureModal 
        isOpen={showArch} 
        onClose={() => setShowArch(false)} 
      />
    </>
  );
};
```

---

### 4. System Status Badge

```tsx
import { SystemStatusBadge } from "@/components/SystemStatusBadge";

// Add to your navigation or header
<SystemStatusBadge showDetails={true} />
```

---

### 5. Upload Progress

```tsx
import { UploadProgress } from "@/components/UploadProgress";
import { useState } from "react";

export const FileUpload = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"uploading" | "success" | "error">("uploading");

  return (
    <UploadProgress
      fileName="myfile.pdf"
      progress={progress}
      status={status}
    />
  );
};
```

---

### 6. Try Demo Button

```tsx
import { TryDemoButton } from "@/components/TryDemoButton";

<TryDemoButton 
  toolType="vidyarthi"
  onDemoLoad={(demoData) => {
    // Load demo data into your component
    setUploadedFile(demoData);
  }}
/>
```

---

### 7. Notifications

```tsx
import { useNotifications, NotificationContainer } from "@/components/Notification";

export const App = () => {
  const { 
    notifications, 
    removeNotification, 
    showSuccess, 
    showError,
    showWarning,
    showInfo 
  } = useNotifications();

  return (
    <>
      <button onClick={() => showSuccess("Success!")}>
        Show Success
      </button>
      <NotificationContainer 
        notifications={notifications}
        onDismiss={removeNotification}
      />
    </>
  );
};
```

---

## 🎨 CSS Animation Classes

Add these classes to any element for smooth animations:

```tsx
// Entrance animations
<div className="animate-slide-up">Slides up on load</div>
<div className="animate-fade-in">Fades in smoothly</div>
<div className="animate-scale-in">Scales in with bounce</div>

// Hover/Interactive animations
<div className="animate-lift">Lifts on hover</div>
<div className="animate-glow">Glows continuously</div>
<div className="animate-pulse-glow">Pulsing glow effect</div>

// Progress/Loading
<div className="animate-progress">Progress bar animation</div>
<div className="animate-spin">Rotating spinner</div>

// Notifications
<div className="animate-toast">Slides in from right</div>
<div className="animate-check">Success checkmark</div>
```

---

## 🔄 Context Hooks

### Loading Context

```tsx
import { useLoading } from "@/lib/LoadingContext";

const { 
  isLoading,           // boolean
  loadingMessage,      // string
  showLoading,         // (message?: string) => void
  hideLoading          // () => void
} = useLoading();
```

### Notification Hook

```tsx
import { useNotifications } from "@/components/Notification";

const {
  notifications,       // Notification[]
  removeNotification,  // (id: string) => void
  showSuccess,        // (message: string) => void
  showError,          // (message: string) => void
  showWarning,        // (message: string) => void
  showInfo            // (message: string) => void
} = useNotifications();
```

---

## 🎯 Component Props Reference

### LoadingSpinner
```tsx
interface LoadingSpinnerProps {
  message?: string;              // "Analyzing document using AI..."
  size?: "sm" | "md" | "lg";    // "md"
  fullScreen?: boolean;          // false
}
```

### FeatureDescriptionCard
```tsx
interface FeatureDescriptionCardProps {
  title: string;                 // "📚 Vidyarthi AI"
  description: string;           // Tool description
  features: string[];            // ["Feature 1", "Feature 2"]
  icon?: React.ReactNode;        // "🎓"
}
```

### ArchitectureModal
```tsx
interface ArchitectureModalProps {
  isOpen: boolean;               // Modal visibility
  onClose: () => void;           // Close handler
}
```

### SystemStatusBadge
```tsx
interface SystemStatusBadgeProps {
  showDetails?: boolean;         // true
}
```

### UploadProgress
```tsx
interface UploadProgressProps {
  fileName: string;              // "document.pdf"
  progress: number;              // 0-100
  status: "uploading" | "success" | "error";
  errorMessage?: string;         // Error message
  onDismiss?: () => void;        // Dismiss handler
}
```

### TryDemoButton
```tsx
interface TryDemoProps {
  onDemoLoad: (demoData: DemoData) => void;
  toolType: "vidyarthi" | "seva" | "sarkari";
}
```

### Notification
```tsx
interface NotificationProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";  // "info"
  duration?: number;             // 4000ms
  onClose?: () => void;
}
```

---

## 💡 Best Practices

1. **Always wrap routes with LoadingProvider**
   ```tsx
   <LoadingProvider>
     {/* Your routes */}
   </LoadingProvider>
   ```

2. **Use hooks instead of components for notifications**
   ```tsx
   // Good
   const { showSuccess } = useNotifications();
   showSuccess("Done!");
   
   // Avoid
   <Notification message="Done!" type="success" />
   ```

3. **Customize loading messages**
   ```tsx
   showLoading("Uploading your document...");
   showLoading("Analyzing with AI...");
   showLoading("Saving your progress...");
   ```

4. **Use appropriate notification types**
   ```tsx
   showSuccess("Document uploaded!");      // User completed action
   showError("Failed to process file");    // Something went wrong
   showWarning("This action cannot be undone");  // Caution needed
   showInfo("New features available");     // Just FYI
   ```

5. **Responsive design considerations**
   - Components scale automatically
   - Test on mobile devices
   - Adjust padding/margins for smaller screens

---

## 🔍 Common Patterns

### Pattern 1: File Upload with Progress

```tsx
const handleFileUpload = (file: File) => {
  showLoading("Uploading file...");
  
  const progressInterval = setInterval(() => {
    setProgress(prev => Math.min(prev + 10, 90));
  }, 500);

  await uploadFile(file);
  
  clearInterval(progressInterval);
  setProgress(100);
  hideLoading();
  showSuccess("File uploaded successfully!");
};
```

### Pattern 2: Try Demo Flow

```tsx
const handleDemoClick = (demoData: DemoData) => {
  setUploadedFile(demoData);
  setMessages([
    {
      type: "ai",
      content: demoData.demoMessage
    }
  ]);
  showInfo("Demo loaded! This is sample data.");
};
```

### Pattern 3: Long Running Operation

```tsx
const handleProcessing = async () => {
  showLoading("Processing your document...");
  try {
    const result = await processDocument();
    showSuccess("Processing complete!");
  } catch (error) {
    showError("Processing failed: " + error.message);
  } finally {
    hideLoading();
  }
};
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Loading spinner not showing | Check LoadingProvider wraps your routes |
| Modal not opening | Verify `isOpen` state is true |
| Notifications not appearing | Use NotificationContainer with useNotifications |
| Animations not smooth | Enable hardware acceleration in browser |
| Components not importing | Check path uses `@/components/` |
| TypeScript errors | Verify interface matches usage |

---

## 📚 File Organization

```
New Production Components:
├── components/
│   ├── LoadingSpinner.tsx
│   ├── FeatureDescriptionCard.tsx
│   ├── ArchitectureModal.tsx
│   ├── SystemStatusBadge.tsx
│   ├── UploadProgress.tsx
│   ├── TryDemoButton.tsx
│   ├── Notification.tsx
│   └── index.ts
│
└── lib/
    └── LoadingContext.tsx
```

---

## ✅ Quality Checklist

Before deploying, verify:

- [ ] All loaders show during async operations
- [ ] Feature cards display on tool pages
- [ ] Architecture modal opens correctly
- [ ] Status badge shows in top-right
- [ ] Demo buttons load sample data
- [ ] Notifications auto-dismiss
- [ ] Animations are smooth
- [ ] Mobile responsiveness works
- [ ] Dark theme is consistent
- [ ] No console errors

---

**Happy coding! 🚀**
