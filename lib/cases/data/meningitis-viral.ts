import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const meningitisViral: ClinicalCase = {
  id: "meningitis-viral-joven",
  level: 2,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 22, ageUnit: "años", sex: "M", context: "Sano. Compañero de piso con cuadro gastrointestinal hace una semana. Vacunas al día." },
  frequency: "frecuente",
  intro: "“Hace dos días tengo mucho dolor de cabeza, fiebre, me molesta la luz y vomité. Estoy lúcido, pero me duele todo.”",
  vitals: { TA: "122/76 mmHg", FC: "96 lpm", FR: "18 rpm", "T°": "38,4 °C", "SatO₂": "98 %", Glasgow: "15/15" },
  anamnesis: [
    act("inicio", "¿Cómo empezó? ¿Fue en horas?", "clave", "“De a poco, en un día.”", "La bacteriana suele ser más brusca."),
    act("convulsion", "¿Convulsiones, cambios de conducta, olores raros?", "clave", "“No.”", "Orienta contra encefalitis."),
    act("contactos", "¿Alguien enfermo? ¿Inmunosupresión? ¿VIH?", "clave", "“Mi compañero con diarrea; nunca me hice el test.”", "Enterovirus; y síndrome retroviral agudo es un diferencial."),
    act("antibioticos", "¿Tomaste antibióticos?", "util", "“No.”", "Puede alterar el LCR."),
    act("sexual", "¿Relaciones sin protección recientes?", "util", "“Hace un mes.”", "VIH agudo, VHS-2."),
    act("materia", "¿Qué estudiás?", "neutro", "“Arquitectura.”", "No orienta."),
  ],
  exam: [
    act("meninges", "Rigidez de nuca y Kernig/Brudzinski", "clave", "Rigidez leve, Brudzinski dudoso.", "Síndrome meníngeo."),
    act("piel", "Piel", "clave", "Sin petequias.", "Excluye meningococcemia."),
    act("neuro", "Neurológico y fondo de ojo", "clave", "Sin foco, sin papiledema.", "Permite la punción sin TC."),
  ],
  studies: [
    study("Otros", "lcr", "Punción lumbar con citoquímico, Gram, cultivo y PCR viral", "clave", "Claro, 180 células con 85 % linfocitos, glucosa 62 (glucemia 95), proteínas 68. PCR enterovirus positiva.", "Patrón viral."),
    study("Microbiología", "hemo", "Hemocultivos antes del antibiótico", "clave", "Negativos.", "Si hay duda, se cubre mientras llega el resultado."),
    study("Laboratorio", "vih", "Test de VIH y sífilis", "clave", "Negativos.", "Diferenciales que no se deben olvidar."),
    study("Imágenes", "tac", "TC de encéfalo a todos antes de punzar", "innecesario", "No se realizó.", "Solo si hay foco, convulsiones, inmunodepresión o menor conciencia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("viral", "Meningitis viral por enterovirus", true, "Síndrome meníngeo con conciencia normal y LCR linfocítico, glucosa normal, proteínas poco elevadas y PCR positiva."),
      dx("bacteriana", "Meningitis bacteriana", false, "Daría LCR turbio con PMN, glucosa baja y proteínas altas."),
      dx("tbc", "Meningitis tuberculosa", false, "Es subaguda, con glucosa baja y proteínas muy altas."),
      dx("encefalitis", "Encefalitis herpética", false, "Hay conciencia y conducta normales."),
      dx("hsa", "Hemorragia subaracnoidea", false, "Inicio no en trueno, con fiebre y LCR inflamatorio."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sintomatico", "Tratamiento sintomático: analgesia, antieméticos, hidratación", "clave", "Es autolimitada."),
      mg("empirico", "Si había dudas: antibiótico empírico mientras se esperan los resultados, y suspender al confirmar", "clave", "Ante la duda, se cubre: no se demora."),
      mg("alarma", "Pautas de alarma: confusión, convulsiones, fiebre persistente", "clave", "Alerta de complicaciones."),
      mg("seguir-atb", "Seguir con antibióticos los 10 días", "innecesario", "Con PCR viral y cultivos negativos, se suspenden."),
      mg("aciclovir", "Aciclovir de rutina", "innecesario", "Solo con sospecha de encefalitis herpética."),
      mg("sin-puncion", "No punzar y dar alta con paracetamol", "riesgoso", "No excluye bacteriana."),
    ],
  },
  debrief: {
    diagnosis: "Meningitis viral por enterovirus en varón de 22 años.",
    pathologies: [
      { name: "Meningitis viral", role: "principal", why: "Inflamación meníngea por virus." },
      { name: "VIH agudo, sífilis", role: "diferencial", why: "Causas a descartar." },
      { name: "Meningitis bacteriana y tuberculosa, encefalitis", role: "diferencial", why: "Cuadros graves que hay que excluir." },
    ],
    reasoning: [
      "Causa: enterovirus por vía fecal-oral.",
      "Mecanismo: viremia que llega al espacio subaracnoideo y genera inflamación linfocítica.",
      "Consecuencia: fiebre, cefalea, fotofobia y rigidez, autolimitadas en días.",
    ],
    epidemiology:
      "Es la causa más frecuente de meningitis, sobre todo en niños y adultos jóvenes, en verano y otoño. Es de notificación obligatoria como evento en Argentina. Aunque suele ser benigna, siempre hay que excluir la bacteriana, por su mortalidad.",
    management: [
      "Evaluar con LCR.",
      "Antibiótico inmediato si hay duda.",
      "Sintomático si es viral.",
      "Test de VIH y seguimiento.",
    ],
    sources: ["Sociedad Argentina de Infectología — Recomendaciones de infecciones del sistema nervioso central.", "Ministerio de Salud de la Nación — Vigilancia de meningoencefalitis."],
    pearls: ["LCR viral: linfocitos, glucosa normal, proteínas poco altas.", "Ante la duda, cubrir.", "Fiebre con cefalea tras una exposición sexual: pedí VIH."],
    pitfalls: ["Hacer TC a todos antes de punzar.", "Seguir antibióticos sin indicación."],
    tribunal: [
      qa("¿Cómo diferencia el LCR las meningitis?", "Bacteriana: turbio, PMN, glucosa baja, proteínas altas. Viral: claro, linfocitos, glucosa normal. TBC: linfocitos, glucosa muy baja, proteínas muy altas, formación de película."),
      qa("¿Cuándo se hace TC antes de la punción?", "Con foco neurológico, convulsiones, papiledema, inmunodepresión o Glasgow bajo."),
      qa("¿Qué germen da meningitis bacteriana en el adulto?", "Principalmente S. pneumoniae y N. meningitidis; en mayores de 50 años y personas inmunodeprimidas, también Listeria."),
    ],
  },
};
