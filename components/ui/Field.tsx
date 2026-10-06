import { useId } from "react";
import { cn } from "@/lib/cn";

const CONTROL =
  "w-full rounded-btn border border-line bg-surface px-3.5 text-[15px] text-ink placeholder:text-muted/80 " +
  "transition-colors hover:border-muted/50 focus-visible:border-accent-text focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-accent-soft aria-invalid:border-accent-text";

type ShellProps = {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  /** Recibe los props de accesibilidad que tiene que llevar el control. */
  children: (control: { id: string; "aria-describedby"?: string; "aria-invalid"?: true }) => React.ReactNode;
};

/** Label + control + ayuda/error, todo conectado por id. */
function FieldShell({ label, hint, error, className, children }: ShellProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {children({ id, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined })}
      {hint && !error && (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs font-semibold text-accent-text">
          {error}
        </p>
      )}
    </div>
  );
}

type Common = { label: string; hint?: string; error?: string; className?: string };

export function TextField({ label, hint, error, className, ...input }: Common & React.ComponentProps<"input">) {
  return (
    <FieldShell label={label} hint={hint} error={error} className={className}>
      {(a11y) => <input className={cn(CONTROL, "min-h-11")} {...a11y} {...input} data-autofocus={input.autoFocus || undefined} />}
    </FieldShell>
  );
}

export function TextAreaField({
  label,
  hint,
  error,
  className,
  rows = 4,
  ...textarea
}: Common & React.ComponentProps<"textarea">) {
  return (
    <FieldShell label={label} hint={hint} error={error} className={className}>
      {(a11y) => (
        <textarea
          rows={rows}
          className={cn(CONTROL, "resize-y py-2.5 leading-relaxed")}
          {...a11y}
          {...textarea}
          data-autofocus={textarea.autoFocus || undefined}
        />
      )}
    </FieldShell>
  );
}

export function SelectField({ label, hint, error, className, ...select }: Common & React.ComponentProps<"select">) {
  return (
    <FieldShell label={label} hint={hint} error={error} className={className}>
      {(a11y) => <select className={cn(CONTROL, "min-h-11 appearance-auto")} {...a11y} {...select} />}
    </FieldShell>
  );
}
