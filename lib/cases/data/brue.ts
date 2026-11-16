import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const brue: ClinicalCase = {
  id: "brue",
  level: 3,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 3, ageUnit: "meses", sex: "M", context: "Nació a término, sano. Primer hijo. Lactancia materna." },
  frequency: "frecuente",
  intro: "La mamá, llorando: “Después de comer se puso pálido, flojito, como que no respiraba. Duró unos segundos. Ahora está bien.”",
  vitals: { FC: "136 lpm", FR: "38 rpm", "SatO₂": "99 %", "T°": "36,8 °C", Peso: "6,1 kg" },
  anamnesis: [
    act("duracion", "¿Cuánto duró y cómo terminó?", "clave", "“Menos de un minuto. Lo levanté, le soplé y volvió solo.”", "Menos de 1 minuto y resolución espontánea."),
    act("comida", "¿Qué estaba haciendo antes?", "clave", "“Terminaba de tomar la teta y regurgitó un poco.”", "Relación con alimentación: reflujo o atragantamiento."),
    act("color", "¿Se puso azul o pálido?", "clave", "“Pálido, como blanquito.”", "Cambio de color."),
    act("previos", "¿Le pasó antes? ¿Algún hermano con muerte súbita?", "clave", "“Es la primera vez. No.”", "Primer episodio sin antecedentes."),
    act("cpr", "¿Hizo falta reanimación?", "clave", "“No, solo lo levanté.”", "Sin RCP: criterio de bajo riesgo."),
    act("fiebre", "¿Fiebre, tos, mocos, rechazo del alimento?", "util", "“No.”", "Descarta infección."),
  ],
  exam: [
    act("general", "Examen general", "clave", "Activo, rosado, buen tono, fontanela normotensa.", "Examen normal."),
    act("piel", "Piel completa", "clave", "Sin hematomas ni petequias.", "Busca maltrato."),
    act("ojos", "Fondo de ojo si se sospecha maltrato", "util", "No se realizó: sin sospecha.", "Hemorragias retinianas en trauma por sacudida."),
  ],
  studies: [
    study("Otros", "clinico", "Clasificación clínica de riesgo", "clave", "Mayor de 60 días, término, primer episodio, menos de 1 minuto, sin RCP, examen normal: bajo riesgo.", "Define conducta."),
    study("Electrofisiología", "ecg", "ECG con QT", "util", "QTc normal.", "Se puede considerar en bajo riesgo."),
    study("Imágenes", "tac", "TC de cerebro", "innecesario", "No se pidió.", "Sin sospecha de trauma."),
    study("Electrofisiología", "eeg", "EEG", "innecesario", "No se pidió.", "No recomendado en bajo riesgo."),
    study("Laboratorio", "lab-completo", "Hemograma, ionograma, cultivos y punción lumbar", "innecesario", "No se pidió.", "Sin rédito en bajo riesgo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("brue-bajo-riesgo", "Evento breve resuelto inexplicado (BRUE) de bajo riesgo", true, "Lactante mayor de 60 días, de término, con un primer episodio breve de palidez e hipotonía resuelto sin RCP, examen normal."),
      dx("convulsion", "Convulsión", false, "No hay movimientos ni poscrítico."),
      dx("sepsis", "Sepsis", false, "Sin fiebre y con examen normal."),
      dx("maltrato", "Traumatismo craneal no accidental", false, "Sin lesiones ni historia inconsistente."),
      dx("reflujo-normal", "Regurgitación normal sin importancia", false, "Hubo cambio de color y tono: es un BRUE."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("educar", "Educar a la familia y tranquilizar", "clave", "La mayoría no se repite."),
      mg("rcp", "Enseñar RCP del lactante", "clave", "Recomendado en todos."),
      mg("sueno-seguro", "Reforzar sueño seguro: boca arriba, cuna propia, sin humo", "clave", "Prevención de muerte súbita."),
      mg("control", "Control en 24 horas", "util", "Seguimiento."),
      mg("observacion-breve", "Observación breve con monitoreo de saturación en guardia", "util", "Opcional en bajo riesgo."),
      mg("antirreflujo", "Omeprazol o antirreflujo", "innecesario", "No se recomienda."),
      mg("monitor-casa", "Monitor de apneas domiciliario", "innecesario", "No reduce muerte súbita."),
    ],
  },
  debrief: {
    diagnosis: "Evento breve resuelto inexplicado (BRUE) de bajo riesgo, en un lactante de 3 meses.",
    pathologies: [
      { name: "BRUE de bajo riesgo", role: "principal", why: "Episodio breve, resuelto, sin causa en la evaluación." },
      { name: "Regurgitación", role: "asociada", why: "Gatillo probable." },
      { name: "Convulsión, sepsis, maltrato, arritmia", role: "diferencial", why: "Causas graves a descartar con historia y examen." },
    ],
    reasoning: [
      "Causa: muchas veces, reflejo laríngeo por regurgitación.",
      "Mecanismo: apnea breve con palidez o hipotonía que resuelve sola.",
      "Consecuencia: susto familiar; riesgo bajo de evento grave en los de bajo riesgo.",
    ],
    epidemiology:
      "Ocurre en 0,6 a 4 por cada 1.000 nacidos vivos y es una consulta frecuente en guardia de menores de un año. El término BRUE reemplazó a ALTE en 2016. La mayoría de los de bajo riesgo no tiene enfermedad grave.",
    management: [
      "Historia y examen detallados.",
      "Clasificar el riesgo.",
      "Bajo riesgo: educación, RCP y sueño seguro.",
      "Alto riesgo: internación y estudios.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Evento breve resuelto inexplicado.", "AAP — Clinical Practice Guideline: BRUE in infants."],
    pearls: ["Bajo riesgo: mayor de 60 días, término, menos de 1 min, primero, sin RCP.", "Menos estudios, más educación.", "Sueño seguro siempre."],
    pitfalls: ["Pedir todos los estudios.", "No buscar maltrato."],
    tribunal: [
      qa("¿Qué es un BRUE?", "Un episodio breve en un menor de 1 año con cianosis o palidez, alteración respiratoria, cambio de tono o de respuesta, resuelto e inexplicado tras historia y examen."),
      qa("¿Qué criterios definen un BRUE de bajo riesgo?", "Edad mayor de 60 días, edad gestacional de 32 semanas o más, primer episodio, menos de 1 minuto, sin RCP por personal entrenado y examen normal."),
      qa("¿Qué causas graves hay que buscar?", "Maltrato, infección, convulsiones, arritmias como QT largo, errores congénitos del metabolismo y alteraciones de la vía aérea."),
    ],
  },
};
