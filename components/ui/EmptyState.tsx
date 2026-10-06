import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  icon: LucideIcon;
  title: string;
  children?: React.ReactNode;
  /** Acción clara para salir del estado vacío (botón o link). */
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ icon: Icon, title, children, action, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-card border border-dashed border-line px-6 py-10 text-center",
        className,
      )}
    >
      <span className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent-text">
        <Icon aria-hidden className="size-6" />
      </span>
      <h3 className="text-lg font-semibold">{title}</h3>
      {children && <p className="mt-1.5 max-w-sm text-[15px] text-muted">{children}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
