import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const htaResistente: ClinicalCase = {
  id: "hipertension-resistente",
  level: 2,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 56, ageUnit: "años", sex: "M", context: "Camionero, obeso, ronca. Toma amlodipina, losartán y diurético. Ibuprofeno por lumbalgia." },
  frequency: "frecuente",
  intro: "“Tomo tres pastillas y la presión no baja de 160. Me duele la cabeza a la mañana.”",
  vitals: { TA: "164/98 mmHg", FC: "82 lpm", "T°": "36,5 °C", Peso: "112 kg", Glucemia: "118 mg/dl" },
  anamnesis: [
    act("adherencia", "¿Tomás todo? ¿Dosis?", "clave", "“A veces me olvido.”", "Falsa resistencia."),
    act("farmacos", "¿AINE, descongestivos, alcohol, sal?", "clave", "“Ibuprofeno diario; como salado.”", "Causas."),
    act("apnea", "¿Ronquidos y sueño de día?", "clave", "“Me duermo manejando.”", "Apnea."),
    act("hipokalemia", "¿Calambres, debilidad?", "util", "“No.”", "Hiperaldosteronismo."),
    act("crisis", "¿Palpitaciones o sudoración?", "util", "“No.”", "Feocromocitoma."),
    act("ruta", "¿Qué rutas manejás?", "neutro", "“La 9.”", "No orienta."),
  ],
  exam: [
    act("tecnica", "Toma correcta de la presión con manguito adecuado", "clave", "158/96 con manguito grande.", "Excluye error."),
    act("organo", "Fondo de ojo y corazón", "clave", "Retinopatía grado II; cuarto ruido.", "Daño de órgano."),
    act("cuello", "Cuello y abdomen", "util", "Cuello ancho; sin soplo renal.", "Apnea y renovascular."),
  ],
  studies: [
    study("Otros", "mapa", "Monitoreo ambulatorio de presión", "clave", "Promedio de 24 horas 152/94; sin descenso nocturno.", "Confirma resistencia verdadera."),
    study("Laboratorio", "lab", "Potasio, creatinina, aldosterona/renina, albuminuria", "clave", "K 3,8; relación normal; albuminuria 80.", "Secundarias y daño."),
    study("Otros", "polisomnografia", "Estudio de sueño", "clave", "Apnea grave.", "Causa."),
    study("Imágenes", "angio-renal", "Angiografía renal de rutina", "innecesario", "No se realizó.", "Sin sospecha."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("resistente", "Hipertensión resistente asociada a apnea del sueño, AINE, sal y adherencia irregular", true, "Tres fármacos con mala adherencia, AINE, sal y apnea, con MAPA alterado."),
      dx("guardapolvo", "HTA de guardapolvo blanco", false, "El MAPA confirma."),
      dx("hiperaldo", "Hiperaldosteronismo", false, "Relación normal."),
      dx("feo", "Feocromocitoma", false, "Sin crisis."),
      dx("renovascular", "Estenosis de arteria renal", false, "Sin datos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aines", "Suspender AINE", "clave", "Elevan la presión."),
      mg("cpap", "CPAP y no manejar hasta tratar la somnolencia", "clave", "Apnea y seguridad vial."),
      mg("espironolactona", "Agregar espironolactona", "clave", "Cuarto fármaco de elección."),
      mg("habitos", "Sal, peso y alcohol; comprimido combinado", "clave", "Adherencia."),
      mg("seis-drogas", "Agregar más fármacos sin revisar causas", "riesgoso", "No resuelve."),
      mg("manejar", "Seguir manejando de noche", "riesgoso", "Riesgo de accidente."),
    ],
  },
  debrief: {
    diagnosis: "Hipertensión resistente con daño de órgano blanco, asociada a apnea obstructiva grave, AINE, sal y mala adherencia, en varón de 56 años.",
    pathologies: [
      { name: "Hipertensión resistente", role: "principal", why: "No se controla con tres fármacos." },
      { name: "Apnea del sueño y AINE", role: "asociada", why: "Causas." },
      { name: "Guardapolvo blanco, hiperaldosteronismo", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: factores de estilo de vida y apnea.",
      "Mecanismo: activación simpática, retención de sodio.",
      "Consecuencia: daño de órgano y riesgo cardiovascular.",
    ],
    epidemiology:
      "Cerca de 1 de cada 10 hipertensos tratados tiene HTA resistente. La seudorresistencia por mala técnica, mala adherencia o fármacos es más frecuente que la verdadera. La apnea y el hiperaldosteronismo son las causas secundarias más comunes.",
    management: [
      "Confirmar con MAPA.",
      "Revisar adherencia y fármacos.",
      "Buscar secundarias.",
      "Espironolactona.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de hipertensión arterial.", "Sociedad Argentina de Hipertensión Arterial — Guías."],
    pearls: ["Tres fármacos con diurético.", "MAPA.", "Apnea e hiperaldosteronismo."],
    pitfalls: ["Agregar fármacos sin revisar.", "Ignorar AINE."],
    tribunal: [
      qa("¿Qué define la HTA resistente?", "Presión no controlada con tres fármacos a dosis plenas, incluido un diurético, o controlada con cuatro."),
      qa("¿Qué es el patrón non-dipper?", "Falta de descenso nocturno de la presión, asociado a más riesgo."),
      qa("¿Qué efectos adversos da la espironolactona?", "Hiperpotasemia y ginecomastia."),
    ],
  },
};
