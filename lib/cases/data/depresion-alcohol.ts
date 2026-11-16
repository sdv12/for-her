import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const depresionAlcohol: ClinicalCase = {
  id: "depresion-alcohol",
  level: 3,
  area: "Salud mental",
  setting: "Consultorio",
  patient: { age: 50, ageUnit: "años", sex: "M", context: "Metalúrgico despedido hace 8 meses. Lo trae la esposa." },
  frequency: "frecuente",
  intro: "La esposa: “Está apagado, no sale de la cama y toma vino desde el mediodía.” Él: “No sirvo para nada.”",
  vitals: { TA: "146/90 mmHg", FC: "88 lpm", Peso: "79 kg" },
  anamnesis: [
    act("animo", "¿Cómo se siente la mayor parte del día?", "clave", "“Triste, vacío, nada me da ganas.”", "Ánimo deprimido y anhedonia."),
    act("suicidio", "¿Pensó en quitarse la vida? ¿Tiene un plan o armas en casa?", "clave", "“Pensé que estarían mejor sin mí. Tengo una escopeta de mi viejo.”", "Ideación suicida con acceso a un arma: riesgo alto."),
    act("alcohol", "¿Cuánto toma? ¿Qué pasa si no toma?", "clave", "“Una botella y media por día. Si no tomo me tiemblan las manos.”", "Consumo de riesgo con dependencia."),
    act("cronologia", "¿Qué empezó primero, la tristeza o el alcohol?", "clave", "“La tristeza, cuando me echaron.”", "Ayuda a distinguir depresión primaria de inducida."),
    act("sueno", "¿Cómo duerme y come?", "util", "“Me despierto a las 4 y no como.”", "Síntomas somáticos."),
    act("auto", "¿Le gustan los autos?", "neutro", "“Los fierros, sí.”", "No orienta."),
  ],
  exam: [
    act("mental", "Examen mental", "clave", "Bradipsiquia, hipomimia, llanto, sin psicosis.", "Episodio depresivo mayor."),
    act("hepatico", "Estigmas hepáticos", "util", "Hepatomegalia leve.", "Daño por alcohol."),
    act("temblor", "Temblor", "util", "Temblor fino en manos.", "Abstinencia leve."),
  ],
  studies: [
    study("Otros", "phq9-audit", "PHQ-9 y AUDIT", "clave", "PHQ-9: 21; AUDIT: 26.", "Depresión grave y dependencia."),
    study("Laboratorio", "lab", "Hemograma, hepatograma, GGT, TSH, B12", "util", "VCM 103, GGT 210, TSH normal.", "Consumo crónico; descarta causas orgánicas."),
    study("Imágenes", "rmn", "Resonancia de cerebro", "innecesario", "No se pidió.", "Sin signos neurológicos."),
    study("Otros", "esperar-abstinencia", "Esperar 4 semanas de abstinencia para evaluar el riesgo suicida", "riesgoso", "No se esperó.", "El riesgo es ahora."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("depresion-dual", "Episodio depresivo mayor grave con ideación suicida y trastorno por consumo de alcohol (patología dual)", true, "Ánimo deprimido y anhedonia que preceden al consumo, PHQ-9 de 21, ideación con acceso a arma y dependencia alcohólica."),
      dx("depresion-inducida", "Trastorno depresivo inducido solo por alcohol", false, "La depresión empezó antes del consumo intenso."),
      dx("duelo", "Reacción de adaptación al despido", false, "Gravedad y duración exceden una adaptación."),
      dx("bipolar", "Trastorno bipolar", false, "Sin episodios de manía o hipomanía."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "TSH normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("seguridad", "Plan de seguridad: retirar el arma de la casa con la familia y acompañamiento", "clave", "Restringir medios letales salva vidas."),
      mg("guardia-salud-mental", "Evaluación urgente por salud mental, considerar internación", "clave", "Riesgo suicida alto."),
      mg("ados", "Antidepresivo (ISRS) y tratamiento del consumo en paralelo", "clave", "Patología dual: se tratan juntos."),
      mg("tiamina", "Tiamina y manejo de la abstinencia", "clave", "Prevención de Wernicke y abstinencia."),
      mg("red", "Red de apoyo y recursos laborales", "util", "Determinantes sociales."),
      mg("bzd-largo", "Benzodiacepinas de forma prolongada para la ansiedad", "riesgoso", "Potencian el alcohol y aumentan el riesgo de sobredosis."),
      mg("primero-alcohol", "Tratar la depresión solo cuando deje el alcohol", "riesgoso", "Demora un tratamiento necesario."),
    ],
  },
  debrief: {
    diagnosis: "Episodio depresivo mayor grave con ideación suicida y acceso a un arma, con trastorno por consumo de alcohol, en un hombre de 50 años desocupado.",
    pathologies: [
      { name: "Depresión mayor grave", role: "principal", why: "Ánimo deprimido, anhedonia y síntomas somáticos." },
      { name: "Trastorno por consumo de alcohol", role: "asociada", why: "Patología dual." },
      { name: "Riesgo suicida", role: "asociada", why: "Varón, alcohol, desempleo y arma." },
    ],
    reasoning: [
      "Causa: pérdida laboral en una persona vulnerable.",
      "Mecanismo: el alcohol alivia al principio y luego profundiza la depresión.",
      "Consecuencia: alto riesgo de suicidio, más con acceso a armas.",
    ],
    epidemiology:
      "En Argentina los varones concentran cerca del 80 % de los suicidios. El alcohol está presente en una proporción importante y el desempleo es un factor de riesgo. Las armas de fuego en el hogar aumentan varias veces la letalidad de los intentos.",
    management: [
      "Preguntar siempre por ideación y medios.",
      "Restricción de medios letales.",
      "Tratamiento integrado de depresión y alcohol.",
      "Seguimiento cercano.",
    ],
    sources: ["Ministerio de Salud de la Nación — Lineamientos para la atención del intento de suicidio.", "OMS — mhGAP: guía de intervención para trastornos mentales y por consumo de sustancias."],
    pearls: ["Preguntar por suicidio no lo induce.", "Sacar el arma de la casa.", "Patología dual: tratar ambos."],
    pitfalls: ["Esperar la abstinencia.", "Benzodiacepinas crónicas."],
    tribunal: [
      qa("¿Qué factores aumentan el riesgo suicida?", "Sexo masculino, intentos previos, depresión, consumo de alcohol, desempleo, aislamiento, enfermedad crónica y acceso a medios letales."),
      qa("¿Qué es la patología dual?", "La coexistencia de un trastorno mental y un trastorno por consumo de sustancias en la misma persona."),
      qa("¿Qué es la restricción de medios letales?", "Retirar o limitar el acceso a armas, fármacos u otros medios; es una de las intervenciones con más evidencia para prevenir el suicidio."),
    ],
  },
};
