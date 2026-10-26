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
import { celulitis } from "./data/celulitis";
import { colecistitis } from "./data/colecistitis";
import { colicoRenal } from "./data/colico-renal";
import { convulsionFebril } from "./data/convulsion-febril";
import { crup } from "./data/crup";
import { esguince } from "./data/esguince";
import { fibrilacionAuricular } from "./data/fibrilacion-auricular";
import { hda } from "./data/hda";
import { hipoglucemia } from "./data/hipoglucemia";
import { ictericiaNeonatal } from "./data/ictericia-neonatal";
import { lumbalgia } from "./data/lumbalgia";
import { panico } from "./data/panico";
import { sifilisEmbarazo } from "./data/sifilis-embarazo";
import { urgenciaHipertensiva } from "./data/urgencia-hipertensiva";
import { artritisReumatoidea } from "./data/artritis-reumatoidea";
import { epi } from "./data/epi";
import { escabiosis } from "./data/escabiosis";
import { gota } from "./data/gota";
import { hipotiroidismo } from "./data/hipotiroidismo";
import { intentoSuicidio } from "./data/intento-suicidio";
import { intoxicacionAlcoholica } from "./data/intoxicacion-alcoholica";
import { iraPrerrenal } from "./data/ira-prerrenal";
import { maltratoInfantil } from "./data/maltrato-infantil";
import { nacPediatrica } from "./data/nac-pediatrica";
import { politrauma } from "./data/politrauma";
import { retencionUrinaria } from "./data/retencion-urinaria";
import { vaginosis } from "./data/vaginosis";
import { zoster } from "./data/zoster";
import { abortoIncompleto } from "./data/aborto-incompleto";
import { anafilaxia } from "./data/anafilaxia";
import { anticoncepcionEmergencia } from "./data/anticoncepcion-emergencia";
import { cirrosisPbe } from "./data/cirrosis-pbe";
import { conjuntivitis } from "./data/conjuntivitis";
import { coqueluche } from "./data/coqueluche";
import { delirium } from "./data/delirium";
import { depresionPosparto } from "./data/depresion-posparto";
import { diabetesGestacional } from "./data/diabetes-gestacional";
import { erge } from "./data/erge";
import { escorpionismo } from "./data/escorpionismo";
import { fracturaCadera } from "./data/fractura-cadera";
import { graves } from "./data/graves";
import { hemorragiaPosparto } from "./data/hemorragia-posparto";
import { ituLactante } from "./data/itu-lactante";
import { leptospirosis } from "./data/leptospirosis";
import { menopausia } from "./data/menopausia";
import { migrana } from "./data/migrana";
import { mordeduraPerro } from "./data/mordedura-perro";
import { neumotoraxEspontaneo } from "./data/neumotorax-espontaneo";
import { ofidismo } from "./data/ofidismo";
import { pancreatitis } from "./data/pancreatitis";
import { rinosinusitis } from "./data/rinosinusitis";
import { scasest } from "./data/scasest";
import { sindromeNefrotico } from "./data/sindrome-nefrotico";
import { tecAnticoagulado } from "./data/tec-anticoagulado";
import { vihDebut } from "./data/vih-debut";
import { vphHsil } from "./data/vph-hsil";
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
  celulitis,
  colecistitis,
  colicoRenal,
  convulsionFebril,
  crup,
  esguince,
  fibrilacionAuricular,
  hda,
  hipoglucemia,
  ictericiaNeonatal,
  lumbalgia,
  panico,
  sifilisEmbarazo,
  urgenciaHipertensiva,
  artritisReumatoidea,
  epi,
  escabiosis,
  gota,
  hipotiroidismo,
  intentoSuicidio,
  intoxicacionAlcoholica,
  iraPrerrenal,
  maltratoInfantil,
  nacPediatrica,
  politrauma,
  retencionUrinaria,
  vaginosis,
  zoster,
  abortoIncompleto,
  anafilaxia,
  anticoncepcionEmergencia,
  cirrosisPbe,
  conjuntivitis,
  coqueluche,
  delirium,
  depresionPosparto,
  diabetesGestacional,
  erge,
  escorpionismo,
  fracturaCadera,
  graves,
  hemorragiaPosparto,
  ituLactante,
  leptospirosis,
  menopausia,
  migrana,
  mordeduraPerro,
  neumotoraxEspontaneo,
  ofidismo,
  pancreatitis,
  rinosinusitis,
  scasest,
  sindromeNefrotico,
  tecAnticoagulado,
  vihDebut,
  vphHsil,
].sort((a, b) => a.level - b.level);

export function getCase(id: string): ClinicalCase | undefined {
  return CASES.find((c) => c.id === id);
}
