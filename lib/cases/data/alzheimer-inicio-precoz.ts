import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const alzheimerInicioPrecoz: ClinicalCase = {
  id: "demencia-alzheimer-inicio-precoz",
  level: 2,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 59, ageUnit: "años", sex: "M", context: "Contador. Su padre tuvo demencia a los 60. Viene con la esposa, que notó los cambios." },
  frequency: "poco-frecuente",
  intro: "“Hace dos años se olvida lo que le digo, repite preguntas, se perdió volviendo a casa y dejó de poder manejar la contabilidad.” (relata la esposa)",
  vitals: { TA: "128/78 mmHg", FC: "72 lpm", "T°": "36,4 °C", "SatO₂": "98 %", Glucemia: "94 mg/dl" },
  anamnesis: [
    act("evolucion", "¿Fue gradual? ¿Cuándo se notó?", "clave", "“Lento, dos años.”", "Insidioso."),
    act("funcional", "¿Qué tareas dejó de hacer?", "clave", "“Las cuentas, y se pierde.”", "Compromiso funcional."),
    act("reversibles", "¿Medicación, alcohol, depresión, tiroides?", "clave", "“Sin alcohol, algo triste.”", "Reversibles."),
    act("familia", "¿Quién más tuvo?", "util", "“Mi suegro y un tío.”", "Hereditaria."),
    act("psiquiatrico", "¿Alucinaciones, caídas, temblor?", "util", "“No.”", "Otras demencias."),
    act("gustos", "¿Qué le gusta?", "neutro", "“El tango.”", "No orienta."),
  ],
  exam: [
    act("cognitivo", "Evaluación cognitiva", "clave", "MoCA 18; falla memoria diferida, sin beneficio con pistas.", "Memoria."),
    act("neuro", "Examen neurológico", "clave", "Normal.", "Sin foco."),
    act("animo", "Evaluación del ánimo", "util", "Leve.", "Seudodemencia."),
  ],
  studies: [
    study("Laboratorio", "lab", "TSH, B12, función renal, VDRL, VIH", "clave", "Normales.", "Excluye reversibles."),
    study("Imágenes", "rmn", "RM de encéfalo", "clave", "Atrofia hipocámpica bilateral.", "Sustenta."),
    study("Otros", "bio", "Biomarcadores en LCR o PET amiloide", "util", "Aβ42 baja, tau alta.", "En casos precoces."),
    study("Laboratorio", "genetica", "Consejo genético: APP, PSEN1 y PSEN2", "util", "Se ofrece, con asesoramiento.", "Hereditaria."),
    study("Otros", "biopsia", "Biopsia cerebral", "riesgoso", "No se realizó.", "No corresponde."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("alzheimer", "Enfermedad de Alzheimer de inicio precoz", true, "Amnesia insidiosa, sin mejora con pistas, atrofia hipocámpica y biomarcadores."),
      dx("frontotemporal", "Demencia frontotemporal", false, "La conducta y el lenguaje se afectarían primero."),
      dx("vascular", "Demencia vascular", false, "Sin eventos ni lesiones."),
      dx("depresion", "Seudodemencia", false, "Biomarcadores y atrofia."),
      dx("lewy", "Lewy", false, "Sin parkinsonismo ni alucinaciones."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("farmacos", "Inhibidores de colinesterasa y memantina según etapa", "clave", "Efecto sintomático."),
      mg("familia", "Cuidado, planificación legal y laboral", "clave", "Decisiones anticipadas."),
      mg("seguridad", "Evaluar manejo y seguridad", "clave", "Ya se perdió."),
      mg("ejercicio", "Actividad física y control de factores", "util", "Calidad de vida."),
      mg("benzo", "Benzodiacepinas para la ansiedad", "riesgoso", "Empeoran la memoria."),
      mg("ocultar", "Ocultar el diagnóstico", "riesgoso", "Derecho a saber."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de Alzheimer de inicio precoz, en varón de 59 años con antecedentes familiares.",
    pathologies: [
      { name: "Enfermedad de Alzheimer", role: "principal", why: "Demencia degenerativa." },
      { name: "Riesgo familiar", role: "asociada", why: "Posible herencia." },
      { name: "Frontotemporal, vascular, depresión", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: alteración de amiloide y tau, con genética.",
      "Mecanismo: pérdida sináptica y atrofia del hipocampo.",
      "Consecuencia: amnesia y dependencia.",
    ],
    epidemiology:
      "La de inicio antes de los 65 años representa cerca del 5 % de los casos y afecta a personas activas laboralmente. Tiene gran impacto familiar y económico. El diagnóstico suele tardar más, porque se confunde con estrés o depresión. El apoyo a las familias es una parte central del tratamiento.",
    management: [
      "Evaluación cognitiva.",
      "Excluir reversibles.",
      "Biomarcadores.",
      "Apoyo y planificación.",
    ],
    sources: ["Sociedad Neurológica Argentina — Consenso de demencias.", "National Institute on Aging y Alzheimer's Association — Diagnostic Guidelines."],
    pearls: ["No mejora con pistas.", "Hipocampo.", "Inicio precoz: pensá genética."],
    pitfalls: ["Atribuir al estrés.", "No preguntar a los familiares."],
    tribunal: [
      qa("¿Cómo diferenciás deterioro cognitivo leve de demencia?", "Si afecta la independencia funcional es demencia; en el leve hay autonomía conservada."),
      qa("¿Cómo actúa la memantina?", "Antagonista NMDA, usado en etapas moderadas a graves."),
      qa("¿Qué trastorno genético aumenta el riesgo?", "Síndrome de Down, por el gen APP en el cromosoma 21; y APOE ε4 como factor de riesgo."),
    ],
  },
};
