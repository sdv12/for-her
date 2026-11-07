import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const anginaEstable: ClinicalCase = {
  id: "angina-cronica-estable",
  level: 2,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 61, ageUnit: "años", sex: "M", context: "Tabaquista, hipertenso, LDL 168. Padre con infarto a los 54. Colectivero." },
  frequency: "muy-frecuente",
  intro: "“Hace tres meses, cuando subo una cuadra o hace frío, siento un peso en el pecho. Paro dos minutos y se me pasa.”",
  vitals: { TA: "146/88 mmHg", FC: "76 lpm", "T°": "36,4 °C", "SatO₂": "98 %", Glucemia: "104 mg/dl" },
  anamnesis: [
    act("caracter", "¿Cómo es el dolor, dónde y cuánto dura?", "clave", "“Peso en el pecho; 2 a 3 minutos.”", "Dolor típico: retroesternal, con esfuerzo, calma con reposo."),
    act("patron", "¿Cambió? ¿Aparece en reposo o con menos esfuerzo?", "clave", "“Siempre igual, nunca en reposo.”", "Si cambia: angina inestable."),
    act("factores", "¿Fumás, colesterol, diabetes, familia?", "clave", "“Un atado, colesterol alto, y mi viejo.”", "Riesgo cardiovascular."),
    act("otros", "¿Claudicación, ACV o impotencia?", "util", "“Impotencia.”", "Enfermedad vascular difusa."),
    act("sildenafil", "¿Usás sildenafil?", "util", "“A veces.”", "Contraindicado con nitratos."),
    act("recorrido", "¿Qué línea manejás?", "neutro", "“La 26.”", "No orienta."),
  ],
  exam: [
    act("cardiaco", "Corazón y soplos", "clave", "Normal, sin soplo de estenosis aórtica.", "Se descarta otra causa."),
    act("vascular", "Pulsos y soplos carotídeos", "util", "Pulsos conservados.", "Otras localizaciones."),
    act("signos", "IMC, cintura", "util", "IMC 30.", "Factor."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG de reposo", "clave", "Normal.", "Un ECG normal no descarta angina."),
    study("Otros", "stress", "Prueba evocadora (ergometría, eco estrés o perfusión)", "clave", "ST descendente a los 6 minutos con dolor; sin signos de alto riesgo.", "Confirma isquemia."),
    study("Laboratorio", "lab", "Perfil lipídico, HbA1c, función renal, hemograma", "clave", "LDL 168.", "Factores."),
    study("Imágenes", "coro", "Cinecoronariografía de rutina sin estratificar", "innecesario", "No se realizó.", "Solo con alto riesgo o síntomas sin control."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("estable", "Angina crónica estable por enfermedad coronaria", true, "Dolor típico, reproducible, y prueba positiva."),
      dx("inestable", "Angina inestable", false, "No hay cambios ni dolor en reposo."),
      dx("reflujo", "Reflujo", false, "No se relaciona con el esfuerzo."),
      dx("osteo", "Dolor osteomuscular", false, "No cambia con palpación ni movimiento."),
      dx("ea", "Estenosis aórtica", false, "Sin soplo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("prevencion", "Aspirina, estatina de alta intensidad, control de presión", "clave", "Reducen eventos."),
      mg("antianginoso", "Betabloqueante y nitroglicerina sublingual de rescate, advirtiendo del sildenafil", "clave", "Reducen síntomas."),
      mg("habitos", "Dejar de fumar, ejercicio, dieta", "clave", "Enorme impacto."),
      mg("alarma", "Pautas: dolor en reposo o más de 20 minutos, a guardia", "clave", "Detecta SCA."),
      mg("aines", "AINE de manera continua", "riesgoso", "Aumentan el riesgo cardiovascular."),
      mg("stent-todos", "Angioplastia de rutina sin isquemia significativa", "innecesario", "No reduce la mortalidad en pacientes estables."),
    ],
  },
  debrief: {
    diagnosis: "Angina crónica estable por enfermedad coronaria aterosclerótica en varón de 61 años.",
    pathologies: [
      { name: "Angina estable", role: "principal", why: "Isquemia con esfuerzo por placa fija." },
      { name: "Riesgo cardiovascular alto", role: "asociada", why: "Tabaco, HTA, LDL." },
      { name: "Angina inestable, reflujo, EA", role: "diferencial", why: "Otras causas de dolor." },
    ],
    reasoning: [
      "Causa: aterosclerosis coronaria.",
      "Mecanismo: la placa limita el flujo cuando la demanda aumenta.",
      "Consecuencia: dolor de esfuerzo; riesgo de SCA.",
    ],
    epidemiology:
      "La enfermedad cardiovascular es la primera causa de muerte en Argentina. El tabaco, la HTA, la dislipemia y la diabetes explican la mayoría de los casos. Los varones se afectan antes, y las mujeres, después de la menopausia.",
    management: [
      "Prueba evocadora.",
      "Prevención y antianginosos.",
      "Coronariografía según riesgo.",
      "Plan de acción ante dolor.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de síndromes coronarios crónicos.", "Federación Argentina de Cardiología — Recomendaciones."],
    pearls: ["Tres criterios: retroesternal, con esfuerzo, cede con reposo o nitrato.", "ECG normal no descarta.", "Nitratos y sildenafil no se combinan."],
    pitfalls: ["Omitir prevención.", "No preguntar por cambios del patrón."],
    tribunal: [
      qa("¿Qué es la clasificación CCS?", "De I a IV según el esfuerzo que causa angina: I con esfuerzo intenso, IV con mínimo esfuerzo o en reposo."),
      qa("¿Qué define la angina inestable?", "Reciente, en reposo, o en progresión, con troponina normal."),
      qa("¿Cómo actúan los nitratos?", "Son venodilatadores: reducen la precarga y consumo de oxígeno, y dilatan las coronarias."),
    ],
  },
};
