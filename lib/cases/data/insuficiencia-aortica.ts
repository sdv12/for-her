import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const insuficienciaAortica: ClinicalCase = {
  id: "insuficiencia-aortica-cronica",
  level: 3,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 42, ageUnit: "años", sex: "M", context: "Le dijeron que tenía la válvula aórtica con dos valvas. Hipertenso mal controlado." },
  frequency: "poco-frecuente",
  intro: "“Me late fuerte el corazón cuando me acuesto, y hace meses me agito subiendo dos pisos.”",
  vitals: { TA: "168/48 mmHg", FC: "88 lpm", FR: "18 rpm", "T°": "36,5 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("disnea", "¿Con qué esfuerzo te agitás?", "clave", "“Dos pisos.”", "Clase funcional."),
    act("antecedente", "¿Válvula bicúspide, fiebre reumática, endocarditis?", "clave", "“Bicúspide.”", "Causa."),
    act("dolor", "¿Dolor de pecho o espalda súbito?", "clave", "“No.”", "Disección aguda."),
    act("fiebre", "¿Fiebre o dientes en mal estado?", "util", "“No.”", "Endocarditis."),
    act("familia", "¿Familiares con aneurisma o muerte súbita?", "util", "“No.”", "Aortopatía."),
    act("trabajo", "¿A qué te dedicás?", "neutro", "“Soy chef.”", "No orienta."),
  ],
  exam: [
    act("presion", "Presión diferencial y pulsos", "clave", "Presión diferencial muy amplia; pulso saltón (Corrigan).", "Regurgitación."),
    act("soplo", "Auscultación", "clave", "Soplo diastólico decreciente en borde esternal izquierdo, sentado e inclinado hacia adelante.", "Insuficiencia aórtica."),
    act("signos", "Signos periféricos", "util", "Movimiento de cabeza con el pulso (de Musset), pulso capilar de Quincke.", "Gravedad."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecocardiograma", "clave", "Válvula bicúspide con insuficiencia grave; VI dilatado; FEy 52 %; aorta ascendente de 46 mm.", "Indica cirugía."),
    study("Imágenes", "angiotc", "AngioTC de aorta", "clave", "Dilatación de aorta ascendente.", "Planifica."),
    study("Electrofisiología", "ecg", "ECG", "util", "Hipertrofia ventricular izquierda.", "Sobrecarga."),
    study("Otros", "ergometria-maxima", "Ergometría máxima para evaluar disnea", "innecesario", "No se realizó.", "La indicación ya está clara."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ia", "Insuficiencia aórtica crónica grave por válvula bicúspide, con dilatación aórtica", true, "Presión diferencial amplia, soplo diastólico y eco."),
      dx("estenosis", "Estenosis aórtica", false, "Soplo sistólico eyectivo."),
      dx("im", "Insuficiencia mitral", false, "Soplo sistólico apical."),
      dx("diseccion", "Disección aórtica aguda", false, "No hay dolor súbito."),
      dx("hipertiroidismo", "Hipertiroidismo", false, "No explica el soplo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Cirugía valvular y de aorta ascendente", "clave", "Síntomas, FEy menor de 55 % y dilatación."),
      mg("presion", "Vasodilatadores para controlar la presión mientras tanto", "clave", "Reduce regurgitación."),
      mg("familia", "Ecocardiograma a familiares de primer grado", "clave", "Bicúspide familiar."),
      mg("dental", "Higiene dental", "util", "Endocarditis."),
      mg("betabloqueante-alto", "Betabloqueante en altas dosis para bajar la frecuencia", "riesgoso", "Alarga la diástole y aumenta la regurgitación."),
      mg("esperar", "Esperar a que la FEy caiga más", "riesgoso", "Daño irreversible."),
    ],
  },
  debrief: {
    diagnosis: "Insuficiencia aórtica crónica grave por válvula bicúspide con dilatación de aorta ascendente, en varón de 42 años.",
    pathologies: [
      { name: "Insuficiencia aórtica", role: "principal", why: "Regurgitación diastólica." },
      { name: "Aortopatía bicúspide", role: "asociada", why: "Riesgo de disección." },
      { name: "Estenosis aórtica, insuficiencia mitral", role: "diferencial", why: "Otros soplos." },
    ],
    reasoning: [
      "Causa: válvula bicúspide con aortopatía.",
      "Mecanismo: la sangre vuelve al ventrículo en diástole, con sobrecarga de volumen y presión.",
      "Consecuencia: dilatación, hipertrofia y caída de la función.",
    ],
    epidemiology:
      "La válvula bicúspide afecta a cerca del 1 a 2 % de la población y es más frecuente en varones. Puede evolucionar a estenosis o insuficiencia, y suele acompañarse de dilatación aórtica. El seguimiento ecocardiográfico regular permite operar a tiempo.",
    management: [
      "Ecocardiograma.",
      "Medir aorta.",
      "Cirugía con criterios.",
      "Familia.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de valvulopatías.", "ESC/EACTS — Guidelines for Valvular Heart Disease."],
    pearls: ["Presión diferencial amplia.", "Soplo diastólico en borde izquierdo.", "Evitar bradicardia."],
    pitfalls: ["Esperar síntomas.", "No mirar la aorta."],
    tribunal: [
      qa("¿Qué causas de insuficiencia aórtica aguda hay?", "Endocarditis y disección aórtica; se presentan con edema agudo y son urgencia quirúrgica."),
      qa("¿Qué es el soplo de Austin Flint?", "Un rumor mesodiastólico apical por el chorro regurgitante sobre la valva mitral."),
      qa("¿Qué síndrome se asocia a bicúspide?", "Turner, y se asocia también a coartación de aorta."),
    ],
  },
};
