import Link from "next/link";
import { Gavel, MessageCircleQuestionMark, Repeat, Timer, type LucideIcon } from "lucide-react";

const SHORTCUTS: Array<{ href: string; label: string; icon: LucideIcon }> = [
  { href: "/tarjetas/repasar", label: "Repasar tarjetas", icon: Repeat },
  { href: "/preguntas?nueva=1", label: "Anotar una pregunta", icon: MessageCircleQuestionMark },
  { href: "/simulacro?modo=tribunal", label: "Modo tribunal", icon: Gavel },
  { href: "/foco", label: "Bloque de foco", icon: Timer },
];

export function Shortcuts() {
  return (
    <section aria-labelledby="atajos">
      <h2 id="atajos" className="mb-3 text-lg font-semibold">
        Atajos
      </h2>
      <ul className="grid grid-cols-2 gap-3">
        {SHORTCUTS.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex min-h-24 flex-col justify-between gap-3 rounded-card border border-line bg-surface p-4 transition-colors hover:bg-sunken"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-[11px] bg-accent-soft text-accent-text">
                <Icon aria-hidden className="size-[18px]" />
              </span>
              <span className="text-[15px] leading-tight font-semibold">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
