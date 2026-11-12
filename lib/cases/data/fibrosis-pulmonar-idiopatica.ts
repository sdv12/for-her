import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fibrosisPulmonarIdiopatica: ClinicalCase = {
  id: "fibrosis-pulmonar-idiopatica",
  level: 3,
  area: "Respiratorio",
  setting: "Consultorio",
  patient: { age: 71, ageUnit: "años", sex: "M", context: "Ex fumador. Trabajó en una oficina. Tratado dos veces como “bronquitis”." },
  frequency: "poco-frecuente",
  intro: "“Hace un año me falta el aire, cada vez con menos esfuerzo, y tengo tos seca que no se va con nada.”",
  vitals: { TA: "128/78 mmHg", FC: "88 lpm", FR: "22 rpm", "T°": "36,4 °C", "SatO₂": "92 %" },
  anamnesis: [
    act("evolucion", "¿Cómo progresó la falta de aire?", "clave", "“Lento, pero sin parar.”", "Progresiva."),
    act("exposiciones", "¿Aves, hongos, asbesto, sílice, fármacos como amiodarona o nitrofurantoína?", "clave", "“Nada.”", "Excluye causas conocidas."),
    act("autoinmune", "¿Raynaud, artritis, piel engrosada, sequedad?", "clave", "“No.”", "Excluye colagenopatías."),
    act("reflujo", "¿Acidez?", "util", "“Sí, bastante.”", "Asociación frecuente."),
    act("familia", "¿Familiares con fibrosis?", "util", "“No.”", "Forma familiar."),
    act("hobby", "¿Qué te gusta?", "neutro", "“Leer novelas.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación", "clave", "Crepitantes secos tipo velcro bibasales.", "Fibrosis."),
    act("dedos", "Dedos", "clave", "Hipocratismo digital.", "Típico."),
    act("caminata", "Saturación al caminar", "util", "Baja a 85 %.", "Desaturación con esfuerzo."),
  ],
  studies: [
    study("Imágenes", "tcar", "TC de alta resolución", "clave", "Patrón en panal de abejas subpleural basal con bronquiectasias de tracción.", "Patrón de neumonía intersticial usual."),
    study("Otros", "funcional", "Espirometría, volúmenes y DLCO", "clave", "Restricción con DLCO de 45 %.", "Gravedad."),
    study("Laboratorio", "autoinmune", "ANA, factor reumatoideo, anti-CCP, precipitinas", "clave", "Negativos.", "Excluye otras causas."),
    study("Otros", "biopsia", "Biopsia quirúrgica con TC típica", "innecesario", "No se realizó.", "No hace falta y conlleva riesgo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fpi", "Fibrosis pulmonar idiopática", true, "Mayor, ex fumador, velcro, hipocratismo y patrón usual sin otra causa."),
      dx("epoc", "EPOC", false, "Es restrictivo, no obstructivo."),
      dx("ic", "Insuficiencia cardíaca", false, "Crepitantes secos y TC con panal."),
      dx("hipersensibilidad", "Neumonitis por hipersensibilidad", false, "Sin exposición ni precipitinas."),
      dx("colagenopatia", "Enfermedad intersticial por colagenopatía", false, "Autoanticuerpos negativos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antifibroticos", "Antifibróticos (pirfenidona o nintedanib)", "clave", "Enlentecen la progresión."),
      mg("oxigeno", "Oxígeno con el esfuerzo y rehabilitación", "clave", "Calidad de vida."),
      mg("trasplante", "Evaluar trasplante y cuidados paliativos", "clave", "Pronóstico."),
      mg("vacunas", "Vacunas y tratar reflujo", "util", "Prevención."),
      mg("corticoides", "Corticoides con azatioprina", "riesgoso", "Aumentan la mortalidad en FPI."),
      mg("atb", "Antibióticos repetidos por bronquitis", "riesgoso", "No es infección."),
    ],
  },
  debrief: {
    diagnosis: "Fibrosis pulmonar idiopática con patrón de neumonía intersticial usual, en varón de 71 años ex fumador.",
    pathologies: [
      { name: "Fibrosis pulmonar idiopática", role: "principal", why: "Fibrosis progresiva de causa desconocida." },
      { name: "Reflujo y desaturación", role: "asociada", why: "Comorbilidades." },
      { name: "EPOC, IC, colagenopatías", role: "diferencial", why: "Otras causas de disnea." },
    ],
    reasoning: [
      "Causa: microlesiones epiteliales repetidas en personas predispuestas.",
      "Mecanismo: reparación aberrante con depósito de colágeno.",
      "Consecuencia: restricción, hipoxemia y falla respiratoria.",
    ],
    epidemiology:
      "Afecta sobre todo a varones mayores de 60 años, ex fumadores. La supervivencia media sin tratamiento es de 3 a 5 años. Muchas personas reciben tratamientos para bronquitis o insuficiencia cardíaca antes del diagnóstico. Los crepitantes tipo velcro deben despertar sospecha.",
    management: [
      "TC de alta resolución.",
      "Excluir causas.",
      "Antifibróticos.",
      "Oxígeno, rehabilitación y paliativos.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Fibrosis pulmonar idiopática.", "ATS/ERS/JRS/ALAT — IPF Clinical Practice Guideline."],
    pearls: ["Velcro e hipocratismo.", "Panal de abejas.", "No corticoides."],
    pitfalls: ["Llamarlo bronquitis.", "Dar corticoides."],
    tribunal: [
      qa("¿Qué diferencia patrón obstructivo y restrictivo?", "Obstructivo: VEF1/CVF bajo. Restrictivo: capacidad pulmonar total baja con relación normal o alta."),
      qa("¿Qué fármacos causan fibrosis pulmonar?", "Amiodarona, nitrofurantoína, metotrexato y bleomicina."),
      qa("¿Qué es una exacerbación aguda?", "Empeoramiento rápido con nuevas opacidades en vidrio esmerilado, con alta mortalidad."),
    ],
  },
};
