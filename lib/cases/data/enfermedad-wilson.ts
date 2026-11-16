import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const enfermedadWilson: ClinicalCase = {
  id: "enfermedad-wilson",
  level: 4,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 19, ageUnit: "años", sex: "F", context: "Estudiante de Psicología. Le encontraron las transaminasas altas en un apto físico. No toma alcohol." },
  frequency: "raro",
  intro: "“Me dijeron que tengo el hígado mal, pero me siento bien. Eso sí, hace meses me tiembla la mano al escribir.”",
  vitals: { TA: "110/68 mmHg", FC: "72 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("temblor", "¿Cómo es el temblor?", "clave", "“Cuando escribo o tomo la taza, y se me cae la letra.”", "Síntomas neurológicos en una joven con hepatopatía: Wilson."),
    act("animo", "¿Cambios de ánimo o en la facultad?", "clave", "“Me cuesta concentrarme, estoy irritable, bajé el rendimiento.”", "Síntomas psiquiátricos frecuentes."),
    act("familia", "¿Algún familiar con enfermedad del hígado?", "clave", "“Un tío murió joven de cirrosis sin tomar alcohol.”", "Herencia autosómica recesiva."),
    act("alcohol-drogas", "¿Alcohol, medicamentos, suplementos?", "clave", "“Nada.”", "Descarta causas tóxicas."),
    act("virales", "¿Vacuna de hepatitis B, tatuajes?", "util", "“Vacunada. Un tatuaje chico.”", "Hepatitis virales."),
    act("carrera", "¿En qué año está?", "neutro", "“Segundo.”", "No orienta."),
  ],
  exam: [
    act("ojos", "Examen de córnea con lámpara de hendidura", "clave", "Anillo pardo-verdoso en la periferia de la córnea.", "Anillo de Kayser-Fleischer: cobre corneal."),
    act("neuro", "Examen neurológico", "clave", "Temblor de acción 'en aleteo' al extender los brazos, leve disartria.", "Compromiso de ganglios basales."),
    act("higado", "Hígado y bazo", "util", "Bazo palpable.", "Hipertensión portal."),
  ],
  studies: [
    study("Laboratorio", "ceruloplasmina", "Ceruloplasmina sérica", "clave", "8 mg/dl (baja).", "Típicamente baja."),
    study("Laboratorio", "cobre-orina", "Cobre en orina de 24 horas", "clave", "180 µg/24 h (alto).", "Muy sugestivo."),
    study("Laboratorio", "hepatograma", "Hepatograma y hemograma", "clave", "ALT 96, AST 88, plaquetas 110.000; Coombs negativa con LDH algo alta.", "Hepatopatía con hipertensión portal y hemólisis leve."),
    study("Imágenes", "rmn", "Resonancia de cerebro", "util", "Hiperintensidad en putamen y tronco ('cara de oso panda').", "Compromiso neurológico."),
    study("Otros", "genetico", "Estudio genético del gen ATP7B", "util", "Dos mutaciones patogénicas.", "Confirma y permite estudiar a los hermanos."),
    study("Laboratorio", "ferritina", "Panel de hierro para hemocromatosis como causa", "innecesario", "No se pidió.", "No explica el cuadro neurológico ni el anillo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("wilson", "Enfermedad de Wilson con compromiso hepático y neurológico", true, "Joven con transaminasas altas, temblor, cambios psiquiátricos, anillo de Kayser-Fleischer, ceruloplasmina baja y cobre urinario alto."),
      dx("hepatitis-autoinmune", "Hepatitis autoinmune", false, "No explica el anillo ni el cuadro neurológico."),
      dx("hemocromatosis", "Hemocromatosis", false, "No da anillo corneal ni temblor a esta edad."),
      dx("temblor-esencial", "Temblor esencial", false, "No explica la hepatopatía."),
      dx("higado-graso", "Hígado graso", false, "Sin obesidad ni síndrome metabólico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("quelante", "Quelante del cobre: D-penicilamina o trientina, de por vida", "clave", "Elimina el cobre acumulado."),
      mg("zinc", "Zinc como mantenimiento", "util", "Bloquea la absorción intestinal de cobre."),
      mg("dieta", "Evitar alimentos ricos en cobre (hígado, mariscos, chocolate) al inicio", "util", "Coadyuvante."),
      mg("hermanos", "Estudiar a los hermanos", "clave", "Herencia autosómica recesiva: 25 % de riesgo."),
      mg("adherencia", "Remarcar que el tratamiento es de por vida", "clave", "Suspenderlo puede causar falla hepática fulminante."),
      mg("suspender", "Tratarla hasta normalizar y suspender", "riesgoso", "La suspensión desencadena insuficiencia hepática."),
      mg("anticonceptivos-prohibir", "Decirle que no puede tener hijos", "riesgoso", "Falso: con tratamiento puede embarazarse con control."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de Wilson con hepatopatía, hipertensión portal y compromiso neuropsiquiátrico, en una mujer de 19 años.",
    pathologies: [
      { name: "Enfermedad de Wilson", role: "principal", why: "Acumulación de cobre por mutación de ATP7B." },
      { name: "Hipertensión portal", role: "asociada", why: "Esplenomegalia y plaquetopenia." },
      { name: "Hepatitis autoinmune", role: "diferencial", why: "Otra hepatopatía de la mujer joven." },
    ],
    reasoning: [
      "Causa: mutación en ATP7B, que transporta cobre a la bilis y a la ceruloplasmina.",
      "Mecanismo: el cobre se acumula en hígado, cerebro (ganglios basales) y córnea.",
      "Consecuencia: hepatitis, cirrosis, falla fulminante, trastorno del movimiento y síntomas psiquiátricos.",
    ],
    epidemiology:
      "Afecta a 1 de cada 30.000 personas. Se presenta entre los 5 y 35 años, en niños sobre todo con hepatopatía y en jóvenes con síntomas neurológicos o psiquiátricos. Hay que pensarla en toda hepatopatía sin causa antes de los 40 años.",
    management: [
      "Ceruloplasmina, cobre urinario y lámpara de hendidura.",
      "Quelantes de por vida.",
      "Zinc de mantenimiento.",
      "Rastreo familiar.",
      "Trasplante si hay falla fulminante.",
    ],
    sources: ["Sociedad Argentina de Hepatología — Enfermedad de Wilson.", "EASL — Clinical Practice Guidelines: Wilson's disease."],
    pearls: ["Hígado + temblor + joven = Wilson.", "Kayser-Fleischer con lámpara de hendidura.", "El tratamiento es de por vida."],
    pitfalls: ["No pensarla en jóvenes.", "Suspender el quelante."],
    tribunal: [
      qa("¿Qué es el anillo de Kayser-Fleischer?", "Un depósito de cobre en la membrana de Descemet de la córnea, presente en casi todos los que tienen compromiso neurológico."),
      qa("¿Cómo se diagnostica la enfermedad de Wilson?", "Con ceruloplasmina baja, cobre urinario de 24 horas alto, anillo corneal y, si hace falta, cobre hepático o estudio genético."),
      qa("¿Qué forma de presentación tiene peor pronóstico?", "La insuficiencia hepática fulminante con hemólisis Coombs negativa, que suele requerir trasplante."),
    ],
  },
};
