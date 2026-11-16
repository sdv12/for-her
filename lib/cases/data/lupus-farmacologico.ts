import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const lupusFarmacologico: ClinicalCase = {
  id: "lupus-farmacologico",
  level: 3,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 64, ageUnit: "años", sex: "M", context: "Hipertensión resistente; hace un año le agregaron hidralazina 200 mg/día." },
  frequency: "poco-frecuente",
  intro: "“Hace dos meses me duelen las articulaciones, tengo fiebrecita y me duele el pecho al respirar.”",
  vitals: { TA: "136/82 mmHg", FC: "88 lpm", FR: "18 rpm", "T°": "37,8 °C" },
  anamnesis: [
    act("farmacos", "¿Qué medicación toma y desde cuándo?", "clave", "“Hidralazina desde hace un año, más amlodipina y enalapril.”", "Hidralazina en dosis altas: causa clásica de lupus inducido."),
    act("articulaciones", "¿Qué articulaciones?", "clave", "“Manos, muñecas y rodillas, de los dos lados.”", "Poliartralgias simétricas."),
    act("pecho", "¿Cómo es el dolor de pecho?", "clave", "“Puntada al respirar, mejora sentado.”", "Serositis."),
    act("renal-neuro", "¿Orina espumosa, sangre en orina, convulsiones?", "clave", "“No.”", "El lupus inducido rara vez afecta riñón o sistema nervioso."),
    act("piel", "¿Manchas con el sol, caída de pelo, aftas?", "util", "“No.”", "Menos piel que en el lupus sistémico."),
    act("hobby", "¿Qué le gusta hacer?", "neutro", "“Pescar.”", "No orienta."),
  ],
  exam: [
    act("articular", "Articulaciones", "clave", "Dolor sin sinovitis franca.", "Artralgias."),
    act("frote", "Auscultación cardíaca", "clave", "Frote pericárdico.", "Pericarditis."),
    act("piel-ex", "Piel", "util", "Sin rash malar.", "Típico del inducido."),
  ],
  studies: [
    study("Laboratorio", "fan", "FAN y anti-histona", "clave", "FAN 1/640 homogéneo; anti-histona positivos.", "Patrón típico del lupus inducido."),
    study("Laboratorio", "anti-dna", "Anti-ADN doble cadena y complemento", "clave", "Anti-ADN negativo, complemento normal.", "Apoya inducido frente a sistémico."),
    study("Laboratorio", "orina", "Orina completa y creatinina", "clave", "Normales.", "Sin nefritis."),
    study("Imágenes", "eco", "Ecocardiograma", "util", "Derrame pericárdico leve.", "Serositis."),
    study("Otros", "biopsia-renal", "Biopsia renal", "innecesario", "No se hizo.", "Orina y creatinina normales."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("lupus-inducido", "Lupus inducido por hidralazina", true, "Varón mayor con hidralazina en dosis altas, artralgias, serositis, FAN y anti-histona positivos, anti-ADN negativo y sin compromiso renal."),
      dx("les", "Lupus eritematoso sistémico", false, "Anti-ADN negativo, complemento normal, sin riñón ni piel, y hay fármaco causal."),
      dx("ar", "Artritis reumatoidea", false, "Serositis y anti-histona."),
      dx("pericarditis-viral", "Pericarditis viral", false, "Poliartralgias de 2 meses y FAN alto."),
      dx("polimialgia", "Polimialgia reumática", false, "No hay cinturas escapular y pelviana."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender", "Suspender la hidralazina", "clave", "El cuadro remite en semanas a meses."),
      mg("aines", "AINE por pocas semanas para la serositis", "clave", "Sintomático."),
      mg("cambiar-hta", "Reemplazar la hidralazina por otro antihipertensivo (diurético, espironolactona)", "clave", "Hipertensión resistente."),
      mg("corticoide-corto", "Prednisona en dosis bajas si no mejora", "util", "Casos persistentes."),
      mg("registrar", "Registrar la reacción adversa", "util", "Evita reexposición."),
      mg("inmunosupresion", "Ciclofosfamida", "riesgoso", "No hay compromiso grave."),
      mg("seguir-hidralazina", "Mantener la hidralazina y agregar corticoides", "riesgoso", "No elimina la causa."),
    ],
  },
  debrief: {
    diagnosis: "Lupus inducido por hidralazina con artralgias y pericarditis, en un hombre de 64 años con hipertensión resistente.",
    pathologies: [
      { name: "Lupus inducido por fármacos", role: "principal", why: "Reacción autoinmune a la hidralazina." },
      { name: "Hipertensión resistente", role: "asociada", why: "Indicación del fármaco." },
      { name: "Lupus eritematoso sistémico", role: "diferencial", why: "Cuadro similar pero persistente." },
    ],
    reasoning: [
      "Causa: hidralazina, sobre todo en dosis altas y acetiladores lentos.",
      "Mecanismo: alteración de la metilación del ADN de linfocitos T y formación de anticuerpos anti-histona.",
      "Consecuencia: síntomas lúpicos leves que remiten al suspender el fármaco.",
    ],
    epidemiology:
      "Representa cerca del 10 % de los casos de lupus. A diferencia del sistémico, es igual de frecuente en varones y aparece en mayores. Los fármacos clásicos son hidralazina, procainamida, isoniazida, minociclina y anti-TNF.",
    management: [
      "Sospechar con FAN positivo y fármaco de riesgo.",
      "Anti-histona y anti-ADN.",
      "Suspender el fármaco.",
      "Tratamiento sintomático.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Lupus inducido por fármacos.", "Vaglio A et al. — Drug-induced lupus: traditional and new concepts (Autoimmun Rev)."],
    pearls: ["Anti-histona positivo, anti-ADN negativo.", "Varón mayor con hidralazina o procainamida.", "Se cura sacando el fármaco."],
    pitfalls: ["Inmunosuprimir.", "Seguir con el fármaco."],
    tribunal: [
      qa("¿Qué diferencia el lupus inducido del sistémico?", "El inducido tiene anti-histona positivos, anti-ADN y complemento normales, rara vez afecta riñón o sistema nervioso y remite al suspender el fármaco."),
      qa("¿Qué fármacos lo causan con más frecuencia?", "Hidralazina, procainamida, isoniazida, minociclina, quinidina y los anti-TNF."),
      qa("¿Qué es un acetilador lento?", "Una persona con menor actividad de la N-acetiltransferasa, que acumula hidralazina o isoniazida y tiene más riesgo de lupus inducido."),
    ],
  },
};
