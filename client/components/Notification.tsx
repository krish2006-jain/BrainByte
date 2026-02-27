import React, { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, XCircle, Info } from "lucide-react";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationProps {
  message: string;
  type?: NotificationType;
  duration?: number;
  onClose?: () => void;
  id?: string;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type = "info",
  duration = 4000,
  onClose,
  id,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: {
      bg: "rgba(34, 197, 94, 0.1)",
      border: "rgba(34, 197, 94, 0.3)",
      text: "rgba(134, 239, 172, 0.95)",
      icon: "text-green-400",
    },
    error: {
      bg: "rgba(239, 68, 68, 0.1)",
      border: "rgba(239, 68, 68, 0.3)",
      text: "rgba(248, 113, 113, 0.95)",
      icon: "text-red-400",
    },
    warning: {
      bg: "rgba(234, 179, 8, 0.1)",
      border: "rgba(234, 179, 8, 0.3)",
      text: "rgba(250, 204, 21, 0.95)",
      icon: "text-yellow-400",
    },
    info: {
      bg: "rgba(99, 102, 241, 0.1)",
      border: "rgba(99, 102, 241, 0.3)",
      text: "rgba(165, 180, 252, 0.95)",
      icon: "text-indigo-400",
    },
  };

  const color = colors[type];

  const icons = {
    success: <CheckCircle size={20} className={color.icon} />,
    error: <XCircle size={20} className={color.icon} />,
    warning: <AlertCircle size={20} className={color.icon} />,
    info: <Info size={20} className={color.icon} />,
  };

  return (
    <div
      className={`rounded-lg border px-4 py-3 flex items-center gap-3 transition-all duration-300 ${
        isVisible ? "animate-toast" : "opacity-0 translate-x-96"
      }`}
      style={{
        background: color.bg,
        borderColor: color.border,
        color: color.text,
      }}
      role="alert"
    >
      {icons[type]}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

// Notification Container - use this to show multiple notifications
interface NotificationContainerProps {
  notifications: Array<NotificationProps & { id: string }>;
  onDismiss: (id: string) => void;
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  onDismiss,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={() => onDismiss(notification.id)}
        />
      ))}
    </div>
  );
};

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<
    Array<NotificationProps & { id: string }>
  >([]);

  const addNotification = (props: NotificationProps) => {
    const id = `notification-${Date.now()}`;
    setNotifications((prev) => [...prev, { ...props, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const showSuccess = (message: string, duration?: number) => {
    addNotification({ message, type: "success", duration });
  };

  const showError = (message: string, duration?: number) => {
    addNotification({ message, type: "error", duration: duration ?? 5000 });
  };

  const showWarning = (message: string, duration?: number) => {
    addNotification({ message, type: "warning", duration });
  };

  const showInfo = (message: string, duration?: number) => {
    addNotification({ message, type: "info", duration });
  };

  return {
    notifications,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

export default Notification;
