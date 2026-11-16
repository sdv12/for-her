import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const diverticulitisJoven: ClinicalCase = {
  id: "diverticulitis-joven",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 39, ageUnit: "años", sex: "M", context: "Programador. IMC 33. Sedentario, come poca fibra." },
  frequency: "frecuente",
  intro: "“Me duele abajo a la izquierda hace dos días y tengo fiebrecita.”",
  vitals: { TA: "132/84 mmHg", FC: "94 lpm", FR: "18 rpm", "T°": "38 °C" },
  anamnesis: [
    act("dolor", "¿Dónde y cómo es el dolor?", "clave", "“Fijo, abajo a la izquierda, empeora al moverme.”", "Típico de diverticulitis izquierda."),
    act("intestino", "¿Cambió el ritmo intestinal?", "util", "“Estoy constipado.”", "Frecuente."),
    act("sangre", "¿Sangre en la materia fecal?", "clave", "“No.”", "La hemorragia diverticular es otro cuadro."),
    act("urinario", "¿Neumaturia o fecaluria?", "clave", "“No.”", "Fístula colovesical."),
    act("previos", "¿Le pasó antes?", "util", "“Nunca.”", "Primer episodio."),
    act("juegos", "¿Qué lenguaje programa?", "neutro", "“Python.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor y defensa localizada en fosa ilíaca izquierda, sin rebote generalizado.", "Peritonitis localizada."),
    act("masa", "Masa palpable", "util", "Empastamiento.", "Flemón."),
    act("tacto", "Tacto rectal", "util", "Sin sangre.", "Basal."),
  ],
  studies: [
    study("Imágenes", "tac", "TC de abdomen y pelvis con contraste", "clave", "Divertículos en sigmoides, engrosamiento parietal y estriación de la grasa, sin absceso ni aire libre.", "Diverticulitis no complicada (Hinchey Ia)."),
    study("Laboratorio", "lab", "Hemograma, PCR", "clave", "Leucocitos 13.400, PCR 86.", "Inflamación."),
    study("Otros", "colonoscopia-aguda", "Colonoscopía urgente", "riesgoso", "No se hizo.", "Riesgo de perforación en la fase aguda."),
    study("Laboratorio", "orina", "Orina completa", "util", "Normal.", "Diferencial."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("diverticulitis-nc", "Diverticulitis aguda no complicada de sigmoides en paciente joven", true, "Dolor en fosa ilíaca izquierda con fiebre y TC con inflamación pericolónica sin absceso ni perforación."),
      dx("absceso", "Diverticulitis con absceso", false, "Sin colección."),
      dx("cancer", "Cáncer de colon", false, "Patrón inflamatorio; se descarta con colonoscopía diferida."),
      dx("colico-renal", "Cólico renal", false, "TC sin litiasis."),
      dx("sii", "Intestino irritable", false, "Fiebre y TC inflamatoria."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ambulatorio", "Manejo ambulatorio con dieta líquida y analgesia", "clave", "No complicada y tolera la vía oral."),
      mg("sin-atb", "Antibióticos solo si hay factores de riesgo (inmunosupresión, comorbilidad, mal estado)", "clave", "En no complicadas sanas no mejoran la evolución."),
      mg("colonoscopia-diferida", "Colonoscopía a las 6–8 semanas", "clave", "Descartar cáncer."),
      mg("fibra", "Fibra, actividad física y descenso de peso", "util", "Previene recurrencias."),
      mg("sigmoidectomia", "Sigmoidectomía electiva por ser joven", "innecesario", "La edad sola no es indicación."),
      mg("alarma", "Volver si empeora el dolor, la fiebre o no tolera", "clave", "Complicaciones."),
    ],
  },
  debrief: {
    diagnosis: "Diverticulitis aguda no complicada de sigmoides, en un hombre de 39 años con obesidad.",
    pathologies: [
      { name: "Diverticulitis no complicada", role: "principal", why: "Inflamación de un divertículo." },
      { name: "Obesidad y sedentarismo", role: "asociada", why: "Factores de riesgo." },
      { name: "Cáncer de colon", role: "diferencial", why: "Siempre a descartar." },
    ],
    reasoning: [
      "Causa: microperforación de un divertículo.",
      "Mecanismo: inflamación pericolónica localizada.",
      "Consecuencia: dolor y fiebre; puede complicarse con absceso o perforación.",
    ],
    epidemiology:
      "La diverticulitis en menores de 50 años está en aumento, vinculada a obesidad, sedentarismo y dieta pobre en fibra. Ya no se considera más agresiva en jóvenes, por lo que la cirugía electiva se decide por recurrencias y calidad de vida, no por edad.",
    management: [
      "TC.",
      "Ambulatorio si no es complicada.",
      "Antibióticos selectivos.",
      "Colonoscopía diferida.",
    ],
    sources: ["Sociedad Argentina de Coloproctología — Enfermedad diverticular.", "ASCRS — Clinical Practice Guidelines for left-sided colonic diverticulitis."],
    pearls: ["Apendicitis del lado izquierdo.", "No complicada sin factores de riesgo: sin antibióticos.", "Colonoscopía a las 6–8 semanas."],
    pitfalls: ["Colonoscopía en la fase aguda.", "Operar por la edad."],
    tribunal: [
      qa("¿Qué es la clasificación de Hinchey?", "Gradúa la diverticulitis complicada: I absceso pericólico, II absceso pélvico, III peritonitis purulenta, IV peritonitis fecal."),
      qa("¿Por qué se hace colonoscopía después de una diverticulitis?", "Para descartar un cáncer de colon que puede simularla, sobre todo si no tenía colonoscopía reciente."),
      qa("¿Cuándo se indican antibióticos en una diverticulitis no complicada?", "En inmunosuprimidos, con comorbilidades importantes, signos sistémicos, PCR muy alta o falta de mejoría."),
    ],
  },
};
