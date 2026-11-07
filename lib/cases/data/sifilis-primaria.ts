import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sifilisPrimaria: ClinicalCase = {
  id: "sifilis-primaria-joven",
  level: 1,
  area: "Infectología",
  setting: "CAPS",
  patient: { age: 19, ageUnit: "años", sex: "M", context: "Estudiante. Relaciones sin preservativo con varias parejas en el último tiempo." },
  frequency: "muy-frecuente",
  intro: "“Me salió una llaga en el pene hace una semana. No me duele, pero me asusté.”",
  vitals: { TA: "118/72 mmHg", FC: "72 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("relaciones", "¿Tuviste relaciones sin preservativo? ¿Con quién, cuándo?", "clave", "“Sí, con dos personas el último mes, varones y mujeres.”", "Antecedente sexual y contactos."),
    act("dolor", "¿Te duele la llaga?", "clave", "“No.”", "El chancro sifilítico es indoloro; el herpes y el chancroide duelen."),
    act("otros", "¿Secreción o ardor al orinar? ¿Fiebre o manchas?", "util", "“No.”", "Otras ITS o secundaria."),
    act("alergia", "¿Sos alérgico a la penicilina?", "clave", "“No.”", "Define el tratamiento."),
    act("testeo", "¿Te hiciste VIH alguna vez?", "util", "“Nunca.”", "Se ofrece a todos."),
    act("deporte", "¿Hacés deporte?", "neutro", "“Básquet.”", "No orienta."),
  ],
  exam: [
    act("chancro", "Examen genital", "clave", "Úlcera única de 1 cm en el surco balanoprepucial, de bordes limpios y base dura, indolora.", "Chancro típico."),
    act("ganglios", "Ganglios inguinales", "clave", "Adenopatía inguinal bilateral, dura, indolora.", "Típica."),
    act("piel", "Piel, palmas y plantas, boca", "util", "Sin lesiones.", "Sin secundarismo."),
  ],
  studies: [
    study("Laboratorio", "serologia", "VDRL y prueba treponémica (o test rápido)", "clave", "VDRL 1/16; treponémica positiva.", "Confirma. VDRL sirve para seguimiento."),
    study("Laboratorio", "its", "VIH, hepatitis B y C", "clave", "Negativas; sin inmunidad para hepatitis B.", "Se ofrecen, y se indica vacuna."),
    study("Microbiología", "pcr", "PCR para gonorrea y clamidia", "util", "Negativa.", "ITS asociadas frecuentes."),
    study("Otros", "biopsia", "Biopsia de la lesión", "innecesario", "No se realizó.", "No hace falta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("primaria", "Sífilis primaria", true, "Chancro indoloro de base dura, adenopatía inguinal indolora, y serología positiva."),
      dx("herpes", "Herpes genital", false, "Da vesículas múltiples y dolorosas."),
      dx("chancroide", "Chancroide", false, "La úlcera es dolorosa, sucia, y es muy poco frecuente."),
      dx("balanitis", "Balanitis candidiásica", false, "No forma úlcera única de base dura."),
      dx("secundaria", "Sífilis secundaria", false, "No hay exantema ni lesiones de palmas y plantas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("penicilina", "Penicilina G benzatínica 2,4 millones IM, dosis única", "clave", "Tratamiento de elección."),
      mg("parejas", "Estudiar y tratar a las parejas de los últimos 3 meses", "clave", "Corta la transmisión."),
      mg("prevencion", "Preservativo, vacuna de hepatitis B y VPH, y considerar PrEP", "clave", "Prevención."),
      mg("seguimiento", "VDRL a los 3, 6 y 12 meses, notificar", "clave", "Se espera una caída de 4 veces el título (dos diluciones)."),
      mg("jarisch", "Avisar sobre reacción de Jarisch-Herxheimer", "util", "Fiebre transitoria tras la penicilina."),
      mg("sin-tratar", "Esperar a que se cure sola", "riesgoso", "El chancro cura, pero la enfermedad sigue."),
    ],
  },
  debrief: {
    diagnosis: "Sífilis primaria en varón de 19 años, sin coinfección por VIH.",
    pathologies: [
      { name: "Sífilis primaria", role: "principal", why: "Infección por Treponema pallidum." },
      { name: "Otras ITS", role: "asociada", why: "Se buscan siempre." },
      { name: "Herpes, chancroide, balanitis", role: "diferencial", why: "Otras causas de úlcera genital." },
    ],
    reasoning: [
      "Causa: contacto sexual con T. pallidum.",
      "Mecanismo: la espiroqueta penetra por microlesiones y causa una úlcera en el sitio de inoculación a las 3 semanas.",
      "Consecuencia: si no se trata, sigue la sífilis secundaria, latente y terciaria, y se transmite.",
    ],
    epidemiology:
      "La sífilis aumenta en Argentina: las tasas se multiplicaron en la última década, sobre todo en jóvenes de 15 a 24 años. También crece la sífilis congénita. El test y el tratamiento son gratuitos en el sistema público y es de notificación obligatoria.",
    management: [
      "Serología: no treponémica y treponémica.",
      "Penicilina benzatínica.",
      "Parejas, otras ITS y vacunas.",
      "Seguimiento con VDRL.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de sífilis.", "Boletín sobre VIH y otras ITS en la Argentina."],
    pearls: ["Úlcera genital indolora con base dura: sífilis.", "VDRL para seguir, treponémica queda positiva.", "Testeá VIH."],
    pitfalls: ["No tratar a las parejas.", "Creer que se curó porque cerró."],
    tribunal: [
      qa("¿Cuáles son los estadios de la sífilis?", "Primaria (chancro), secundaria (exantema de palmas y plantas, condilomas planos), latente (sin síntomas), terciaria (gomas, cardiovascular, neurosífilis)."),
      qa("¿Qué es el fenómeno de prozona?", "Un resultado falso negativo de VDRL por exceso de anticuerpos; se resuelve diluyendo la muestra."),
      qa("¿Qué es la reacción de Jarisch-Herxheimer?", "Fiebre, escalofríos y malestar en las primeras 24 horas tras el tratamiento por liberación de antígenos; se maneja con antitérmicos."),
    ],
  },
};
