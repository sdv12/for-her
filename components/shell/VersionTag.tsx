import { cn } from "@/lib/cn";

/** Versión de la app (package.json). Va al pie del sidebar, de "Más" y de Ajustes. */
export function VersionTag({ className, inline = false }: { className?: string; inline?: boolean }) {
  return <span className={cn("tabular text-xs text-muted", inline ? "inline" : "block", className)}>v{process.env.NEXT_PUBLIC_APP_VERSION}</span>;
}
