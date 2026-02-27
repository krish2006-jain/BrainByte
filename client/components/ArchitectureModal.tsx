import React, { useState } from "react";
import { X } from "lucide-react";

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
        style={{
          animation: "fadeIn 0.3s ease-out",
        }}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-4xl mx-4 max-h-[85vh] overflow-y-auto rounded-2xl border border-indigo-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-2xl"
        style={{
          animation: "scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          background:
            "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.95) 50%, rgba(15,23,42,0.95) 100%)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="pt-4">
          {/* Title */}
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
            Bharat AI Architecture
          </h2>
          <p className="text-slate-400 mb-8">
            Scalable cloud infrastructure powering intelligent document analysis
          </p>

          {/* Architecture Diagram */}
          <div className="relative">
            {/* Background grid */}
            <div
              className="absolute inset-0 rounded-lg opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative space-y-8 p-8 bg-slate-900/30 rounded-lg border border-slate-700/50">
              {/* Frontend Section */}
              <ArchitectureBlock
                title="Frontend Layer"
                items={[
                  { label: "S3 Static Hosting", icon: "📦", color: "from-orange-500 to-red-500" },
                  { label: "React + TypeScript", icon: "⚛️", color: "from-blue-500 to-cyan-500" },
                ]}
              />

              {/* Arrow Down */}
              <div className="flex justify-center">
                <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-transparent" />
                <div className="absolute text-slate-500 text-xl">↓</div>
              </div>

              {/* Backend Section */}
              <ArchitectureBlock
                title="Application Layer"
                items={[
                  { label: "AWS Lambda", icon: "🖥️", color: "from-yellow-500 to-orange-500" },
                  { label: "Node.js + Express", icon: "🚀", color: "from-green-500 to-emerald-500" },
                ]}
              />

              {/* Arrow Down */}
              <div className="flex justify-center">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-transparent" />
                <div className="absolute text-slate-500 text-xl">↓</div>
              </div>

              {/* AI Layer */}
              <ArchitectureBlock
                title="AI Intelligence Layer"
                items={[
                  { label: "AWS Bedrock", icon: "🧠", color: "from-purple-500 to-pink-500" },
                  {
                    label: "Claude API + LLMs",
                    icon: "⚡",
                    color: "from-violet-500 to-purple-500",
                  },
                ]}
              />

              {/* Arrow Down */}
              <div className="flex justify-center">
                <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-transparent" />
                <div className="absolute text-slate-500 text-xl">↓</div>
              </div>

              {/* Data Layer */}
              <div className="grid grid-cols-2 gap-4">
                <ArchitectureBlock
                  title="Database"
                  items={[
                    { label: "RDS PostgreSQL", icon: "🗄️", color: "from-blue-500 to-indigo-500" },
                  ]}
                />
                <ArchitectureBlock
                  title="Storage"
                  items={[
                    { label: "S3 Document Storage", icon: "💾", color: "from-orange-400 to-red-400" },
                  ]}
                />
              </div>

              {/* Key Features */}
              <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border border-indigo-500/20">
                <h4 className="text-lg font-semibold text-indigo-300 mb-4">✨ Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    High-availability multi-region deployment
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    99.9% uptime SLA
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    Advanced encryption at rest and in transit
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
                    Real-time AI processing with 2s latency
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ArchitectureBlockProps {
  title: string;
  items: Array<{ label: string; icon: string; color: string }>;
}

const ArchitectureBlock: React.FC<ArchitectureBlockProps> = ({ title, items }) => (
  <div>
    <h4 className="text-sm font-semibold text-slate-400 mb-3">{title}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="p-4 rounded-lg border border-slate-600/50 hover:border-slate-500/70 transition-all hover:shadow-lg hover:shadow-indigo-500/10 group"
          style={{
            background: "linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.8) 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{item.icon}</span>
            <span className="text-sm font-medium text-slate-200 group-hover:text-indigo-300 transition-colors">
              {item.label}
            </span>
          </div>
          <div
            className={`h-1 mt-3 rounded-full bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`}
          />
        </div>
      ))}
    </div>
  </div>
);

export default ArchitectureModal;
