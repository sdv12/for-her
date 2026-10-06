import { Card } from "@/components/ui/Card";
import { Dot } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Subject, SyllabusTopic } from "@/lib/data/types";
import { subjectColorVar } from "@/lib/subjects";
import { mastery } from "@/lib/syllabus";

/** "Avance del temario": total y por materia. Pensado para reutilizar en Hoy. */
export function SyllabusProgress({ subjects, topics }: { subjects: Subject[]; topics: SyllabusTopic[] }) {
  const total = mastery(topics);
  const rows = subjects
    .map((s) => ({ subject: s, value: mastery(topics.filter((t) => t.subject_id === s.id)) }))
    .filter((r) => r.value !== null);

  return (
    <Card>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-semibold">Avance del temario</h2>
        <span className="tabular font-display text-3xl font-semibold tracking-[-0.03em]">{total ?? 0}%</span>
      </div>
      <ProgressBar label="Avance total del temario" value={total ?? 0} tone="sage" className="mt-2" />
      <ul className="mt-4 flex flex-col gap-2.5">
        {rows.map(({ subject, value }) => (
          <li key={subject.id} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
            <span className="flex min-w-0 items-center gap-2 truncate text-sm font-semibold">
              <Dot color={subjectColorVar(subject.color)} /> {subject.name}
            </span>
            <span className="tabular text-sm text-muted">{value}%</span>
            <ProgressBar label={`Avance de ${subject.name}`} value={value!} tone="sage" className="col-span-2 h-1.5" />
          </li>
        ))}
      </ul>
    </Card>
  );
}
