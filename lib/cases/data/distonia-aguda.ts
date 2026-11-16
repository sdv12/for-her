import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const distoniaAguda: ClinicalCase = {
  id: "distonia-aguda",
  level: 2,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 17, ageUnit: "años", sex: "F", context: "Ayer consultó por vómitos de una gastroenteritis y le dieron metoclopramida." },
  frequency: "frecuente",
  intro: "La mamá, asustada: “Se le tuerce el cuello y se le van los ojos para arriba. ¿Es un ACV?”",
  vitals: { TA: "118/74 mmHg", FC: "104 lpm", FR: "18 rpm", "T°": "36,8 °C", Glucemia: "96 mg/dl" },
  anamnesis: [
    act("farmaco", "¿Qué medicación recibió y cuándo?", "clave", "“Metoclopramida inyectable ayer y gotas hoy.”", "Antidopaminérgico: causa típica de distonía aguda."),
    act("conciencia", "¿Perdió el conocimiento en algún momento?", "clave", "“No, está consciente y asustada.”", "Conciencia conservada: no es una convulsión."),
    act("inicio", "¿Cuándo empezaron los movimientos?", "util", "“Hace una hora.”", "Primeras 48 horas."),
    act("fiebre-rigidez", "¿Fiebre alta, rigidez de todo el cuerpo, sudor?", "clave", "“No.”", "Descarta síndrome neuroléptico maligno."),
    act("drogas", "¿Consumió otras sustancias?", "util", "“No.”", "Diferencial."),
    act("serie", "¿Qué estaba haciendo?", "neutro", "“Mirando el celular.”", "No orienta."),
  ],
  exam: [
    act("distonia", "Examen motor", "clave", "Tortícolis, crisis oculógira y protrusión de la lengua, intermitentes y dolorosas.", "Distonía aguda."),
    act("neuro", "Resto del neurológico", "clave", "Fuerza y sensibilidad conservadas, sin foco.", "No es un ACV."),
    act("via-aerea", "Vía aérea", "util", "Habla, sin estridor.", "Descarta laringoespasmo."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico con prueba terapéutica", "clave", "Respuesta completa a la difenhidramina en 10 minutos.", "Confirma."),
    study("Imágenes", "tac", "TC de cerebro", "innecesario", "No se pidió.", "Cuadro típico con causa clara."),
    study("Electrofisiología", "eeg", "EEG urgente", "innecesario", "No se pidió.", "Consciente y con distonía clara."),
    study("Laboratorio", "cpk", "CPK", "util", "Normal.", "Descarta neuroléptico maligno."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("distonia-aguda", "Distonía aguda por metoclopramida", true, "Tortícolis, crisis oculógira y lengua protruida con conciencia conservada horas después de un antidopaminérgico, con respuesta a difenhidramina."),
      dx("convulsion", "Crisis epiléptica", false, "Conciencia conservada y movimientos sostenidos."),
      dx("snm", "Síndrome neuroléptico maligno", false, "Sin fiebre, rigidez generalizada ni CPK alta."),
      dx("conversivo", "Trastorno conversivo", false, "Hay un fármaco desencadenante y respuesta al anticolinérgico."),
      dx("tetanos", "Tétanos", false, "No hay trismus ni herida."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("difenhidramina", "Difenhidramina endovenosa o intramuscular", "clave", "Revierte en minutos."),
      mg("biperideno", "Biperideno como alternativa", "util", "Anticolinérgico."),
      mg("suspender", "Suspender la metoclopramida y anotarlo en la historia", "clave", "Evita recurrencia."),
      mg("oral-48", "Continuar un anticolinérgico oral 48–72 horas", "clave", "Previene la recaída mientras se elimina el fármaco."),
      mg("explicar", "Explicar que no es grave ni un ACV", "util", "Tranquiliza."),
      mg("haloperidol", "Haloperidol para la agitación", "riesgoso", "Empeora la distonía."),
      mg("diazepam-primero", "Diazepam como primera opción", "innecesario", "El anticolinérgico es el tratamiento de elección."),
    ],
  },
  debrief: {
    diagnosis: "Distonía aguda por metoclopramida, en una adolescente de 17 años.",
    pathologies: [
      { name: "Distonía aguda inducida por fármacos", role: "principal", why: "Bloqueo dopaminérgico en ganglios basales." },
      { name: "Gastroenteritis", role: "asociada", why: "Motivo de la metoclopramida." },
      { name: "Convulsión, síndrome neuroléptico maligno", role: "diferencial", why: "Otros cuadros motores agudos." },
    ],
    reasoning: [
      "Causa: bloqueo de receptores D2 por metoclopramida.",
      "Mecanismo: predominio colinérgico relativo en el estriado.",
      "Consecuencia: contracciones musculares sostenidas de cuello, ojos y lengua.",
    ],
    epidemiology:
      "Es más frecuente en jóvenes, sobre todo mujeres y menores de 30. La metoclopramida es la causa más común en guardia, seguida de antipsicóticos como el haloperidol. Aparece en las primeras 48 a 72 horas.",
    management: [
      "Reconocerla.",
      "Difenhidramina o biperideno.",
      "Suspender el fármaco.",
      "Anticolinérgico oral por unos días.",
    ],
    sources: ["Centro Nacional de Intoxicaciones (Hospital Posadas) — Reacciones extrapiramidales.", "ANMAT — Metoclopramida: restricción de uso."],
    pearls: ["Consciente con cuello torcido después de metoclopramida.", "Difenhidramina.", "Anotarlo como reacción adversa."],
    pitfalls: ["Pensar en ACV o convulsión.", "Dar haloperidol."],
    tribunal: [
      qa("¿Qué efectos extrapiramidales producen los antidopaminérgicos?", "Distonía aguda, acatisia, parkinsonismo y discinesia tardía, en ese orden temporal."),
      qa("¿Por qué la ANMAT restringió la metoclopramida en menores?", "Por el riesgo de reacciones extrapiramidales, más frecuentes en niños y jóvenes."),
      qa("¿Qué es la crisis oculógira?", "Una desviación sostenida e involuntaria de la mirada, típicamente hacia arriba, por distonía de los músculos oculares."),
    ],
  },
};
