import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const apendicitisPlastron: ClinicalCase = {
  id: "apendicitis-complicada-absceso",
  level: 3,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 52, ageUnit: "años", sex: "M", context: "Diabético. Se automedicó con antibióticos y analgésicos 5 días." },
  frequency: "frecuente",
  intro: "“Hace 6 días me duele la panza abajo a la derecha. Tomé antibiótico y mejoró un poco, pero sigo con fiebre y ahora tengo un bulto.”",
  vitals: { TA: "128/78 mmHg", FC: "102 lpm", FR: "18 rpm", "T°": "38,5 °C", "SatO₂": "97 %", Glucemia: "248 mg/dl" },
  anamnesis: [
    act("evolucion", "¿Cómo empezó el dolor?", "clave", "“Arriba del ombligo y se fue a la derecha.”", "Migración."),
    act("automedicacion", "¿Qué tomaste?", "clave", "“Amoxicilina e ibuprofeno.”", "Enmascara."),
    act("transito", "¿Evacuás? ¿Gases?", "clave", "“Pocos.”", "Íleo."),
    act("cancer", "¿Sangre o cambios del hábito antes?", "util", "“No.”", "Cáncer de colon en mayores."),
    act("orina", "¿Ardor al orinar?", "util", "“No.”", "Diferencial."),
    act("profesion", "¿Qué hacés?", "neutro", "“Soy chofer de remís.”", "No orienta."),
  ],
  exam: [
    act("masa", "Abdomen", "clave", "Masa dolorosa en fosa ilíaca derecha, sin peritonitis generalizada.", "Plastrón."),
    act("signos", "Psoas y Rovsing", "clave", "Positivos.", "Apendicular."),
    act("hidratacion", "Hidratación", "util", "Mucosas secas.", "Base."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de abdomen con contraste", "clave", "Absceso periapendicular de 5 cm.", "Define el tratamiento."),
    study("Laboratorio", "lab", "Hemograma, PCR, glucemia, función renal", "clave", "Leucocitos 17.000; PCR alta.", "Infección."),
    study("Otros", "colono-despues", "Colonoscopía a las 6 semanas", "util", "Pendiente.", "Excluye cáncer en mayores."),
    study("Imágenes", "rx-sola", "Solo radiografía de abdomen", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("absceso", "Apendicitis complicada con absceso periapendicular", true, "Evolución de 6 días, masa, fiebre y TC."),
      dx("diverticulitis", "Diverticulitis derecha", false, "TC apendicular."),
      dx("cancer", "Cáncer de ciego", false, "Se controla luego."),
      dx("crohn", "Crohn", false, "Sin antecedentes."),
      dx("ureteral", "Cólico renal", false, "Masa y fiebre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("drenaje", "Antibióticos EV y drenaje percutáneo del absceso", "clave", "Primera opción en abscesos grandes."),
      mg("glucemia", "Control de la glucemia", "clave", "Diabetes."),
      mg("colono", "Colonoscopía de control", "clave", "Edad mayor de 40."),
      mg("intervalo", "Apendicectomía diferida según evolución", "util", "Según recurrencia."),
      mg("cirugia-inmediata", "Cirugía inmediata en el plastrón sin drenaje", "riesgoso", "Más complicaciones."),
      mg("alta", "Alta con antibiótico oral", "riesgoso", "Absceso no drenado."),
    ],
  },
  debrief: {
    diagnosis: "Apendicitis complicada con absceso periapendicular de 5 cm, en varón de 52 años diabético automedicado.",
    pathologies: [
      { name: "Apendicitis complicada", role: "principal", why: "Absceso." },
      { name: "Diabetes descontrolada", role: "asociada", why: "Factor." },
      { name: "Diverticulitis, cáncer, Crohn", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: obstrucción de la luz apendicular.",
      "Mecanismo: perforación contenida por epiplón y asas.",
      "Consecuencia: absceso o plastrón.",
    ],
    epidemiology:
      "Los adultos mayores y quienes se automedican consultan tarde y tienen más complicaciones. En mayores de 40 años, un cuadro apendicular complicado puede ocultar un cáncer de colon, por eso se hace colonoscopía después.",
    management: [
      "TC.",
      "Antibióticos y drenaje.",
      "Glucemia.",
      "Colonoscopía.",
    ],
    sources: ["Sociedad Argentina de Cirugía Digestiva — Apendicitis.", "World Society of Emergency Surgery — Jerusalem Guidelines."],
    pearls: ["Masa después de días: plastrón o absceso.", "Drenaje percutáneo.", "Colonoscopía en mayores."],
    pitfalls: ["Automedicación.", "Operar el plastrón."],
    tribunal: [
      qa("¿Qué es la escala de Alvarado?", "Puntaje con migración del dolor, anorexia, náuseas, defensa, rebote, fiebre, leucocitosis y desviación a izquierda."),
      qa("¿Qué es un plastrón?", "Masa inflamatoria formada por epiplón y asas alrededor del apéndice."),
      qa("¿Cuál es el signo de Rovsing?", "Dolor en fosa ilíaca derecha al presionar la izquierda."),
    ],
  },
};
