import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Analyzing document using AI...",
  size = "md",
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Outer glow ring */}
        <div
          className={`${sizeClasses[size]} rounded-full border-2 border-transparent border-t-indigo-500 border-r-indigo-500 animate-spin`}
          style={{
            boxShadow: "0 0 20px rgba(99, 102, 241, 0.5), inset 0 0 20px rgba(99, 102, 241, 0.1)",
          }}
        />
        {/* Inner rotating orb */}
        <div
          className={`${sizeClasses[size]} absolute inset-0 rounded-full border-2 border-transparent border-b-purple-500 border-l-purple-500 animate-spin`}
          style={{
            animationDirection: "reverse",
            animationDuration: "2s",
          }}
        />
      </div>

      {message && (
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">{message}</p>
          <div className="mt-2 flex gap-1 justify-center">
            <div
              className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="relative rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80 p-12 shadow-2xl">
          <div
            className="absolute inset-0 rounded-2xl opacity-20"
            style={{
              background:
                "radial-gradient(circle at top-right, rgba(99,102,241,0.3), transparent 60%)",
            }}
          />
          <div className="relative">{spinnerContent}</div>
        </div>
      </div>
    );
  }

  return <div className="flex items-center justify-center p-6">{spinnerContent}</div>;
};

export default LoadingSpinner;
