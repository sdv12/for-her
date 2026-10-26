import { bronquiolitis } from "./data/bronquiolitis";
import { cetoacidosis } from "./data/cetoacidosis";
import { chagas } from "./data/chagas";
import { cistitis } from "./data/cistitis";
import { dengue } from "./data/dengue";
import { diarrea } from "./data/diarrea";
import { faringitis } from "./data/faringitis";
import { guillainBarre } from "./data/guillain-barre";
import { hta } from "./data/hta";
import { iamAtipico } from "./data/iam-atipico";
import { iamInferior } from "./data/iam-inferior";
import { icDescompensada } from "./data/ic-descompensada";
import { preeclampsia } from "./data/preeclampsia";
import { suh } from "./data/suh";
import type { ClinicalCase } from "./types";

/** Todos los casos, ordenados por nivel. Para sumar un caso: crear su archivo en data/ y agregarlo acá. */
export const CASES: ClinicalCase[] = [
  bronquiolitis,
  cistitis,
  hta,
  faringitis,
  diarrea,
  iamInferior,
  icDescompensada,
  cetoacidosis,
  preeclampsia,
  suh,
  dengue,
  chagas,
  iamAtipico,
  guillainBarre,
].sort((a, b) => a.level - b.level);

export function getCase(id: string): ClinicalCase | undefined {
  return CASES.find((c) => c.id === id);
}
