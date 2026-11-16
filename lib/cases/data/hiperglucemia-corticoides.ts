import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hiperglucemiaCorticoides: ClinicalCase = {
  id: "hiperglucemia-corticoides",
  level: 2,
  area: "Endocrinología",
  setting: "Internación",
  patient: { age: 70, ageUnit: "años", sex: "M", context: "Internado por exacerbación de EPOC. Recibe meprednisona 40 mg a la mañana. Nunca le dijeron que era diabético." },
  frequency: "muy-frecuente",
  intro: "La residente: “Las glucemias de ayunas dan 115, pero a la tarde llegan a 310. ¿Qué hacemos?”",
  vitals: { TA: "134/80 mmHg", FC: "88 lpm", FR: "20 rpm", "SatO₂": "92 % con 1 l/min" },
  anamnesis: [
    act("patron", "¿Cuál es el perfil de glucemias a lo largo del día?", "clave", "Ayuno 115, almuerzo 240, merienda 310, cena 270, madrugada 130.", "Patrón típico del corticoide matinal: pico en la tarde y normalización en la madrugada."),
    act("dosis", "¿Qué corticoide, a qué hora y por cuánto tiempo?", "clave", "Meprednisona 40 mg a las 8, plan de 5 días.", "Define el tipo de insulina."),
    act("hba1c", "¿Tiene HbA1c?", "clave", "Se pidió: 5,9 %.", "Sin diabetes previa: hiperglucemia inducida."),
    act("sintomas", "¿Sed, poliuria?", "util", "Algo de sed a la tarde.", "Síntomas de hiperglucemia."),
    act("comida", "¿Come bien?", "util", "Sí, la dieta del hospital.", "Ingesta para planear la insulina."),
    act("tv", "¿Tiene televisión en la habitación?", "neutro", "No.", "Sin relación."),
  ],
  exam: [
    act("hidratacion", "Hidratación", "clave", "Normohidratado.", "Sin descompensación hiperosmolar."),
    act("respiratorio", "Respiratorio", "util", "Sibilancias espiratorias en mejoría.", "EPOC en tratamiento."),
    act("estado", "Estado mental", "util", "Lúcido.", "Sin alteraciones."),
  ],
  studies: [
    study("Laboratorio", "perfil", "Glucemias capilares antes de cada comida y a la noche", "clave", "Patrón vespertino confirmado.", "Base para dosificar."),
    study("Laboratorio", "hba1c", "HbA1c", "clave", "5,9 %.", "Distingue diabetes previa de hiperglucemia inducida."),
    study("Laboratorio", "cetonas", "Cetonemia y gases", "innecesario", "No se pidieron.", "Sin clínica de cetoacidosis ni glucemias extremas."),
    study("Laboratorio", "ionograma", "Ionograma y función renal", "util", "Potasio 3,6 mEq/l, creatinina 0,9.", "Ajustes."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hiperglucemia-cortico", "Hiperglucemia inducida por glucocorticoides, sin diabetes previa", true, "Glucemias normales en ayunas con picos vespertinos tras la meprednisona matinal y HbA1c de 5,9 %."),
      dx("dm2-debut", "Diabetes tipo 2 previa no diagnosticada", false, "La HbA1c es menor de 6,5 %."),
      dx("estres", "Hiperglucemia de estrés sola", false, "El patrón vespertino sigue al corticoide."),
      dx("hiperosmolar", "Estado hiperosmolar", false, "Glucemias menores de 600 y sin deshidratación."),
      dx("cushing", "Síndrome de Cushing endógeno", false, "Es exógeno y transitorio."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("nph-manana", "Insulina NPH a la mañana junto con el corticoide (0,1 U/kg por cada 10 mg de meprednisona)", "clave", "Su pico coincide con el del corticoide."),
      mg("correccion", "Insulina rápida de corrección antes de las comidas", "clave", "Ajuste fino."),
      mg("ajustar", "Ajustar la NPH a diario y bajarla junto con el corticoide", "clave", "Evita hipoglucemias al suspenderlo."),
      mg("alta", "Al alta: control de glucemia y HbA1c en 3 meses", "util", "Riesgo de diabetes futura."),
      mg("glargina-noche", "Glargina a la noche", "riesgoso", "Cubre la madrugada, cuando la glucemia ya es normal: riesgo de hipoglucemia nocturna."),
      mg("escala-sola", "Solo escala móvil de insulina rápida", "riesgoso", "Trata la hiperglucemia ya instalada y no la previene."),
      mg("suspender-cortico", "Suspender el corticoide por la glucemia", "innecesario", "La EPOC lo necesita; la glucemia se maneja."),
    ],
  },
  debrief: {
    diagnosis: "Hiperglucemia inducida por meprednisona con patrón vespertino, sin diabetes previa, en un hombre de 70 años internado por EPOC.",
    pathologies: [
      { name: "Hiperglucemia por glucocorticoides", role: "principal", why: "Resistencia a la insulina y gluconeogénesis." },
      { name: "Exacerbación de EPOC", role: "asociada", why: "Indicación del corticoide." },
      { name: "Diabetes tipo 2 no diagnosticada", role: "diferencial", why: "Se descarta con la HbA1c." },
    ],
    reasoning: [
      "Causa: glucocorticoide de acción intermedia en una sola dosis matinal.",
      "Mecanismo: más gluconeogénesis y resistencia periférica con pico a las 4–8 horas.",
      "Consecuencia: glucemias altas de mediodía a noche, normales a la madrugada.",
    ],
    epidemiology:
      "Entre el 30 y el 50 % de los pacientes que reciben dosis moderadas o altas de corticoides tiene hiperglucemia. Es más frecuente en mayores, obesos, prediabéticos y con antecedentes familiares. Es una de las consultas más comunes en sala de clínica.",
    management: [
      "Perfil de glucemias.",
      "HbA1c.",
      "NPH matinal proporcional a la dosis del corticoide.",
      "Bajar la insulina al bajar el corticoide.",
    ],
    sources: ["Sociedad Argentina de Diabetes — Manejo de la hiperglucemia en internación.", "ADA — Standards of Care: Diabetes care in the hospital."],
    pearls: ["Ayuno normal no descarta: mirá la tarde.", "NPH matinal con la meprednisona.", "Baja el corticoide, baja la insulina."],
    pitfalls: ["Glargina nocturna.", "Escala móvil sola."],
    tribunal: [
      qa("¿Por qué se usa NPH a la mañana en la hiperglucemia por corticoides?", "Porque su pico a las 4–8 horas acompaña la acción del corticoide matinal y se termina antes de la madrugada."),
      qa("¿Qué patrón de glucemia produce la meprednisona dada a la mañana?", "Glucemias normales o casi normales en ayunas y elevadas desde el mediodía hasta la noche."),
      qa("¿Qué hay que hacer con la insulina al bajar el corticoide?", "Reducirla en la misma proporción para evitar hipoglucemias."),
    ],
  },
};
