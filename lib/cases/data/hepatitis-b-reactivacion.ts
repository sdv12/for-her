import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hepatitisBReactivacion: ClinicalCase = {
  id: "hepatitis-b-reactivacion-rituximab",
  level: 3,
  area: "Infectología",
  setting: "Internación",
  patient: { age: 63, ageUnit: "años", sex: "M", context: "Linfoma no Hodgkin tratado con rituximab y quimioterapia hace 4 meses. No le pidieron serologías de hepatitis antes." },
  frequency: "poco-frecuente",
  intro: "“Estoy muy cansado, con náuseas, la orina oscura y me dicen que estoy amarillo.”",
  vitals: { TA: "116/72 mmHg", FC: "92 lpm", FR: "18 rpm", "T°": "37,4 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("tratamiento", "¿Qué tratamiento recibió?", "clave", "“Rituximab con quimio, seis ciclos.”", "Inmunosupresión de alto riesgo."),
    act("antecedentes", "¿Tuvo hepatitis alguna vez?", "clave", "“Me dijeron hace años que había tenido una hepatitis que se curó sola.”", "Infección resuelta."),
    act("profilaxis", "¿Le dieron algún antiviral preventivo?", "clave", "“No.”", "Oportunidad perdida."),
    act("farmacos", "¿Toma paracetamol, alcohol u otros?", "util", "“No.”", "Otras causas."),
    act("confusion", "¿Somnolencia o confusión?", "util", "“No.”", "Fallo hepático."),
    act("hobby", "¿Qué hacía antes?", "neutro", "“Era sastre.”", "No orienta."),
  ],
  exam: [
    act("ictericia", "Piel y escleras", "clave", "Ictericia.", "Hepatitis."),
    act("neuro", "Asterixis", "clave", "Ausente.", "Sin encefalopatía."),
    act("higado", "Hígado", "util", "Doloroso, no aumentado.", "Inflamación."),
  ],
  studies: [
    study("Laboratorio", "serologia", "HBsAg, anti-HBc, carga viral de VHB", "clave", "HBsAg positivo (antes negativo según historia); anti-HBc positivo; carga viral alta.", "Reactivación."),
    study("Laboratorio", "hepatograma", "Hepatograma y RIN", "clave", "ALT 1.200; BT 6; RIN 1,4.", "Hepatitis grave."),
    study("Laboratorio", "otras", "Serologías de VHA, VHC, VHE y ecografía", "util", "Negativas; ecografía sin obstrucción.", "Descarta otras causas."),
    study("Otros", "biopsia", "Biopsia hepática urgente", "riesgoso", "No se realizó.", "Coagulopatía y no cambia la conducta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("reactivacion", "Reactivación de hepatitis B por rituximab en paciente con infección resuelta (anti-HBc positivo)", true, "Rituximab, anti-HBc positivo, HBsAg que reaparece y carga viral alta con hepatitis."),
      dx("toxicidad", "Hepatotoxicidad por quimioterapia", false, "Hay replicación viral alta."),
      dx("hepatitis-a", "Hepatitis A", false, "IgM anti-VHA negativa."),
      dx("infiltracion", "Infiltración hepática por linfoma", false, "Patrón viral demostrado."),
      dx("obstruccion", "Obstrucción biliar", false, "Ecografía normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("entecavir", "Entecavir o tenofovir de inmediato", "clave", "Suprime la replicación."),
      mg("hepatologia", "Seguimiento con hepatología por riesgo de fallo hepático", "clave", "Gravedad."),
      mg("oncologia", "Coordinar con oncología cualquier tratamiento futuro", "clave", "No reiniciar sin antiviral."),
      mg("convivientes", "Vacunar a convivientes", "util", "Prevención."),
      mg("lamivudina", "Lamivudina como opción preferida", "riesgoso", "Alta resistencia."),
      mg("esperar", "Esperar a que mejore sola", "riesgoso", "Puede llevar a fallo hepático fatal."),
    ],
  },
  debrief: {
    diagnosis: "Reactivación de hepatitis B por rituximab en paciente con infección resuelta, en varón de 63 años con linfoma.",
    pathologies: [
      { name: "Reactivación de hepatitis B", role: "principal", why: "Replicación viral por inmunosupresión." },
      { name: "Linfoma tratado con rituximab", role: "asociada", why: "Factor de riesgo principal." },
      { name: "Hepatotoxicidad, infiltración", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: virus latente en el hepatocito liberado al eliminar los linfocitos B.",
      "Mecanismo: replicación sin control y luego daño inmune al recuperarse la inmunidad.",
      "Consecuencia: hepatitis aguda y riesgo de fallo hepático.",
    ],
    epidemiology:
      "El rituximab tiene uno de los riesgos más altos de reactivación, aun con HBsAg negativo y anti-HBc positivo. Es prevenible con tamizaje y profilaxis antiviral. Antes de cualquier inmunosupresión se piden HBsAg y anti-HBc.",
    management: [
      "Tamizaje antes de inmunosuprimir.",
      "Profilaxis si corresponde.",
      "Antiviral ya.",
      "Seguimiento.",
    ],
    sources: ["Asociación Argentina para el Estudio de las Enfermedades del Hígado — Hepatitis B.", "AASLD — Hepatitis B Guidance."],
    pearls: ["Antes de rituximab: HBsAg y anti-HBc.", "Anti-HBc solo también reactiva.", "Profilaxis."],
    pitfalls: ["No pedir serologías.", "Lamivudina."],
    tribunal: [
      qa("¿Qué significa anti-HBc positivo con HBsAg negativo?", "Infección pasada resuelta con virus latente en el hígado."),
      qa("¿Cuánto dura la profilaxis con rituximab?", "Durante el tratamiento y al menos 12 a 18 meses después."),
      qa("¿Qué otros fármacos reactivan la hepatitis B?", "Corticoides en dosis altas, anti-TNF, quimioterapia y trasplantes."),
    ],
  },
};
