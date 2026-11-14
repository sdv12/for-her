import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const epilepsiaAdultoMayor: ClinicalCase = {
  id: "epilepsia-adulto-mayor-post-acv",
  level: 2,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 74, ageUnit: "años", sex: "M", context: "ACV isquémico frontal izquierdo hace 8 meses, con buena recuperación. Toma aspirina y atorvastatina." },
  frequency: "frecuente",
  intro: "La esposa: “Estaba mirando tele y empezó a sacudir el brazo derecho, después todo el cuerpo, y quedó confundido un rato.”",
  vitals: { TA: "148/86 mmHg", FC: "92 lpm", FR: "18 rpm", "T°": "36,7 °C", "SatO₂": "96 %", Glucemia: "112 mg/dl", Glasgow: "14/15" },
  anamnesis: [
    act("inicio", "¿Cómo empezó?", "clave", "“Por el brazo derecho.”", "Inicio focal."),
    act("acv", "¿Tuvo un ACV?", "clave", "“Hace 8 meses, del lado izquierdo.”", "Lesión epileptógena."),
    act("posictal", "¿Cuánto duró la confusión después?", "clave", "“Media hora.”", "Posictal."),
    act("farmacos", "¿Tomó algo nuevo: tramadol, bupropión, quinolonas?", "util", "“No.”", "Fármacos proconvulsivantes."),
    act("alcohol", "¿Alcohol?", "util", "“No.”", "Abstinencia."),
    act("hobby", "¿Qué miraba?", "neutro", "“Un partido.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Paresia leve del brazo derecho que mejora en horas.", "Parálisis de Todd."),
    act("lengua", "Lengua", "clave", "Mordedura lateral.", "Crisis epiléptica."),
    act("cardio", "Ritmo cardíaco", "util", "Regular.", "Síncope arrítmico menos probable."),
  ],
  studies: [
    study("Laboratorio", "lab", "Glucemia, sodio, calcio, magnesio, función renal", "clave", "Normales.", "Descartar provocadas."),
    study("Imágenes", "tc", "TC de cerebro", "clave", "Secuela isquémica frontal izquierda sin lesiones nuevas.", "Excluye nuevo ACV o sangrado."),
    study("Otros", "eeg", "EEG", "util", "Ondas agudas frontales izquierdas.", "Riesgo de recurrencia."),
    study("Otros", "fenitoina-carga", "Fenitoína de mantenimiento en adulto mayor polimedicado", "riesgoso", "No se indicó.", "Interacciones y efectos adversos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("epilepsia-post-acv", "Epilepsia estructural de inicio tardío secundaria a ACV, con crisis focal a bilateral tónico-clónica", true, "Crisis de inicio focal meses después de un ACV en la zona correspondiente, mordedura lateral y EEG con actividad epileptiforme."),
      dx("acv-nuevo", "Nuevo ACV", false, "TC sin lesión nueva y déficit transitorio postictal."),
      dx("sincope", "Síncope convulsivo", false, "Inicio focal y posictal prolongado."),
      dx("hipoglucemia", "Hipoglucemia", false, "Glucemia normal."),
      dx("ait", "AIT", false, "Hubo movimientos clónicos y posictal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("levetiracetam", "Levetiracetam o lamotrigina", "clave", "Riesgo alto de recurrencia; pocas interacciones."),
      mg("conducir", "No conducir según normativa", "clave", "Seguridad."),
      mg("caidas", "Prevención de caídas y lesiones", "clave", "Adulto mayor."),
      mg("seguimiento", "Seguimiento neurológico", "util", "Ajuste."),
      mg("fenitoina", "Fenitoína", "riesgoso", "Interacciones y toxicidad en ancianos."),
      mg("no-tratar", "No tratar por ser la primera crisis", "riesgoso", "Con lesión estructural el riesgo de recurrencia es alto."),
    ],
  },
  debrief: {
    diagnosis: "Epilepsia estructural de inicio tardío secundaria a ACV, con crisis focal a bilateral tónico-clónica, en varón de 74 años.",
    pathologies: [
      { name: "Epilepsia post-ACV", role: "principal", why: "Causa más frecuente de epilepsia en mayores." },
      { name: "Parálisis de Todd", role: "asociada", why: "Déficit transitorio." },
      { name: "Nuevo ACV, síncope", role: "diferencial", why: "Otros eventos." },
    ],
    reasoning: [
      "Causa: cicatriz cortical del infarto.",
      "Mecanismo: hiperexcitabilidad neuronal en el borde de la lesión.",
      "Consecuencia: crisis focales que pueden generalizarse.",
    ],
    epidemiology:
      "La incidencia de epilepsia aumenta después de los 65 años, y el ACV es la causa principal. Una crisis tardía tras un ACV cortical tiene alto riesgo de repetirse y se trata desde la primera. Se prefieren fármacos con pocas interacciones.",
    management: [
      "Descartar causas agudas.",
      "Imagen.",
      "Antiepiléptico adecuado.",
      "Seguridad.",
    ],
    sources: ["Sociedad Argentina de Neurología — Epilepsia en el adulto mayor.", "ILAE — Practical Clinical Definition of Epilepsy."],
    pearls: ["Crisis tardía post-ACV: tratar.", "Levetiracetam o lamotrigina.", "Todd no es ACV nuevo."],
    pitfalls: ["Fenitoína en el anciano.", "Confundir Todd con ACV."],
    tribunal: [
      qa("¿Qué es la parálisis de Todd?", "Déficit focal transitorio después de una crisis, que se resuelve en horas."),
      qa("¿Qué es la definición práctica de epilepsia de la ILAE?", "Dos crisis no provocadas o una con riesgo de recurrencia mayor del 60 %."),
      qa("¿Qué diferencia hay entre crisis temprana y tardía post-ACV?", "La temprana (primera semana) es aguda sintomática; la tardía indica epilepsia."),
    ],
  },
};
