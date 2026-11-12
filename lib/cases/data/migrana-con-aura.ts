import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const migranaConAura: ClinicalCase = {
  id: "migrana-con-aura-varon",
  level: 2,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 33, ageUnit: "años", sex: "M", context: "Programador. Duerme poco. Episodios similares desde la adolescencia." },
  frequency: "frecuente",
  intro: "“Primero veo luces en zigzag que se agrandan durante 20 minutos, después me agarra un dolor pulsátil en la mitad de la cabeza con náuseas.”",
  vitals: { TA: "128/80 mmHg", FC: "76 lpm", "T°": "36,5 °C", Glucemia: "92 mg/dl" },
  anamnesis: [
    act("aura", "¿Cómo es el aura y cuánto dura?", "clave", "“Luces en zigzag, 20 minutos, se van.”", "Aura típica."),
    act("alarma", "¿Es igual que siempre? ¿Debilidad o habla alterada?", "clave", "“Igual que siempre.”", "Sin alarma."),
    act("frecuencia", "¿Cuántas al mes? ¿Cuántos analgésicos?", "clave", "“Tres; tomo ibuprofeno.”", "Preventivo."),
    act("gatillos", "¿Qué la desencadena?", "util", "“Dormir poco y pantallas.”", "Gatillos."),
    act("cardio", "¿Fumás, presión, colesterol?", "util", "“No.”", "Triptanes."),
    act("lenguaje", "¿Qué lenguaje de programación usás?", "neutro", "“Python.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Normal.", "Primaria."),
    act("fondo", "Fondo de ojo", "clave", "Normal.", "Sin hipertensión endocraneana."),
    act("cuello", "Rigidez", "util", "Sin rigidez.", "Excluye meningitis."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Cumple criterios de migraña con aura.", "No requiere imágenes."),
    study("Otros", "diario", "Diario de cefalea", "util", "Patrón.", "Seguimiento."),
    study("Imágenes", "tc", "TC de rutina", "innecesario", "No se realizó.", "Cuadro típico sin alarma."),
    study("Otros", "opioides", "Opioides para el dolor", "riesgoso", "No se realizó.", "Cronifican la migraña."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("migrana", "Migraña con aura visual típica", true, "Aura reversible de 20 minutos seguida de cefalea pulsátil hemicraneal con náuseas; examen normal."),
      dx("ait", "AIT", false, "Síntomas positivos progresivos y antecedentes."),
      dx("hsa", "Hemorragia subaracnoidea", false, "No es en trueno."),
      dx("tensional", "Cefalea tensional", false, "Pulsátil con aura."),
      dx("convulsion", "Crisis occipital", false, "Aura típica migrañosa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aine-triptan", "AINE o triptán al comienzo del dolor", "clave", "Tratamiento agudo."),
      mg("habitos", "Sueño regular y manejo de gatillos", "clave", "Prevención."),
      mg("limite", "Limitar analgésicos a menos de 10 días por mes", "clave", "Evita cefalea por abuso."),
      mg("preventivo", "Preventivo si hay 4 o más crisis al mes", "util", "Frecuencia."),
      mg("opioides-mg", "Opioides", "riesgoso", "Cronifican."),
      mg("ergotamina-diaria", "Ergotamina diaria", "riesgoso", "Abuso y vasoconstricción."),
    ],
  },
  debrief: {
    diagnosis: "Migraña con aura visual típica, en varón de 33 años.",
    pathologies: [
      { name: "Migraña con aura", role: "principal", why: "Cefalea primaria." },
      { name: "Gatillos de sueño", role: "asociada", why: "Factores." },
      { name: "AIT, HSA", role: "diferencial", why: "Causas a excluir." },
    ],
    reasoning: [
      "Causa: predisposición genética.",
      "Mecanismo: depresión cortical propagada seguida de activación trigeminovascular.",
      "Consecuencia: aura reversible y cefalea.",
    ],
    epidemiology:
      "La migraña afecta a cerca del 12 % de la población y es tres veces más frecuente en mujeres. El aura aparece en un tercio. La migraña con aura se asocia a mayor riesgo de ACV, sobre todo con tabaco y estrógenos.",
    management: [
      "Clínica.",
      "Excluir alarma.",
      "Tratamiento agudo.",
      "Prevención.",
    ],
    sources: ["Sociedad Neurológica Argentina — Guía de migraña.", "International Headache Society — ICHD-3."],
    pearls: ["Aura positiva y reversible.", "Tratar temprano.", "Menos de 10 días de analgésicos."],
    pitfalls: ["Opioides.", "Pedir imágenes innecesarias."],
    tribunal: [
      qa("¿Cómo diferenciás aura de AIT?", "Aura: síntomas positivos que avanzan en minutos y revierten. AIT: síntomas negativos súbitos."),
      qa("¿Qué son las banderas rojas en cefalea?", "SNOOP: síntomas sistémicos, neurológicos, inicio súbito, mayor de 50 años y cambio de patrón."),
      qa("¿Qué preventivos hay?", "Propranolol, amitriptilina, topiramato, flunarizina y anticuerpos anti-CGRP."),
    ],
  },
};
