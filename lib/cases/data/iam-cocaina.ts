import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const iamCocaina: ClinicalCase = {
  id: "iam-anterior-cocaina",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 32, ageUnit: "años", sex: "M", context: "Fuma. Viene de una fiesta, son las 6 de la mañana." },
  frequency: "poco-frecuente",
  intro: "“Me agarró un dolor muy fuerte en el pecho, como si me aplastaran, que me va al brazo izquierdo. Transpiro mucho. Hace una hora y media.”",
  vitals: { TA: "168/102 mmHg", FC: "118 lpm", FR: "22 rpm", "T°": "37,4 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("consumo", "Es importante para tratarte bien: ¿consumiste alguna sustancia esta noche? ¿Cocaína?", "clave", "“Sí, cocaína y alcohol.”", "Preguntar sin juzgar: la cocaína cambia el tratamiento (benzodiacepinas, evitar betabloqueantes en la fase aguda)."),
    act("dolor", "¿Cómo es el dolor y cuándo empezó?", "clave", "“Opresivo, en el medio del pecho, desde hace una hora y media, no se va.”", "Dolor típico de isquemia, dentro de la ventana de reperfusión."),
    act("factores", "¿Tenés presión alta, colesterol o antecedentes familiares?", "util", "“Mi papá tuvo un infarto a los 50.”", "Antecedente familiar precoz."),
    act("viagra", "¿Tomaste sildenafil o similares?", "clave", "“No.”", "Contraindica nitratos si lo tomó en las últimas 24–48 h."),
    act("sangrado", "¿Tuviste sangrados, cirugías o golpes en la cabeza?", "util", "“No.”", "Contraindicaciones de trombolíticos y anticoagulantes."),
    act("fiesta", "¿Qué música había?", "neutro", "“Electrónica.”", "No orienta."),
  ],
  exam: [
    act("general", "Estado general", "clave", "Ansioso, sudoroso, pupilas dilatadas.", "Toxíndrome simpaticomimético."),
    act("corazon", "Auscultación cardíaca y pulmonar", "clave", "Sin soplos ni rales.", "Killip I."),
    act("pulsos", "Pulsos y presión en ambos brazos", "clave", "Simétricos.", "Descarta disección aórtica, otro riesgo de la cocaína."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "Electrocardiograma en menos de 10 minutos", "clave", "Supradesnivel del ST de V1 a V5.", "IAM con elevación del ST anterior extenso: reperfusión urgente."),
    study("Laboratorio", "troponina", "Troponina", "util", "Elevada.", "Confirma necrosis, pero no se espera para reperfundir."),
    study("Laboratorio", "toxicos", "Tóxicos en orina", "util", "Cocaína positiva.", "Confirma el consumo."),
    study("Imágenes", "tc-cerebro", "Tomografía de cerebro de rutina", "innecesario", "No se realizó.", "Sin síntomas neurológicos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("iamcest", "IAM con elevación del ST anterior extenso asociado a cocaína, Killip I", true, "Dolor opresivo de 90 minutos con supradesnivel de V1 a V5 y troponina elevada tras consumo de cocaína en un joven fumador con antecedente familiar."),
      dx("ansiedad", "Crisis de ansiedad por cocaína", false, "El ECG muestra supradesnivel del ST."),
      dx("pericarditis", "Pericarditis", false, "El supradesnivel sería difuso, cóncavo, con descenso del PR y dolor posicional."),
      dx("diseccion", "Disección aórtica", false, "Pulsos y presión simétricos, dolor no desgarrante, ECG de infarto."),
      dx("vasoespasmo-solo", "Vasoespasmo sin infarto", false, "La troponina está elevada y el ST persiste."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("angioplastia", "Angioplastia primaria (o trombolíticos si no hay hemodinamia en menos de 120 minutos)", "clave", "La reperfusión rápida salva miocardio."),
      mg("aspirina", "Aspirina, segundo antiagregante y heparina", "clave", "Tratamiento antitrombótico del IAM."),
      mg("benzo", "Benzodiacepinas EV y nitratos", "clave", "Reducen la estimulación simpática, la presión y el vasoespasmo."),
      mg("cesacion", "Abordaje del consumo de cocaína y del tabaco antes del alta", "util", "Prevención secundaria."),
      mg("betabloqueante", "Betabloqueante EV en la fase aguda", "riesgoso", "Con cocaína puede dejar sin oposición el efecto alfa y empeorar el vasoespasmo y la hipertensión."),
      mg("esperar-troponina", "Esperar la segunda troponina", "riesgoso", "Con supradesnivel no se espera: tiempo es músculo."),
    ],
  },
  debrief: {
    diagnosis: "Infarto agudo de miocardio con elevación del ST anterior extenso, Killip I, asociado a consumo de cocaína, en varón de 32 años fumador con antecedente familiar de enfermedad coronaria precoz.",
    pathologies: [
      { name: "IAM con elevación del ST", role: "principal", why: "Supradesnivel en territorio de la descendente anterior." },
      { name: "Consumo de cocaína", role: "asociada", why: "Desencadenante." },
      { name: "Disección aórtica, pericarditis, ansiedad", role: "diferencial", why: "Otras causas de dolor torácico en consumidores." },
    ],
    reasoning: [
      "Causa: cocaína sobre una placa coronaria (tabaco, herencia).",
      "Mecanismo: la cocaína bloquea la recaptación de noradrenalina: aumenta la demanda (taquicardia, hipertensión), produce vasoespasmo coronario y activa las plaquetas (trombosis).",
      "Consecuencia: oclusión de la arteria descendente anterior e infarto anterior extenso, con riesgo de arritmias e insuficiencia cardíaca.",
    ],
    epidemiology:
      "La cocaína multiplica el riesgo de infarto en la hora posterior al consumo y es una causa importante de IAM en menores de 45 años. Argentina tiene una de las prevalencias de consumo de cocaína más altas de la región. El tabaco y los antecedentes familiares se suman.",
    management: [
      "ECG en menos de 10 minutos ante dolor torácico.",
      "Reperfusión: angioplastia primaria en menos de 120 minutos o trombolíticos.",
      "Antiagregación, anticoagulación, benzodiacepinas y nitratos; evitar betabloqueantes en la intoxicación aguda.",
      "Prevención secundaria y abordaje del consumo.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de síndrome coronario agudo con elevación del ST.", "SEDRONAR — Estudios nacionales sobre consumo de sustancias."],
    pearls: ["Joven con dolor torácico: preguntar por cocaína.", "Benzodiacepinas sí, betabloqueantes no (en la fase aguda).", "Supradesnivel = reperfundir."],
    pitfalls: ["Atribuirlo a ansiedad.", "No preguntar por el consumo."],
    tribunal: [
      qa("¿Cómo se localiza el infarto en el ECG?", "Inferior: DII, DIII y aVF (coronaria derecha); anterior: V1–V4 (descendente anterior); lateral: DI, aVL, V5–V6 (circunfleja); ventrículo derecho: V3R–V4R; posterior: infradesnivel en V1–V3 con R alta."),
      qa("¿Qué es la reperfusión y cuáles son sus tiempos?", "Abrir la arteria ocluida: angioplastia primaria con tiempo puerta-balón menor de 90 minutos (o menos de 120 desde el diagnóstico si hay traslado), o trombólisis con tiempo puerta-aguja menor de 30 minutos, dentro de las 12 horas del inicio de los síntomas."),
      qa("¿Qué es el toxíndrome simpaticomimético?", "El cuadro por cocaína, anfetaminas o éxtasis: taquicardia, hipertensión, hipertermia, midriasis, sudoración, agitación y convulsiones; se trata con benzodiacepinas, enfriamiento y sostén."),
    ],
  },
};
