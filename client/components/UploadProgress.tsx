import React from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface UploadProgressProps {
  fileName: string;
  progress: number; // 0-100
  status: "uploading" | "success" | "error";
  errorMessage?: string;
  onDismiss?: () => void;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({
  fileName,
  progress,
  status,
  errorMessage,
  onDismiss,
}) => {
  return (
    <div
      className="rounded-lg border p-4 mb-4 animate-slide-up"
      style={{
        borderColor:
          status === "success"
            ? "rgba(34, 197, 94, 0.3)"
            : status === "error"
              ? "rgba(239, 68, 68, 0.3)"
              : "rgba(99, 102, 241, 0.3)",
        background:
          status === "success"
            ? "rgba(34, 197, 94, 0.05)"
            : status === "error"
              ? "rgba(239, 68, 68, 0.05)"
              : "rgba(99, 102, 241, 0.05)",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {status === "uploading" && <Loader2 size={18} className="text-indigo-500 animate-spin" />}
          {status === "success" && <CheckCircle size={18} className="text-green-500" />}
          {status === "error" && <AlertCircle size={18} className="text-red-500" />}
          <span className="text-sm font-medium text-slate-300">{fileName}</span>
        </div>
        {status === "success" && (
          <span className="text-xs font-semibold text-green-400">100%</span>
        )}
        {status === "uploading" && <span className="text-xs font-semibold text-indigo-400">{progress}%</span>}
      </div>

      {/* Progress bar */}
      {status === "uploading" && (
        <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      )}

      {status === "error" && (
        <div className="text-xs text-red-400 mt-2">
          {errorMessage || "Upload failed. Please try again."}
        </div>
      )}

      {status === "success" && (
        <div className="text-xs text-green-400">
          ✓ Upload completed successfully
        </div>
      )}
    </div>
  );
};

export default UploadProgress;
