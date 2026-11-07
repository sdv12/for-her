import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pielonefritisAdultaMayor: ClinicalCase = {
  id: "pielonefritis-adulta-mayor-confusion",
  level: 2,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 84, ageUnit: "años", sex: "F", context: "Vive en un geriátrico. Demencia leve, diabetes. Sonda vesical hace 10 días por retención." },
  frequency: "muy-frecuente",
  intro: "“Desde ayer está confundida y no quiere comer. Hoy tiró la comida y tuvo temblores. Normalmente conversa.” (relata la cuidadora)",
  vitals: { TA: "96/58 mmHg", FC: "108 lpm", FR: "24 rpm", "T°": "38,4 °C", "SatO₂": "94 %", Glucemia: "228 mg/dl", Glasgow: "13/15" },
  anamnesis: [
    act("basal", "¿Cómo es normalmente? ¿Cuándo cambió?", "clave", "“Orientada; cambió en un día.”", "Inicio agudo y fluctuante: delirium, no demencia que avanza."),
    act("sonda", "¿Tiene sonda? ¿Cambió la orina?", "clave", "“Sí, orina turbia y con olor.”", "Factor de riesgo de infección urinaria complicada."),
    act("medicacion", "¿Medicamentos nuevos? ¿Antibióticos previos?", "clave", "“Lorazepam nuevo; le dieron cefalexina el mes pasado.”", "Precipitante y riesgo de resistencia."),
    act("otros", "¿Tos, diarrea, caída, heridas?", "util", "“No.”", "Otros focos."),
    act("hidratacion", "¿Cuánto toma?", "util", "“Muy poco.”", "Deshidratación."),
    act("familia", "¿Tiene hijos?", "neutro", "“Tres.”", "No orienta."),
  ],
  exam: [
    act("punio", "Puño percusión y abdomen", "clave", "Dolor lumbar derecho al percutir y abdomen blando.", "Pielonefritis."),
    act("cam", "Atención y orientación", "clave", "Inatenta, fluctuante, desorientada.", "Criterios de delirium."),
    act("perfusion", "Hidratación y perfusión", "clave", "Mucosas secas, relleno de 3 segundos.", "Sepsis con hipovolemia."),
  ],
  studies: [
    study("Microbiología", "orina", "Orina y urocultivo de sonda nueva, hemocultivos", "clave", "Piuria, nitritos positivos; E. coli BLEE.", "Se cambia la sonda antes de tomar la muestra."),
    study("Laboratorio", "lab", "Laboratorio completo con lactato", "clave", "Leucocitos 18.000, creatinina 1,9, Na 148, lactato 2,8.", "Sepsis y deshidratación."),
    study("Imágenes", "eco", "Ecografía renal y vesical", "clave", "Sin hidronefrosis.", "Se busca obstrucción."),
    study("Imágenes", "tac", "TC de encéfalo", "util", "Sin lesiones agudas.", "Si hubo caída o foco."),
    study("Microbiología", "bolsa", "Cultivar la orina de la bolsa colectora", "innecesario", "No se realizó.", "Se contamina fácilmente: la muestra se toma de una sonda nueva."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pielo-delirium", "Pielonefritis asociada a sonda con sepsis y delirium", true, "Confusión aguda, fiebre, dolor lumbar, sonda, piuria y disfunción orgánica."),
      dx("demencia", "Progresión de la demencia", false, "La demencia avanza lento y no da fiebre."),
      dx("acv", "ACV", false, "No hay foco ni lesión."),
      dx("bacteriuria", "Bacteriuria asintomática", false, "Hay fiebre y síntomas: es infección."),
      dx("neumonia", "Neumonía", false, "Sin signos respiratorios."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Antibiótico EV según riesgo de resistencia (carbapenem si hay BLEE) y ajustar por cultivo", "clave", "Riesgo por sonda y antibióticos previos."),
      mg("sonda", "Cambiar o retirar la sonda", "clave", "Elimina el biofilm."),
      mg("volumen", "Hidratación EV y control de glucemia", "clave", "Corrige hipovolemia y sodio."),
      mg("delirium", "Manejo no farmacológico del delirium y suspender lorazepam", "clave", "Reorientar, anteojos, sueño, familia."),
      mg("sujecion", "Sujeción mecánica y haloperidol de rutina", "riesgoso", "Empeoran el delirium; solo si hay riesgo grave."),
      mg("antibiotico-bacteriuria", "Tratar cualquier bacteriuria sin síntomas en el geriátrico", "innecesario", "Fomenta la resistencia."),
    ],
  },
  debrief: {
    diagnosis: "Pielonefritis asociada a sonda por E. coli BLEE con sepsis y delirium, en mujer de 84 años.",
    pathologies: [
      { name: "Pielonefritis asociada a catéter", role: "principal", why: "Infección alta con sonda." },
      { name: "Delirium", role: "asociada", why: "Disfunción cerebral aguda." },
      { name: "Progresión de demencia, ACV, bacteriuria asintomática", role: "diferencial", why: "Otras explicaciones." },
    ],
    reasoning: [
      "Causa: colonización por sonda, con gérmenes resistentes.",
      "Mecanismo: el biofilm favorece el ascenso de bacterias, con respuesta sistémica.",
      "Consecuencia: fiebre, sepsis, y disfunción cerebral aguda: delirium.",
    ],
    epidemiology:
      "La infección urinaria es la infección más frecuente en residencias de adultos mayores, muy ligada a sondas. Las personas muy mayores a veces consultan solo por confusión o caídas. Sin embargo, la bacteriuria sin síntomas es muy común y no debe tratarse.",
    management: [
      "Evaluar fiebre, síntomas y dispositivos.",
      "Cultivos con sonda nueva y antibiótico EV.",
      "Hidratación y buscar obstrucción.",
      "Manejo del delirium y revisar fármacos.",
    ],
    sources: ["Sociedad Argentina de Infectología — Consenso de infección urinaria.", "Sociedad Argentina de Gerontología y Geriatría — Recomendaciones de delirium."],
    pearls: ["Confusión aguda en una persona mayor: buscá causa orgánica.", "Cambiá la sonda antes de cultivar.", "Bacteriuria sin síntomas no se trata."],
    pitfalls: ["Atribuirlo a la demencia.", "Sujetar y sedar."],
    tribunal: [
      qa("¿Qué es el CAM?", "Confusion Assessment Method: inicio agudo y fluctuante, inatención, más pensamiento desorganizado o alteración de conciencia."),
      qa("¿Qué diferencia delirium de demencia?", "El delirium es agudo, fluctuante, con inatención y causa orgánica, generalmente reversible. La demencia es crónica, progresiva, con atención conservada al inicio."),
      qa("¿Cuándo se trata la bacteriuria asintomática?", "En el embarazo y antes de procedimientos urológicos invasivos."),
    ],
  },
};
