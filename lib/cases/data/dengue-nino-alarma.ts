import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const dengueNinoAlarma: ClinicalCase = {
  id: "dengue-nino-signos-alarma",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 8, ageUnit: "años", sex: "M", context: "Febrero, Tucumán. Su hermano tuvo dengue la semana pasada." },
  frequency: "frecuente",
  intro: "“Tuvo fiebre cuatro días, hoy se le fue pero ahora le duele mucho la panza, vomitó tres veces y está decaído.”",
  vitals: { TA: "96/70 mmHg", FC: "128 lpm", FR: "26 rpm", "T°": "36,8 °C", "SatO₂": "97 %", Peso: "26 kg" },
  anamnesis: [
    act("fiebre", "¿Cuántos días de fiebre y cuándo bajó?", "clave", "“Cuatro días, hoy bajó.”", "Fase crítica al bajar la fiebre."),
    act("alarma", "¿Dolor de panza, vómitos, sangrados?", "clave", "“Dolor fuerte y tres vómitos.”", "Signos de alarma."),
    act("diuresis", "¿Cuándo orinó?", "clave", "“Hace 8 horas.”", "Hipoperfusión."),
    act("contacto", "¿Casos en la casa?", "util", "“El hermano.”", "Epidemiología."),
    act("aines", "¿Le dieron ibuprofeno?", "util", "“Sí, el primer día.”", "Riesgo de sangrado."),
    act("juego", "¿Qué le gusta?", "neutro", "“El fútbol.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Hepatomegalia dolorosa de 3 cm.", "Signo de alarma."),
    act("perfusion", "Perfusión y presión de pulso", "clave", "Relleno de 3 segundos, presión de pulso de 26 mmHg.", "Extravasación incipiente."),
    act("lazo", "Prueba del lazo y piel", "util", "Positiva, petequias.", "Fragilidad capilar."),
  ],
  studies: [
    study("Laboratorio", "hto", "Hematocrito seriado y plaquetas", "clave", "Hto 46 % (basal 36 %); plaquetas 45.000.", "Hemoconcentración."),
    study("Imágenes", "eco", "Ecografía abdominal y pleural", "clave", "Líquido libre en Morrison y engrosamiento de pared vesicular.", "Extravasación."),
    study("Laboratorio", "ns1", "NS1 o PCR", "util", "NS1 positivo.", "Confirma."),
    study("Otros", "plaquetas-transfusion", "Transfundir plaquetas por el recuento", "riesgoso", "No se realizó.", "No previene sangrado y sobrecarga."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dengue-alarma", "Dengue con signos de alarma en fase crítica", true, "Defervescencia con dolor abdominal, vómitos, hepatomegalia, hemoconcentración y líquido libre."),
      dx("apendicitis", "Apendicitis", false, "Contexto de dengue y líquido por extravasación."),
      dx("dengue-sin-alarma", "Dengue sin signos de alarma", false, "Tiene varios signos de alarma."),
      dx("shock", "Dengue grave con shock", false, "Todavía compensa la presión; puede progresar."),
      dx("gastroenteritis", "Gastroenteritis", false, "Hemoconcentración y plaquetopenia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internar", "Internación con cristaloides EV según protocolo", "clave", "Signos de alarma."),
      mg("hto", "Control de hematocrito, diuresis y signos vitales cada pocas horas", "clave", "Ajustar el volumen."),
      mg("paracetamol", "Paracetamol para el dolor y la fiebre", "clave", "Sin AINE."),
      mg("notificar", "Notificación y control del vector en el hogar", "util", "Vigilancia."),
      mg("aines", "Ibuprofeno", "riesgoso", "Sangrado."),
      mg("corticoides", "Corticoides", "riesgoso", "Sin beneficio."),
    ],
  },
  debrief: {
    diagnosis: "Dengue con signos de alarma en fase crítica, en niño de 8 años de Tucumán.",
    pathologies: [
      { name: "Dengue con signos de alarma", role: "principal", why: "Extravasación plasmática." },
      { name: "Plaquetopenia", role: "asociada", why: "Típica." },
      { name: "Apendicitis, shock", role: "diferencial", why: "Dolor abdominal y progresión." },
    ],
    reasoning: [
      "Causa: virus dengue transmitido por Aedes aegypti.",
      "Mecanismo: aumento de la permeabilidad capilar al bajar la fiebre.",
      "Consecuencia: hemoconcentración, derrames y riesgo de shock.",
    ],
    epidemiology:
      "Los brotes recientes en el norte y centro de Argentina afectaron a muchos niños. La fase crítica empieza cuando baja la fiebre, entre el tercer y el sexto día. Reconocer los signos de alarma y dar líquidos a tiempo evita el shock.",
    management: [
      "Signos de alarma.",
      "Cristaloides.",
      "Hematocrito seriado.",
      "Sin AINE.",
    ],
    sources: ["Ministerio de Salud de la Nación — Dengue: guía para el equipo de salud.", "OPS — Dengue: guías para la atención de enfermos en la Región de las Américas."],
    pearls: ["Cuando baja la fiebre, ojo.", "Dolor abdominal y vómitos: alarma.", "Hematocrito que sube."],
    pitfalls: ["Ibuprofeno.", "Transfundir plaquetas."],
    tribunal: [
      qa("¿Cuáles son los signos de alarma del dengue?", "Dolor abdominal, vómitos persistentes, acumulación de líquidos, sangrado de mucosas, letargo, hepatomegalia y aumento del hematocrito."),
      qa("¿Por qué el segundo dengue puede ser más grave?", "Por la potenciación dependiente de anticuerpos con otro serotipo."),
      qa("¿Hay vacuna en Argentina?", "Sí, una vacuna tetravalente atenuada indicada en grupos y regiones priorizadas."),
    ],
  },
};
