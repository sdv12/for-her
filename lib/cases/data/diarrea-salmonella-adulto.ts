import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const diarreaSalmonellaAdulto: ClinicalCase = {
  id: "diarrea-aguda-salmonella-adulto",
  level: 1,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "Comió mayonesa casera en un cumpleaños. Varios invitados enfermos." },
  frequency: "muy-frecuente",
  intro: "“Desde anoche tengo diarrea líquida muchas veces, fiebre, dolor de panza y vómitos.”",
  vitals: { TA: "104/64 mmHg", FC: "108 lpm", FR: "18 rpm", "T°": "38,4 °C" },
  anamnesis: [
    act("alimento", "¿Qué comiste y cuándo?", "clave", "“Mayonesa casera hace 18 horas.”", "Período de incubación."),
    act("caracteristicas", "¿Sangre o moco? ¿Cuántas veces?", "clave", "“Diez veces; sin sangre.”", "Inflamatoria leve."),
    act("hidratacion", "¿Orinás? ¿Tomás líquido?", "clave", "“Poco.”", "Deshidratación."),
    act("riesgo", "¿Embarazo, inmunosupresión, prótesis?", "util", "“No.”", "Antibióticos."),
    act("brote", "¿Otros enfermos?", "util", "“Varios invitados.”", "Brote."),
    act("fiesta", "¿De quién era el cumpleaños?", "neutro", "“De mi prima.”", "No orienta."),
  ],
  exam: [
    act("hidratacion-ex", "Mucosas y pliegue", "clave", "Mucosas secas, pliegue leve.", "Deshidratación moderada."),
    act("abdomen", "Abdomen", "clave", "Dolor difuso, sin peritonismo.", "Excluye cirugía."),
    act("ortostatica", "Ortostatismo", "util", "Leve.", "Volemia."),
  ],
  studies: [
    study("Laboratorio", "iono", "Ionograma y función renal", "clave", "Potasio 3,2; urea algo alta.", "Por deshidratación."),
    study("Microbiología", "coprocultivo", "Coprocultivo por brote", "clave", "Salmonella enteritidis.", "Vigilancia."),
    study("Laboratorio", "hemocultivo", "Hemocultivos si hay fiebre alta o riesgo", "util", "Negativos.", "Bacteriemia."),
    study("Imágenes", "tc", "TC de abdomen", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("salmonella", "Gastroenteritis por Salmonella asociada a brote alimentario, con deshidratación moderada", true, "Mayonesa casera, incubación, fiebre y coprocultivo."),
      dx("toxina", "Intoxicación por toxina de S. aureus", false, "Incubación más larga y fiebre."),
      dx("viral", "Gastroenteritis viral", false, "Coprocultivo positivo."),
      dx("apendicitis", "Apendicitis", false, "Sin dolor focal."),
      dx("c-diff", "Clostridioides difficile", false, "Sin antibióticos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("rehidratar", "Rehidratación oral o EV y potasio", "clave", "Pilar del tratamiento."),
      mg("sin-atb", "Sin antibiótico en adulto sano", "clave", "Prolonga el portador."),
      mg("notificar", "Notificar el brote", "clave", "Salud pública."),
      mg("higiene", "Lavado de manos y no manipular alimentos", "util", "Prevención."),
      mg("loperamida", "Loperamida con fiebre", "riesgoso", "Puede agravar diarreas invasivas."),
      mg("atb-todos", "Ciprofloxacina a todos los invitados", "riesgoso", "Resistencia."),
    ],
  },
  debrief: {
    diagnosis: "Gastroenteritis aguda por Salmonella enteritidis en un brote alimentario, con deshidratación moderada, en mujer de 34 años.",
    pathologies: [
      { name: "Salmonelosis", role: "principal", why: "Diarrea bacteriana." },
      { name: "Deshidratación", role: "asociada", why: "Complicación." },
      { name: "Toxina, viral", role: "diferencial", why: "Otras diarreas." },
    ],
    reasoning: [
      "Causa: huevo crudo contaminado.",
      "Mecanismo: invasión de la mucosa ileal.",
      "Consecuencia: diarrea, fiebre y deshidratación.",
    ],
    epidemiology:
      "Es una causa frecuente de enfermedades transmitidas por alimentos en Argentina, sobre todo con huevo crudo en verano. La mayoría resuelve sola. Se tratan con antibióticos solo los grupos de riesgo o la enfermedad grave.",
    management: [
      "Hidratar.",
      "Evaluar riesgo.",
      "Notificar.",
      "Prevención.",
    ],
    sources: ["Ministerio de Salud de la Nación — Enfermedades transmitidas por alimentos.", "IDSA — Infectious Diarrhea Guidelines."],
    pearls: ["Mayonesa casera.", "Hidratar.", "Sin antibióticos en sanos."],
    pitfalls: ["Antibióticos a todos.", "Loperamida con fiebre."],
    tribunal: [
      qa("¿Cuándo se indican antibióticos en Salmonella?", "En menores de 3 meses, mayores de 65, inmunosuprimidos, prótesis o enfermedad grave."),
      qa("¿Qué incubación tiene la toxina estafilocócica?", "Entre 1 y 6 horas, con vómitos predominantes."),
      qa("¿Qué es una ETA?", "Enfermedad transmitida por alimentos, de notificación obligatoria si es brote."),
    ],
  },
};
