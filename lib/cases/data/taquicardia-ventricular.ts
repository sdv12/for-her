import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const taquicardiaVentricular: ClinicalCase = {
  id: "taquicardia-ventricular",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 64, ageUnit: "años", sex: "M", context: "Infarto anterior hace 3 años. Toma enalapril, bisoprolol y aspirina." },
  frequency: "frecuente",
  intro: "“Empecé con el corazón a mil hace una hora, me mareo y siento el pecho apretado.”",
  vitals: { TA: "98/64 mmHg", FC: "176 lpm", FR: "22 rpm", "T°": "36,4 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("infarto", "¿Tuvo un infarto o problemas del corazón?", "clave", "“Un infarto hace tres años, me pusieron un stent.”", "La cicatriz es el sustrato de la TV."),
    act("sintomas", "¿Se desmayó, tiene dolor de pecho o falta de aire?", "clave", "“Me mareé mucho, no me caí. Me aprieta el pecho.”", "Define estabilidad."),
    act("farmacos", "¿Qué medicación toma? ¿Le cambiaron algo?", "clave", "“Lo de siempre. Hace una semana me dieron un diurético por los tobillos.”", "Hipopotasemia y fármacos que alargan el QT."),
    act("previos", "¿Le pasó antes?", "util", "“Nunca así.”", "Primer episodio."),
    act("familia", "¿Muerte súbita en la familia?", "util", "“No.”", "Causas hereditarias."),
    act("trabajo", "¿A qué se dedica?", "neutro", "“Soy colectivero jubilado.”", "No orienta."),
  ],
  exam: [
    act("perfusion", "Perfusión, conciencia y signos de shock", "clave", "Lúcido, pálido, relleno capilar de 3 segundos.", "Inestabilidad limítrofe."),
    act("pulmon", "Auscultación pulmonar", "clave", "Rales bibasales finos.", "Congestión."),
    act("yugular", "Pulso venoso yugular", "util", "Ondas cañón intermitentes.", "Disociación AV: sugiere TV."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG de 12 derivaciones", "clave", "Taquicardia regular de QRS ancho (160 ms), disociación AV y latidos de fusión.", "Criterios de TV."),
    study("Laboratorio", "lab", "Potasio, magnesio, troponina, función renal", "clave", "K 3,1; Mg 1,6; troponina levemente elevada.", "Desencadenantes corregibles."),
    study("Imágenes", "eco", "Ecocardiograma luego de estabilizar", "util", "FEy 30 %, aquinesia anterior.", "Define el sustrato y el CDI."),
    study("Otros", "verapamilo", "Prueba con verapamilo EV para ver si responde", "riesgoso", "No se realizó.", "En TV puede causar colapso hemodinámico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tv", "Taquicardia ventricular monomorfa sostenida sobre cicatriz de infarto", true, "QRS ancho regular, disociación AV, fusión y cardiopatía isquémica previa."),
      dx("tsv-aberrante", "Taquicardia supraventricular con aberrancia", false, "Ante QRS ancho con cardiopatía estructural, se asume TV."),
      dx("fa-preexcitada", "Fibrilación auricular preexcitada", false, "Es irregular; esta es regular."),
      dx("flutter", "Aleteo auricular 2:1", false, "No hay ondas F y hay disociación AV."),
      dx("taquicardia-sinusal", "Taquicardia sinusal con bloqueo de rama", false, "Frecuencia y disociación AV no compatibles."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cardioversion", "Cardioversión eléctrica sincronizada con sedación si empeora o está inestable", "clave", "Tratamiento de la TV con compromiso."),
      mg("amiodarona", "Amiodarona EV si se mantiene estable, con monitor y desfibrilador al lado", "clave", "Antiarrítmico de elección con FEy baja."),
      mg("electrolitos", "Reponer potasio y magnesio", "clave", "Desencadenantes."),
      mg("cdi", "Derivar para evaluar cardiodesfibrilador implantable", "util", "Prevención secundaria."),
      mg("verapamilo-mg", "Verapamilo EV", "riesgoso", "Inotrópico negativo: puede llevar a paro."),
      mg("alta", "Alta si revierte, sin estudiar", "riesgoso", "Alto riesgo de muerte súbita."),
    ],
  },
  debrief: {
    diagnosis: "Taquicardia ventricular monomorfa sostenida sobre cicatriz de infarto, con hipopotasemia por diurético, en varón de 64 años.",
    pathologies: [
      { name: "Taquicardia ventricular", role: "principal", why: "Reentrada alrededor de la cicatriz." },
      { name: "Miocardiopatía isquémica e hipopotasemia", role: "asociada", why: "Sustrato y gatillo." },
      { name: "TSV con aberrancia, FA preexcitada", role: "diferencial", why: "Otras taquicardias de QRS ancho." },
    ],
    reasoning: [
      "Causa: cicatriz de infarto con FEy deprimida, gatillada por hipopotasemia.",
      "Mecanismo: reentrada en el borde de la cicatriz.",
      "Consecuencia: bajo gasto, isquemia y riesgo de fibrilación ventricular.",
    ],
    epidemiology:
      "La mayoría de las taquicardias de QRS ancho en adultos con cardiopatía estructural son ventriculares. La cardiopatía isquémica y la chagásica son los sustratos más comunes en Argentina, y la TV es una causa central de muerte súbita.",
    management: [
      "Evaluar estabilidad.",
      "Cardioversión si hay inestabilidad.",
      "Amiodarona si está estable.",
      "Corregir electrolitos y evaluar CDI.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de arritmias ventriculares.", "ESC — Ventricular Arrhythmias and Prevention of Sudden Cardiac Death Guidelines."],
    pearls: ["QRS ancho con cardiopatía: es TV hasta demostrar lo contrario.", "Ondas cañón: disociación AV.", "Estable no quiere decir benigna."],
    pitfalls: ["Dar verapamilo.", "No corregir el potasio."],
    tribunal: [
      qa("¿Qué criterios electrocardiográficos sugieren TV?", "Disociación AV, latidos de captura y fusión, QRS muy ancho y concordancia precordial."),
      qa("¿Qué hacés si pierde el pulso?", "Es un paro: RCP y desfibrilación no sincronizada inmediata."),
      qa("¿Qué cardiopatía local da TV con frecuencia?", "La miocardiopatía chagásica, por fibrosis del ventrículo."),
    ],
  },
};
