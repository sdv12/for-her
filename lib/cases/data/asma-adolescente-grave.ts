import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const asmaAdolescenteGrave: ClinicalCase = {
  id: "crisis-asmatica-adolescente-casi-fatal",
  level: 3,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 15, ageUnit: "años", sex: "M", context: "Asma desde chico. Dejó el corticoide inhalado hace meses. Solo usa salbutamol. Fuma cigarrillo electrónico." },
  frequency: "frecuente",
  intro: "“No puedo... respirar.” (habla palabra por palabra; lo trae la madre, tras usar el aerosol muchas veces sin mejoría)",
  vitals: { TA: "128/78 mmHg", FC: "134 lpm", FR: "36 rpm", "T°": "36,8 °C", "SatO₂": "86 %", Glasgow: "14/15" },
  anamnesis: [
    act("salbutamol", "¿Cuántas veces usaste el aerosol hoy y esta semana?", "clave", "“Muchas; un frasco por mes.”", "Abuso de salbutamol: marcador de mal control y riesgo."),
    act("previo", "¿Te internaron antes? ¿En terapia, con intubación?", "clave", "“Terapia hace dos años.”", "Factor de riesgo de asma casi fatal."),
    act("controlador", "¿Usás corticoide inhalado?", "clave", "“Lo dejé hace meses.”", "Falta de tratamiento de base."),
    act("gatillo", "¿Qué lo desencadenó?", "util", "“Resfrío y vapeo.”", "Desencadenantes."),
    act("alergia", "¿Alergias a aspirina?", "util", "“No.”", "Asma con AINE."),
    act("colegio", "¿Cómo te va en el colegio?", "neutro", "“Bien.”", "No orienta."),
  ],
  exam: [
    act("trabajo", "Trabajo respiratorio", "clave", "Tiraje, usa músculos accesorios, palabras sueltas, sudoroso.", "Crisis grave."),
    act("auscultacion", "Auscultación", "clave", "Murmullo muy disminuido, pocas sibilancias.", "Tórax silencioso: signo de riesgo vital."),
    act("neumotorax", "Simetría y enfisema", "util", "Simétrico, sin enfisema subcutáneo.", "Busca neumotórax."),
  ],
  studies: [
    study("Laboratorio", "gases", "Gases arteriales", "clave", "pH 7,32, pCO₂ 48, pO₂ 56.", "pCO₂ normal o alta en crisis: fatiga, signo de falla inminente."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Hiperinsuflación, sin neumotórax.", "Busca complicaciones si la crisis es grave."),
    study("Otros", "pico", "Pico flujo cuando sea posible", "util", "Menos del 33 %.", "Objetiva la gravedad."),
    study("Otros", "espirometria", "Espirometría ahora", "innecesario", "No se realizó.", "No se hace en crisis grave."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("casi-fatal", "Crisis asmática grave con riesgo vital (asma casi fatal) en falla ventilatoria inminente", true, "No completa frases, tórax silencioso, SatO₂ 86 % y pCO₂ en ascenso."),
      dx("moderada", "Crisis moderada", false, "Los signos son de crisis grave con riesgo vital."),
      dx("anafilaxia", "Anafilaxia", false, "Sin alérgeno, urticaria ni hipotensión."),
      dx("neumotorax", "Neumotórax", false, "Radiografía sin neumotórax."),
      dx("cuerpo", "Cuerpo extraño", false, "Antecedente de asma y compromiso bilateral."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("oxigeno", "Oxígeno para SatO₂ de 93-95 %", "clave", "Corrige hipoxemia."),
      mg("bronco", "Salbutamol e ipratropio nebulizados continuos o seriados", "clave", "Revierten el broncoespasmo."),
      mg("corticoide", "Corticoides sistémicos en la primera hora", "clave", "Reducen la inflamación e internaciones."),
      mg("magnesio", "Sulfato de magnesio EV y aviso a terapia intensiva", "clave", "Reduce internación en crisis graves."),
      mg("sedante", "Sedantes para calmar la ansiedad", "riesgoso", "Deprimen la respiración."),
      mg("alta", "Alta tras un nebulizado", "riesgoso", "Riesgo de recaída; necesita internación y plan al alta."),
    ],
  },
  debrief: {
    diagnosis: "Crisis asmática grave de riesgo vital por falta de tratamiento controlador, en adolescente de 15 años con vapeo.",
    pathologies: [
      { name: "Crisis asmática grave", role: "principal", why: "Obstrucción grave de la vía aérea." },
      { name: "Fatiga e hipercapnia inminente", role: "asociada", why: "Riesgo de paro." },
      { name: "Anafilaxia, neumotórax, cuerpo extraño", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: inflamación sin control, infección y vapeo.",
      "Mecanismo: broncoespasmo, edema y moco atrapan aire y aumentan el trabajo respiratorio.",
      "Consecuencia: hipoxemia, fatiga, retención de CO₂, paro.",
    ],
    epidemiology:
      "En Argentina, el asma afecta a alrededor del 10 % de adolescentes. Muchas muertes son evitables y se asocian con falta de controlador, abuso de salbutamol y crisis graves previas. Las guías ya no recomiendan salbutamol como único tratamiento en adolescentes.",
    management: [
      "Oxígeno, salbutamol, ipratropio y corticoides.",
      "Magnesio y terapia intensiva si no responde.",
      "Intubación solo si hay falla, con ventilación cuidadosa.",
      "Al alta: controlador, plan escrito, técnica, evitar vapeo.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de asma infantil.", "GINA — Guía de asma."],
    pearls: ["Tórax silencioso: no es mejoría.", "pCO₂ normal en una crisis: fatiga.", "Un frasco de salbutamol por mes: riesgo."],
    pitfalls: ["Sedar.", "Dar el alta sin controlador."],
    tribunal: [
      qa("¿Cómo se trata el asma según GINA?", "Por pasos: corticoide inhalado como base, de preferencia con formoterol a demanda, y aumento según el control; no salbutamol solo."),
      qa("¿Qué factores indican riesgo de asma casi fatal?", "Crisis con intubación previa, internación reciente, abuso de salbutamol, no usar corticoides inhalados, problemas psicosociales."),
      qa("¿Por qué el magnesio ayuda?", "Bloquea canales de calcio y relaja el músculo liso bronquial."),
    ],
  },
};
