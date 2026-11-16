import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ergeEmbarazo: ClinicalCase = {
  id: "erge-embarazo",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 29, ageUnit: "años", sex: "F", context: "Embarazo de 30 semanas, segundo hijo. Controles normales." },
  frequency: "muy-frecuente",
  intro: "“Tengo una acidez terrible, sobre todo a la noche acostada. Me sube algo amargo a la boca.”",
  vitals: { TA: "112/70 mmHg", FC: "84 lpm", Peso: "72 kg" },
  anamnesis: [
    act("sintomas", "¿Cuándo empeora?", "clave", "“Acostada y después de cenar.”", "Reflujo típico del embarazo."),
    act("alarma", "¿Dolor en la boca del estómago o derecha, dolor de cabeza, visión borrosa?", "clave", "“No.”", "El dolor epigástrico en el tercer trimestre puede ser preeclampsia/HELLP."),
    act("vomitos", "¿Vómitos, dificultad para tragar, sangrado?", "clave", "“No.”", "Signos de alarma digestiva."),
    act("habitos", "¿Qué y cuándo cena?", "util", "“Tarde, y me acuesto enseguida.”", "Medidas higiénico-dietéticas."),
    act("medicacion", "¿Toma algo?", "util", "“Hierro.”", "Puede empeorar síntomas digestivos."),
    act("nombre", "¿Ya tienen nombre?", "neutro", "“Bruno.”", "No orienta."),
  ],
  exam: [
    act("ta", "Presión y edemas", "clave", "112/70, sin edemas.", "Descarta preeclampsia."),
    act("abdomen", "Abdomen", "clave", "Útero acorde, sin dolor en epigastrio ni hipocondrio derecho.", "No sugiere HELLP ni colecistitis."),
    act("obstetrico", "Latidos fetales", "util", "Normales.", "Bienestar."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Pirosis y regurgitación sin alarmas.", "No hacen falta estudios."),
    study("Laboratorio", "proteinuria", "Proteinuria y laboratorio si hubiera dolor epigástrico", "util", "No hizo falta.", "Descartar preeclampsia."),
    study("Otros", "endoscopia", "Endoscopía", "innecesario", "No se hizo.", "Solo con signos de alarma."),
    study("Laboratorio", "hp", "Test de H. pylori", "innecesario", "No se pidió.", "No orienta en reflujo del embarazo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("erge-embarazo", "Enfermedad por reflujo gastroesofágico del embarazo", true, "Pirosis y regurgitación nocturnas en el tercer trimestre, sin alarmas ni signos de preeclampsia."),
      dx("hellp", "Síndrome HELLP", false, "Presión normal, sin dolor en hipocondrio."),
      dx("colecistitis", "Colecistitis", false, "Sin dolor en hipocondrio derecho ni fiebre."),
      dx("ulcera", "Úlcera péptica", false, "Clínica típica de reflujo."),
      dx("hiperemesis", "Hiperemesis gravídica", false, "Sin vómitos y en el tercer trimestre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("habitos", "Cenar temprano y liviano, comidas chicas, elevar la cabecera", "clave", "Primera línea."),
      mg("antiacidos", "Antiácidos con calcio o magnesio, o alginatos", "clave", "Seguros en el embarazo."),
      mg("ibp", "IBP (omeprazol) si no mejora", "util", "Seguro en el embarazo."),
      mg("alarma", "Volver si aparece dolor epigástrico con cefalea o visión borrosa", "clave", "Preeclampsia."),
      mg("bicarbonato", "Bicarbonato de sodio a demanda", "riesgoso", "Alcalosis y sobrecarga de sodio."),
      mg("misoprostol", "Misoprostol", "riesgoso", "Contraindicado: uterotónico."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad por reflujo gastroesofágico en una embarazada de 30 semanas.",
    pathologies: [
      { name: "Reflujo gastroesofágico del embarazo", role: "principal", why: "Relajación del esfínter y compresión gástrica." },
      { name: "Preeclampsia/HELLP", role: "diferencial", why: "Dolor epigástrico en el tercer trimestre." },
      { name: "Colecistitis", role: "diferencial", why: "Más frecuente en el embarazo." },
    ],
    reasoning: [
      "Causa: progesterona y útero que crece.",
      "Mecanismo: relajación del esfínter esofágico inferior y aumento de la presión intraabdominal.",
      "Consecuencia: pirosis que mejora después del parto.",
    ],
    epidemiology:
      "Entre el 40 y el 85 % de las embarazadas tiene pirosis, que aumenta con el avance del embarazo. Desaparece después del parto en la gran mayoría.",
    management: [
      "Descartar preeclampsia si hay dolor epigástrico.",
      "Medidas higiénico-dietéticas.",
      "Antiácidos y alginatos.",
      "IBP si hace falta.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para la atención del embarazo de bajo riesgo.", "ACG — Clinical guideline for the diagnosis and management of GERD."],
    pearls: ["Pirosis de embarazada: común.", "Dolor epigástrico + HTA: HELLP.", "Alginatos y antiácidos seguros."],
    pitfalls: ["Bicarbonato de sodio.", "No medir la presión."],
    tribunal: [
      qa("¿Por qué aumenta el reflujo en el embarazo?", "La progesterona relaja el esfínter esofágico inferior y el útero aumenta la presión intraabdominal."),
      qa("¿Qué dolor epigástrico en el embarazo es una urgencia?", "El del tercer trimestre con hipertensión, cefalea o alteraciones visuales: preeclampsia grave o HELLP."),
      qa("¿Qué antiácidos se evitan en el embarazo?", "El bicarbonato de sodio y los que contienen trisilicato de magnesio en uso prolongado."),
    ],
  },
};
