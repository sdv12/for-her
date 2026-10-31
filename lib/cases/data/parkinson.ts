import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const parkinson: ClinicalCase = {
  id: "enfermedad-de-parkinson",
  level: 2,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 68, ageUnit: "años", sex: "M", context: "Contador jubilado. Viene con la esposa." },
  frequency: "frecuente",
  intro: "“Hace un año me tiembla la mano derecha cuando estoy quieto. Mi señora dice que camino más lento y que la letra se me achicó.”",
  vitals: { TA: "132/80 mmHg", FC: "70 lpm", Peso: "74 kg" },
  anamnesis: [
    act("temblor", "¿El temblor aparece en reposo o al usar la mano?", "clave", "“Cuando la mano está quieta, por ejemplo mirando la tele. Al agarrar el vaso se me va.”", "Temblor de reposo que cede con la acción: típico del Parkinson (el esencial es de acción)."),
    act("lado", "¿Empezó de un lado?", "clave", "“Solo en la derecha.”", "El inicio asimétrico es característico de la enfermedad de Parkinson."),
    act("farmacos", "¿Toma medicación para el estómago, para dormir o psiquiátrica?", "clave", "“No, solo enalapril.”", "Antipsicóticos, metoclopramida y otros bloqueantes dopaminérgicos causan parkinsonismo farmacológico (simétrico, reversible)."),
    act("olfato", "¿Siente los olores?", "util", "“Hace años que casi no siento olores.”", "La hiposmia es un síntoma premotor frecuente."),
    act("sueno", "¿Su esposa nota que se mueve o grita soñando?", "util", "“Sí, a veces golpea en la cama.”", "El trastorno de conducta del sueño REM precede al Parkinson en muchos casos."),
    act("caidas", "¿Se cayó? ¿Se marea al pararse?", "clave", "“No me caí.”", "Caídas tempranas e hipotensión ortostática marcada orientan a parkinsonismos atípicos."),
    act("constipacion", "¿Está constipado? ¿Cómo está de ánimo?", "util", "“Constipado hace años, y algo desanimado.”", "Síntomas no motores frecuentes (constipación, depresión)."),
    act("futbol", "¿De qué cuadro es?", "neutro", "“De Estudiantes.”", "No orienta."),
  ],
  exam: [
    act("temblor-ex", "Observar el temblor", "clave", "Temblor de reposo en la mano derecha, de 4–6 Hz, “contar monedas”, que desaparece al moverla.", "Temblor parkinsoniano."),
    act("bradicinesia", "Golpeteo de dedos y movimientos alternantes", "clave", "Movimientos lentos y que disminuyen en amplitud a derecha.", "La bradicinesia es obligatoria para diagnosticar parkinsonismo."),
    act("rigidez", "Tono muscular", "clave", "Rigidez en rueda dentada en el miembro superior derecho.", "Rigidez extrapiramidal."),
    act("marcha", "Marcha", "util", "Pasos cortos, menor braceo a derecha, giro en bloque.", "Marcha parkinsoniana."),
    act("mirada", "Movimientos oculares y presión acostado y de pie", "util", "Mirada vertical normal; sin hipotensión ortostática.", "La parálisis de la mirada vertical o la disautonomía marcada orientan a parkinsonismos atípicos."),
  ],
  studies: [
    study("Imágenes", "rmn", "Resonancia de cerebro", "util", "Atrofia leve acorde a la edad, sin lesiones vasculares ni atrofia de tronco.", "Descarta causas estructurales y parkinsonismos atípicos; en el Parkinson es normal."),
    study("Laboratorio", "lab", "TSH, B12 y función renal", "util", "Normales.", "Descartan causas tratables de síntomas asociados."),
    study("Imágenes", "spect", "SPECT con transportador de dopamina de rutina", "innecesario", "No se realizó.", "El diagnóstico es clínico; se reserva para dudas con temblor esencial o parkinsonismo farmacológico."),
    study("Electrofisiología", "eeg", "Electroencefalograma", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("parkinson", "Enfermedad de Parkinson idiopática", true, "Bradicinesia con temblor de reposo y rigidez asimétricos, síntomas premotores (hiposmia, trastorno del sueño REM, constipación), sin fármacos ni signos atípicos."),
      dx("esencial", "Temblor esencial", false, "Temblor postural y de acción, bilateral, que mejora con alcohol, sin bradicinesia ni rigidez."),
      dx("farmacologico", "Parkinsonismo por fármacos", false, "Simétrico, con antecedente de antipsicóticos o metoclopramida; no los toma."),
      dx("vascular", "Parkinsonismo vascular", false, "Predomina en miembros inferiores, sin temblor, con lesiones vasculares en la resonancia."),
      dx("psp", "Parálisis supranuclear progresiva", false, "Caídas tempranas, parálisis de la mirada vertical, rigidez axial, poca respuesta a levodopa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("levodopa", "Iniciar levodopa/carbidopa (o un agonista dopaminérgico) según la discapacidad", "clave", "La levodopa es el fármaco más eficaz; se inicia cuando los síntomas afectan la vida diaria."),
      mg("ejercicio", "Actividad física regular y kinesiología", "clave", "Mejora la movilidad y la calidad de vida."),
      mg("no-motores", "Abordar los síntomas no motores (constipación, ánimo, sueño)", "clave", "Afectan tanto la calidad de vida como los motores."),
      mg("evitar", "Evitar metoclopramida y antipsicóticos típicos", "util", "Empeoran el parkinsonismo; si hace falta un antiemético, domperidona."),
      mg("haloperidol", "Haloperidol para el trastorno del sueño", "riesgoso", "Bloquea los receptores dopaminérgicos y empeora gravemente el Parkinson."),
      mg("propranolol", "Propranolol como tratamiento del temblor", "innecesario", "Es útil en el temblor esencial, no en el parkinsoniano."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de Parkinson idiopática de inicio asimétrico derecho, con síntomas no motores (hiposmia, trastorno del sueño REM, constipación, ánimo bajo).",
    pathologies: [
      { name: "Enfermedad de Parkinson", role: "principal", why: "Parkinsonismo asimétrico con temblor de reposo." },
      { name: "Temblor esencial", role: "diferencial", why: "El diferencial más frecuente del temblor." },
      { name: "Parkinsonismo farmacológico y atípicos", role: "diferencial", why: "Cambian el pronóstico y el tratamiento." },
    ],
    reasoning: [
      "Causa: degeneración de las neuronas dopaminérgicas de la sustancia negra compacta, con depósito de alfa-sinucleína (cuerpos de Lewy).",
      "Mecanismo: la falta de dopamina en el estriado altera el circuito de los ganglios basales y aumenta la inhibición del movimiento.",
      "Consecuencia: bradicinesia, rigidez y temblor de reposo, luego alteración de la marcha y la postura; el depósito en otras regiones explica síntomas no motores, que pueden aparecer años antes.",
    ],
    epidemiology:
      "Es la segunda enfermedad neurodegenerativa más frecuente después del Alzheimer. Afecta a cerca del 1 % de los mayores de 60 años, con inicio promedio a los 60 y es 1,5 veces más frecuente en varones.",
    management: [
      "Diagnóstico clínico: bradicinesia más temblor de reposo o rigidez; buscar signos atípicos y fármacos.",
      "Levodopa o agonistas dopaminérgicos según la edad y la discapacidad.",
      "Actividad física, kinesiología, fonoaudiología.",
      "Tratar síntomas no motores y evitar bloqueantes dopaminérgicos.",
      "En fases avanzadas: manejo de fluctuaciones y discinesias, cirugía en casos seleccionados.",
    ],
    sources: ["Sociedad Neurológica Argentina — Guía de diagnóstico y tratamiento de la enfermedad de Parkinson."],
    pearls: ["Temblor de reposo asimétrico = Parkinson.", "Sin bradicinesia no hay parkinsonismo.", "Nunca haloperidol ni metoclopramida."],
    pitfalls: ["Confundirlo con temblor esencial.", "No preguntar por fármacos que causan parkinsonismo."],
    tribunal: [
      qa("¿Cómo diferenciás el temblor parkinsoniano del esencial?", "Parkinsoniano: de reposo, asimétrico, de 4–6 Hz, con bradicinesia y rigidez. Esencial: postural y de acción, bilateral, puede afectar la cabeza y la voz, antecedentes familiares y mejora con alcohol."),
      qa("¿Qué complicaciones tiene la levodopa a largo plazo?", "Fluctuaciones motoras (deterioro de fin de dosis, fenómeno on-off), discinesias y, en algunos, alucinaciones o trastornos del control de impulsos (más con agonistas)."),
      qa("¿Qué signos sugieren un parkinsonismo atípico?", "Caídas tempranas, parálisis de la mirada vertical, disautonomía grave temprana, signos cerebelosos o piramidales, demencia temprana, síntomas simétricos y mala respuesta a levodopa."),
    ],
  },
};
