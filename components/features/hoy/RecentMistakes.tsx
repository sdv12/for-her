import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Mistake } from "@/lib/data/types";
import { ORIGIN_LABEL } from "@/lib/mistakes";

/** "Para no repetir": los dos errores abiertos más recientes. */
export function RecentMistakes({ mistakes }: { mistakes: Mistake[] }) {
  return (
    <Card className="p-5 desk:p-6">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold">Para no repetir</h2>
        <Link href="/errores" className="shrink-0 rounded-btn px-2 py-1 text-sm font-semibold text-accent-text hover:underline">
          Ver errores
        </Link>
      </div>
      {mistakes.length === 0 ? (
        <p className="mt-2 text-[15px] text-muted">
          Sin errores abiertos. Cuando marques “Otra vez” en una tarjeta o “Flojo” en un simulacro, aparecen acá.
        </p>
      ) : (
        <ul className="mt-3 flex flex-col gap-4">
          {mistakes.map((m) => (
            <li key={m.id}>
              <p className="text-xs font-semibold text-muted">
                {ORIGIN_LABEL[m.origin]}
                {m.times > 1 && ` · ${m.times} veces`}
              </p>
              <p className="mt-0.5 text-[15px] leading-snug font-semibold">{m.text}</p>
              <p className="mt-2 rounded-[12px] bg-sage-soft px-3 py-2 text-sm leading-snug">{m.correction}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
