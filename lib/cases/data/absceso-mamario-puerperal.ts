import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const abscesoMamarioPuerperal: ClinicalCase = {
  id: "absceso-mamario-puerperal",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 32, ageUnit: "años", sex: "F", context: "Puérpera de 6 semanas. Amamanta. Hace 8 días le diagnosticaron mastitis y tomó cefalexina 4 días." },
  frequency: "frecuente",
  intro: "“Sigo con fiebre, y ahora tengo un bulto muy doloroso en la mama derecha que está rojo y caliente.”",
  vitals: { TA: "114/70 mmHg", FC: "104 lpm", FR: "18 rpm", "T°": "38,7 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("antibiotico", "¿Cómo tomó el antibiótico?", "clave", "“Cuatro días, lo dejé cuando me bajó la fiebre.”", "Tratamiento incompleto."),
    act("lactancia", "¿Siguió dando de esa mama?", "clave", "“Dejé de darle de ese lado porque dolía.”", "Estasis láctea."),
    act("bulto", "¿Cómo evolucionó el bulto?", "clave", "“Cada vez más grande y blando en el centro.”", "Colección."),
    act("grietas", "¿Grietas en el pezón?", "util", "“Sí, al principio.”", "Puerta de entrada."),
    act("bebe", "¿El bebé está bien?", "util", "“Sí.”", "Base."),
    act("nombre", "¿Cómo se llama?", "neutro", "“Bruno.”", "No orienta."),
  ],
  exam: [
    act("mama", "Examen mamario", "clave", "Masa de 4 cm fluctuante, eritematosa, muy dolorosa, en cuadrante superoexterno derecho.", "Absceso."),
    act("axila", "Axila", "clave", "Ganglio reactivo.", "Inflamación."),
    act("pezon", "Pezón", "util", "Grieta cicatrizada.", "Origen."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía mamaria", "clave", "Colección de 4 cm con ecos internos.", "Absceso."),
    study("Microbiología", "cultivo", "Punción con cultivo del material", "clave", "Staphylococcus aureus meticilino resistente de la comunidad.", "Germen."),
    study("Laboratorio", "hemograma", "Hemograma", "util", "Leucocitos 15.000.", "Inflamación."),
    study("Imágenes", "mamografia", "Mamografía urgente", "innecesario", "No se realizó.", "La ecografía alcanza en la lactancia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("absceso", "Absceso mamario puerperal por S. aureus resistente a meticilina, tras mastitis tratada en forma incompleta", true, "Masa fluctuante con colección en la ecografía, fiebre persistente y cultivo positivo."),
      dx("mastitis", "Mastitis sin absceso", false, "Hay colección."),
      dx("galactocele", "Galactocele", false, "Fiebre y signos inflamatorios."),
      dx("inflamatorio", "Cáncer de mama inflamatorio", false, "Contexto puerperal y colección; seguir si no resuelve."),
      dx("congestion", "Congestión mamaria", false, "Masa focal fluctuante."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("drenaje", "Drenaje por punción guiada por ecografía", "clave", "Control del foco."),
      mg("atb", "Antibiótico según cultivo (TMS o clindamicina)", "clave", "SAMR de la comunidad."),
      mg("lactancia", "Seguir amamantando o extraer leche de esa mama", "clave", "Vacía la mama y no daña al bebé."),
      mg("seguimiento", "Control ecográfico hasta la resolución", "util", "Descartar persistencia o tumor."),
      mg("suspender-lactancia", "Suspender la lactancia", "riesgoso", "Empeora la estasis y no hace falta."),
      mg("cefalexina-sola", "Repetir cefalexina sin drenar", "riesgoso", "No cubre SAMR y no drena el pus."),
    ],
  },
  debrief: {
    diagnosis: "Absceso mamario puerperal por S. aureus resistente a meticilina de la comunidad, tras mastitis tratada en forma incompleta, en puérpera de 32 años.",
    pathologies: [
      { name: "Absceso mamario puerperal", role: "principal", why: "Complicación de la mastitis." },
      { name: "Estasis láctea y tratamiento incompleto", role: "asociada", why: "Factores." },
      { name: "Galactocele, cáncer inflamatorio", role: "diferencial", why: "Otras masas en la lactancia." },
    ],
    reasoning: [
      "Causa: S. aureus que ingresa por grietas del pezón.",
      "Mecanismo: mastitis con estasis láctea que forma una colección.",
      "Consecuencia: absceso con fiebre persistente.",
    ],
    epidemiology:
      "Alrededor del 3 al 10 % de las mastitis evoluciona a absceso, más si se suspende la lactancia o el antibiótico es corto. El SAMR de la comunidad es frecuente en Argentina. La punción guiada suele evitar la incisión.",
    management: [
      "Ecografía.",
      "Drenaje.",
      "Antibiótico por cultivo.",
      "Sostener la lactancia.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de lactancia y patología mamaria.", "Academy of Breastfeeding Medicine — Protocol on Mastitis Spectrum."],
    pearls: ["Fiebre que persiste: ecografía.", "Drenar.", "La lactancia sigue."],
    pitfalls: ["Suspender la lactancia.", "Antibiótico sin drenaje."],
    tribunal: [
      qa("¿Por qué no se suspende la lactancia?", "Porque vaciar la mama ayuda a resolver la infección y la leche no daña al bebé."),
      qa("¿Qué antibiótico es de elección en mastitis sin SAMR?", "Cefalexina o dicloxacilina por 10 a 14 días."),
      qa("¿Qué hacés si no resuelve?", "Biopsia para descartar carcinoma inflamatorio."),
    ],
  },
};
