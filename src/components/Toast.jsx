import React from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

const Toast = ({ toasts }) => {
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        );
      case "error":
        return <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-[#d97706] flex-shrink-0" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case "success":
        return "border-l-emerald-500";
      case "error":
        return "border-l-rose-500";
      default:
        return "border-l-[#d97706]";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[3000] flex flex-col gap-3 max-w-[calc(100vw-48px)] pointer-events-none">
      {toasts.map(({ id, message, type }) => (
        <div
          key={id}
          className={`bg-white/95 backdrop-blur-md border border-slate-200/80 border-l-4 ${getBorderColor(
            type,
          )} rounded-xl px-4 py-3.5 flex items-center gap-3 min-w-[280px] max-w-[380px] shadow-lg shadow-slate-200/80 pointer-events-auto animate-slide-in`}
        >
          {getIcon(type)}
          <span className="text-sm font-semibold text-slate-800 leading-snug">
            {message}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Toast;
