"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Download, RotateCcw, Sparkles, Upload } from "lucide-react";
import { PageHeader } from "@/components/shell/PageHeader";
import { VersionTag } from "@/components/shell/VersionTag";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TextField } from "@/components/ui/Field";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Sheet } from "@/components/ui/Sheet";
import { useToast } from "@/components/ui/Toast";
import { fieldErrors, profileInput, type ProfileInput } from "@/lib/data/schemas";
import type { DB, Profile } from "@/lib/data/types";
import { blocksGoal } from "@/lib/focus";
import { exportData, readBackup, resetToExample, restoreBackup, setThemePreference, startFresh, updateProfile } from "@/lib/mock/actions/settings";
import { useDB } from "@/lib/mock/store";

type Confirm =
  | { kind: "restore"; db: DB; counts: Record<string, number>; fileName: string }
  | { kind: "fresh" }
  | { kind: "example" }
  | null;

const THEMES = [
  { value: "system", label: "Como el sistema" },
  { value: "light", label: "Claro" },
  { value: "dark", label: "Oscuro" },
] as const;

export function SettingsView() {
  const db = useDB();
  const toast = useToast();
  const { setTheme } = useTheme();
  const [confirm, setConfirm] = useState<Confirm>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const header = <PageHeader kicker="Tu cuenta" title="Ajustes" backHref="/mas" backLabel="Volver a Más" />;

  if (!db) {
    return (
      <>
        {header}
        <div aria-busy="true" aria-label="Cargando" className="flex animate-pulse flex-col gap-4">
          <div className="h-64 rounded-card bg-sunken" />
          <div className="h-40 rounded-card bg-sunken" />
        </div>
      </>
    );
  }

  function download() {
    const { filename, json } = exportData();
    const url = URL.createObjectURL(new Blob([json], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast({ message: `Descargué ${filename}.` });
  }

  async function onBackupFile(file: File | undefined) {
    if (!file) return;
    const r = readBackup(await file.text());
    if (!r.ok) return setFileError(r.error);
    setFileError(null);
    setConfirm({ kind: "restore", db: r.db, counts: r.counts, fileName: file.name });
  }

  function applyConfirm() {
    if (!confirm) return;
    if (confirm.kind === "restore") restoreBackup(confirm.db);
    if (confirm.kind === "fresh") startFresh();
    if (confirm.kind === "example") resetToExample();
    const message = { restore: "Restauré tu respaldo.", fresh: "Listo: empezás de cero.", example: "Volví a los datos de ejemplo." }[confirm.kind];
    setConfirm(null);
    toast({ message });
  }

  return (
    <>
      {header}
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <ProfileForm key={db.profile.exam_date + String(db.profile.daily_goal_min) + db.profile.display_name} profile={db.profile} onSaved={() => toast({ message: "Guardado." })} />

        <Card className="p-5 desk:p-6">
          <h2 className="text-lg font-semibold">Apariencia</h2>
          <p className="mb-3 text-sm text-muted">Modo claro u oscuro. “Como el sistema” sigue al celular o la compu.</p>
          <SegmentedControl
            label="Tema"
            options={THEMES}
            value={db.profile.theme}
            onChange={(t: Profile["theme"]) => {
              setTheme(t);
              setThemePreference(t);
            }}
            fullWidth
          />
        </Card>

        <Card className="flex flex-col gap-4 p-5 desk:p-6">
          <div>
            <h2 className="text-lg font-semibold">Tus datos</h2>
            <p className="text-sm text-muted">
              Por ahora todo vive en este navegador. Descargá un respaldo cada tanto: sirve para pasarlo a otro dispositivo o por si se borra el
              historial.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" onClick={download}>
              <Download aria-hidden /> Exportar todos mis datos
            </Button>
            <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-btn border border-line bg-surface px-4 text-[15px] font-semibold hover:bg-sunken has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent-text">
              <Upload aria-hidden className="size-[18px]" /> Restaurar un respaldo
              <input type="file" accept=".json,application/json" className="sr-only" onChange={(e) => (onBackupFile(e.target.files?.[0]), (e.target.value = ""))} />
            </label>
          </div>
          {fileError && (
            <p role="alert" className="rounded-card-sm bg-accent-soft p-3 text-sm font-semibold">
              {fileError}
            </p>
          )}
          <div className="flex flex-wrap gap-2 border-t border-line pt-4">
            <Button variant="ghost" onClick={() => setConfirm({ kind: "fresh" })}>
              <Sparkles aria-hidden /> Empezar de cero
            </Button>
            <Button variant="ghost" onClick={() => setConfirm({ kind: "example" })}>
              <RotateCcw aria-hidden /> Volver a los datos de ejemplo
            </Button>
          </div>
        </Card>

        <p className="text-center text-sm text-muted">
          For her · <VersionTag inline />
        </p>
      </div>

      {confirm && (
        <Sheet
          open
          side="bottom"
          onClose={() => setConfirm(null)}
          title={confirm.kind === "restore" ? "Restaurar respaldo" : confirm.kind === "fresh" ? "Empezar de cero" : "Datos de ejemplo"}
          footer={
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" className="flex-1" onClick={applyConfirm}>
                {confirm.kind === "restore" ? "Restaurar" : confirm.kind === "fresh" ? "Empezar de cero" : "Volver a los de ejemplo"}
              </Button>
              <Button variant="ghost" onClick={() => setConfirm(null)}>
                Cancelar
              </Button>
            </div>
          }
        >
          <div className="flex flex-col gap-3 text-[15px]">
            {confirm.kind === "restore" ? (
              <>
                <p>
                  Vas a reemplazar todo lo que hay ahora por <b>{confirm.fileName}</b>:
                </p>
                <ul className="list-disc pl-5 text-muted">
                  {Object.entries(confirm.counts).map(([k, v]) => (
                    <li key={k}>
                      {v} {k}
                    </li>
                  ))}
                </ul>
              </>
            ) : confirm.kind === "fresh" ? (
              <p>
                Se borra todo lo de este navegador (plan, tablero, tarjetas, preguntas, registros…). Quedan tu perfil y las 5 materias base, listas para
                importar tu cronograma.
              </p>
            ) : (
              <p>Se reemplaza lo que hay por los datos de ejemplo del principio.</p>
            )}
            <p className="rounded-card-sm bg-honey-soft p-3 text-sm">
              Si querés conservar lo de ahora, <b>exportá un respaldo antes</b>.{" "}
              <button type="button" onClick={download} className="font-semibold text-accent-text underline-offset-4 hover:underline">
                Exportar ahora
              </button>
            </p>
          </div>
        </Sheet>
      )}
    </>
  );
}

function ProfileForm({ profile, onSaved }: { profile: Profile; onSaved: () => void }) {
  const [values, setValues] = useState<ProfileInput>({
    display_name: profile.display_name ?? "",
    exam_date: profile.exam_date ?? "",
    daily_goal_min: profile.daily_goal_min,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const goal = Number(values.daily_goal_min);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = profileInput.safeParse(values);
    if (!parsed.success) return setErrors(fieldErrors(parsed.error));
    setErrors({});
    updateProfile(values);
    onSaved();
  }

  return (
    <Card className="p-5 desk:p-6">
      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Vos y tu examen</h2>
        <TextField
          label="Nombre para el saludo"
          value={values.display_name}
          onChange={(e) => (setValues((v) => ({ ...v, display_name: e.target.value })), setErrors({}))}
          error={errors.display_name}
          hint="En Hoy aparece “Hola, …”. Si lo dejás vacío, dice “Hoy”."
          autoComplete="given-name"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Fecha del examen"
            type="date"
            value={values.exam_date}
            onChange={(e) => (setValues((v) => ({ ...v, exam_date: e.target.value })), setErrors({}))}
            error={errors.exam_date}
            hint="Vacía: se muestra “Marzo 2027”."
          />
          <TextField
            label="Objetivo diario (minutos)"
            type="number"
            inputMode="numeric"
            min={15}
            max={480}
            step={5}
            value={String(values.daily_goal_min)}
            onChange={(e) => (setValues((v) => ({ ...v, daily_goal_min: e.target.value })), setErrors({}))}
            error={errors.daily_goal_min}
            hint={Number.isFinite(goal) && goal >= 15 ? `${blocksGoal(goal)} bloques de foco de 25 min.` : undefined}
          />
        </div>
        <div>
          <Button type="submit" variant="primary">
            Guardar
          </Button>
        </div>
      </form>
    </Card>
  );
}
