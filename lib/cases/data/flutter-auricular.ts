import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const flutterAuricular: ClinicalCase = {
  id: "flutter-auricular",
  level: 2,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 71, ageUnit: "años", sex: "M", context: "EPOC moderado. Hipertenso. Ex tabaquista." },
  frequency: "frecuente",
  intro: "“Hace dos días siento palpitaciones parejas y me canso subiendo una cuadra.”",
  vitals: { TA: "132/80 mmHg", FC: "150 lpm", FR: "20 rpm", "T°": "36,6 °C", "SatO₂": "93 %" },
  anamnesis: [
    act("inicio", "¿Cuándo empezó exactamente?", "clave", "“Hace dos días, de golpe.”", "Más de 48 horas: riesgo embólico."),
    act("tolerancia", "¿Dolor de pecho, desmayo o falta de aire en reposo?", "clave", "“No, solo cansancio al caminar.”", "Estable."),
    act("riesgo", "¿Tuvo ACV, diabetes o insuficiencia cardíaca?", "clave", "“Nada de eso.”", "Puntaje CHA₂DS₂-VASc."),
    act("broncodilatadores", "¿Usa broncodilatadores más seguido?", "util", "“El salbutamol, varias veces por día.”", "Gatillo."),
    act("sangrado", "¿Sangrados o úlceras?", "util", "“No.”", "Riesgo de anticoagular."),
    act("hobby", "¿Qué hace en el día?", "neutro", "“Arreglo radios viejos.”", "No orienta."),
  ],
  exam: [
    act("pulso", "Pulso", "clave", "Regular a 150 lpm.", "Frecuencia típica de aleteo 2:1."),
    act("congestion", "Signos de insuficiencia cardíaca", "clave", "Sin edemas ni rales.", "Sin descompensación."),
    act("pulmon", "Auscultación pulmonar", "util", "Espiración prolongada leve.", "EPOC de base."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG de 12 derivaciones", "clave", "Ondas F en serrucho en DII, DIII y aVF a 300 por minuto, conducción 2:1.", "Diagnóstico."),
    study("Laboratorio", "lab", "TSH, ionograma, función renal", "clave", "Normales.", "Causas y dosis."),
    study("Imágenes", "eco", "Ecocardiograma", "util", "FEy 55 %, aurícula izquierda dilatada.", "Estructura."),
    study("Imágenes", "tc-torax", "TC de tórax de rutina", "innecesario", "No se realizó.", "No cambia la conducta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("flutter", "Aleteo auricular típico con conducción 2:1", true, "FC fija en 150, ondas F en serrucho en cara inferior."),
      dx("fa", "Fibrilación auricular", false, "El ritmo es regular y hay ondas F organizadas."),
      dx("tsv", "Taquicardia supraventricular por reentrada nodal", false, "Hay actividad auricular a 300."),
      dx("taquicardia-sinusal", "Taquicardia sinusal", false, "No hay ondas P sinusales."),
      dx("tam", "Taquicardia auricular multifocal", false, "Es irregular con P de distintas formas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("control-fc", "Control de frecuencia con betabloqueante cardioselectivo o diltiazem", "clave", "Estable."),
      mg("anticoagular", "Anticoagular igual que en la fibrilación auricular", "clave", "Mismo riesgo embólico."),
      mg("eco-te", "Ecocardiograma transesofágico o 3 semanas de anticoagulación antes de cardiovertir", "clave", "Más de 48 horas."),
      mg("ablacion", "Derivar para ablación del istmo cavotricuspídeo", "util", "Curativa en el aleteo típico."),
      mg("cardioversion-ya", "Cardioversión inmediata sin anticoagular", "riesgoso", "Riesgo de embolia."),
      mg("propranolol", "Propranolol en dosis altas", "riesgoso", "No selectivo: broncoespasmo en EPOC."),
    ],
  },
  debrief: {
    diagnosis: "Aleteo auricular típico con conducción 2:1, de más de 48 horas de evolución, en varón de 71 años con EPOC.",
    pathologies: [
      { name: "Aleteo auricular típico", role: "principal", why: "Macrorreentrada en la aurícula derecha." },
      { name: "EPOC", role: "asociada", why: "Sustrato y gatillo." },
      { name: "Fibrilación auricular, TSV", role: "diferencial", why: "Otras taquiarritmias." },
    ],
    reasoning: [
      "Causa: dilatación auricular por EPOC e hipertensión.",
      "Mecanismo: macrorreentrada que gira por el istmo cavotricuspídeo.",
      "Consecuencia: frecuencia rápida y riesgo de trombo auricular.",
    ],
    epidemiology:
      "El aleteo es menos frecuente que la fibrilación auricular y muchas veces coexiste con ella. Es más común en varones mayores con EPOC o cardiopatía. Una FC fija de 150 en guardia debe hacer pensar en aleteo 2:1.",
    management: [
      "Estabilidad.",
      "Control de frecuencia.",
      "Anticoagulación según riesgo.",
      "Ablación.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de fibrilación y aleteo auricular.", "ESC — Atrial Fibrillation Guidelines."],
    pearls: ["FC fija en 150: buscá ondas F.", "Se anticoagula como la FA.", "La ablación lo cura."],
    pitfalls: ["Cardiovertir sin anticoagular.", "Betabloqueante no selectivo en EPOC."],
    tribunal: [
      qa("¿Por qué la frecuencia es 150?", "Las aurículas van a 300 y el nódulo AV conduce uno de cada dos impulsos."),
      qa("¿Qué maniobra ayuda a ver las ondas F?", "Masaje del seno carotídeo o adenosina, que enlentecen la conducción AV."),
      qa("¿Dónde se hace la ablación?", "En el istmo cavotricuspídeo, por donde pasa el circuito del aleteo típico."),
    ],
  },
};
