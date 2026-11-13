import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const intoxicacionDigoxina: ClinicalCase = {
  id: "intoxicacion-digitalica",
  level: 3,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 82, ageUnit: "años", sex: "F", context: "Fibrilación auricular e insuficiencia cardíaca. Toma digoxina, furosemida y espironolactona. Diarrea hace 4 días." },
  frequency: "frecuente",
  intro: "“Hace dos días no quiere comer, vomita, está confundida y dice que ve todo amarillo.” (relata la hija)",
  vitals: { TA: "104/62 mmHg", FC: "42 lpm", FR: "18 rpm", "T°": "36,3 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("dosis", "¿Cómo toma la digoxina?", "clave", "“Una por día, todos los días.”", "Sin descanso a su edad."),
    act("vision", "¿Cómo ve?", "clave", "“Amarillo, con halos.”", "Xantopsia: toxicidad."),
    act("diarrea", "¿Cuánto toma de líquido y cuánto orina?", "clave", "“Poco, con la diarrea está seca.”", "Falla renal prerrenal."),
    act("farmacos", "¿Le agregaron amiodarona o algún antibiótico?", "util", "“Claritromicina la semana pasada.”", "Aumenta niveles."),
    act("palpitaciones", "¿Palpitaciones o desmayos?", "util", "“Se mareó al pararse.”", "Arritmia."),
    act("nietos", "¿Vive sola?", "neutro", "“Con mi hermana.”", "No orienta."),
  ],
  exam: [
    act("conciencia", "Estado mental", "clave", "Confusa, desorientada.", "Neurotoxicidad."),
    act("volemia", "Volemia", "clave", "Mucosas secas, sin edemas.", "Deshidratación."),
    act("pulso", "Pulso", "util", "Lento, regular.", "Bloqueo AV."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG", "clave", "FA con respuesta ventricular lenta y regularizada, infradesnivel del ST en cubeta, extrasístoles ventriculares bigeminadas.", "Toxicidad digitálica."),
    study("Laboratorio", "nivel", "Digoxinemia", "clave", "3,8 ng/ml.", "Tóxico."),
    study("Laboratorio", "lab", "Potasio, magnesio, creatinina", "clave", "K 5,6; Mg 1,6; creatinina 2,4 (basal 1,1).", "IRA e hiperpotasemia."),
    study("Otros", "calcio-ev", "Gluconato de calcio EV para el potasio", "riesgoso", "No se indicó.", "Clásicamente contraindicado con digital; preferir otras medidas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("digital", "Intoxicación digitálica crónica por insuficiencia renal aguda prerrenal e interacción", true, "Síntomas digestivos, confusión, xantopsia, bradicardia, bigeminia, digoxinemia alta e IRA."),
      dx("gastroenteritis", "Gastroenteritis con deshidratación", false, "No explica xantopsia ni el ECG."),
      dx("delirium-infeccioso", "Delirium por infección", false, "Hay causa tóxica clara."),
      dx("bloqueo-degenerativo", "Bloqueo AV degenerativo", false, "Digoxinemia tóxica."),
      dx("hiperpotasemia-aislada", "Hiperpotasemia por espironolactona sola", false, "No explica los síntomas visuales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender", "Suspender digoxina, espironolactona y claritromicina", "clave", "Retirar la causa."),
      mg("anticuerpos", "Anticuerpos antidigoxina (Fab) por arritmia y potasio alto", "clave", "Antídoto específico."),
      mg("hidratacion", "Hidratación y monitoreo cardíaco", "clave", "IRA y arritmias."),
      mg("magnesio", "Reponer magnesio", "util", "Estabiliza la membrana."),
      mg("cardioversion", "Cardioversión eléctrica de la FA", "riesgoso", "Puede inducir arritmias ventriculares graves."),
      mg("seguir-dosis", "Seguir con la digoxina a mitad de dosis", "riesgoso", "Nivel tóxico actual."),
    ],
  },
  debrief: {
    diagnosis: "Intoxicación digitálica crónica precipitada por insuficiencia renal aguda prerrenal e interacción con claritromicina, en mujer de 82 años.",
    pathologies: [
      { name: "Intoxicación digitálica", role: "principal", why: "Nivel tóxico con arritmias." },
      { name: "IRA prerrenal e hiperpotasemia", role: "asociada", why: "Desencadenante y gravedad." },
      { name: "Gastroenteritis, delirium", role: "diferencial", why: "Otras causas del cuadro." },
    ],
    reasoning: [
      "Causa: menor eliminación renal por deshidratación y menor metabolismo por claritromicina.",
      "Mecanismo: inhibición de la bomba Na/K ATPasa con aumento del tono vagal y automatismo.",
      "Consecuencia: bradiarritmias, extrasístoles ventriculares, síntomas digestivos y visuales.",
    ],
    epidemiology:
      "La digoxina sigue usándose en adultos mayores con FA e insuficiencia cardíaca. Su margen terapéutico es estrecho y la toxicidad crónica aparece con deshidratación, insuficiencia renal o interacciones. Los síntomas digestivos suelen ser los primeros.",
    management: [
      "Sospechar.",
      "Nivel y potasio.",
      "Suspender y Fab.",
      "Revisar fármacos.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Insuficiencia cardíaca.", "American Heart Association — Toxicology-related Cardiac Arrest and Critical Illness."],
    pearls: ["Digestivos, confusión y amarillo.", "Mirá la creatinina.", "Fab si hay arritmia."],
    pitfalls: ["Cardiovertir.", "No pensar en interacciones."],
    tribunal: [
      qa("¿Qué es la cubeta digitálica?", "Infradesnivel del ST con forma de cuchara por efecto del digital, que no indica toxicidad por sí."),
      qa("¿Qué arritmia es casi específica de digital?", "La taquicardia auricular con bloqueo AV y la taquicardia ventricular bidireccional."),
      qa("¿Por qué el potasio alto es mal pronóstico en intoxicación aguda?", "Refleja la inhibición masiva de la bomba Na/K y se asocia a mayor mortalidad."),
    ],
  },
};
