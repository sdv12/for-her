import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const migrana: ClinicalCase = {
  id: "migrana-sin-aura",
  level: 1,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 28, ageUnit: "años", sex: "F", context: "Diseñadora. Toma anticonceptivos combinados." },
  frequency: "muy-frecuente",
  intro: "“Tengo dolores de cabeza que me tiran a la cama, tres o cuatro veces por mes. Me late de un lado, me molesta la luz y vomito. Tomo ibuprofeno casi todos los días.”",
  vitals: { TA: "112/70 mmHg", FC: "72 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("caracteristicas", "¿Cómo es el dolor y cuánto dura?", "clave", "“Pulsátil, del lado derecho o izquierdo, me dura un día entero. Si me muevo es peor.”", "Unilateral, pulsátil, moderado-intenso, que empeora con la actividad y dura 4–72 h: migraña."),
    act("aura", "Antes del dolor, ¿ve luces, manchas o siente hormigueos?", "clave", "“No, nunca.”", "Define migraña sin aura. Con aura, los anticonceptivos combinados están contraindicados por riesgo de ACV."),
    act("alarma", "¿Algún dolor fue súbito y el peor de su vida? ¿Cambió el patrón? ¿Tiene fiebre, debilidad o confusión?", "clave", "“No, siempre es igual, desde la adolescencia.”", "Banderas rojas (SNOOP): inicio súbito, cambio de patrón, signos neurológicos, fiebre, inicio después de los 50, embarazo o inmunosupresión."),
    act("analgesicos", "¿Cuántos días por mes toma analgésicos?", "clave", "“Casi todos los días, por miedo a que me agarre.”", "Usar analgésicos más de 10–15 días por mes produce cefalea por abuso de medicación."),
    act("disparadores", "¿Nota algo que se lo dispare?", "util", "“Dormir poco, el estrés y antes de menstruar.”", "Identificar disparadores ayuda a prevenir."),
    act("familia", "¿Alguien en la familia tiene migraña?", "util", "“Mi mamá.”", "Fuerte carga familiar."),
    act("cafe", "¿Qué café le gusta?", "neutro", "“Cortado.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico completo", "clave", "Normal.", "Entre crisis el examen es normal; cualquier hallazgo cambia el enfoque."),
    act("fondo", "Fondo de ojo", "clave", "Papilas de bordes netos.", "El edema de papila indicaría hipertensión endocraneana."),
    act("ta", "Presión arterial", "util", "112/70 mmHg.", "Descarta cefalea por hipertensión."),
    act("cuello", "Rigidez de nuca y palpación pericraneal", "util", "Sin rigidez; leve contractura cervical.", "Descarta meningismo."),
  ],
  studies: [
    study("Imágenes", "tc", "Tomografía de cerebro", "innecesario", "Normal.", "En una cefalea primaria típica con examen normal no está indicada."),
    study("Imágenes", "rmn", "Resonancia de cerebro", "innecesario", "No se realizó.", "Solo ante banderas rojas o atipías."),
    study("Electrofisiología", "eeg", "Electroencefalograma", "innecesario", "No se realizó.", "No aporta al diagnóstico de migraña."),
    study("Otros", "diario", "Diario de cefaleas por un mes", "util", "Registra 4 crisis y analgésicos 22 días del mes.", "Objetiva la frecuencia, los disparadores y el abuso de analgésicos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("migrana", "Migraña sin aura con cefalea por abuso de analgésicos", true, "Cefaleas típicas de migraña, sin aura ni banderas rojas, examen normal y consumo de analgésicos más de 15 días por mes."),
      dx("tensional", "Cefalea tensional", false, "Opresiva, bilateral, leve a moderada, sin náuseas importantes ni empeoramiento con la actividad."),
      dx("racimos", "Cefalea en racimos", false, "Más en varones: dolor periorbitario intensísimo de 15–180 minutos con lagrimeo y rinorrea del mismo lado."),
      dx("hsa", "Hemorragia subaracnoidea", false, "Cefalea súbita, la peor de la vida."),
      dx("tumor", "Tumor cerebral", false, "Cefalea progresiva, de reciente comienzo, con signos neurológicos o de hipertensión endocraneana."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("crisis", "Para las crisis: AINE en dosis plenas (o triptán si no responde) al inicio, con antiemético", "clave", "Tratar temprano y con dosis adecuadas mejora la respuesta."),
      mg("limite", "Limitar los analgésicos a menos de 10 días por mes", "clave", "Corta la cefalea por abuso de medicación."),
      mg("preventivo", "Tratamiento preventivo (propranolol, amitriptilina o topiramato) y hábitos (sueño regular, comidas, actividad física)", "clave", "Con 4 o más crisis por mes o crisis discapacitantes, la prevención reduce la frecuencia."),
      mg("aco", "Puede seguir con anticonceptivos combinados (migraña sin aura, no fumadora), con control", "util", "La contraindicación es la migraña con aura."),
      mg("opioides", "Tramadol o codeína para las crisis", "riesgoso", "Empeoran la cronificación y generan dependencia."),
      mg("ergotamina", "Ergotamina con cafeína diaria", "riesgoso", "Alto riesgo de abuso y de ergotismo."),
    ],
  },
  debrief: {
    diagnosis: "Migraña sin aura, episódica de alta frecuencia, con cefalea por abuso de analgésicos.",
    pathologies: [
      { name: "Migraña sin aura", role: "principal", why: "Criterios típicos, sin banderas rojas." },
      { name: "Cefalea por abuso de medicación", role: "asociada", why: "Analgésicos más de 15 días por mes." },
      { name: "Cefalea tensional y en racimos", role: "diferencial", why: "Otras cefaleas primarias." },
      { name: "Cefaleas secundarias", role: "diferencial", why: "Se descartan con las banderas rojas." },
    ],
    reasoning: [
      "Causa: predisposición genética a una excitabilidad cerebral aumentada, con disparadores (hormonas, sueño, estrés, ayuno).",
      "Mecanismo: activación del sistema trigeminovascular, con liberación de péptidos vasoactivos (CGRP) que producen inflamación neurogénica de los vasos meníngeos y sensibilización central.",
      "Consecuencia: dolor pulsátil unilateral, náuseas, foto y fonofobia; la sensibilización explica que empeore con el movimiento.",
      "El uso frecuente de analgésicos mantiene la sensibilización central y cronifica el dolor.",
    ],
    epidemiology:
      "La migraña afecta al 12–15 % de la población y es una de las principales causas de discapacidad en adultos jóvenes. Es tres veces más frecuente en mujeres (por la influencia hormonal), con pico entre los 25 y 45 años, y suele empezar en la adolescencia.",
    management: [
      "Diagnóstico clínico; buscar banderas rojas y examinar.",
      "Crisis: AINE o triptanes temprano, antiemético.",
      "Prevención si hay 4 o más crisis por mes, crisis discapacitantes o abuso de medicación.",
      "Retirar el analgésico en exceso; diario de cefaleas.",
      "Anticoncepción: combinados contraindicados en migraña con aura.",
    ],
    sources: ["Sociedad Neurológica Argentina — Guía de diagnóstico y tratamiento de las cefaleas.", "Clasificación Internacional de las Cefaleas (ICHD-3)."],
    pearls: ["Sin banderas rojas y examen normal: no hace falta imagen.", "Más de 10–15 días por mes de analgésicos = abuso.", "Migraña con aura + anticonceptivos combinados: no."],
    pitfalls: ["Pedir tomografía a toda cefalea.", "Indicar opioides.", "No preguntar por el aura."],
  },
};
