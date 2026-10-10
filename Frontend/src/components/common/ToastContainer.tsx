import React from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { useToast, ToastItem, ToastType } from "../../context/ToastContext";

const typeStyles: Record<
  ToastType,
  {
    icon: React.ReactNode;
    bg: string;
    border: string;
    text: string;
    iconColor: string;
  }
> = {
  success: {
    icon: <CheckCircle2 className="w-5 h-5" />,
    bg: "bg-white dark:bg-gray-800",
    border: "border-green-500/40 dark:border-green-500/40",
    text: "text-gray-900 dark:text-gray-100",
    iconColor: "text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-950/40",
  },
  error: {
    icon: <AlertCircle className="w-5 h-5" />,
    bg: "bg-white dark:bg-gray-800",
    border: "border-red-500/40 dark:border-red-500/40",
    text: "text-gray-900 dark:text-gray-100",
    iconColor: "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/40",
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5" />,
    bg: "bg-white dark:bg-gray-800",
    border: "border-amber-500/40 dark:border-amber-500/40",
    text: "text-gray-900 dark:text-gray-100",
    iconColor: "text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40",
  },
  info: {
    icon: <Info className="w-5 h-5" />,
    bg: "bg-white dark:bg-gray-800",
    border: "border-blue-500/40 dark:border-blue-500/40",
    text: "text-gray-900 dark:text-gray-100",
    iconColor: "text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40",
  },
};

const ToastMessage: React.FC<{ toast: ToastItem; onDismiss: () => void }> = ({
  toast,
  onDismiss,
}) => {
  const style = typeStyles[toast.type] || typeStyles.info;

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border ${style.bg} ${style.border} transition-all duration-300 transform translate-y-0 opacity-100 hover:shadow-2xl`}
    >
      <div className={`p-2 rounded-lg flex-shrink-0 ${style.iconColor}`}>
        {style.icon}
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        {toast.title && (
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight mb-0.5">
            {toast.title}
          </h4>
        )}
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug break-words">
          {toast.message}
        </p>
      </div>

      <button
        onClick={onDismiss}
        className="flex-shrink-0 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
        aria-label="Cerrar notificación"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((item) => (
        <ToastMessage
          key={item.id}
          toast={item}
          onDismiss={() => removeToast(item.id)}
        />
      ))}
    </div>
  );
};
