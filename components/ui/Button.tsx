import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "hero";
type Size = "md" | "lg" | "icon";

const VARIANTS: Record<Variant, string> = {
  // Texto sobre acento: siempre accent-ink, nunca blanco.
  primary: "bg-accent text-accent-ink hover:brightness-[1.04] active:brightness-95",
  secondary: "border border-line bg-surface text-ink hover:bg-sunken",
  ghost: "text-ink hover:bg-sunken",
  // Botón secundario dentro de la tarjeta héroe.
  hero: "border border-hero-ink/25 text-hero-ink hover:bg-hero-ink/10",
};

const SIZES: Record<Size, string> = {
  md: "min-h-11 px-4 text-[15px]",
  lg: "min-h-13 px-6 text-base",
  icon: "size-11 shrink-0",
};

export function buttonClasses({
  variant = "secondary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-btn font-semibold whitespace-nowrap",
    "transition-[background-color,filter,color] duration-150 select-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-[18px] [&_svg]:shrink-0",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

type ButtonProps = React.ComponentProps<"button"> & { variant?: Variant; size?: Size };

/**
 * Botón base. Con `size="icon"` es obligatorio pasar `aria-label`.
 * Para links con estilo de botón usar `buttonClasses()` sobre `<Link>`.
 */
export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...props} />;
}
