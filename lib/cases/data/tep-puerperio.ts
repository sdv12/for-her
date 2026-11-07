import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tepPuerperio: ClinicalCase = {
  id: "tep-puerperio",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 33, ageUnit: "años", sex: "F", context: "Cesárea de urgencia hace 9 días, IMC 34, poco movimiento desde el parto. Da de mamar." },
  frequency: "frecuente",
  intro: "“De golpe me falta el aire y me duele el pecho del lado derecho al respirar. También me duele la pantorrilla.”",
  vitals: { TA: "108/70 mmHg", FC: "118 lpm", FR: "28 rpm", "T°": "37,4 °C", "SatO₂": "90 %" },
  anamnesis: [
    act("inicio", "¿Cómo empezó? ¿De golpe?", "clave", "“De golpe, hace 3 horas.”", "Inicio brusco."),
    act("riesgo", "¿Cirugías, reposo, trombosis previas, anticonceptivos?", "clave", "“Cesárea y reposo.”", "Factores de riesgo."),
    act("pierna", "¿Pierna hinchada o dolorosa?", "clave", "“La izquierda, hace dos días.”", "TVP."),
    act("infeccion", "¿Tos con catarro, herida con pus, fiebre?", "util", "“No.”", "Diferenciales."),
    act("lactancia", "¿Estás amamantando?", "util", "“Sí.”", "Importa para el anticoagulante."),
    act("bebe", "¿Cómo se llama el bebé?", "neutro", "“Simón.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Tórax", "clave", "Murmullo conservado, sin rales.", "Hipoxemia con examen normal."),
    act("pierna-ex", "Piernas", "clave", "Izquierda con edema, dolor y circunferencia mayor.", "TVP."),
    act("hemodinamia", "Yugulares y perfusión", "clave", "Sin hipotensión.", "No es masivo."),
  ],
  studies: [
    study("Imágenes", "angiotc", "AngioTC de tórax", "clave", "Trombos en rama lobar derecha; VD normal.", "Confirma. Los beneficios superan los riesgos."),
    study("Imágenes", "doppler", "Doppler de miembros inferiores", "clave", "TVP femoropoplítea izquierda.", "Apoya."),
    study("Electrofisiología", "ecg", "ECG y troponina", "clave", "Taquicardia sinusal; troponina normal.", "Estratifica."),
    study("Laboratorio", "dimero", "Dímero D para decidir", "innecesario", "No se realizó.", "En probabilidad alta y posparto no sirve."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tep", "Tromboembolismo pulmonar de riesgo intermedio-bajo con TVP en el puerperio", true, "Disnea súbita, dolor pleurítico, cesárea, pierna y angioTC."),
      dx("nac", "Neumonía", false, "No hay tos, fiebre alta ni consolidación."),
      dx("miocardiopatia", "Miocardiopatía periparto", false, "No hay congestión y la función es normal."),
      dx("amniotica", "Embolia de líquido amniótico", false, "Es durante el parto o inmediatamente después."),
      dx("eap", "Edema de pulmón", false, "No hay rales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hbpm", "Heparina de bajo peso molecular", "clave", "Segura en el posparto y con lactancia."),
      mg("seguir", "Anticoagular por al menos 3 meses, con warfarina o heparina (compatibles con lactancia)", "clave", "Previene recurrencias."),
      mg("lactancia", "Mantener la lactancia", "clave", "Heparina y warfarina son compatibles."),
      mg("oxigeno", "Oxígeno y control de signos", "util", "Soporte."),
      mg("doac", "Anticoagulantes orales directos durante la lactancia", "riesgoso", "No se recomiendan por falta de datos."),
      mg("trombolisis", "Trombólisis de entrada", "riesgoso", "Sin shock, y por cirugía reciente el riesgo supera el beneficio."),
    ],
  },
  debrief: {
    diagnosis: "TEP lobar derecho con TVP femoropoplítea izquierda, sin disfunción del VD, en puerperio de cesárea, en mujer de 33 años.",
    pathologies: [
      { name: "Tromboembolismo pulmonar", role: "principal", why: "Trombo en arterias pulmonares." },
      { name: "Trombosis venosa profunda", role: "asociada", why: "Fuente." },
      { name: "Neumonía, miocardiopatía periparto", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: hipercoagulabilidad del embarazo y cesárea.",
      "Mecanismo: tríada de Virchow, con embolización.",
      "Consecuencia: hipoxemia, dolor, y falla del VD si es masivo.",
    ],
    epidemiology:
      "El riesgo de trombosis aumenta varias veces en el embarazo y el puerperio, con el pico en las primeras semanas posparto, sobre todo tras cesárea. Es una de las primeras causas de muerte materna en muchos países.",
    management: [
      "Sospechar ante disnea en el puerperio.",
      "Imagen sin demorar y anticoagular si hay alta sospecha.",
      "Heparina, compatible con lactancia.",
      "Evaluar riesgo y prevención futura.",
    ],
    sources: ["Sociedad Argentina de Hematología — Guías de trombosis y embarazo.", "FASGO — Consenso de tromboembolismo en obstetricia."],
    pearls: ["Disnea posparto: pensá en TEP.", "Heparina y warfarina compatibles con lactancia.", "Evitar estrógenos."],
    pitfalls: ["Atribuirlo al cansancio.", "Pedir dímero D."],
    tribunal: [
      qa("¿Qué es la tríada de Virchow?", "Estasis, hipercoagulabilidad y daño endotelial."),
      qa("¿Cuándo se indica trombólisis en TEP?", "Con shock o hipotensión sostenida, sin contraindicaciones."),
      qa("¿Cuáles son los criterios de Wells?", "TVP, TEP más probable, FC mayor de 100, cirugía o inmovilización, TEP previo, hemoptisis, cáncer."),
    ],
  },
};
