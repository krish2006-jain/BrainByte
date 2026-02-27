import React, { useState, useEffect } from "react";
import { Activity, AlertCircle, CheckCircle } from "lucide-react";

interface SystemStatusBadgeProps {
  showDetails?: boolean;
}

interface ServiceStatus {
  name: string;
  status: "connected" | "loading" | "disconnected";
  latency?: number;
}

export const SystemStatusBadge: React.FC<SystemStatusBadgeProps> = ({ showDetails = true }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: "Bedrock AI", status: "connected", latency: 145 },
    { name: "Backend API", status: "connected", latency: 32 },
    { name: "Storage (S3)", status: "connected", latency: 89 },
  ]);

  useEffect(() => {
    // Simulate checking connection status
    const checkStatus = () => {
      setIsOnline(Math.random() > 0.05);
    };

    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const allConnected = services.every((s) => s.status === "connected");

  return (
    <div className="relative">
      {/* Status Badge */}
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="px-4 py-2 rounded-full border border-green-500/30 bg-gradient-to-r from-green-950/50 to-emerald-950/50 hover:from-green-900/60 hover:to-emerald-900/60 flex items-center gap-2 transition-all hover:border-green-500/50 group"
      >
        {/* Pulsing indicator */}
        <div className="relative w-3 h-3">
          <div className="absolute inset-0 rounded-full bg-green-500 animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-green-400 group-hover:border-green-300 transition-colors" />
        </div>

        <span className="text-sm font-semibold text-green-300">
          {isOnline ? "AI Online" : "AI Offline"}
        </span>

        {/* Info icon */}
        <Activity size={16} className="text-green-400/60 ml-1" />
      </button>

      {/* Tooltip */}
      {showTooltip && showDetails && (
        <div
          className="absolute right-0 top-full mt-2 w-80 p-4 rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl z-50"
          style={{
            animation: "slideInUp 0.3s ease-out",
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.95) 100%)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-200">System Status</h3>
            <div className="flex items-center gap-2">
              {allConnected ? (
                <CheckCircle size={18} className="text-green-500" />
              ) : (
                <AlertCircle size={18} className="text-yellow-500" />
              )}
              <span className="text-xs font-medium text-slate-400">
                {allConnected ? "All Systems Operational" : "Some Issues Detected"}
              </span>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-gradient-to-r from-slate-700 to-transparent mb-4" />

          {/* Service Status List */}
          <div className="space-y-3">
            {services.map((service, idx) => (
              <div key={idx} className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-300">{service.name}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold ${
                        service.status === "connected"
                          ? "text-green-400"
                          : service.status === "loading"
                            ? "text-yellow-400"
                            : "text-red-400"
                      }`}
                    >
                      {service.status === "connected"
                        ? "✓ Connected"
                        : service.status === "loading"
                          ? "◐ Checking..."
                          : "✗ Down"}
                    </span>
                    {service.latency && (
                      <span className="text-xs text-slate-500">{service.latency}ms</span>
                    )}
                  </div>
                </div>

                {/* Status bar */}
                <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      service.status === "connected"
                        ? "w-full bg-gradient-to-r from-green-500 to-emerald-500"
                        : service.status === "loading"
                          ? "w-3/4 bg-gradient-to-r from-yellow-500 to-orange-500"
                          : "w-1/3 bg-gradient-to-r from-red-500 to-pink-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <p className="text-xs text-slate-400">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showTooltip && (
        <div className="fixed inset-0 z-40" onClick={() => setShowTooltip(false)} />
      )}
    </div>
  );
};

export default SystemStatusBadge;
