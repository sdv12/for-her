"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** "auto": bottom sheet en celular, panel lateral derecho en desktop. */
  side?: "auto" | "bottom";
  children: React.ReactNode;
  footer?: React.ReactNode;
};

/**
 * Sheet sobre <dialog> nativo: trae foco atrapado, Esc y fondo inerte gratis.
 * Cerrar tocando el fondo también llama a onClose.
 */
export function Sheet({ open, onClose, title, side = "auto", children, footer }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // showModal() mueve el foco al primer elemento (el botón de cerrar). Si un campo pidió autoFocus,
      // React ya intentó enfocarlo con el dialog cerrado: lo hacemos ahora que está abierto.
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={cn(
        "fixed m-0 max-w-none bg-surface p-0 text-ink shadow-float",
        "backdrop:bg-[rgb(26_20_17/0.45)]",
        // Celular: desde abajo.
        "inset-x-0 top-auto bottom-0 max-h-[90dvh] w-full rounded-t-[24px]",
        side === "auto" &&
          "desk:inset-y-0 desk:right-0 desk:left-auto desk:h-dvh desk:max-h-none desk:w-[420px] desk:rounded-none desk:rounded-l-[24px]",
        side === "bottom" && "desk:inset-x-auto desk:left-1/2 desk:w-[520px] desk:-translate-x-1/2",
      )}
    >
      <div className="flex max-h-[inherit] flex-col desk:h-full">
        {side === "auto" ? (
          <span aria-hidden className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-line desk:hidden" />
        ) : (
          <span aria-hidden className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-line" />
        )}
        <header className="flex items-center justify-between gap-3 px-5 pt-3 pb-2 desk:pt-5">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-btn text-muted hover:bg-sunken hover:text-ink"
          >
            <X className="size-5" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-5 pb-5">{children}</div>
        {footer && <footer className="border-t border-line px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">{footer}</footer>}
      </div>
    </dialog>
  );
}
