import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerLaringe: ClinicalCase = {
  id: "cancer-laringe",
  level: 2,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 62, ageUnit: "años", sex: "M", context: "Fuma 30 cigarrillos por día desde los 16 y toma vino a diario. Vendedor ambulante." },
  frequency: "frecuente",
  intro: "“Hace tres meses estoy ronco y no se me va. Me dieron jarabes y antibióticos y sigo igual.”",
  vitals: { TA: "136/82 mmHg", FC: "80 lpm", "T°": "36,5 °C", Peso: "68 kg" },
  anamnesis: [
    act("disfonia", "¿Desde cuándo está ronco?", "clave", "“Tres meses, sin mejoría.”", "Disfonía de más de 3 semanas."),
    act("tabaco", "¿Cuánto fuma y toma?", "clave", "“Un atado y medio y vino todos los días.”", "Factores de riesgo."),
    act("alarma", "¿Dolor de oído, al tragar, bultos en el cuello o falta de aire?", "clave", "“Me duele un poco el oído al tragar.”", "Otalgia referida."),
    act("peso", "¿Bajó de peso?", "util", "“Tres kilos.”", "Alarma."),
    act("reflujo", "¿Acidez?", "util", "“No.”", "Laringitis por reflujo."),
    act("trabajo", "¿Qué vende?", "neutro", "“Medias en el tren.”", "Uso de la voz."),
  ],
  exam: [
    act("cuello", "Cuello", "clave", "Adenopatía yugular izquierda de 2 cm, dura.", "Metástasis ganglionar."),
    act("laringoscopia", "Laringoscopia (nasofibroscopia)", "clave", "Lesión vegetante en cuerda vocal izquierda con fijación de la cuerda.", "Tumor laríngeo."),
    act("respiratorio", "Respiración", "util", "Sin estridor.", "Vía aérea libre."),
  ],
  studies: [
    study("Otros", "biopsia", "Biopsia bajo laringoscopia", "clave", "Carcinoma escamoso.", "Confirma."),
    study("Imágenes", "tc", "TC de cuello y tórax", "clave", "Tumor glótico con extensión supraglótica y ganglio; pulmón sin lesiones.", "Estadificación."),
    study("Laboratorio", "lab", "Hemograma, hepatograma, función renal", "util", "Normales.", "Base."),
    study("Otros", "mas-atb", "Otro ciclo de antibióticos y corticoides", "riesgoso", "No se indicó.", "Retrasa el diagnóstico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cancer-laringe", "Carcinoma escamoso de laringe glótico-supraglótico con metástasis ganglionar", true, "Fumador y bebedor con disfonía de 3 meses, otalgia, adenopatía y lesión con fijación de cuerda."),
      dx("laringitis", "Laringitis crónica", false, "Lesión vegetante y adenopatía."),
      dx("nodulo", "Nódulo vocal", false, "Lesión con fijación y ganglio."),
      dx("paralisis", "Parálisis de cuerda por cáncer de pulmón", false, "Hay tumor laríngeo primario."),
      dx("papilomatosis", "Papilomatosis laríngea", false, "Biopsia de carcinoma."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("comite", "Comité de cabeza y cuello: cirugía o quimiorradioterapia", "clave", "Según estadio y preservación de órgano."),
      mg("tabaco-alcohol", "Dejar de fumar y beber", "clave", "Mejora el tratamiento y reduce segundos tumores."),
      mg("nutricion", "Evaluación nutricional y fonoaudiológica", "clave", "Soporte."),
      mg("odonto", "Evaluación odontológica antes de la radioterapia", "util", "Prevención de osteorradionecrosis."),
      mg("esperar", "Control en tres meses", "riesgoso", "Progresión."),
      mg("solo-paliativo", "Solo cuidados paliativos de entrada", "riesgoso", "Es potencialmente curable."),
    ],
  },
  debrief: {
    diagnosis: "Carcinoma escamoso de laringe glótico-supraglótico con metástasis ganglionar cervical, en varón de 62 años fumador y bebedor.",
    pathologies: [
      { name: "Cáncer de laringe", role: "principal", why: "Carcinoma escamoso." },
      { name: "Tabaco y alcohol", role: "asociada", why: "Factores sinérgicos." },
      { name: "Laringitis, nódulo vocal", role: "diferencial", why: "Otras disfonías." },
    ],
    reasoning: [
      "Causa: tabaco y alcohol con efecto multiplicativo.",
      "Mecanismo: displasia del epitelio que progresa a carcinoma.",
      "Consecuencia: disfonía, disfagia, obstrucción de la vía aérea y metástasis cervicales.",
    ],
    epidemiology:
      "Es el cáncer de cabeza y cuello más frecuente después de la cavidad oral. Predomina en varones fumadores. La disfonía de más de tres semanas en un fumador obliga a mirar la laringe.",
    management: [
      "Laringoscopia.",
      "Biopsia y TC.",
      "Comité.",
      "Tabaco y soporte.",
    ],
    sources: ["Instituto Nacional del Cáncer — Cáncer de cabeza y cuello.", "NCCN — Head and Neck Cancers Guidelines."],
    pearls: ["Disfonía de más de 3 semanas en fumador: laringoscopia.", "Otalgia referida.", "Palpá el cuello."],
    pitfalls: ["Antibióticos repetidos.", "No mirar la laringe."],
    tribunal: [
      qa("¿Por qué el cáncer glótico se detecta antes?", "Porque da disfonía temprana y la glotis tiene poco drenaje linfático."),
      qa("¿Qué es la otalgia referida?", "Dolor de oído por compromiso del nervio vago o glosofaríngeo desde la faringe o laringe."),
      qa("¿Qué es la laringectomía total?", "Extirpación de la laringe con traqueostoma permanente."),
    ],
  },
};
