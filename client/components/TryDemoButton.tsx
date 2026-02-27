import React, { useState } from "react";
import { Zap, FileText } from "lucide-react";

interface TryDemoProps {
  onDemoLoad: (demoData: DemoData) => void;
  toolType: "vidyarthi" | "seva" | "sarkari";
}

export interface DemoData {
  filename: string;
  content: string;
  demoMessage: string;
}

const demosData: Record<string, DemoData> = {
  vidyarthi: {
    filename: "Sample_Study_Material.pdf",
    content:
      "data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmo...",
    demoMessage:
      "📚 Loaded sample study material on 'Photosynthesis'. Ask me anything about it!",
  },
  seva: {
    filename: "Sample_Medical_Report.pdf",
    content:
      "data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmo...",
    demoMessage:
      "📋 Loaded sample medical report. I can help you understand the values and findings. What would you like to know?",
  },
  sarkari: {
    filename: "Sample_Government_Documents.pdf",
    content:
      "data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmo...",
    demoMessage:
      "🏛️ Loaded sample government documents. I can help you with document verification and requirements!",
  },
};

export const TryDemoButton: React.FC<TryDemoProps> = ({ onDemoLoad, toolType }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleTryDemo = async () => {
    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      const demo = demosData[toolType];
      onDemoLoad(demo);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleTryDemo}
      disabled={isLoading}
      className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-lg text-sm transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
      style={{
        background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
        border: "1px solid rgba(99,102,241,0.3)",
        color: "rgba(165,180,252,0.9)",
      }}
    >
      {isLoading ? (
        <>
          <div
            className="w-4 h-4 rounded-full border-2 border-indigo-500/30 border-t-indigo-400 animate-spin"
          />
          <span>Loading Demo...</span>
        </>
      ) : (
        <>
          <Zap className="w-4 h-4 group-hover:animate-pulse" />
          <span>Try Demo</span>
        </>
      )}

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.4), transparent)",
        }}
      />
    </button>
  );
};

export default TryDemoButton;
