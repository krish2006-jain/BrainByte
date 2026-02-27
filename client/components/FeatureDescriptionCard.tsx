import React from "react";
import { X } from "lucide-react";

interface FeatureDescriptionCardProps {
  title: string;
  description: string;
  features: string[];
  icon?: React.ReactNode;
}

export const FeatureDescriptionCard: React.FC<FeatureDescriptionCardProps> = ({
  title,
  description,
  features,
  icon,
}) => {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/20 via-slate-900/30 to-purple-950/20 p-6 md:p-8 mb-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.05) 50%, rgba(6,182,212,0.05) 100%)",
      }}
    >
      {/* Animated background glow */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.1) 0%, transparent 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-4">
          {icon && <div className="text-indigo-400 flex-shrink-0 text-3xl">{icon}</div>}
          <div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
              {title}
            </h3>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <span className="text-sm text-slate-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Border glow effect */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          borderImage:
            "linear-gradient(135deg, rgba(99,102,241,0.5) 0%, rgba(139,92,246,0.3) 50%, rgba(6,182,212,0.2) 100%) 1",
        }}
      />
    </div>
  );
};

export default FeatureDescriptionCard;
