"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

type Option<T extends string> = { value: T; label: React.ReactNode };

type Props<T extends string> = {
  options: ReadonlyArray<Option<T>>;
  value: T;
  onChange: (value: T) => void;
  /** Nombre accesible del grupo, p. ej. "Modo del simulacro". */
  label: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
};

/** Control segmentado con semántica de radiogroup: flechas cambian la opción. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
  fullWidth = false,
  disabled = false,
}: Props<T>) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const delta = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!delta || disabled) return;
    e.preventDefault();
    const next = (index + delta + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-disabled={disabled || undefined}
      className={cn(
        "inline-flex gap-1 rounded-btn bg-sunken p-1",
        fullWidth && "flex w-full",
        className,
      )}
    >
      {options.map((opt, i) => {
        const checked = opt.value === value;
        return (
          <button
            key={opt.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            disabled={disabled && !checked}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "min-h-10 rounded-[11px] px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-150",
              fullWidth && "flex-1",
              checked ? "bg-surface text-ink ring-1 ring-line" : "text-muted hover:text-ink",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-muted",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
