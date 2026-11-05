import Link from "next/link";
import { ArrowRight, Check, Clock, Route, Upload } from "lucide-react";
import { ModeChip } from "@/components/features/plan/ModeChip";
import { phaseLabel } from "@/components/features/plan/phase";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Pill";
import { formatShortDate } from "@/lib/plan";
import type { Agenda } from "@/lib/agenda";
import type { DB } from "@/lib/data/types";
import { startHref, type TodayView } from "@/lib/today";
import { TodayAgenda } from "./TodayAgenda";

/**
 * Tarjeta héroe "Hoy toca": el tema del día (del cronograma o, si no hay, de la ruta integrada)
 * y adentro "Tu día": recuperar, estudiar, conectar, caso, oral y errores, más tarjetas y Tablero.
 */
export function HeroToday({ v, agenda, db }: { v: TodayView; agenda: Agenda; db: DB }) {
  const list = <TodayAgenda agenda={agenda} db={db} />;
  const route = agenda.route;
  const routeKicker = route ? (route.status === "antes" ? "La ruta integrada empieza el lunes" : `Ruta integrada · semana ${route.week}`) : null;
  const secondary = (
    <Link href="/plan" className={buttonClasses({ variant: "hero", size: "lg" })}>
      Ver el plan
    </Link>
  );
  const reviewCards = (
    <Link href="/tarjetas/repasar" className={buttonClasses({ variant: "primary", size: "lg" })}>
      Repasar tarjetas <ArrowRight aria-hidden />
    </Link>
  );

  if (!v.hasPlan && !route) {
    return (
      <Shell kicker="Hoy toca" title="Armá tu forma de estudiar">
        <p className="mt-2 max-w-xl text-[15px] opacity-85">
          Importá tu cronograma, empezá la ruta integrada de 12 semanas, o las dos: acá vas a ver qué toca cada día, todo junto.
        </p>
        {list}
        <Actions>
          <Link href="/plan/importar" className={buttonClasses({ variant: "primary", size: "lg" })}>
            <Upload aria-hidden /> Importá tu cronograma
          </Link>
          <Link href="/programa/ruta" className={buttonClasses({ variant: "hero", size: "lg" })}>
            <Route aria-hidden /> Empezar la ruta
          </Link>
        </Actions>
      </Shell>
    );
  }

  if (v.day) {
    const done = Boolean(v.day.done_at);
    return (
      <Shell
        kicker={`Hoy toca · Semana ${v.week?.num ?? "?"}${v.phase ? ` · Fase ${phaseLabel(v.phase)}` : ""}`}
        title={v.day.content}
      >
        <div className="mt-4 flex flex-wrap gap-2">
          <ModeChip mode={v.day.mode} tone="hero" />
          <Chip tone="hero">
            <Clock aria-hidden /> 1 hora alcanza si es activa
          </Chip>
          {done && (
            <Chip tone="sage">
              <Check aria-hidden /> Hecho
            </Chip>
          )}
        </div>
        {v.week?.tip && (
          <p className="mt-4 max-w-3xl text-[15px] text-hero-ink/90">
            <span className="font-semibold text-hero-accent">Tip del tribunal:</span> {v.week.tip}
          </p>
        )}
        {list}
        <Actions>
          <Link href={startHref(v.day.mode, v.dayTask?.id ?? null)} className={buttonClasses({ variant: "primary", size: "lg" })}>
            Empezar <ArrowRight aria-hidden />
          </Link>
          {secondary}
        </Actions>
      </Shell>
    );
  }

  const next = v.nextDay && (
    <p className="mt-3 text-[15px] opacity-85">
      Lo próximo del plan, {v.nextDay.weekday} {formatShortDate(v.nextDay.date)}: {v.nextDay.content}
    </p>
  );

  if (route) {
    return (
      <Shell kicker={`Hoy toca · ${routeKicker}`} title={route.title}>
        <p className="mt-2 max-w-xl text-[15px] opacity-85">
          Eje: {route.ejeTitle}.{v.hasPlan ? " Hoy no hay día del cronograma." : ""}
        </p>
        {next}
        {list}
        <Actions>
          <Link href="/programa/ruta" className={buttonClasses({ variant: "primary", size: "lg" })}>
            Ver la ruta <ArrowRight aria-hidden />
          </Link>
          {v.hasPlan && secondary}
        </Actions>
      </Shell>
    );
  }

  if (v.isWeekend) {
    return (
      <Shell kicker="Fin de semana" title="Descanso o repaso libre">
        <p className="mt-2 max-w-xl text-[15px] opacity-85">Si tenés ganas, unas tarjetas rápidas. Si no, descansar también es parte del plan.</p>
        {next}
        {list}
        <Actions>
          {reviewCards}
          {secondary}
        </Actions>
      </Shell>
    );
  }

  return (
    <Shell kicker="Hoy no hay nada del plan" title="Día libre de plan">
      <p className="mt-2 max-w-xl text-[15px] opacity-85">Aprovechá para repasar tarjetas o retomar lo que quedó pendiente en el Tablero.</p>
      {next}
      {list}
      <Actions>
        {reviewCards}
        {secondary}
      </Actions>
    </Shell>
  );
}

function Shell({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <Card tone="hero" className="p-6 desk:p-8">
      <p className="text-sm font-semibold opacity-80">{kicker}</p>
      <h2 className="mt-2 max-w-3xl text-[1.75rem] leading-tight font-semibold desk:text-4xl">{title}</h2>
      {children}
    </Card>
  );
}

function Actions({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 flex flex-wrap gap-3">{children}</div>;
}
