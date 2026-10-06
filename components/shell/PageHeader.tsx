import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { QuickAddButton } from "./QuickAdd";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  kicker: string;
  title: string;
  /** Solo celular: botón ← (p. ej. pantallas que se abren desde "Más"). */
  backHref?: string;
  backLabel?: string;
  /** Acciones propias de la sección (botones a la derecha del título). */
  actions?: React.ReactNode;
  className?: string;
};

/** Encabezado de cada sección: bajada chica + título grande; buscador global en desktop. */
export function PageHeader({ kicker, title, backHref, backLabel = "Volver", actions, className }: Props) {
  return (
    <header className={cn("pt-safe", className)}>
      {/* Fila superior del celular: volver + tema. */}
      <div className="flex min-h-11 items-center justify-between pt-3 desk:hidden">
        {backHref ? (
          <Link
            href={backHref}
            aria-label={backLabel}
            className="-ml-2.5 inline-flex size-11 items-center justify-center rounded-btn text-ink hover:bg-sunken"
          >
            <ArrowLeft aria-hidden className="size-5" />
          </Link>
        ) : (
          <span />
        )}
        <div className="-mr-2.5 flex items-center gap-1">
          <ThemeToggle />
          <QuickAddButton />
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 pt-1 pb-6 desk:pt-10 desk:pb-8">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-muted">{kicker}</p>
          <h1 className="mt-0.5 text-[2rem] leading-tight font-semibold desk:text-[2.75rem]">{title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 desk:gap-3">
          {actions}
          <GlobalSearch />
        </div>
      </div>
    </header>
  );
}

function GlobalSearch() {
  return (
    <form role="search" className="relative hidden desk:block" action="#">
      <label htmlFor="global-search" className="sr-only">
        Buscar tema, pregunta o tarjeta
      </label>
      <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
      <input
        id="global-search"
        type="search"
        placeholder="Buscar tema, pregunta o tarjeta"
        className="min-h-11 w-72 rounded-full border border-line bg-surface pr-4 pl-10 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:border-accent-text"
      />
    </form>
  );
}
