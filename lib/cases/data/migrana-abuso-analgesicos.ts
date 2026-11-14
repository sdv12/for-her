import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const migranaAbusoAnalgesicos: ClinicalCase = {
  id: "cefalea-abuso-analgesicos",
  level: 2,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 42, ageUnit: "años", sex: "F", context: "Migraña desde los 18. Toma ergotamina con cafeína o ibuprofeno casi todos los días." },
  frequency: "muy-frecuente",
  intro: "“Tengo dolor de cabeza casi todos los días, ya no sé qué tomar. Me despierto con dolor.”",
  vitals: { TA: "124/78 mmHg", FC: "74 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("frecuencia", "¿Cuántos días por mes tenés dolor?", "clave", "“Unos 20.”", "Cefalea crónica."),
    act("analgesicos", "¿Cuántos días por mes tomás analgésicos?", "clave", "“Casi todos, a veces dos por día.”", "Uso excesivo."),
    act("evolucion", "¿Cómo eran antes?", "clave", "“Cuatro migrañas por mes.”", "Cronificación."),
    act("alarma", "¿Dolor nuevo distinto, déficit, fiebre?", "util", "“No.”", "Sin alarma."),
    act("animo", "¿Ánimo y sueño?", "util", "“Ansiosa, duermo mal.”", "Comorbilidades."),
    act("trabajo", "¿Trabajás?", "neutro", "“Soy contadora.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Normal.", "Sin signos de alarma."),
    act("fondo", "Fondo de ojo", "clave", "Normal.", "Sin hipertensión endocraneana."),
    act("ta", "Presión arterial", "util", "Normal.", "Base."),
  ],
  studies: [
    study("Otros", "diario", "Diario de cefalea y de analgésicos", "clave", "20 días con dolor, 22 días con analgésicos.", "Confirma."),
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Criterios cumplidos.", "Sin estudios."),
    study("Imágenes", "rm", "RM de cerebro", "innecesario", "No se realizó.", "Sin alarma."),
    study("Otros", "opioides", "Agregar tramadol para el dolor diario", "riesgoso", "No se indicó.", "Empeora el abuso."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cefalea-abuso", "Cefalea por uso excesivo de analgésicos sobre migraña crónica", true, "Migraña previa, 15 o más días de dolor por mes y uso de analgésicos o ergotamina más de 10 a 15 días por mes."),
      dx("tumor", "Tumor cerebral", false, "Examen y fondo normales, migraña de larga data."),
      dx("tensional", "Cefalea tensional crónica", false, "Base migrañosa."),
      dx("hic", "Hipertensión intracraneal", false, "Fondo normal."),
      dx("migrana-episodica", "Migraña episódica", false, "Más de 15 días por mes."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("retirar", "Retirar los analgésicos de uso excesivo", "clave", "Tratamiento principal."),
      mg("preventivo", "Iniciar preventivo (topiramato, amitriptilina o anti-CGRP)", "clave", "Reducir la frecuencia."),
      mg("educacion", "Educación: no más de 2 días por semana de analgésicos", "clave", "Prevención."),
      mg("habitos", "Sueño, ejercicio y manejo del estrés", "util", "Comorbilidades."),
      mg("mas-analgesicos", "Cambiar a otro analgésico diario", "riesgoso", "Perpetúa el cuadro."),
      mg("opioides-mg", "Opioides", "riesgoso", "Empeoran la cefalea."),
    ],
  },
  debrief: {
    diagnosis: "Cefalea por uso excesivo de analgésicos sobre migraña crónica, en mujer de 42 años.",
    pathologies: [
      { name: "Cefalea por uso excesivo de medicación", role: "principal", why: "Cronificación por analgésicos." },
      { name: "Migraña crónica", role: "asociada", why: "Base." },
      { name: "Tumor, hipertensión intracraneal", role: "diferencial", why: "Causas secundarias." },
    ],
    reasoning: [
      "Causa: uso frecuente de analgésicos, ergotamina u opioides.",
      "Mecanismo: sensibilización central y menor umbral del dolor.",
      "Consecuencia: dolor diario que no responde a los analgésicos.",
    ],
    epidemiology:
      "Es muy frecuente en consultas de cefalea y afecta más a mujeres con migraña. La ergotamina y los opioides tienen el mayor riesgo. Retirar el analgésico y usar un preventivo mejora a la mayoría.",
    management: [
      "Diario.",
      "Retirar.",
      "Preventivo.",
      "Educación.",
    ],
    sources: ["Sociedad Neurológica Argentina — Consenso de cefaleas.", "International Classification of Headache Disorders, 3rd edition (ICHD-3)."],
    pearls: ["Más analgésicos, más dolor.", "Preventivo.", "Ergotamina: cuidado."],
    pitfalls: ["Opioides.", "Pedir RM sin alarma."],
    tribunal: [
      qa("¿Cuántos días de analgésicos definen uso excesivo?", "Diez o más días por mes de triptanes, ergóticos u opioides, o 15 o más de analgésicos simples."),
      qa("¿Qué es la migraña crónica?", "Cefalea 15 o más días por mes por más de 3 meses, con rasgos migrañosos al menos 8 días."),
      qa("¿Qué son los anticuerpos anti-CGRP?", "Preventivos específicos para migraña que bloquean el péptido relacionado con el gen de la calcitonina."),
    ],
  },
};
