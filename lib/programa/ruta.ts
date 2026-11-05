import { addDays, differenceInCalendarDays, format, parseISO, startOfWeek } from "date-fns";
import type { ISODate } from "@/lib/data/types";
import { getEje } from "./ejes";
import { getMateria } from "./materias";
import type { Eje, Fase, MateriaId, RutaWeek, Session } from "./types";

/*
 * Ruta integrada de 12 semanas (primer ciclo; después se repite con más profundidad, priorizando errores).
 * Una hora a la mañana para comprender y una a la noche para recuperar, conectar y aplicar.
 */

export const FASES: Fase[] = [
  {
    num: 1,
    name: "Bases",
    weeks: "Semanas 1–3",
    contenidos: "Anatomía funcional; lesión celular, inflamación, necrosis y reparación; fisiopatología de diabetes, hipertensión y aterosclerosis; principios de farmacología.",
    resultado: "Explicar por qué aparece la enfermedad antes de memorizar tratamientos.",
  },
  {
    num: 2,
    name: "Grandes síndromes",
    weeks: "Semanas 4–7",
    contenidos: "Síndromes infecciosos y sepsis; respiratorio; renal e hidroelectrolítico; anemias y trastornos hematológicos.",
    resultado: "Partir de un síntoma o síndrome y construir diagnósticos diferenciales.",
  },
  {
    num: 3,
    name: "Especialidades y etapas de la vida",
    weeks: "Semanas 8–10",
    contenidos: "Embarazo y salud reproductiva; pediatría y neonatología; dermatología y oftalmología; trauma y patología osteoarticular.",
    resultado: "Reconocer cambios de presentación, diagnóstico y tratamiento según órgano, edad y contexto.",
  },
  {
    num: 4,
    name: "Integración",
    weeks: "Semanas 11–12",
    contenidos: "Neoplasias y sistema nervioso como casos de 3 a 5 materias; diferenciales, estudios, tratamiento justificado, prevención y complicaciones.",
    resultado: "Resolver un caso sin pensar primero a qué materia pertenece.",
  },
];

const REST: Session = { morning: "Descanso o recuperación liviana.", night: "Sin obligación de estudio." };

export const RUTA: RutaWeek[] = [
  {
    num: 1,
    fase: 1,
    title: "Diabetes como primer caso integrador",
    ejes: ["diabetes"],
    objetivo: "Poder explicar el caso del pie diabético de punta a punta: de la insulina a la amputación evitable.",
    sessions: [
      { morning: "Sesión 1 · Anatomía del páncreas, riñón, retina y pie.", night: "Patología: lesión vascular, nefropatía y neuropatía diabéticas." },
      { morning: "Sesión 2 · Fisiología de la insulina y metabolismo de la glucosa.", night: "Clínica y signos de alarma; criterios diagnósticos de diabetes." },
      { morning: "Sesión 3 · Fisiopatología de la diabetes tipo 1 y tipo 2.", night: "Diagnóstico diferencial: DM1, DM2, secundaria y gestacional." },
      { morning: "Sesión 4 · Complicaciones agudas: cetoacidosis, estado hiperosmolar e hipoglucemia.", night: "Caso clínico de cetoacidosis o hipoglucemia." },
      { morning: "Sesión 5 · Complicaciones crónicas: microvasculares y macrovasculares.", night: "Sesión 6 · Tratamiento farmacológico y razonamiento terapéutico." },
      { morning: "Repaso de errores y preguntas sin apuntes.", night: "Sesión 7 · Caso integrador: paciente diabético con úlcera de pie y sospecha de infección." },
      REST,
    ],
  },
  { num: 2, fase: 1, title: "Hipertensión y enfermedad cardiovascular", ejes: ["cardiovascular"], objetivo: "Explicar el daño de órgano blanco y el riesgo cardiovascular, y reconocer las urgencias." },
  {
    num: 3,
    fase: 1,
    title: "Lesión celular, inflamación y bases de farmacología",
    ejes: ["infecciones", "neoplasias"],
    objetivo: "Tener el idioma común de todas las materias: lesión, inflamación, reparación, hemodinamia y cómo actúa un fármaco.",
    sessions: [
      { morning: "Anatomía funcional y lesión celular: adaptación, lesión reversible e irreversible, necrosis y apoptosis.", night: "Patología: inflamación aguda y crónica, mediadores, granulomas." },
      { morning: "Reparación y cicatrización: regeneración, fibrosis, cicatrización viciosa.", night: "Conectá con Cirugía: biología de la herida y quemaduras." },
      { morning: "Trastornos hemodinámicos: edema, congestión, trombosis, embolia, infarto y shock.", night: "Conectá con Traumatología: tromboembolismo por inmovilización." },
      { morning: "Farmacología general: farmacocinética, farmacodinamia, receptores.", night: "Uso racional y reacciones adversas (Farmacología Aplicada I)." },
      { morning: "Neoplasia: displasia, invasión, metástasis, gradación y estadificación.", night: "Preguntas sin apuntes: lesión, inflamación, reparación, hemodinamia, fármaco." },
      { morning: "Repaso de errores de las tres semanas.", night: "Caso clínico acumulativo de diabetes o cardiovascular." },
      REST,
    ],
  },
  { num: 4, fase: 2, title: "Infecciones, inflamación y sepsis", ejes: ["infecciones", "prevencion"], objetivo: "De la puerta de entrada a la disfunción orgánica: muestras, antimicrobiano y control del foco." },
  { num: 5, fase: 2, title: "Respiratorio y oxigenación", ejes: ["respiratorio"], objetivo: "Reconocer la gravedad respiratoria y decidir el soporte." },
  { num: 6, fase: 2, title: "Riñón, vía urinaria y medio interno", ejes: ["renal"], objetivo: "Razonar volumen, electrolitos y función renal, y no empeorarlos con fármacos." },
  { num: 7, fase: 2, title: "Anemias y trastornos hematológicos", ejes: ["hematologia"], objetivo: "Clasificar una anemia y buscarle la causa; reconocer sangrado y neutropenia." },
  { num: 8, fase: 3, title: "Embarazo, salud sexual y recién nacido", ejes: ["embarazo", "recien-nacido", "salud-sexual"], objetivo: "Cambiar la conducta cuando hay embarazo y seguir al binomio hasta el recién nacido." },
  { num: 9, fase: 3, title: "Piel, ojo e hipersensibilidad", ejes: ["piel"], objetivo: "Leer la lesión elemental y el ojo rojo, y reconocer la anafilaxia." },
  { num: 10, fase: 3, title: "Trauma, aparato locomotor y abdomen agudo", ejes: ["trauma", "abdomen-agudo", "osteoarticular"], objetivo: "Del mecanismo de lesión a la decisión quirúrgica." },
  {
    num: 11,
    fase: 4,
    title: "Integración: neoplasias y lesiones premalignas",
    ejes: ["neoplasias", "digestiva-cronica", "tiroides"],
    objetivo: "Resolver casos de 3 a 5 materias: órgano, biología tumoral, diagnóstico, tratamiento y prevención.",
    sessions: [
      { morning: "Cáncer de cuello y VPH: anatomía, displasia, tamizaje y vacunación.", night: "Conectá Ginecología, Infectología, Patología y Salud Comunitaria II y III." },
      { morning: "Cáncer de mama y colorrectal: presentación, estudios, estadificación.", night: "Caso clínico integrador de neoplasias." },
      { morning: "Leucemias y linfomas; neutropenia febril.", night: "Diagnóstico diferencial de adenopatías y del síndrome de impregnación." },
      { morning: "Cáncer de piel, pulmón y próstata; tumores óseos.", night: "Tratamiento: cirugía, quimioterapia, dolor oncológico y paliativos." },
      { morning: "Nódulo tiroideo y patología digestiva crónica.", night: "Preguntas sin apuntes: ¿podés conectar el tema con tres materias?" },
      { morning: "Repaso de errores de toda la ruta.", night: "Caso clínico acumulativo al azar." },
      REST,
    ],
  },
  {
    num: 12,
    fase: 4,
    title: "Integración: sistema nervioso, salud mental e intoxicaciones",
    ejes: ["neuro", "salud-mental", "intoxicaciones"],
    objetivo: "Localizar la lesión, distinguir lo urgente y cerrar el ciclo con simulacros orales.",
    sessions: [
      { morning: "Localización anatómica: encéfalo, médula, pares craneales, irrigación.", night: "ACV isquémico y hemorrágico: ventana, trombólisis y prevención." },
      { morning: "Convulsiones y status; convulsión febril.", night: "Meningitis y encefalitis: LCR y tratamiento empírico." },
      { morning: "Delirium, demencia y depresión en el adulto mayor.", night: "Intoxicaciones frecuentes: paracetamol, monóxido, alcohol, organofosforados." },
      { morning: "Simulacro oral: caso al azar sin saber el eje.", night: "Corregí y anotá en Errores lo que no pudiste explicar." },
      { morning: "Simulacro en modo tribunal.", night: "Autoevaluación de todos los ejes: marcá lo que todavía no podés explicar." },
      { morning: "Repaso de errores; planificá el segundo ciclo con los temas débiles.", night: "Caso clínico acumulativo al azar." },
      REST,
    ],
  },
];

export const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] as const;

function row(eje: Eje, materias: MateriaId[]): { materia: MateriaId; text: string } | undefined {
  for (const id of materias) {
    const f = eje.filas.find((x) => x.materia === id);
    if (f) return f;
  }
  return undefined;
}

const SPECIALTIES: MateriaId[] = ["infectologia", "pediatria", "ginecologia", "dermatologia", "oftalmologia", "traumatologia", "cirugia"];

/** Las 7 sesiones de la semana: a medida, o armadas con la plantilla semanal y las filas del eje principal. */
export function sessionsFor(week: RutaWeek): Session[] {
  if (week.sessions) return week.sessions;
  const eje = getEje(week.ejes[0])!;
  const anat = row(eje, ["anatomia"]);
  const pato = row(eje, ["patologia"]);
  const farma = row(eje, ["farmacologia-1", "farmacologia-2"]);
  const central = eje.filas.find((f) => f.peso === "central" && SPECIALTIES.includes(f.materia)) ?? row(eje, SPECIALTIES);
  const sc = row(eje, ["salud-comunitaria-1", "salud-comunitaria-2", "salud-comunitaria-3"]);
  const label = (r: { materia: MateriaId } | undefined) => (r ? getMateria(r.materia)!.name : "");
  return [
    { morning: `Anatomía y fisiopatología: ${anat?.text ?? eje.conexion}`, night: `Patología del mismo eje: ${pato?.text ?? eje.conexion}` },
    { morning: `Clínica y signos de alarma: ${eje.clinica}`, night: `Diagnóstico diferencial: ${eje.diferenciales}` },
    { morning: `${farma ? label(farma) : "Farmacología"}: ${farma?.text ?? eje.tratamiento}`, night: `Tratamiento y efectos adversos: ${eje.tratamiento}` },
    { morning: central ? `${label(central)}: ${central.text}` : `Especialidad relacionada: ${eje.objetivo}`, night: "Caso clínico integrador del eje." },
    { morning: `Prevención y ${sc ? label(sc) : "Salud Comunitaria"}: ${sc?.text ?? "niveles de prevención del eje."}`, night: "Preguntas sin apuntes: autoevaluación del eje." },
    { morning: "Repaso de errores de la semana.", night: "Caso clínico acumulativo de los ejes ya vistos." },
    REST,
  ];
}

export function sessionKey(week: number, day: number, part: "m" | "n") {
  return `${week}-${day}-${part}`;
}

/** Lunes de la semana de esa fecha (la ruta arranca siempre un lunes). */
export function routeMonday(date: ISODate): ISODate {
  return format(startOfWeek(parseISO(date), { weekStartsOn: 1 }), "yyyy-MM-dd");
}

/** Dónde cae `today` en la ruta: semana 1–12 y día 0–6, o antes/después. */
export function routePosition(start: ISODate, today: ISODate): { status: "antes" | "en-curso" | "terminada"; week: number; day: number } {
  const diff = differenceInCalendarDays(parseISO(today), parseISO(routeMonday(start)));
  if (diff < 0) return { status: "antes", week: 1, day: 0 };
  const week = Math.floor(diff / 7) + 1;
  if (week > RUTA.length) return { status: "terminada", week: RUTA.length, day: 6 };
  return { status: "en-curso", week, day: diff % 7 };
}

export function dateOf(start: ISODate, week: number, day: number): ISODate {
  return format(addDays(parseISO(routeMonday(start)), (week - 1) * 7 + day), "yyyy-MM-dd");
}

/** Cuántas sesiones (mañana y noche, sin domingos) tiene la ruta y cuántas están hechas. */
export function routeProgress(done: string[]): { done: number; total: number } {
  const total = RUTA.length * 6 * 2;
  const set = new Set(done);
  let n = 0;
  for (const w of RUTA) for (let d = 0; d < 6; d++) for (const p of ["m", "n"] as const) if (set.has(sessionKey(w.num, d, p))) n++;
  return { done: n, total };
}
