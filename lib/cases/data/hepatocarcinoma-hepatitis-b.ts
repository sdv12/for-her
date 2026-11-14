import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hepatocarcinomaHepatitisB: ClinicalCase = {
  id: "hepatocarcinoma-hepatitis-b-sin-cirrosis",
  level: 3,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 52, ageUnit: "años", sex: "M", context: "Nacido en China, vive en Buenos Aires hace 20 años. Su madre tenía hepatitis B. Nunca se trató." },
  frequency: "poco-frecuente",
  intro: "“Me duele arriba a la derecha y siento un bulto. Bajé de peso. Nunca tomé alcohol.”",
  vitals: { TA: "128/80 mmHg", FC: "82 lpm", "T°": "36,8 °C", Peso: "62 kg" },
  anamnesis: [
    act("hbv", "¿Tenés hepatitis B? ¿Tu familia?", "clave", "“Mi mamá tenía, yo nunca me controlé.”", "Transmisión vertical."),
    act("alcohol", "¿Alcohol?", "clave", "“Nunca.”", "Sin otra causa."),
    act("peso", "¿Cuánto peso bajaste?", "clave", "“Seis kilos.”", "Alarma."),
    act("ictericia", "¿Te pusiste amarillo?", "util", "“No.”", "Función hepática."),
    act("ascitis", "¿Se hinchó la panza?", "util", "“No.”", "Hipertensión portal."),
    act("restaurante", "¿A qué te dedicás?", "neutro", "“Tengo un supermercado.”", "No orienta."),
  ],
  exam: [
    act("higado", "Hígado", "clave", "Hepatomegalia nodular dura.", "Tumor."),
    act("estigmas", "Estigmas de cirrosis", "clave", "Ausentes.", "Sin cirrosis."),
    act("ictericia-ex", "Ictericia", "util", "No.", "Función conservada."),
  ],
  studies: [
    study("Imágenes", "tc", "TC trifásica de hígado", "clave", "Lesión de 7 cm con realce arterial y lavado venoso, hígado no cirrótico.", "Hepatocarcinoma."),
    study("Laboratorio", "afp", "Alfafetoproteína, HBsAg, HBeAg, carga viral", "clave", "AFP 1.800; HBsAg positivo; carga viral alta.", "Hepatitis B activa."),
    study("Laboratorio", "hepatograma", "Hepatograma y RIN", "util", "Función conservada.", "Opciones terapéuticas."),
    study("Otros", "biopsia-rutina", "Biopsia percutánea obligatoria antes de decidir", "innecesario", "No se realizó.", "La imagen típica alcanza."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hcc-hbv", "Hepatocarcinoma sobre hepatitis B crónica sin cirrosis", true, "Hepatitis B de transmisión vertical, lesión con realce arterial y lavado, AFP muy alta, hígado sin cirrosis."),
      dx("metastasis", "Metástasis hepática", false, "Patrón típico y AFP alta."),
      dx("hemangioma", "Hemangioma", false, "Lavado venoso y AFP alta."),
      dx("absceso", "Absceso hepático", false, "Sin fiebre y realce típico."),
      dx("colangiocarcinoma", "Colangiocarcinoma intrahepático", false, "Patrón de realce de hepatocarcinoma."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reseccion", "Evaluar resección quirúrgica (hígado no cirrótico)", "clave", "Opción curativa."),
      mg("antiviral", "Tenofovir o entecavir", "clave", "Hepatitis B activa."),
      mg("familia", "Tamizaje de hepatitis B en familiares y vacunar a los negativos", "clave", "Prevención."),
      mg("comite", "Comité de tumores hepáticos", "util", "Planificación."),
      mg("sin-antiviral", "No tratar la hepatitis B", "riesgoso", "Progresión y recurrencia."),
      mg("alcohol-ok", "Decirle que puede tomar alcohol con moderación", "riesgoso", "Daño adicional."),
    ],
  },
  debrief: {
    diagnosis: "Hepatocarcinoma sobre hepatitis B crónica sin cirrosis, en varón de 52 años con transmisión vertical.",
    pathologies: [
      { name: "Hepatocarcinoma", role: "principal", why: "Tumor primario hepático." },
      { name: "Hepatitis B crónica", role: "asociada", why: "Oncogénica incluso sin cirrosis." },
      { name: "Metástasis, hemangioma", role: "diferencial", why: "Otras lesiones." },
    ],
    reasoning: [
      "Causa: integración del ADN del virus B en el genoma del hepatocito.",
      "Mecanismo: inflamación crónica y oncogénesis directa.",
      "Consecuencia: hepatocarcinoma aun sin cirrosis.",
    ],
    epidemiology:
      "La hepatitis B puede causar hepatocarcinoma sin cirrosis, a diferencia de la C. Las personas nacidas en zonas endémicas de Asia y África tienen alta prevalencia. Se recomienda tamizaje y vigilancia ecográfica.",
    management: [
      "Imagen típica y AFP.",
      "Resección o ablación.",
      "Antiviral.",
      "Familia.",
    ],
    sources: ["Asociación Argentina para el Estudio de las Enfermedades del Hígado — Hepatocarcinoma.", "EASL — Clinical Practice Guidelines: Management of Hepatocellular Carcinoma."],
    pearls: ["HBV hace cáncer sin cirrosis.", "Realce arterial y lavado.", "Tamizá a la familia."],
    pitfalls: ["No dar antiviral.", "Biopsia innecesaria."],
    tribunal: [
      qa("¿Qué es la clasificación BCLC?", "Estadificación del hepatocarcinoma que guía el tratamiento según tumor, función hepática y estado general."),
      qa("¿Quiénes con hepatitis B necesitan vigilancia ecográfica sin cirrosis?", "Asiáticos mayores de 40 a 50, africanos y con antecedentes familiares de hepatocarcinoma."),
      qa("¿Cómo se previene a nivel poblacional?", "Con la vacuna contra hepatitis B al nacer y en el calendario."),
    ],
  },
};
