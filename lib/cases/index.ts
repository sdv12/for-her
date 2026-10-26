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
import { acv } from "./data/acv";
import { anemiaFerropenica } from "./data/anemia-ferropenica";
import { apendicitis } from "./data/apendicitis";
import { crisisAsmatica } from "./data/crisis-asmatica";
import { dm2 } from "./data/dm2";
import { ectopico } from "./data/ectopico";
import { epoc } from "./data/epoc";
import { meningitis } from "./data/meningitis";
import { monoxido } from "./data/monoxido";
import { nac } from "./data/nac";
import { otitis } from "./data/otitis";
import { pielonefritisEmbarazo } from "./data/pielonefritis-embarazo";
import { tbc } from "./data/tbc";
import { tep } from "./data/tep";
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
  acv,
  anemiaFerropenica,
  apendicitis,
  crisisAsmatica,
  dm2,
  ectopico,
  epoc,
  meningitis,
  monoxido,
  nac,
  otitis,
  pielonefritisEmbarazo,
  tbc,
  tep,
].sort((a, b) => a.level - b.level);

export function getCase(id: string): ClinicalCase | undefined {
  return CASES.find((c) => c.id === id);
}
