import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const schonleinHenoch: ClinicalCase = {
  id: "purpura-schonlein-henoch",
  level: 2,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 6, ageUnit: "años", sex: "M", context: "Tuvo una infección de garganta hace dos semanas. Sin medicación." },
  frequency: "frecuente",
  intro: "“Le salieron manchitas rojas en las piernas y las nalgas. Le duelen los tobillos y la panza.”",
  vitals: { TA: "102/62 mmHg", FC: "96 lpm", FR: "22 rpm", "T°": "36,9 °C", Peso: "21 kg" },
  anamnesis: [
    act("antecedente", "¿Tuvo infección reciente?", "clave", "“Angina, dos semanas atrás.”", "Desencadenante."),
    act("abdominal", "¿Dolor de panza, sangre en materia fecal?", "clave", "“Dolor cólico; sin sangre.”", "Compromiso digestivo e invaginación."),
    act("orina", "¿Orina oscura o hinchazón?", "clave", "“No.”", "Nefritis."),
    act("sangrado", "¿Sangrado de encías o nariz?", "util", "“No.”", "Trastorno de coagulación."),
    act("vacunas", "¿Medicación nueva?", "util", "“No.”", "Fármacos."),
    act("dibujo", "¿Qué le gusta dibujar?", "neutro", "“Dinosaurios.”", "No orienta."),
  ],
  exam: [
    act("purpura", "Piel", "clave", "Púrpura palpable en miembros inferiores y nalgas.", "Clave."),
    act("articular", "Articulaciones", "clave", "Tobillos hinchados y dolorosos.", "Artritis."),
    act("abdomen", "Abdomen y testículos", "util", "Dolor difuso, sin masa; testículos normales.", "Complicaciones."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma y coagulograma", "clave", "Plaquetas normales.", "Púrpura no trombocitopénica."),
    study("Laboratorio", "orina", "Orina y función renal, presión", "clave", "Microhematuria leve.", "Nefritis."),
    study("Imágenes", "eco", "Ecografía abdominal si hay dolor intenso", "util", "Sin invaginación.", "Excluye."),
    study("Otros", "biopsia", "Biopsia renal de rutina", "innecesario", "No se realizó.", "Solo con proteinuria persistente o deterioro."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hsp", "Púrpura de Schönlein-Henoch (vasculitis por IgA)", true, "Púrpura palpable con plaquetas normales, artritis, dolor abdominal."),
      dx("pti", "PTI", false, "Plaquetas normales."),
      dx("meningococo", "Meningococcemia", false, "No tiene fiebre ni shock."),
      dx("leucemia", "Leucemia", false, "Hemograma normal."),
      dx("maltrato", "Maltrato", false, "El patrón es simétrico y palpable."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("soporte", "Hidratación, paracetamol o AINE con cuidado", "clave", "Suele resolverse sola."),
      mg("orina", "Control de orina y presión durante 6 meses", "clave", "Detecta nefritis tardía."),
      mg("alarma", "Pautas de alarma: dolor abdominal grave, sangre", "clave", "Invaginación."),
      mg("corticoide", "Corticoides si el dolor abdominal es grave", "util", "Alivia."),
      mg("plaquetas", "Transfundir plaquetas", "riesgoso", "Están normales."),
      mg("sin-seguir", "Alta sin control de orina", "riesgoso", "Puede perderse la nefritis."),
    ],
  },
  debrief: {
    diagnosis: "Púrpura de Schönlein-Henoch con artritis, dolor abdominal y microhematuria, en niño de 6 años.",
    pathologies: [
      { name: "Vasculitis por IgA", role: "principal", why: "Vasculitis más frecuente en niños." },
      { name: "Nefritis, invaginación", role: "asociada", why: "Complicaciones." },
      { name: "PTI, meningococcemia, leucemia", role: "diferencial", why: "Otras púrpuras." },
    ],
    reasoning: [
      "Causa: desencadenante infeccioso.",
      "Mecanismo: depósitos de IgA en vasos pequeños.",
      "Consecuencia: púrpura, artritis, dolor abdominal, nefritis.",
    ],
    epidemiology:
      "Es la vasculitis sistémica más frecuente en la infancia, con pico entre 3 y 15 años y predominio en otoño e invierno. Aunque suele autolimitarse, la nefritis es la causa principal de secuelas y puede aparecer varias semanas después.",
    management: [
      "Excluir causas graves.",
      "Controlar orina.",
      "Soporte.",
      "Corticoide selectivo.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Púrpura de Schönlein-Henoch.", "SHARE — European Initiative for IgA Vasculitis."],
    pearls: ["Púrpura palpable con plaquetas normales.", "Controlar orina.", "Invaginación ileoileal."],
    pitfalls: ["No seguir la orina.", "Pensar en PTI."],
    tribunal: [
      qa("¿Qué hallazgos definen la vasculitis por IgA?", "Púrpura palpable en presencia de al menos uno: dolor abdominal, artritis, IgA en biopsia o nefritis."),
      qa("¿Cómo diferenciás púrpura palpable de no palpable?", "La palpable sugiere vasculitis; la no palpable, plaquetas bajas o fragilidad vascular."),
      qa("¿Qué hacer ante fiebre con púrpura y mal estado general?", "Tratar como meningococcemia sin demoras, con ceftriaxona y reanimación."),
    ],
  },
};
