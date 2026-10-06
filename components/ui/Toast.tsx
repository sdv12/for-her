"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type ToastAction = { label: string; onClick: () => void };
type ToastInput = { message: string; actions?: ToastAction[]; duration?: number };
type ToastState = ToastInput & { id: number };

const ToastContext = createContext<((t: ToastInput) => void) | null>(null);

/** Un toast a la vez, abajo (por encima de la barra del celular). Se va solo a los 6 s. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seq = useRef(0);

  const dismiss = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setToast(null);
  }, []);

  const show = useCallback((t: ToastInput) => {
    seq.current += 1;
    setToast({ ...t, id: seq.current });
  }, []);

  useEffect(() => {
    if (!toast) return;
    timer.current = setTimeout(() => setToast(null), toast.duration ?? 6000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [toast]);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-[calc(6.5rem+env(safe-area-inset-bottom))] z-50 flex justify-center px-4 desk:right-6 desk:bottom-6 desk:left-auto desk:justify-end"
      >
        {toast && (
          <div
            key={toast.id}
            className="pointer-events-auto flex w-full max-w-md items-center gap-2 rounded-card-sm bg-hero py-2 pr-2 pl-4 text-hero-ink shadow-float"
            onMouseEnter={() => timer.current && clearTimeout(timer.current)}
          >
            <p className="flex-1 py-1.5 text-sm font-semibold">{toast.message}</p>
            {toast.actions?.map((a) => (
              <button
                key={a.label}
                type="button"
                onClick={() => {
                  a.onClick();
                  dismiss();
                }}
                className="min-h-11 rounded-btn px-3 text-sm font-bold text-accent hover:bg-hero-ink/10"
              >
                {a.label}
              </button>
            ))}
            <button
              type="button"
              onClick={dismiss}
              aria-label="Cerrar aviso"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-btn text-hero-ink/70 hover:bg-hero-ink/10"
            >
              <X aria-hidden className="size-4" />
            </button>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast tiene que usarse dentro de <ToastProvider>.");
  return ctx;
}
