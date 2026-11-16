import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const migranaEmbarazo: ClinicalCase = {
  id: "migrana-embarazo",
  level: 2,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 30, ageUnit: "años", sex: "F", context: "Embarazo de 14 semanas. Migraña sin aura desde los 16 años. Dejó todo lo que tomaba al enterarse." },
  frequency: "frecuente",
  intro: "“Tengo una migraña igual a las de siempre, hace 20 horas, y vomito. No sé qué puedo tomar.”",
  vitals: { TA: "112/70 mmHg", FC: "84 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("igual", "¿Es igual a sus migrañas de siempre?", "clave", "“Idéntica: de un lado, pulsátil, me molesta la luz.”", "Mismo patrón: tranquiliza."),
    act("alarma", "¿Empezó de golpe, con fiebre, déficit, convulsión o la peor de su vida?", "clave", "“No, fue aumentando.”", "Sin banderas rojas."),
    act("presion", "¿Hinchazón o visión con lucecitas?", "clave", "“No.”", "A las 14 semanas la preeclampsia es improbable, pero hay que preguntar siempre."),
    act("toma", "¿Qué tomó?", "util", "“Nada, por miedo.”", "Hay opciones seguras."),
    act("frecuencia", "¿Cuántas por mes?", "util", "“Antes 4, ahora 2.”", "Suele mejorar en el segundo trimestre."),
    act("antojo", "¿Algún antojo?", "neutro", "“Mandarinas.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico y fondo de ojo", "clave", "Normal.", "Sin signos de causa secundaria."),
    act("hidratacion", "Hidratación", "util", "Mucosas algo secas.", "Vómitos."),
    act("ta-control", "Presión repetida", "util", "110/70.", "Normal."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Migraña típica sin banderas rojas.", "No requiere estudios."),
    study("Imágenes", "tac", "TC de cerebro", "innecesario", "No se pidió.", "Sin banderas rojas; además irradia."),
    study("Imágenes", "rmn", "Resonancia de cerebro", "innecesario", "No se pidió.", "Se reserva para cambios de patrón o alarma."),
    study("Laboratorio", "proteinuria", "Proteinuria", "util", "Negativa.", "Razonable descartarla."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("migrana", "Crisis de migraña sin aura en el embarazo (primer trimestre)", true, "Cefalea idéntica a sus migrañas, sin banderas rojas, examen y presión normales."),
      dx("preeclampsia", "Preeclampsia", false, "Menos de 20 semanas y presión normal."),
      dx("trombosis", "Trombosis venosa cerebral", false, "Patrón conocido, sin foco."),
      dx("hsa", "Hemorragia subaracnoidea", false, "No fue en trueno."),
      dx("status", "Estado migrañoso", false, "Menos de 72 horas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("paracetamol", "Paracetamol 1 g", "clave", "Primera línea en el embarazo."),
      mg("metoclopramida", "Metoclopramida endovenosa para las náuseas y el dolor", "clave", "Segura y eficaz."),
      mg("hidratacion", "Hidratación endovenosa", "clave", "Vómitos."),
      mg("bloqueo", "Bloqueo del nervio occipital mayor si no cede", "util", "Alternativa segura."),
      mg("triptanes", "Sumatriptán puntual si fallan las anteriores", "util", "Datos de seguridad tranquilizadores."),
      mg("ergotamina", "Ergotamina", "riesgoso", "Contraindicada: uterotónica."),
      mg("aines-3t", "AINE en el tercer trimestre", "riesgoso", "Cierre del ductus y oligoamnios; en esta etapa se evitan igual."),
    ],
  },
  debrief: {
    diagnosis: "Crisis de migraña sin aura en una embarazada de 14 semanas.",
    pathologies: [
      { name: "Migraña sin aura", role: "principal", why: "Cefalea primaria conocida." },
      { name: "Embarazo de primer trimestre", role: "asociada", why: "Condiciona el tratamiento." },
      { name: "Preeclampsia, trombosis venosa, HSA", role: "diferencial", why: "Cefaleas secundarias del embarazo." },
    ],
    reasoning: [
      "Causa: migraña previa con fluctuación hormonal del primer trimestre.",
      "Mecanismo: activación trigeminovascular.",
      "Consecuencia: crisis que suelen mejorar en el segundo y tercer trimestre.",
    ],
    epidemiology:
      "La migraña afecta al 15–20 % de las mujeres en edad fértil. Entre el 60 y el 80 % mejora durante el embarazo, sobre todo la migraña sin aura. Una cefalea nueva o distinta en el embarazo obliga a descartar causas secundarias.",
    management: [
      "Buscar banderas rojas.",
      "Paracetamol y metoclopramida.",
      "Evitar ergóticos.",
      "Medidas no farmacológicas.",
    ],
    sources: ["Sociedad Argentina de Neurología — Cefaleas en el embarazo.", "American Headache Society — Treatment of migraine during pregnancy."],
    pearls: ["Igual que siempre + sin alarma = migraña.", "Paracetamol + metoclopramida.", "Nunca ergotamina."],
    pitfalls: ["No tratar por miedo.", "Ergotamina."],
    tribunal: [
      qa("¿Qué banderas rojas tiene una cefalea en el embarazo?", "Inicio en trueno, cambio de patrón, déficit, convulsión, fiebre, hipertensión, alteraciones visuales o cefalea posparto."),
      qa("¿Por qué está contraindicada la ergotamina en el embarazo?", "Porque es uterotónica y vasoconstrictora: puede causar aborto e insuficiencia placentaria."),
      qa("¿Qué preventivo se puede usar si las crisis son muy frecuentes?", "Propranolol o amitriptilina en dosis bajas; se evitan valproato y topiramato."),
    ],
  },
};
