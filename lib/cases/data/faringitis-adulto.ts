import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const faringitisAdulto: ClinicalCase = {
  id: "faringitis-adulta-centor",
  level: 1,
  area: "Infectología",
  setting: "CAPS",
  patient: { age: 26, ageUnit: "años", sex: "F", context: "Maestra jardinera. Pide antibiótico porque 'siempre le dan'." },
  frequency: "muy-frecuente",
  intro: "“Me duele la garganta hace dos días, tengo moco, tos y un poco de fiebre. Quiero amoxicilina.”",
  vitals: { TA: "112/70 mmHg", FC: "88 lpm", "T°": "37,8 °C" },
  anamnesis: [
    act("tos", "¿Tenés tos y moco?", "clave", "“Sí, las dos cosas.”", "Sugiere viral."),
    act("fiebre", "¿Cuánta fiebre?", "clave", "“37,8.”", "Criterio Centor."),
    act("ganglios", "¿Bultos dolorosos en el cuello?", "clave", "“No.”", "Criterio Centor."),
    act("ojos", "¿Ojos rojos o aftas?", "util", "“Ojos un poco rojos.”", "Adenovirus."),
    act("alergia", "¿Alergia a la penicilina?", "util", "“No.”", "Base."),
    act("jardin", "¿Qué sala tenés?", "neutro", "“Sala de 3.”", "No orienta."),
  ],
  exam: [
    act("faringe", "Faringe", "clave", "Eritematosa sin exudado.", "Sin exudado."),
    act("cuello", "Adenopatías cervicales anteriores", "clave", "No dolorosas.", "Centor bajo."),
    act("ojos-ex", "Conjuntivas", "util", "Leve inyección.", "Viral."),
  ],
  studies: [
    study("Otros", "centor", "Puntaje de Centor/McIsaac", "clave", "1 punto.", "Bajo riesgo de estreptococo."),
    study("Laboratorio", "test-rapido", "Test rápido de estreptococo", "util", "No indicado con puntaje bajo.", "Usar con puntaje intermedio."),
    study("Laboratorio", "hemograma", "Hemograma", "innecesario", "No se realizó.", "No ayuda."),
    study("Otros", "atb-pedido", "Dar amoxicilina porque la pide", "riesgoso", "No se indicó.", "Resistencia y efectos adversos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("viral", "Faringitis viral (Centor bajo)", true, "Tos, rinorrea, conjuntivitis, sin exudado ni adenopatías dolorosas."),
      dx("estreptococica", "Faringitis estreptocócica", false, "Centor 1 con tos y rinorrea."),
      dx("mononucleosis", "Mononucleosis", false, "Sin adenopatías ni esplenomegalia."),
      dx("absceso", "Absceso periamigdalino", false, "Sin trismus ni abombamiento."),
      dx("gonococica", "Faringitis gonocócica", false, "Contexto viral."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sintomatico", "Analgésicos, líquidos y reposo", "clave", "Tratamiento."),
      mg("explicar", "Explicar por qué no necesita antibiótico", "clave", "Uso racional."),
      mg("pautas", "Volver si empeora, hay exudado o dura más de una semana", "clave", "Reevaluar."),
      mg("higiene", "Lavado de manos en el jardín", "util", "Contagio."),
      mg("amoxicilina", "Amoxicilina por si acaso", "riesgoso", "Sin beneficio."),
      mg("corticoides", "Corticoides de rutina", "riesgoso", "Sin indicación."),
    ],
  },
  debrief: {
    diagnosis: "Faringitis viral con Centor bajo, en mujer de 26 años.",
    pathologies: [
      { name: "Faringitis viral", role: "principal", why: "La más frecuente en adultos." },
      { name: "Presión por antibióticos", role: "asociada", why: "Uso inapropiado." },
      { name: "Estreptocócica, mononucleosis", role: "diferencial", why: "Otras faringitis." },
    ],
    reasoning: [
      "Causa: virus respiratorios (adenovirus, rinovirus).",
      "Mecanismo: inflamación de la mucosa faríngea con catarro.",
      "Consecuencia: cuadro autolimitado.",
    ],
    epidemiology:
      "En adultos solo 5 a 15 % de las faringitis son por estreptococo. La tos y la rinorrea sugieren virus. Las faringitis son una de las principales causas de prescripción innecesaria de antibióticos.",
    management: [
      "Centor.",
      "Test si corresponde.",
      "Sintomático.",
      "Explicar.",
    ],
    sources: ["Ministerio de Salud de la Nación — Uso racional de antimicrobianos.", "IDSA — Clinical Practice Guideline for Group A Streptococcal Pharyngitis."],
    pearls: ["Tos y moco: virus.", "Centor guía.", "No antibiótico por pedido."],
    pitfalls: ["Antibiótico de rutina.", "No explicar."],
    tribunal: [
      qa("¿Cuáles son los criterios de Centor?", "Fiebre, exudado amigdalino, adenopatías cervicales anteriores dolorosas y ausencia de tos."),
      qa("¿Cuándo se pide test rápido?", "Con puntaje de 2 o 3; con 4 se puede tratar o testear."),
      qa("¿Por qué se trata la estreptocócica?", "Para prevenir fiebre reumática, acortar síntomas y reducir contagio."),
    ],
  },
};
