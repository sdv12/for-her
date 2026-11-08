import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const asmaEmbarazada: ClinicalCase = {
  id: "crisis-asma-embarazada",
  level: 2,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 28, ageUnit: "años", sex: "F", context: "Embarazo de 26 semanas. Asmática. Dejó el corticoide inhalado por miedo a dañar al bebé." },
  frequency: "frecuente",
  intro: "“Me silba el pecho y no puedo terminar las frases. Hace dos días me resfrié.”",
  vitals: { TA: "116/72 mmHg", FC: "122 lpm", FR: "30 rpm", "T°": "37,1 °C", "SatO₂": "92 %" },
  anamnesis: [
    act("adherencia", "¿Qué medicación usás? ¿La dejaste?", "clave", "“Dejé el corticoide.”", "Principal causa."),
    act("severidad", "¿Internaciones, terapia, intubación?", "clave", "“Una internación.”", "Riesgo."),
    act("feto", "¿Mueve el bebé?", "clave", "“Sí.”", "Bienestar fetal."),
    act("infeccion", "¿Fiebre o resfrío?", "util", "“Resfrío.”", "Desencadenante."),
    act("otro", "¿Aspirina o reflujo?", "util", "“Reflujo.”", "Agravante."),
    act("hobby", "¿Qué series te gustan?", "neutro", "“Policiales.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Tórax", "clave", "Sibilancias difusas, uso de accesorios.", "Crisis moderada a grave."),
    act("frases", "Habla y peak flow", "clave", "Habla palabras sueltas; PEF 45 %.", "Severidad."),
    act("obstetrico", "Latidos fetales", "util", "142 lpm.", "Normal."),
  ],
  studies: [
    study("Otros", "fetal", "Monitoreo fetal", "clave", "Normal.", "Control."),
    study("Laboratorio", "gases", "Gases arteriales", "clave", "pO₂ 66; pCO₂ 36.", "En el embarazo, pCO₂ normal es 30; aquí ya es preocupante."),
    study("Imágenes", "rx", "Radiografía de tórax si hay duda, con protección", "util", "Sin neumotórax.", "Es segura si está indicada."),
    study("Imágenes", "tc-rutina", "TC de tórax de rutina", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("crisis", "Crisis asmática moderada a grave en embarazada, por suspensión de corticoide inhalado", true, "Sibilancias, frases cortas, PEF 45 %, suspensión del controlador."),
      dx("tep", "TEP", false, "Hay sibilancias difusas."),
      dx("eap", "Edema agudo de pulmón", false, "Sin rales ni HTA."),
      dx("nac", "Neumonía", false, "Rx sin consolidación."),
      dx("ansiedad", "Ansiedad", false, "Hay signos objetivos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("salbutamol", "Salbutamol e ipratropio en aerosol", "clave", "Primera línea."),
      mg("corticoide", "Corticoide sistémico", "clave", "Beneficios superan riesgos."),
      mg("oxigeno", "Oxígeno para saturación de 95 % o más", "clave", "Meta mayor por el feto."),
      mg("controlador", "Retomar y educar sobre corticoide inhalado", "clave", "Previene crisis."),
      mg("no-medicar", "Evitar medicación por el embarazo", "riesgoso", "La hipoxia es lo que daña."),
      mg("aines", "Ibuprofeno para el malestar", "riesgoso", "Puede agravar el asma y no se recomienda en el embarazo."),
    ],
  },
  debrief: {
    diagnosis: "Crisis asmática moderada a grave por abandono del corticoide inhalado, en embarazo de 26 semanas.",
    pathologies: [
      { name: "Crisis asmática", role: "principal", why: "Obstrucción aguda." },
      { name: "Embarazo", role: "asociada", why: "Modifica metas." },
      { name: "TEP, EAP, neumonía", role: "diferencial", why: "Otras causas de disnea." },
    ],
    reasoning: [
      "Causa: suspensión del controlador y virus.",
      "Mecanismo: inflamación, broncoespasmo.",
      "Consecuencia: hipoxemia materna y fetal.",
    ],
    epidemiology:
      "Es una de las enfermedades crónicas más frecuentes en el embarazo. Las crisis suelen darse en el segundo y tercer trimestre, a menudo por dejar el tratamiento por temor. Los corticoides inhalados, especialmente la budesonida, son seguros y mejor que el asma no controlada.",
    management: [
      "Evaluar gravedad.",
      "Tratar sin demorar.",
      "Monitorear al feto.",
      "Educar y sostener controlador.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Consenso de asma.", "GINA — Global Strategy for Asthma Management."],
    pearls: ["pCO₂ normal en embarazo es alarma.", "Saturación mayor de 95 %.", "Corticoide inhalado seguro."],
    pitfalls: ["Suspender el tratamiento.", "No tratar por miedo."],
    tribunal: [
      qa("¿Cómo clasificás la gravedad de una crisis?", "Según habla, frecuencia respiratoria, sibilancias, saturación y PEF; PEF menor de 50 % es grave."),
      qa("¿Qué cambia en el embarazo en los gases?", "Hay alcalosis respiratoria compensada, con pCO₂ cercana a 30."),
      qa("¿Cuándo se intuba a una persona con crisis?", "Con agotamiento, deterioro de conciencia, hipercapnia progresiva o paro."),
    ],
  },
};
