import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sifilisSecundariaMujer: ClinicalCase = {
  id: "sifilis-secundaria-mujer",
  level: 2,
  area: "Infectología",
  setting: "CAPS",
  patient: { age: 23, ageUnit: "años", sex: "F", context: "Moza en un bar. Pareja nueva hace 4 meses. Usa implante subdérmico." },
  frequency: "frecuente",
  intro: "“Me salieron manchas en las palmas y en las plantas, y se me cae el pelo a mechones.”",
  vitals: { TA: "112/70 mmHg", FC: "80 lpm", "T°": "37,4 °C" },
  anamnesis: [
    act("lesion-previa", "¿Tuvo una llaga en los genitales o la boca hace unas semanas?", "clave", "“Una heridita en la vulva que no dolía y se fue sola.”", "Chancro indoloro: sífilis primaria."),
    act("preservativo", "¿Usan preservativo?", "clave", "“No, como tengo el implante.”", "El implante no protege de ITS."),
    act("embarazo", "¿Puede estar embarazada?", "clave", "“No creo, tengo el implante.”", "Igual se pide beta: cambia todo."),
    act("sintomas", "¿Fiebre, dolor de garganta, cansancio?", "util", "“Cansancio y la garganta.”", "Síntomas generales del secundarismo."),
    act("alergia", "¿Es alérgica a la penicilina?", "clave", "“No.”", "Define el tratamiento."),
    act("bar", "¿Cómo se llama el bar?", "neutro", "“El Fortín.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Máculas y pápulas cobrizas no pruriginosas en palmas, plantas y tronco.", "Roséola y sifílides."),
    act("pelo", "Cuero cabelludo", "util", "Alopecia en claros 'apolillada'.", "Típica."),
    act("ganglios", "Ganglios y mucosas", "util", "Adenopatías generalizadas, placas mucosas en la lengua.", "Secundarismo."),
  ],
  studies: [
    study("Laboratorio", "vdrl", "VDRL cuantitativa", "clave", "Reactiva 1/64.", "Prueba no treponémica para diagnóstico y seguimiento."),
    study("Laboratorio", "treponemica", "Prueba treponémica (FTA-Abs o TP-PA)", "clave", "Reactiva.", "Confirma."),
    study("Laboratorio", "beta", "Subunidad beta", "clave", "Negativa.", "Siempre en mujeres en edad fértil."),
    study("Laboratorio", "its", "VIH, hepatitis B y C", "clave", "Negativos.", "Toda ITS obliga a buscar otras."),
    study("Otros", "puncion", "Punción lumbar de rutina", "innecesario", "No se hizo.", "Sin síntomas neurológicos ni oculares."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sifilis-2", "Sífilis secundaria", true, "Chancro previo, lesiones palmoplantares cobrizas, alopecia apolillada, placas mucosas, VDRL 1/64 y treponémica reactivas."),
      dx("pitiriasis", "Pitiriasis rosada", false, "Palmas y plantas, VDRL reactiva."),
      dx("farmacodermia", "Farmacodermia", false, "Sin fármacos y VDRL reactiva."),
      dx("vih-agudo", "VIH agudo", false, "VIH negativo."),
      dx("psoriasis", "Psoriasis", false, "Sin placas escamosas típicas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("penicilina", "Penicilina benzatínica 2.400.000 UI intramuscular, dosis única", "clave", "Tratamiento de la sífilis temprana."),
      mg("pareja", "Estudiar y tratar a la pareja (y contactos de los últimos 6 meses)", "clave", "Corta la cadena."),
      mg("preservativo", "Consejería sobre preservativo", "clave", "Prevención."),
      mg("vdrl-control", "VDRL a los 3, 6 y 12 meses", "clave", "Debe bajar 4 veces (2 diluciones)."),
      mg("jarisch", "Avisar sobre la reacción de Jarisch-Herxheimer", "util", "Fiebre las primeras horas."),
      mg("notificar", "Notificación obligatoria", "util", "Vigilancia."),
      mg("amoxicilina", "Amoxicilina oral", "riesgoso", "No es tratamiento validado."),
    ],
  },
  debrief: {
    diagnosis: "Sífilis secundaria en una mujer de 23 años sin uso de preservativo, no embarazada.",
    pathologies: [
      { name: "Sífilis secundaria", role: "principal", why: "Diseminación hematógena del Treponema pallidum." },
      { name: "Riesgo de sífilis congénita futura", role: "asociada", why: "Mujer en edad fértil." },
      { name: "Pitiriasis rosada, farmacodermia", role: "diferencial", why: "Exantemas de tronco." },
    ],
    reasoning: [
      "Causa: Treponema pallidum por transmisión sexual.",
      "Mecanismo: tras el chancro, el treponema se disemina por sangre.",
      "Consecuencia: exantema, alopecia, adenopatías; sin tratamiento pasa a latencia.",
    ],
    epidemiology:
      "La sífilis está en aumento sostenido en Argentina desde hace más de una década, con tasas que se triplicaron, sobre todo en jóvenes de 15 a 24 años. Cada caso en mujeres en edad fértil es una oportunidad de prevenir sífilis congénita.",
    management: [
      "VDRL y treponémica.",
      "Penicilina benzatínica.",
      "Pareja y contactos.",
      "Seguimiento serológico.",
    ],
    sources: ["Ministerio de Salud de la Nación — Diagnóstico y tratamiento de la sífilis.", "CDC — Sexually Transmitted Infections Treatment Guidelines: Syphilis."],
    pearls: ["Palmas y plantas = sífilis.", "El implante no protege de ITS.", "Siempre pedí beta y VIH."],
    pitfalls: ["No tratar a la pareja.", "Usar otro antibiótico sin alergia."],
    tribunal: [
      qa("¿Qué es la reacción de Jarisch-Herxheimer?", "Fiebre, escalofríos y malestar en las primeras 24 horas del tratamiento por la liberación de antígenos del treponema muerto."),
      qa("¿Cómo se sigue la respuesta al tratamiento?", "Con VDRL cuantitativa: debe bajar 4 veces (dos diluciones) en 6–12 meses; la treponémica queda positiva de por vida."),
      qa("¿Qué es la sífilis latente?", "Infección sin síntomas con serología reactiva; temprana si tiene menos de un año, tardía si más."),
    ],
  },
};
