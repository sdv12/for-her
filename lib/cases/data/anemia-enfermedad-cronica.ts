import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const anemiaEnfermedadCronica: ClinicalCase = {
  id: "anemia-enfermedad-cronica",
  level: 2,
  area: "Hematología",
  setting: "Consultorio",
  patient: { age: 57, ageUnit: "años", sex: "F", context: "Artritis reumatoidea hace 10 años, con actividad moderada. Toma metotrexato." },
  frequency: "muy-frecuente",
  intro: "“Me dijeron que estoy anémica. Me dieron hierro y no subió nada.”",
  vitals: { TA: "122/76 mmHg", FC: "84 lpm", Peso: "62 kg (estable)" },
  anamnesis: [
    act("enfermedad", "¿Cómo está la artritis?", "clave", "“Con dolor y rigidez casi todos los días.”", "Inflamación activa: causa de anemia de enfermedad crónica."),
    act("sangrado", "¿Sangrado digestivo, menstruaciones, heces negras?", "clave", "“Menopáusica, y no.”", "Pérdidas que causarían ferropenia."),
    act("aines", "¿Toma antiinflamatorios?", "clave", "“Diclofenac casi todos los días.”", "Los AINE pueden sumar pérdida digestiva."),
    act("hierro", "¿Cómo tomó el hierro y por cuánto tiempo?", "util", "“Tres meses, en ayunas.”", "Falta de respuesta al hierro bien tomado."),
    act("dieta", "¿Come carne?", "util", "“Sí.”", "Dieta adecuada."),
    act("acido-folico", "¿Toma ácido fólico con el metotrexato?", "clave", "“Sí, una vez por semana.”", "El metotrexato puede dar macrocitosis si falta folato."),
  ],
  exam: [
    act("articular", "Examen articular", "clave", "Sinovitis en carpos y MCF.", "Actividad."),
    act("palidez", "Mucosas", "util", "Pálidas.", "Anemia."),
    act("bazo", "Bazo y ganglios", "util", "No palpables.", "Descarta linfoproliferativos."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma con índices y reticulocitos", "clave", "Hb 10,1 g/dl, VCM 82 fl, reticulocitos bajos.", "Normocítica-microcítica hiporregenerativa."),
    study("Laboratorio", "hierro", "Ferritina, hierro, transferrina y saturación", "clave", "Ferritina 240 ng/ml, hierro bajo, transferrina baja, saturación 14 %.", "Ferritina alta con transferrina baja: enfermedad crónica."),
    study("Laboratorio", "inflamacion", "ERS y PCR", "clave", "ERS 58 mm, PCR 32 mg/l.", "Inflamación activa."),
    study("Laboratorio", "renal", "Creatinina", "util", "Normal.", "Descarta anemia renal."),
    study("Otros", "medula", "Punción de médula ósea", "innecesario", "No se hizo.", "El cuadro está explicado."),
    study("Laboratorio", "receptor", "Receptor soluble de transferrina", "util", "Normal.", "Si hubiera ferropenia asociada estaría alto."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("aec", "Anemia de la enfermedad crónica (inflamatoria) por artritis reumatoidea activa", true, "Anemia leve hiporregenerativa con hierro bajo, ferritina alta, transferrina baja e inflamación activa, sin respuesta al hierro."),
      dx("ferropenica", "Anemia ferropénica", false, "La ferritina está alta y la transferrina baja."),
      dx("talasemia", "Talasemia menor", false, "Microcitosis más marcada y hierro normal."),
      dx("renal", "Anemia de la enfermedad renal crónica", false, "Creatinina normal."),
      dx("megaloblastica", "Anemia megaloblástica por metotrexato", false, "VCM bajo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("controlar-ar", "Controlar la artritis (optimizar o escalar el tratamiento)", "clave", "Al bajar la inflamación mejora la anemia."),
      mg("suspender-hierro", "Suspender el hierro oral", "clave", "No se absorbe por la hepcidina."),
      mg("aines", "Reducir los AINE y proteger el estómago", "util", "Evita pérdidas."),
      mg("seguimiento", "Control del hemograma en 3 meses", "util", "Respuesta."),
      mg("transfusion", "Transfundir para subir la hemoglobina", "riesgoso", "Con 10 g/dl y sin síntomas graves no está indicado."),
      mg("hierro-ev-rutina", "Hierro endovenoso de rutina", "innecesario", "Sin ferropenia asociada no aporta."),
    ],
  },
  debrief: {
    diagnosis: "Anemia de la enfermedad crónica por artritis reumatoidea activa, en una mujer de 57 años.",
    pathologies: [
      { name: "Anemia de la enfermedad crónica", role: "principal", why: "Bloqueo del hierro por la inflamación." },
      { name: "Artritis reumatoidea activa", role: "asociada", why: "Fuente de citoquinas." },
      { name: "Anemia ferropénica", role: "diferencial", why: "Puede coexistir con AINE." },
    ],
    reasoning: [
      "Causa: inflamación crónica con IL-6 elevada.",
      "Mecanismo: la hepcidina bloquea la ferroportina y atrapa el hierro en macrófagos y enterocitos.",
      "Consecuencia: hierro disponible bajo pese a depósitos normales, con menor eritropoyesis.",
    ],
    epidemiology:
      "Es la segunda causa de anemia en el mundo después de la ferropénica, y la más común en pacientes internados y adultos mayores. Acompaña infecciones crónicas, enfermedades autoinmunes, cáncer y enfermedad renal.",
    management: [
      "Ferritina, transferrina y saturación.",
      "Tratar la enfermedad de base.",
      "Buscar ferropenia asociada.",
      "Transfundir solo si es grave o sintomática.",
    ],
    sources: ["Sociedad Argentina de Hematología — Anemias.", "Weiss G, Ganz T, Goodnough LT — Anemia of inflammation (Blood)."],
    pearls: ["Ferritina alta + transferrina baja.", "El hierro oral no sirve.", "Tratá la inflamación."],
    pitfalls: ["Seguir con hierro oral.", "Transfundir sin necesidad."],
    tribunal: [
      qa("¿Qué papel tiene la hepcidina en la anemia de la enfermedad crónica?", "La IL-6 la aumenta; la hepcidina bloquea la ferroportina y atrapa el hierro en macrófagos y enterocitos."),
      qa("¿Cómo se distingue de la anemia ferropénica?", "En la ferropénica la ferritina está baja y la transferrina alta; en la crónica, ferritina normal o alta y transferrina baja."),
      qa("¿Por qué la ferritina puede estar alta aunque haya ferropenia?", "Porque es un reactante de fase aguda; en inflamación, una ferritina menor de 100 puede indicar ferropenia asociada."),
    ],
  },
};
