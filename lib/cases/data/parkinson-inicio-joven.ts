import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const parkinsonInicioJoven: ClinicalCase = {
  id: "parkinson-inicio-joven",
  level: 2,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 46, ageUnit: "años", sex: "F", context: "Profesora de piano. Notó cambios en la escritura hace un año." },
  frequency: "poco-frecuente",
  intro: "“Me tiembla la mano derecha cuando la apoyo, toco el piano más lento y mi letra se volvió chiquita.”",
  vitals: { TA: "118/74 mmHg", FC: "70 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("temblor", "¿Cuándo tiembla?", "clave", "“Cuando la mano está quieta en la falda.”", "Temblor de reposo."),
    act("lentitud", "¿Se siente más lenta?", "clave", "“Todo me cuesta más con la derecha.”", "Bradicinesia."),
    act("farmacos", "¿Toma metoclopramida, antipsicóticos o flunarizina?", "clave", "“No.”", "Parkinsonismo por fármacos."),
    act("olfato", "¿Perdió el olfato o mueve los brazos durmiendo?", "util", "“Hace años no siento olores.”", "Síntomas premotores."),
    act("familia", "¿Familia con Parkinson?", "util", "“Un tío.”", "Formas genéticas en jóvenes."),
    act("alumnos", "¿Cuántos alumnos tiene?", "neutro", "“Doce.”", "No orienta."),
  ],
  exam: [
    act("rigidez", "Tono muscular", "clave", "Rigidez en rueda dentada en el brazo derecho.", "Parkinsonismo."),
    act("bradicinesia", "Golpeteo de dedos", "clave", "Decremento de amplitud y velocidad a derecha.", "Bradicinesia."),
    act("marcha", "Marcha", "util", "Braceo disminuido a derecha.", "Asimetría."),
  ],
  studies: [
    study("Laboratorio", "cobre", "Ceruloplasmina y cobre urinario", "clave", "Normales.", "Descartar Wilson en menores de 50."),
    study("Imágenes", "rm", "RM de cerebro", "util", "Normal.", "Excluye lesiones estructurales."),
    study("Laboratorio", "tsh", "TSH", "util", "Normal.", "Excluye causas tratables."),
    study("Imágenes", "pet", "PET con FDG de rutina", "innecesario", "No se realizó.", "El diagnóstico es clínico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("parkinson-joven", "Enfermedad de Parkinson de inicio temprano", true, "Temblor de reposo, rigidez y bradicinesia asimétricas, hiposmia, sin fármacos y con Wilson descartado."),
      dx("esencial", "Temblor esencial", false, "Es de reposo con rigidez y bradicinesia."),
      dx("wilson", "Enfermedad de Wilson", false, "Ceruloplasmina normal."),
      dx("farmacos", "Parkinsonismo por fármacos", false, "No toma bloqueantes dopaminérgicos."),
      dx("distonia", "Distonía focal", false, "Hay temblor de reposo y bradicinesia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tratamiento", "Agonista dopaminérgico o levodopa según discapacidad", "clave", "Mejora síntomas."),
      mg("ejercicio", "Ejercicio y kinesiología", "clave", "Modifica la evolución funcional."),
      mg("impulsos", "Advertir sobre trastornos del control de impulsos con agonistas", "clave", "Efecto adverso frecuente en jóvenes."),
      mg("genetica", "Asesoramiento genético", "util", "Inicio temprano y familiar."),
      mg("haloperidol", "Haloperidol si aparecen alucinaciones", "riesgoso", "Empeora el parkinsonismo."),
      mg("metoclopramida", "Metoclopramida para las náuseas del tratamiento", "riesgoso", "Bloquea dopamina."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de Parkinson de inicio temprano, de predominio derecho, en mujer de 46 años.",
    pathologies: [
      { name: "Enfermedad de Parkinson", role: "principal", why: "Pérdida de neuronas dopaminérgicas." },
      { name: "Síntomas no motores (hiposmia)", role: "asociada", why: "Fase premotora." },
      { name: "Wilson, temblor esencial", role: "diferencial", why: "Otros cuadros en jóvenes." },
    ],
    reasoning: [
      "Causa: degeneración de la sustancia negra, con más peso genético en jóvenes.",
      "Mecanismo: déficit de dopamina en el estriado.",
      "Consecuencia: bradicinesia, rigidez, temblor y, con los años, fluctuaciones.",
    ],
    epidemiology:
      "Alrededor del 5 al 10 % de los Parkinson empieza antes de los 50. En jóvenes la progresión es más lenta, pero las discinesias aparecen antes. Siempre se descarta Wilson y parkinsonismo por fármacos.",
    management: [
      "Diagnóstico clínico.",
      "Descartar Wilson.",
      "Tratamiento según discapacidad.",
      "Ejercicio.",
    ],
    sources: ["Sociedad Neurológica Argentina — Enfermedad de Parkinson.", "MDS — Clinical Diagnostic Criteria for Parkinson's Disease."],
    pearls: ["Temblor de reposo asimétrico.", "Joven: descartá Wilson.", "Ojo con impulsos y agonistas."],
    pitfalls: ["Antidopaminérgicos.", "Rotular como esencial."],
    tribunal: [
      qa("¿Qué es la bradicinesia?", "Lentitud con disminución progresiva de amplitud y velocidad en movimientos repetidos."),
      qa("¿Qué antiemético se puede usar?", "Domperidona, que no atraviesa la barrera hematoencefálica."),
      qa("¿Qué síntomas premotores existen?", "Hiposmia, constipación, depresión y trastorno de conducta del sueño REM."),
    ],
  },
};
