"use client";

import { useCallback } from "react";
import { mutate, useDB } from "./store";

/** [fecha YYYY-MM-DD | null, setter, hidratado]. Lee y escribe profiles.exam_date. */
export function useExamDate(): [string | null, (date: string | null) => void, boolean] {
  const db = useDB();

  const setDate = useCallback((next: string | null) => {
    mutate((draft) => {
      draft.profile.exam_date = next;
    });
  }, []);

  return [db?.profile.exam_date ?? null, setDate, db !== null];
}
