import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const epiAdolescente: ClinicalCase = {
  id: "epi-adolescente",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 18, ageUnit: "años", sex: "F", context: "Nueva pareja sexual, uso irregular de preservativo. Terminó la menstruación hace 4 días." },
  frequency: "muy-frecuente",
  intro: "“Me duele abajo de la panza de los dos lados hace tres días, tengo flujo feo y fiebre. Me duele con las relaciones.”",
  vitals: { TA: "110/70 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "38,4 °C", "SatO₂": "99 %" },
  anamnesis: [
    act("sexual", "¿Parejas nuevas? ¿Usás preservativo? ¿Tu pareja tiene síntomas?", "clave", "“Una nueva, casi sin preservativo, él sin síntomas.”", "Factor principal."),
    act("embarazo", "¿Fecha de última menstruación? ¿Podrías estar embarazada?", "clave", "“Hace 9 días.”", "Excluir embarazo ectópico."),
    act("urinario", "¿Ardor al orinar? ¿Vómitos? ¿Dolor a la derecha?", "clave", "“Algo de ardor, sin vómitos.”", "Diferenciales."),
    act("metodo", "¿Usás DIU?", "util", "“No.”", "Factor."),
    act("previo", "¿Infecciones previas?", "util", "“No.”", "Recurrencia."),
    act("estudios", "¿Qué estudiás?", "neutro", "“Enfermería.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor en ambas fosas ilíacas, sin peritonismo.", "Bilateral."),
    act("gineco", "Especuloscopía y tacto", "clave", "Flujo mucopurulento, dolor a la movilización cervical y en anexos.", "Criterios mínimos."),
    act("hipocondrio", "Hipocondrio derecho", "util", "Sin dolor.", "Sin Fitz-Hugh-Curtis."),
  ],
  studies: [
    study("Laboratorio", "hcg", "Beta-hCG", "clave", "Negativa.", "Excluye ectópico."),
    study("Microbiología", "nat", "PCR para gonococo y clamidia, y serologías de VIH, sífilis, hepatitis", "clave", "Clamidia positiva.", "Etiología y otras ITS."),
    study("Imágenes", "eco", "Ecografía transvaginal", "clave", "Sin absceso tuboovárico.", "Define la gravedad."),
    study("Otros", "laparoscopia", "Laparoscopía de entrada", "innecesario", "No se realizó.", "Solo con dudas o mala evolución."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("epi", "Enfermedad pelviana inflamatoria por clamidia", true, "Dolor pélvico, flujo, fiebre, y dolor a la movilización cervical."),
      dx("apendicitis", "Apendicitis", false, "Dolor bilateral, sin migración."),
      dx("ectopico", "Embarazo ectópico", false, "Beta-hCG negativa."),
      dx("torsion", "Torsión ovárica", false, "Es brusca y unilateral."),
      dx("itu", "Infección urinaria", false, "No explica el flujo ni los anexos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Ceftriaxona dosis única, doxiciclina 14 días y metronidazol", "clave", "Cubre gonococo, clamidia y anaerobios."),
      mg("pareja", "Tratar a las parejas de los últimos 60 días y abstinencia", "clave", "Evita reinfección."),
      mg("control", "Control a las 48 a 72 horas", "clave", "Debe mejorar."),
      mg("prevencion", "Preservativo, vacunas y método anticonceptivo", "util", "Prevención."),
      mg("internar-si", "Internar si hay absceso, embarazo, intolerancia oral o gravedad", "util", "Criterios."),
      mg("esperar", "No tratar hasta el resultado de cultivos", "riesgoso", "Riesgo de infertilidad."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad pelviana inflamatoria por Chlamydia trachomatis, sin absceso, en mujer de 18 años.",
    pathologies: [
      { name: "Enfermedad pelviana inflamatoria", role: "principal", why: "Infección ascendente." },
      { name: "Riesgo de infertilidad y ectópico", role: "asociada", why: "Secuelas." },
      { name: "Apendicitis, ectópico, torsión", role: "diferencial", why: "Abdomen agudo pelviano." },
    ],
    reasoning: [
      "Causa: clamidia y gonococo principalmente.",
      "Mecanismo: la infección asciende por el cuello al útero y a las trompas.",
      "Consecuencia: dolor, abscesos, adherencias, infertilidad.",
    ],
    epidemiology:
      "Es más frecuente en mujeres sexualmente activas menores de 25 años. La clamidia suele ser asintomática y deja secuelas tubarias. Conviene un umbral bajo para tratar empíricamente, porque cada episodio aumenta el riesgo de infertilidad y dolor crónico.",
    management: [
      "Beta-hCG primero.",
      "Tratamiento empírico.",
      "Ecografía si hay fiebre.",
      "Pareja y prevención.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de ITS.", "CDC — Sexually Transmitted Infections Treatment Guidelines."],
    pearls: ["Dolor a la movilización cervical con sexo reciente.", "Siempre beta-hCG.", "Tratá a la pareja."],
    pitfalls: ["Esperar el resultado.", "Omitir el resto de ITS."],
    tribunal: [
      qa("¿Qué es Fitz-Hugh-Curtis?", "Perihepatitis por EPI, con dolor en hipocondrio derecho y adherencias en cuerda de violín."),
      qa("¿Qué secuelas deja?", "Infertilidad, ectópico y dolor pelviano crónico."),
      qa("¿Qué indica el absceso tuboovárico?", "Internación, antibióticos EV y drenaje si no mejora o es grande."),
    ],
  },
};
