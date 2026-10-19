import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastData {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

interface ToastNotificationProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toasts,
  onDismiss,
}) => {
  return (
    <div className="fixed top-16 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 border-2 shadow-[4px_4px_0_#000000] flex items-start justify-between gap-2.5 animate-in slide-in-from-right duration-150 ${
              toast.type === 'success'
                ? 'bg-[#0f241a] border-[#10b981] text-[#f5ebe0]'
                : toast.type === 'error'
                ? 'bg-[#2b1212] border-red-500 text-[#f5ebe0]'
                : 'bg-[#101e28] border-[#06b6d4] text-[#f5ebe0]'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {toast.type === 'success' && (
                <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
              )}
              {toast.type === 'error' && (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              )}
              {toast.type === 'info' && (
                <Info className="w-4 h-4 text-[#06b6d4] shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-pixel text-[9px] uppercase tracking-wider">
                  {toast.title}
                </h4>
                <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-snug">
                  {toast.message}
                </p>
              </div>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
