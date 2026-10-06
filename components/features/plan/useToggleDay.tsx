"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import type { PlanDay } from "@/lib/data/types";
import { deleteStudyLog, setStudyLogMinutes, togglePlanDay } from "@/lib/mock/actions/plan";
import { MinutesSheet } from "./MinutesSheet";

/**
 * Tildar/destildar un día del plan con su aviso (Editar minutos · Deshacer el registro).
 * Lo usan Plan y Hoy. Renderizá `sheet` en algún lugar del componente.
 */
export function useToggleDay() {
  const toast = useToast();
  const [editingLog, setEditingLog] = useState<{ id: string; minutes: number } | null>(null);

  function toggle(day: PlanDay) {
    const result = togglePlanDay(day.id);
    if (!result.done) {
      toast({ message: "Lo destildé y saqué su registro." });
      return;
    }
    toast({
      message: `Día hecho. Sumé ${result.minutes} min a Registros.`,
      actions: [
        { label: "Editar", onClick: () => setEditingLog({ id: result.logId, minutes: result.minutes }) },
        {
          label: "Deshacer",
          onClick: () => {
            deleteStudyLog(result.logId);
            toast({ message: "Saqué el registro. El día sigue hecho." });
          },
        },
      ],
    });
  }

  const sheet = editingLog && (
    <MinutesSheet
      initialMinutes={editingLog.minutes}
      onClose={() => setEditingLog(null)}
      onSave={(minutes) => {
        setStudyLogMinutes(editingLog.id, minutes);
        setEditingLog(null);
        toast({ message: `Listo: ${minutes} min.` });
      }}
    />
  );

  return { toggle, sheet };
}
