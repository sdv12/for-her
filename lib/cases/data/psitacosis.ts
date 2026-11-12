import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const psitacosis: ClinicalCase = {
  id: "neumonia-psitacosis",
  level: 3,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 44, ageUnit: "años", sex: "M", context: "Cría y vende aves en una feria. Hace dos semanas murieron varios loros." },
  frequency: "poco-frecuente",
  intro: "“Tengo fiebre alta, un dolor de cabeza terrible, tos seca y me duele todo el cuerpo.”",
  vitals: { TA: "112/68 mmHg", FC: "86 lpm", FR: "24 rpm", "T°": "39,4 °C", "SatO₂": "91 %" },
  anamnesis: [
    act("aves", "¿Contacto con aves? ¿Se enfermaron?", "clave", "“Loros que murieron.”", "Exposición clave."),
    act("cefalea", "¿Cómo es la cefalea?", "clave", "“Muy intensa.”", "Típica."),
    act("atb", "¿Tomaste amoxicilina?", "clave", "“Sí, tres días, no mejoré.”", "No cubre."),
    act("otros", "¿Hay más enfermos?", "util", "“Mi socio.”", "Brote."),
    act("embarazo-pareja", "¿Convivientes embarazadas?", "util", "“No.”", "Riesgo."),
    act("feria", "¿Qué feria?", "neutro", "“Una de los domingos.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Pulmón", "clave", "Crepitantes escasos para la imagen.", "Disociación clínico-radiológica."),
    act("pulso", "Pulso con fiebre alta", "clave", "Bradicardia relativa.", "Atípica."),
    act("bazo", "Bazo y piel", "util", "Esplenomegalia leve.", "Sistémica."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Infiltrados intersticiales bilaterales.", "Neumonía."),
    study("Microbiología", "pcr", "PCR para Chlamydia psittaci en muestra respiratoria y serología pareada", "clave", "Positiva.", "Confirma."),
    study("Laboratorio", "lab", "Hepatograma, hemograma, función renal", "clave", "Transaminasas altas; leucocitos normales.", "Típico."),
    study("Otros", "puncion", "Punción lumbar de rutina por cefalea", "innecesario", "No se realizó.", "Sin signos meníngeos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("psitacosis", "Neumonía por Chlamydia psittaci (psitacosis)", true, "Aves enfermas, cefalea intensa, neumonía atípica y PCR positiva."),
      dx("neumococo", "Neumonía neumocócica", false, "Sin respuesta a amoxicilina; aves."),
      dx("influenza", "Influenza", false, "PCR positiva para psitacosis."),
      dx("hanta", "Hantavirus", false, "Exposición a aves, no a roedores."),
      dx("legionella", "Legionella", false, "Exposición a aves y PCR."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("doxi", "Doxiciclina", "clave", "Tratamiento de elección."),
      mg("internar", "Internar con oxígeno", "clave", "Hipoxemia."),
      mg("notificar", "Notificación y control de las aves con veterinaria", "clave", "Salud pública."),
      mg("contactos", "Evaluar contactos expuestos", "util", "Brote."),
      mg("amoxi", "Seguir con amoxicilina", "riesgoso", "No cubre."),
      mg("aves-libres", "Seguir vendiendo aves", "riesgoso", "Más contagios."),
    ],
  },
  debrief: {
    diagnosis: "Neumonía por Chlamydia psittaci adquirida por aves enfermas, en varón de 44 años.",
    pathologies: [
      { name: "Psitacosis", role: "principal", why: "Zoonosis respiratoria." },
      { name: "Hipoxemia y hepatitis", role: "asociada", why: "Compromiso sistémico." },
      { name: "Neumococo, influenza, Legionella", role: "diferencial", why: "Otras neumonías." },
    ],
    reasoning: [
      "Causa: inhalación de polvo de excrementos o plumas.",
      "Mecanismo: bacteria intracelular con diseminación.",
      "Consecuencia: neumonía atípica con compromiso sistémico.",
    ],
    epidemiology:
      "Es una zoonosis de notificación obligatoria en Argentina. En 2024 hubo un aumento de casos y muertes, sobre todo en Buenos Aires. Afecta a criadores, comerciantes y personas con aves de compañía. La pregunta por las aves es la clave del diagnóstico.",
    management: [
      "Preguntar por aves.",
      "PCR.",
      "Doxiciclina.",
      "Notificar.",
    ],
    sources: ["Ministerio de Salud de la Nación — Alerta epidemiológica de psitacosis.", "CDC — Psittacosis Clinical Overview."],
    pearls: ["Aves enfermas más neumonía: psitacosis.", "Cefalea intensa.", "Doxiciclina."],
    pitfalls: ["No preguntar.", "Amoxicilina."],
    tribunal: [
      qa("¿Qué zoonosis respiratorias hay en Argentina?", "Psitacosis, hantavirus, tuberculosis bovina, brucelosis y fiebre Q."),
      qa("¿Qué es la disociación clínico-radiológica?", "Hallazgos radiológicos más extensos que los del examen, típicos de neumonías atípicas."),
      qa("¿Qué antibiótico se usa en embarazadas?", "Un macrólido, como azitromicina, porque la doxiciclina está contraindicada."),
    ],
  },
};
