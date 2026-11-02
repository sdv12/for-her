import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const insomnio: ClinicalCase = {
  id: "insomnio-cronico",
  level: 1,
  area: "Salud mental",
  setting: "Consultorio",
  patient: { age: 58, ageUnit: "años", sex: "F", context: "Comerciante. Toma clonazepam que le dio una vecina." },
  frequency: "muy-frecuente",
  intro: "“No duermo hace meses. Me acuesto y doy vueltas, me despierto a las 3 y no me vuelvo a dormir. Quiero una receta de pastillas para dormir.”",
  vitals: { TA: "128/80 mmHg", FC: "76 lpm", "T°": "36,4 °C", Peso: "70 kg" },
  anamnesis: [
    act("patron", "¿Cuántas noches por semana y desde cuándo?", "clave", "“Casi todas, hace seis meses.”", "Más de 3 noches por semana durante más de 3 meses: insomnio crónico."),
    act("habitos", "¿A qué hora te acostás, usás el celular en la cama, tomás café o mate a la tarde?", "clave", "“Me acuesto a las 22 a ver el celular; mate hasta las 20.”", "Mala higiene del sueño y cafeína."),
    act("animo", "¿Cómo está tu ánimo? ¿Tenés preocupaciones?", "clave", "“Preocupada por el negocio, pero no triste.”", "Descarta depresión y ansiedad como causas principales."),
    act("ronquidos", "¿Roncás o te dijeron que parás de respirar? ¿Te dormís de día?", "util", "“No.”", "Descarta apnea del sueño."),
    act("benzo", "¿Cuánto clonazepam tomás y desde cuándo?", "util", "“Medio comprimido todas las noches hace 3 meses.”", "Riesgo de dependencia, caídas y alteración cognitiva."),
    act("menopausia", "¿Tenés sofocos de noche?", "util", "“Ya no.”", "Descarta síntomas climatéricos."),
    act("negocio", "¿Qué vendés?", "neutro", "“Ropa.”", "No orienta."),
  ],
  exam: [
    act("general", "Examen general", "clave", "Normal.", "Sin enfermedad orgánica evidente."),
    act("tiroides", "Tiroides", "util", "Normal.", "Descarta hipertiroidismo clínico."),
    act("piernas", "Preguntar y examinar por piernas inquietas", "util", "Sin síntomas.", "Descarta síndrome de piernas inquietas."),
  ],
  studies: [
    study("Otros", "diario", "Diario de sueño por dos semanas", "clave", "Latencia de 90 minutos, 5 horas de sueño, siestas de una hora.", "Base para la terapia."),
    study("Laboratorio", "tsh", "TSH y hemograma con ferritina", "util", "Normales.", "Descarta hipertiroidismo y ferropenia (piernas inquietas)."),
    study("Otros", "polisomnografia", "Polisomnografía de rutina", "innecesario", "No se realizó.", "Solo si se sospecha apnea u otros trastornos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("insomnio", "Insomnio crónico de conciliación y mantenimiento con mala higiene del sueño y uso de benzodiacepinas sin indicación", true, "Dificultad para dormir más de 3 noches por semana por 6 meses, con impacto diurno, malos hábitos, cafeína y clonazepam diario."),
      dx("depresion", "Depresión mayor", false, "No hay ánimo deprimido ni anhedonia."),
      dx("apnea", "Apnea obstructiva del sueño", false, "No ronca ni tiene somnolencia diurna excesiva."),
      dx("piernas", "Síndrome de piernas inquietas", false, "No tiene los síntomas."),
      dx("agudo", "Insomnio agudo", false, "Lleva más de 3 meses."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tcc", "Terapia cognitivo-conductual para el insomnio (control de estímulos, restricción de sueño, higiene)", "clave", "Es el tratamiento de primera línea, más eficaz a largo plazo que los fármacos."),
      mg("benzo-retiro", "Plan de retiro gradual del clonazepam", "clave", "Reduce dependencia, caídas y deterioro cognitivo; el retiro brusco produce rebote."),
      mg("habitos", "Sin pantallas en la cama, sin mate ni café después del mediodía, horarios regulares, sin siestas largas", "clave", "Higiene del sueño."),
      mg("hipnotico-corto", "Si hace falta, un hipnótico por tiempo breve", "util", "Solo como complemento, por pocas semanas."),
      mg("mas-benzo", "Aumentar el clonazepam", "riesgoso", "Más dependencia y efectos adversos."),
      mg("alcohol", "Un vaso de vino antes de dormir", "riesgoso", "Fragmenta el sueño y genera dependencia."),
    ],
  },
  debrief: {
    diagnosis: "Insomnio crónico de conciliación y mantenimiento con mala higiene del sueño y uso de benzodiacepinas sin prescripción, en mujer de 58 años.",
    pathologies: [
      { name: "Insomnio crónico", role: "principal", why: "Dificultad para dormir más de 3 meses con impacto diurno." },
      { name: "Uso de benzodiacepinas sin indicación", role: "asociada", why: "Riesgo de dependencia." },
      { name: "Depresión, apnea, piernas inquietas", role: "diferencial", why: "Otras causas de mal dormir." },
    ],
    reasoning: [
      "Causa: preocupaciones, malos hábitos y cafeína.",
      "Mecanismo: hiperactivación y condicionamiento negativo de la cama con la vigilia.",
      "Consecuencia: cansancio, irritabilidad, peor rendimiento; las benzodiacepinas suman dependencia y caídas.",
    ],
    epidemiology:
      "El insomnio crónico afecta a alrededor del 10 % de los adultos, más a mujeres y mayores. Argentina tiene un consumo alto de benzodiacepinas, muchas veces sin indicación ni seguimiento.",
    management: [
      "Evaluar causas y comorbilidades.",
      "Terapia cognitivo-conductual e higiene del sueño.",
      "Fármacos solo por tiempo limitado.",
      "Retiro gradual de benzodiacepinas.",
    ],
    sources: ["Asociación Argentina de Medicina del Sueño — Consenso de insomnio.", "Ministerio de Salud de la Nación — Recomendaciones para el uso racional de benzodiacepinas."],
    pearls: ["TCC-I es la primera línea.", "La cama solo para dormir.", "Retirar benzodiacepinas en forma gradual."],
    pitfalls: ["Recetar benzodiacepinas a largo plazo.", "No preguntar por cafeína y pantallas."],
    tribunal: [
      qa("¿Qué es el control de estímulos?", "Una técnica de la TCC para el insomnio: acostarse solo con sueño, usar la cama solo para dormir y sexo, levantarse si no se duerme en 20 minutos, levantarse siempre a la misma hora y evitar siestas."),
      qa("¿Qué riesgos tienen las benzodiacepinas a largo plazo?", "Tolerancia, dependencia, síndrome de abstinencia, caídas y fracturas, deterioro cognitivo, accidentes y depresión respiratoria con alcohol u opioides."),
      qa("¿Qué es la apnea obstructiva del sueño?", "El colapso repetido de la vía aérea superior durante el sueño, con ronquidos, pausas respiratorias y somnolencia diurna; se asocia a obesidad, hipertensión y riesgo cardiovascular; se trata con CPAP y descenso de peso."),
    ],
  },
};
