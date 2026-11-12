import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const coquelucheAdulta: ClinicalCase = {
  id: "coqueluche-adulta-tos-prolongada",
  level: 2,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "Madre de un bebé de 1 mes. No se vacunó en el embarazo." },
  frequency: "frecuente",
  intro: "“Hace tres semanas tengo una tos en ataques que no para, a veces vomito después. Me dieron jarabes y nada.”",
  vitals: { TA: "116/72 mmHg", FC: "82 lpm", FR: "18 rpm", "T°": "36,6 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("tos", "¿Cómo es la tos?", "clave", "“Accesos, con vómito al final.”", "Paroxística."),
    act("bebe", "¿Vive con un bebé?", "clave", "“Mi hijo de un mes.”", "Riesgo grave."),
    act("vacuna", "¿Vacuna triple bacteriana en el embarazo?", "clave", "“No.”", "Prevención."),
    act("fiebre", "¿Fiebre?", "util", "“No.”", "No es neumonía."),
    act("evolucion", "¿Empezó como resfrío?", "util", "“Sí.”", "Fase catarral."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy docente.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Pulmón", "clave", "Normal entre accesos.", "Típico."),
    act("conjuntivas", "Ojos", "clave", "Hemorragia subconjuntival.", "Por la tos."),
    act("orl", "Garganta", "util", "Normal.", "Base."),
  ],
  studies: [
    study("Microbiología", "pcr", "PCR para Bordetella pertussis en hisopado nasofaríngeo", "clave", "Positiva.", "Confirma."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Normal.", "Excluye neumonía."),
    study("Otros", "bebe-evaluar", "Evaluar al bebé", "clave", "Sin síntomas aún.", "Riesgo."),
    study("Otros", "jarabes", "Más jarabes antitusivos", "riesgoso", "No se realizó.", "No sirven y demoran."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("coqueluche", "Coqueluche (tos convulsa) en adulta", true, "Tos paroxística con vómitos de 3 semanas y PCR positiva."),
      dx("asma", "Asma", false, "PCR positiva."),
      dx("postviral", "Tos posviral", false, "PCR positiva."),
      dx("erge", "Reflujo", false, "Paroxística y PCR."),
      dx("tbc", "Tuberculosis", false, "Sin síntomas generales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("azitro", "Azitromicina", "clave", "Reduce contagio."),
      mg("bebe-profilaxis", "Profilaxis con azitromicina al bebé y convivientes", "clave", "Protege al lactante."),
      mg("notificar", "Notificar", "clave", "Vigilancia."),
      mg("vacunas", "Vacunar a convivientes y al bebé en tiempo", "util", "Prevención."),
      mg("sin-atb", "No tratar porque ya pasaron semanas", "riesgoso", "Riesgo para el bebé."),
      mg("codeina", "Codeína para la tos", "riesgoso", "Riesgos y lactancia."),
    ],
  },
  debrief: {
    diagnosis: "Coqueluche en mujer de 34 años, conviviente con un lactante de 1 mes.",
    pathologies: [
      { name: "Coqueluche", role: "principal", why: "Infección por Bordetella pertussis." },
      { name: "Riesgo del lactante", role: "asociada", why: "Grave en menores de 6 meses." },
      { name: "Asma, tos posviral", role: "diferencial", why: "Otras toses." },
    ],
    reasoning: [
      "Causa: Bordetella pertussis.",
      "Mecanismo: toxinas que dañan el epitelio ciliado.",
      "Consecuencia: tos paroxística prolongada y contagio.",
    ],
    epidemiology:
      "Los adultos son la fuente principal de contagio de los lactantes, en quienes puede ser mortal. La vacuna triple bacteriana acelular en cada embarazo protege al bebé. En adultos suele confundirse con tos posviral.",
    management: [
      "Sospechar ante tos prolongada.",
      "PCR.",
      "Azitromicina y contactos.",
      "Vacunación.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de coqueluche.", "Sociedad Argentina de Pediatría — Coqueluche."],
    pearls: ["Tos en accesos con vómitos.", "Proteger al lactante.", "Vacuna en el embarazo."],
    pitfalls: ["Jarabes.", "No tratar contactos."],
    tribunal: [
      qa("¿Qué fases tiene la coqueluche?", "Catarral, paroxística y de convalecencia."),
      qa("¿Por qué es grave en lactantes?", "Por apneas, neumonía, hipertensión pulmonar e hiperleucocitosis."),
      qa("¿Cuándo se vacuna a la embarazada?", "Desde la semana 20, en cada embarazo."),
    ],
  },
};
