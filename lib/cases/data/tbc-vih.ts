import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tbcVih: ClinicalCase = {
  id: "tuberculosis-vih-privado-libertad",
  level: 3,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 34, ageUnit: "años", sex: "M", context: "Salió de un penal hace tres meses. Fumador, consumo de pasta base. Sin controles médicos." },
  frequency: "frecuente",
  intro: "“Hace dos meses tengo tos, fiebre a la tarde, transpiro de noche y bajé 12 kilos.”",
  vitals: { TA: "104/66 mmHg", FC: "98 lpm", FR: "22 rpm", "T°": "38,1 °C", "SatO₂": "93 %", Peso: "52 kg" },
  anamnesis: [
    act("contacto", "¿Estuviste con alguien con tuberculosis? ¿Dónde vivís?", "clave", "“En el penal había varios.”", "Exposición en lugares cerrados: alto riesgo."),
    act("tos", "¿Tos con catarro o sangre?", "clave", "“Catarro y un poco de sangre.”", "Tos de más de 2 semanas: sintomático respiratorio."),
    act("vih", "¿Alguna vez te hiciste un test de VIH? ¿Relaciones sin protección, agujas?", "clave", "“Nunca; alguna vez compartí agujas.”", "El VIH cambia la presentación y el tratamiento."),
    act("tratamiento", "¿Te trataron por tuberculosis antes?", "util", "“No.”", "Riesgo de resistencia."),
    act("alcohol", "¿Consumís alcohol?", "util", "“A veces.”", "Riesgo hepático con el tratamiento."),
    act("musica", "¿Qué música escuchás?", "neutro", "“Cuarteto.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación", "clave", "Rales apicales bilaterales y soplo anfórico en el vértice derecho.", "Compromiso pulmonar."),
    act("boca", "Boca y ganglios", "clave", "Muguet oral y adenopatías cervicales.", "Sugiere inmunodepresión."),
    act("general", "Estado general", "util", "Adelgazado, sudoroso.", "Consunción."),
  ],
  studies: [
    study("Microbiología", "baciloscopia", "Baciloscopías de esputo y Xpert MTB/RIF", "clave", "BAAR positivo; Xpert positivo, sin resistencia a rifampicina.", "Confirma y detecta resistencia rápido."),
    study("Laboratorio", "vih", "Test rápido de VIH, carga viral y CD4", "clave", "VIH positivo, CD4 110.", "Se ofrece a toda persona con TBC."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Infiltrados y cavidades en lóbulos superiores.", "Patrón de reactivación."),
    study("Microbiología", "cultivo", "Cultivo y prueba de sensibilidad", "clave", "Sensible a todos los fármacos.", "Confirma y orienta."),
    study("Laboratorio", "lab", "Función hepática y renal, serologías de hepatitis", "util", "Transaminasas normales.", "Basal antes del tratamiento."),
    study("Imágenes", "broncoscopia", "Broncoscopía de rutina con esputo positivo", "innecesario", "No se realizó.", "Con baciloscopía y Xpert positivos no aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tbc-vih", "Tuberculosis pulmonar bacilífera con infección por VIH avanzada", true, "Síntomas crónicos, cavidades, BAAR positivo, Xpert positivo, VIH con CD4 de 110."),
      dx("nac", "Neumonía bacteriana", false, "Dos meses de evolución con BAAR positivo."),
      dx("cancer", "Cáncer de pulmón", false, "Hay germen identificado."),
      dx("pcp", "Neumonía por Pneumocystis", false, "Da infiltrado intersticial bilateral difuso, sin cavidades."),
      dx("hongos", "Histoplasmosis", false, "BAAR y Xpert confirman tuberculosis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hrze", "Tratamiento supervisado: 2 meses de HRZE más 4 de HR", "clave", "Es el esquema estándar."),
      mg("tarv", "Iniciar TARV dentro de 2 semanas si CD4 menor de 50, o antes de las 8 semanas; dolutegravir ajustado por rifampicina", "clave", "Reduce la mortalidad; la rifampicina obliga a ajustar la dosis."),
      mg("tmp", "Profilaxis con TMP-SMX", "clave", "Previene Pneumocystis y otras infecciones."),
      mg("notificar", "Notificar, estudiar contactos y aislamiento respiratorio hasta negativizar", "clave", "Corta la transmisión."),
      mg("social", "Trabajo social, adicciones y seguimiento", "util", "Mejora la adherencia."),
      mg("mono", "Isoniazida sola o dos fármacos", "riesgoso", "Genera resistencia."),
    ],
  },
  debrief: {
    diagnosis: "Tuberculosis pulmonar bacilífera con cavidades e infección por VIH avanzada (CD4 110), en varón de 34 años que estuvo privado de libertad.",
    pathologies: [
      { name: "Tuberculosis pulmonar", role: "principal", why: "Infección por M. tuberculosis." },
      { name: "Infección por VIH avanzada", role: "asociada", why: "Inmunodepresión." },
      { name: "Neumonía, cáncer, Pneumocystis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: inhalación del bacilo en un ambiente cerrado, con inmunodepresión.",
      "Mecanismo: la caída de linfocitos CD4 impide mantener el granuloma y hay reactivación.",
      "Consecuencia: cavidades, consunción, transmisión y mortalidad si no se trata.",
    ],
    epidemiology:
      "En Argentina se notifican más de 10.000 casos de tuberculosis por año, y aumentan en jóvenes. Es más frecuente en personas privadas de libertad, con VIH, en barrios populares y en quienes consumen sustancias. Es de notificación obligatoria y su tratamiento es gratuito.",
    management: [
      "Sintomático respiratorio: esputo.",
      "Test de VIH a toda persona con TBC.",
      "HRZE supervisado y TARV temprano.",
      "Estudio de contactos y notificación.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de tuberculosis.", "Instituto Nacional de Enfermedades Respiratorias Emilio Coni."],
    pearls: ["Tos de más de 2 semanas: pedí baciloscopía.", "Toda TBC necesita test de VIH.", "Rifampicina interactúa con el TARV."],
    pitfalls: ["Monoterapia.", "No estudiar contactos."],
    tribunal: [
      qa("¿Qué efectos adversos tienen los fármacos antituberculosos?", "Isoniazida: hepatitis y neuropatía (se da piridoxina). Rifampicina: hepatitis, orina anaranjada e interacciones. Pirazinamida: hepatitis e hiperuricemia. Etambutol: neuritis óptica."),
      qa("¿Qué es el síndrome inflamatorio de reconstitución inmune?", "Un empeoramiento inflamatorio tras iniciar TARV por la recuperación inmune contra patógenos; se maneja sin suspender, y a veces con corticoides."),
      qa("¿Qué es la multirresistencia?", "La resistencia a isoniazida y rifampicina como mínimo. Requiere esquemas más prolongados y especializados."),
    ],
  },
};
