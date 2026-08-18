import React from "react";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

const Toast = ({ toasts }) => {
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-danger" />;
      default:
        return <Info className="w-5 h-5 text-accent" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case "success":
        return "border-success";
      case "error":
        return "border-danger";
      default:
        return "border-accent";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[3000] flex flex-col gap-3 max-w-[calc(100vw-48px)]">
      {toasts.map(({ id, message, type }) => (
        <div
          key={id}
          className={`bg-bg-dark-2 border border-white/10 border-l-4 ${getBorderColor(type)} rounded-xl px-5 py-3.5 flex items-center gap-3 min-w-[280px] shadow-xl shadow-black/60 animate-slide-in`}
        >
          {getIcon(type)}
          <span className="text-sm font-medium">{message}</span>
        </div>
      ))}
    </div>
  );
};

export default Toast;
