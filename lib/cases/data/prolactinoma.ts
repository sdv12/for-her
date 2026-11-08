import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const prolactinoma: ClinicalCase = {
  id: "prolactinoma",
  level: 2,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 28, ageUnit: "años", sex: "F", context: "Busca embarazo hace un año. No amamanta. Sin medicación crónica." },
  frequency: "frecuente",
  intro: "“Hace 8 meses no me viene y me sale leche de los pezones. También me duele la cabeza.”",
  vitals: { TA: "114/72 mmHg", FC: "72 lpm", "T°": "36,4 °C", Peso: "58 kg", Glucemia: "88 mg/dl" },
  anamnesis: [
    act("embarazo", "¿Hay posibilidad de embarazo?", "clave", "“Test negativo.”", "Primera causa de amenorrea."),
    act("farmacos", "¿Antipsicóticos, metoclopramida, antidepresivos?", "clave", "“No.”", "Causa común de hiperprolactinemia."),
    act("vision", "¿Cambios en la visión?", "clave", "“No, solo algo de dolor de cabeza.”", "Quiasma."),
    act("frio", "¿Frío, cansancio, constipación?", "util", "“No.”", "Hipotiroidismo."),
    act("libido", "¿Bajo deseo o sequedad?", "util", "“Sí.”", "Hipogonadismo."),
    act("ciudad", "¿Hace cuánto vivís acá?", "neutro", "“Hace dos años.”", "No orienta."),
  ],
  exam: [
    act("mamas", "Mamas", "clave", "Galactorrea bilateral, sin nódulos.", "Confirma."),
    act("campos", "Campos visuales por confrontación", "clave", "Normales.", "Sin compromiso quiasmático."),
    act("general", "Tiroides y signos de hiperandrogenismo", "util", "Normales.", "Otras causas."),
  ],
  studies: [
    study("Laboratorio", "prl", "Prolactina", "clave", "145 ng/ml.", "Sugiere prolactinoma."),
    study("Laboratorio", "lab", "Beta-hCG, TSH y función renal", "clave", "Normales.", "Descarta embarazo, hipotiroidismo y ERC."),
    study("Imágenes", "rmn", "RM de silla turca", "clave", "Microadenoma de 8 mm.", "Localiza."),
    study("Otros", "cirugia-primera", "Biopsia transesfenoidal de entrada", "riesgoso", "No se realizó.", "No corresponde."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("prolactinoma", "Hiperprolactinemia por microprolactinoma, con amenorrea e infertilidad", true, "Prolactina elevada y microadenoma, sin fármacos ni otras causas."),
      dx("embarazo", "Embarazo", false, "Test negativo."),
      dx("hipotiroidismo", "Hipotiroidismo primario", false, "TSH normal."),
      dx("sop", "SOP", false, "No hay hiperandrogenismo y prolactina muy alta."),
      dx("farmacos", "Hiperprolactinemia por fármacos", false, "No toma."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cabergolina", "Cabergolina", "clave", "Agonista dopaminérgico; reduce el tumor y restablece ciclos."),
      mg("embarazo-plan", "Planificar embarazo con seguimiento endocrinológico", "clave", "Busca embarazo."),
      mg("control", "Controlar prolactina y RM", "clave", "Respuesta."),
      mg("hueso", "Evaluar masa ósea si la amenorrea sigue", "util", "Hipoestrogenismo."),
      mg("cirugia", "Cirugía como primera opción", "riesgoso", "Reservada para resistencia."),
      mg("sin-tto", "No tratar porque no es maligno", "riesgoso", "Quiere embarazo y hay hipogonadismo."),
    ],
  },
  debrief: {
    diagnosis: "Microprolactinoma con hiperprolactinemia, amenorrea, galactorrea e infertilidad, en mujer de 28 años.",
    pathologies: [
      { name: "Prolactinoma", role: "principal", why: "Adenoma hipofisario funcionante más frecuente." },
      { name: "Hipogonadismo, infertilidad", role: "asociada", why: "Consecuencias." },
      { name: "Embarazo, fármacos, hipotiroidismo", role: "diferencial", why: "Otras causas de prolactina alta." },
    ],
    reasoning: [
      "Causa: adenoma de lactotropos.",
      "Mecanismo: la prolactina frena la GnRH.",
      "Consecuencia: amenorrea, galactorrea, infertilidad y osteopenia.",
    ],
    epidemiology:
      "Es el adenoma hipofisario funcionante más común y predomina en mujeres de 20 a 50 años. Antes de pensar en un tumor hay que excluir embarazo, fármacos, hipotiroidismo y enfermedad renal crónica. El tratamiento médico logra controlar la gran mayoría de los casos.",
    management: [
      "Excluir embarazo y otras causas.",
      "Prolactina y RM.",
      "Cabergolina.",
      "Seguimiento.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Hiperprolactinemia.", "Endocrine Society — Hyperprolactinemia Guideline."],
    pearls: ["Primero descartá embarazo.", "Cabergolina primero.", "Campos visuales."],
    pitfalls: ["No revisar los fármacos.", "Olvidar la TSH."],
    tribunal: [
      qa("¿Qué fármacos elevan la prolactina?", "Antipsicóticos, metoclopramida, domperidona, algunos antidepresivos y opioides."),
      qa("¿Qué defecto visual da un macroadenoma?", "Hemianopsia bitemporal por compresión del quiasma."),
      qa("¿Qué es el efecto gancho?", "Con prolactina muy alta, la saturación del ensayo da un valor falsamente bajo; se diluye la muestra."),
    ],
  },
};
