import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pitiriasisRosada: ClinicalCase = {
  id: "pitiriasis-rosada",
  level: 1,
  area: "Dermatología",
  setting: "Consultorio",
  patient: { age: 21, ageUnit: "años", sex: "F", context: "Estudiante de Arquitectura. Otoño. Tuvo un resfrío hace 3 semanas." },
  frequency: "frecuente",
  intro: "“Me salió una mancha grande en el pecho y a la semana un montón de manchitas en la espalda. Pican un poco.”",
  vitals: { TA: "112/70 mmHg", FC: "72 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("primera", "¿Cómo fue la primera mancha?", "clave", "“Una sola, ovalada y rosada en el pecho, más grande.”", "Placa heráldica."),
    act("despues", "¿Cómo aparecieron las demás?", "clave", "“Una semana después, muchas en la espalda y el abdomen.”", "Erupción secundaria."),
    act("sexual", "¿Relaciones sin preservativo, úlceras genitales?", "clave", "“Tengo pareja estable, no.”", "La sífilis secundaria es el diferencial obligado."),
    act("palmas", "¿Tiene manchas en las palmas o plantas?", "clave", "“No.”", "Las palmas y plantas orientan a sífilis."),
    act("farmacos", "¿Tomó medicamentos nuevos?", "util", "“No.”", "Farmacodermias."),
    act("embarazo", "¿Puede estar embarazada?", "util", "“No, uso anticonceptivos.”", "En el embarazo temprano se asocia a pérdidas."),
  ],
  exam: [
    act("heraldo", "Lesión inicial", "clave", "Placa ovalada de 4 cm, rosada, con collarete de escama hacia adentro.", "Placa heráldica."),
    act("tronco", "Tronco", "clave", "Múltiples máculas ovaladas siguiendo las líneas de clivaje 'en árbol de Navidad'.", "Distribución típica."),
    act("palmas-ex", "Palmas, plantas y mucosas", "util", "Normales.", "Hace menos probable sífilis."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Placa heráldica y erupción en árbol de Navidad.", "No requiere estudios."),
    study("Laboratorio", "vdrl", "VDRL", "util", "No reactiva.", "Razonable descartar sífilis secundaria."),
    study("Otros", "biopsia", "Biopsia de piel", "innecesario", "No se hizo.", "Solo si es atípica o prolongada."),
    study("Otros", "koh", "Examen micológico con KOH", "util", "Negativo.", "Descarta tiña si hay duda."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pitiriasis-rosada", "Pitiriasis rosada de Gibert", true, "Placa heráldica seguida a la semana de máculas ovaladas en árbol de Navidad, sin palmas ni plantas y VDRL no reactiva."),
      dx("sifilis", "Sífilis secundaria", false, "VDRL no reactiva y sin palmas ni plantas."),
      dx("tina", "Tiña corporal", false, "KOH negativo y lesiones múltiples con distribución típica."),
      dx("psoriasis-guttata", "Psoriasis en gotas", false, "Escamas gruesas, sin placa heráldica."),
      dx("farmacodermia", "Erupción por fármacos", false, "No tomó fármacos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("explicar", "Explicar que se cura sola en 6–8 semanas", "clave", "Autolimitada."),
      mg("prurito", "Emolientes y antihistamínico si pica", "clave", "Síntomas."),
      mg("hiperpigmentacion", "Avisar que puede dejar manchas transitorias", "util", "Sobre todo en pieles oscuras."),
      mg("control", "Control si dura más de 3 meses", "util", "Revisar el diagnóstico."),
      mg("corticoides-sistemicos", "Corticoides orales", "riesgoso", "Pueden prolongarla y no hacen falta."),
      mg("antifungico", "Antifúngico tópico", "innecesario", "No es una micosis."),
    ],
  },
  debrief: {
    diagnosis: "Pitiriasis rosada de Gibert, en una mujer de 21 años.",
    pathologies: [
      { name: "Pitiriasis rosada", role: "principal", why: "Exantema papuloescamoso autolimitado." },
      { name: "Sífilis secundaria", role: "diferencial", why: "Siempre a descartar." },
      { name: "Tiña corporal, psoriasis en gotas", role: "diferencial", why: "Otras lesiones escamosas." },
    ],
    reasoning: [
      "Causa: probablemente reactivación de herpesvirus 6 y 7.",
      "Mecanismo: reacción inmune cutánea tras la reactivación viral.",
      "Consecuencia: placa heráldica y erupción secundaria que se resuelve sola.",
    ],
    epidemiology:
      "Afecta sobre todo a personas de 10 a 35 años, más en primavera y otoño. Es levemente más frecuente en mujeres. Recurre en menos del 3 %. En el embarazo temprano se asocia a aborto.",
    management: [
      "Diagnóstico clínico.",
      "Descartar sífilis.",
      "Tratamiento sintomático.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Pitiriasis rosada.", "American Academy of Dermatology — Pityriasis rosea."],
    pearls: ["Placa heráldica.", "Árbol de Navidad.", "Pedí VDRL."],
    pitfalls: ["No pensar en sífilis.", "Corticoides sistémicos."],
    tribunal: [
      qa("¿Qué es la placa heráldica?", "La lesión inicial, más grande, ovalada y rosada con collarete de escama, que precede a la erupción generalizada."),
      qa("¿Por qué siempre hay que pensar en sífilis secundaria?", "Porque también da un exantema papuloescamoso de tronco; se distingue por palmas y plantas, adenopatías y VDRL."),
      qa("¿Cuál es la evolución natural?", "Se resuelve sola en 6 a 8 semanas, a veces con hiper o hipopigmentación transitoria."),
    ],
  },
};
