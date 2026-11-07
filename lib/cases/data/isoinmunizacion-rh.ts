import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const isoinmunizacionRh: ClinicalCase = {
  id: "isoinmunizacion-rh",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 30, ageUnit: "años", sex: "F", context: "Tercer embarazo, 26 semanas. Grupo O Rh negativo. Tuvo un aborto y un parto sin controles en otra provincia." },
  frequency: "poco-frecuente",
  intro: "“Vengo a mi primer control. Mi hijo mayor nació amarillo y lo pusieron en luz. Nunca me dieron la vacuna de la que me hablaron.”",
  vitals: { TA: "112/70 mmHg", FC: "82 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("antid", "¿Te aplicaron gammaglobulina anti-D después del parto o del aborto?", "clave", "“Nunca.”", "Sin profilaxis, aumenta el riesgo de sensibilización."),
    act("hijo", "¿Cómo fue tu hijo anterior? ¿Ictericia, transfusión?", "clave", "“Amarillo a las pocas horas, con luminoterapia.”", "Sugiere enfermedad hemolítica previa."),
    act("pareja", "¿Sabés el grupo del padre? ¿Es el mismo padre?", "clave", "“Es Rh positivo, el mismo.”", "El feto puede ser Rh positivo."),
    act("movimientos", "¿Cómo se mueve el bebé?", "util", "“Bien.”", "Bienestar fetal."),
    act("transfusion", "¿Te transfundieron alguna vez?", "util", "“No.”", "Otra vía de sensibilización."),
    act("barrio", "¿De dónde sos?", "neutro", "“De Jujuy.”", "No orienta."),
  ],
  exam: [
    act("altura", "Altura uterina y líquido", "clave", "Altura mayor a la esperada.", "Polihidramnios sospechado: posible anemia fetal."),
    act("latidos", "Latidos fetales", "clave", "Normales.", "Vitalidad."),
    act("materno", "Examen materno general", "util", "Normal.", "No suele tener síntomas."),
  ],
  studies: [
    study("Laboratorio", "coombs", "Grupo, factor y Coombs indirecto con título", "clave", "Anti-D positivo, título 1/64.", "Está sensibilizada: un título de 1/16 o más requiere seguimiento."),
    study("Imágenes", "doppler", "Doppler de la arteria cerebral media fetal", "clave", "Pico sistólico de 1,7 múltiplos de la mediana.", "Más de 1,5 sugiere anemia fetal moderada a grave."),
    study("Imágenes", "eco", "Ecografía obstétrica", "clave", "Polihidramnios, sin hidrops.", "Busca signos de anemia."),
    study("Otros", "amnio", "Amniocentesis de rutina", "innecesario", "No se realizó.", "El Doppler la reemplazó y evita riesgos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("rh", "Isoinmunización Rh con probable anemia fetal", true, "Madre Rh negativa sensibilizada, Coombs indirecto positivo con título alto y Doppler elevado."),
      dx("abo", "Incompatibilidad ABO", false, "No suele afectar al feto y no da Coombs indirecto anti-D."),
      dx("parvovirus", "Infección por parvovirus B19", false, "Puede dar anemia fetal, pero aquí hay anti-D."),
      dx("poli", "Polihidramnios idiopático", false, "Hay causa."),
      dx("gestacional", "Diabetes gestacional", false, "No explica el Doppler alto ni los anticuerpos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("derivar", "Derivar a medicina fetal de alta complejidad", "clave", "Requiere seguimiento especializado."),
      mg("cordocentesis", "Cordocentesis y transfusión intrauterina si se confirma anemia", "clave", "Reduce la muerte fetal."),
      mg("maduracion", "Corticoides según edad gestacional y plan de parto programado", "clave", "Prepara para un eventual nacimiento."),
      mg("neonatologia", "Coordinar con neonatología", "util", "Posible exanguinotransfusión."),
      mg("antid-tarde", "Dar anti-D ahora, creyendo que revierte la sensibilización", "innecesario", "No sirve en mujeres ya sensibilizadas."),
      mg("seguimiento-simple", "Control habitual sin Doppler", "riesgoso", "Puede progresar a hidrops y muerte fetal."),
    ],
  },
  debrief: {
    diagnosis: "Isoinmunización Rh con probable anemia fetal por falta de profilaxis anti-D, en embarazo de 26 semanas.",
    pathologies: [
      { name: "Isoinmunización Rh", role: "principal", why: "Anticuerpos maternos contra el antígeno D fetal." },
      { name: "Enfermedad hemolítica fetal", role: "asociada", why: "Anemia y riesgo de hidrops." },
      { name: "Incompatibilidad ABO, parvovirus", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: exposición a glóbulos rojos Rh positivos en parto o aborto, sin profilaxis.",
      "Mecanismo: IgG anti-D cruzan la placenta y destruyen eritrocitos fetales.",
      "Consecuencia: anemia, polihidramnios, hidrops y kernicterus al nacer.",
    ],
    epidemiology:
      "Cerca del 10 al 15 % de la población es Rh negativa, con menor frecuencia en poblaciones originarias. La gammaglobulina anti-D, gratuita en el sistema público, redujo mucho la enfermedad, pero aún aparece por falta de controles o de profilaxis tras abortos y partos.",
    management: [
      "Grupo y Coombs a toda embarazada.",
      "Anti-D en no sensibilizadas a las 28 semanas y tras eventos.",
      "Doppler en sensibilizadas.",
      "Transfusión intrauterina y parto programado.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de prevención de la isoinmunización Rh.", "FASGO — Consenso de isoinmunización."],
    pearls: ["Coombs indirecto: en la madre. Directo: en el recién nacido.", "Doppler de cerebral media mayor de 1,5 MoM.", "Anti-D solo sirve antes de sensibilizarse."],
    pitfalls: ["No dar profilaxis tras un aborto.", "Creer que no importa el primer embarazo."],
    tribunal: [
      qa("¿Por qué el primer embarazo no suele afectarse?", "Porque la sensibilización suele ocurrir en el parto y la respuesta inicial es IgM, que no atraviesa la placenta. En el siguiente, la IgG sí."),
      qa("¿Cuándo se administra anti-D?", "A las 28 semanas, dentro de las 72 horas posparto si el recién nacido es Rh positivo, y tras aborto, ectópico, sangrado o procedimientos invasivos."),
      qa("¿Qué es el hidrops fetal?", "Acumulación de líquido en al menos dos compartimentos fetales, por anemia grave con falla cardíaca."),
    ],
  },
};
