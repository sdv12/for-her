import { CASES } from "@/lib/cases";
import type { ClinicalCase } from "@/lib/cases/types";
import { fold } from "@/lib/plan-import/dates";
import { EJES } from "./ejes";
import { MATERIAS } from "./materias";
import type { CaseMatch, Eje, Materia } from "./types";

/** Texto donde se buscan las palabras clave: el id del caso y su diagnóstico, sin acentos y con guiones. */
function caseText(c: ClinicalCase): string {
  return `${c.id} ${fold(c.debrief.diagnosis).replace(/\s+/g, "-")}`;
}

function ageInYears(c: ClinicalCase): number {
  const { age, ageUnit } = c.patient;
  return ageUnit === "años" ? age : ageUnit === "meses" ? age / 12 : age / 365;
}

export function matchesCase(m: CaseMatch, c: ClinicalCase): boolean {
  if (m.all) return true;
  if (m.areas?.includes(c.area)) return true;
  if (m.underAge !== undefined && ageInYears(c) < m.underAge) return true;
  return !!m.keywords?.test(caseText(c));
}

export function casesForEje(eje: Eje, cases: ClinicalCase[] = CASES): ClinicalCase[] {
  return cases.filter((c) => matchesCase(eje.match, c));
}

export function casesForMateria(m: Materia, cases: ClinicalCase[] = CASES): ClinicalCase[] {
  return cases.filter((c) => matchesCase(m.match, c));
}

export function ejesForCase(c: ClinicalCase): Eje[] {
  return EJES.filter((e) => matchesCase(e.match, c));
}

/** Materias que el caso exige en particular (sin Anatomía ni Patología, que entran en todos). */
export function materiasForCase(c: ClinicalCase): Materia[] {
  return MATERIAS.filter((m) => !m.match.all && matchesCase(m.match, c));
}

/*
 * Para textos libres (semanas y días del cronograma que importaste): palabras que delatan cada eje.
 * Se compara sin acentos ni mayúsculas.
 */
const TEXT_KEYWORDS: Record<string, RegExp> = {
  diabetes: /diabet|\bdbt\b|\bcad\b|insulin|glucem|cetoacid|obesidad|sindrome metabolico|pancreas endocrino|pie diabetico/,
  cardiovascular: /cardi|corazon|coronari|hipertens|\bhta\b|infarto|\biam\b|aterosclero|arritmi|fibrilacion|valvul|aorta|gasto cardiaco|frank|presion arterial|dislipem|\bacv\b|insuficiencia cardiaca/,
  infecciones: /infecc|sepsis|antibiot|antimicrob|bacteri|virus|viral|parasit|micosis|tuberculos|\bvih\b|sifilis|dengue|chagas|meningit|neumonia|febril/,
  neoplasias: /cancer|neoplas|tumor|oncolog|carcinoma|linfoma|leucemia|metasta|displasia|premalign/,
  embarazo: /embaraz|obstetr|prenatal|parto|puerper|placenta|gestac|anticoncep|ginecolog|aborto|ectopico|eclampsia/,
  trauma: /trauma|fractura|luxac|quemadura|herida|ortoped|abdomen agudo|cirugia|quirurg|locomotor|osteo|articulac/,
  renal: /renal|\brinon|nefro|urinari|electrolit|hidroelectrol|\bsodio|potasio|acido.base|medio interno|deshidrat|diuret|retroperitoneo/,
  respiratorio: /respirat|pulmon|torax|traquea|bronqu|asma|epoc|neumo|pleura|oxigen|ventilac|disnea|mediastino/,
  neuro: /neuro|cerebr|encefal|convuls|epileps|medula|nervio|cefalea|demencia|delirium|menin/,
  piel: /\bpiel|dermat|cutane|urticaria|alergi|hipersensib|inmun|exantema|psoriasis|anafilax/,
  hematologia: /anemia|hemato|sangre|coagul|plaquet|hemoglob/,
  "abdomen-agudo": /abdomen agudo|apendic|colecist|pancreat|peritonit|oclusi|obstruccion intestinal/,
  "digestiva-cronica": /digestiv|gastr|esofag|ulcera|celiac|higado|hepat|colon|intestin|\bporta\b/,
  tiroides: /tiroid|suprarrenal|hipofis|endocrin|cortisol/,
  osteoarticular: /artrosis|artritis|osteopor|\bgota\b|reumat|columna|lumbalg/,
  "salud-mental": /mental|psiqu|depresi|ansiedad|suicid/,
  intoxicaciones: /intoxic|toxic|sobredosis|envenen|monoxido|paracetamol/,
  "salud-sexual": /\bits\b|transmision sexual|sexual|infertil|endometriosis|menopausia|climaterio/,
  "recien-nacido": /recien nacido|neonat|prematur|ictericia/,
  prevencion: /prevenc|vacun|pesquisa|tamizaje|epidemiolog|vigilancia|incidencia|prevalencia|salud comunitaria|salud publica|promocion de la salud|mortalidad|letalidad|brote/,
};

/** Ejes que aparecen en un texto libre, del más mencionado al menos (hasta `max`). */
export function ejesForText(text: string, max = 3): Eje[] {
  const t = fold(text);
  return EJES.map((e) => {
    const re = TEXT_KEYWORDS[e.id];
    const hits = re ? (t.match(new RegExp(re.source, "g")) ?? []).length : 0;
    return { e, hits };
  })
    .filter((x) => x.hits > 0)
    .sort((a, b) => b.hits - a.hits || EJES.indexOf(a.e) - EJES.indexOf(b.e))
    .slice(0, max)
    .map((x) => x.e);
}

export const TEXT_KEYWORD_IDS = Object.keys(TEXT_KEYWORDS);

/** Un caso para practicar el eje: el primero sin jugar (si se pasan los jugados), si no el primero. */
export function pickCase(cases: ClinicalCase[], played: Set<string> = new Set()): ClinicalCase | undefined {
  return cases.find((c) => !played.has(c.id)) ?? cases[0];
}
