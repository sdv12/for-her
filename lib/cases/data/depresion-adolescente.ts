import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const depresionAdolescente: ClinicalCase = {
  id: "depresion-adolescente-varon",
  level: 3,
  area: "Salud mental",
  setting: "Consultorio",
  patient: { age: 15, ageUnit: "años", sex: "M", context: "Lo trae la mamá porque bajó las notas, dejó el fútbol y está irritable. Sus padres se separaron hace un año." },
  frequency: "frecuente",
  intro: "“No tengo ganas de nada, estoy todo el día en la pieza. Mis viejos dicen que estoy insoportable.”",
  vitals: { TA: "116/70 mmHg", FC: "72 lpm", "T°": "36,4 °C", Peso: "56 kg" },
  anamnesis: [
    act("entrevista-sola", "¿Podemos hablar a solas? Lo que me cuentes es confidencial salvo riesgo.", "clave", "“Bueno.”", "Confidencialidad."),
    act("animo", "¿Cuánto hace que te sentís así?", "clave", "“Unos cuatro meses, casi todos los días.”", "Duración."),
    act("suicidio", "¿Pensaste en matarte?", "clave", "“A veces pienso que sería mejor no estar. No tengo un plan.”", "Ideación pasiva."),
    act("consumo", "¿Alcohol o drogas?", "util", "“Fumo porro los fines de semana.”", "Comorbilidad."),
    act("bullying", "¿Problemas en la escuela o en redes?", "util", "“Me cargan por el grupo de WhatsApp.”", "Ciberacoso."),
    act("juego", "¿Qué te gustaba hacer?", "neutro", "“Jugar al fútbol.”", "Anhedonia."),
  ],
  exam: [
    act("mental", "Examen mental", "clave", "Afecto irritable y triste, sin psicosis.", "Depresión."),
    act("autolesiones", "Antebrazos", "clave", "Sin lesiones.", "Base."),
    act("fisico", "Examen físico", "util", "Normal.", "Excluye orgánico."),
  ],
  studies: [
    study("Otros", "phq-a", "PHQ-9 adaptado para adolescentes", "clave", "16 puntos.", "Moderada."),
    study("Otros", "riesgo", "Evaluación del riesgo suicida", "clave", "Ideación pasiva sin plan, red familiar presente.", "Riesgo bajo a moderado."),
    study("Laboratorio", "tsh", "TSH y hemograma", "util", "Normales.", "Descartar causas orgánicas."),
    study("Otros", "minimizar", "Atribuirlo a 'cosas de la edad'", "riesgoso", "No se hizo.", "Riesgo suicida no evaluado."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("depresion-adolescente", "Episodio depresivo moderado en adolescente con ideación suicida pasiva", true, "Ánimo triste e irritable por meses, anhedonia, caída del rendimiento, aislamiento e ideación pasiva."),
      dx("adolescencia-normal", "Cambios normales de la adolescencia", false, "Hay deterioro funcional y anhedonia persistente."),
      dx("tdah", "TDAH", false, "Inicio reciente y síntomas afectivos."),
      dx("consumo", "Trastorno por consumo de cannabis solo", false, "La depresión es el cuadro central."),
      dx("bipolar", "Trastorno bipolar", false, "Sin episodios de euforia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("psicoterapia", "Psicoterapia (TCC o interpersonal)", "clave", "Primera línea."),
      mg("seguridad", "Plan de seguridad con la familia y restringir medios", "clave", "Ideación suicida."),
      mg("fluoxetina", "Fluoxetina si no mejora con psicoterapia, con control estrecho", "util", "ISRS de elección en adolescentes."),
      mg("escuela", "Trabajar con la escuela el ciberacoso", "clave", "Factor."),
      mg("benzo", "Benzodiacepinas", "riesgoso", "Riesgo de abuso y desinhibición."),
      mg("contar-todo", "Contarle todo a los padres sin su acuerdo, salvo riesgo", "riesgoso", "Rompe la confianza."),
    ],
  },
  debrief: {
    diagnosis: "Episodio depresivo moderado con ideación suicida pasiva y ciberacoso, en adolescente de 15 años.",
    pathologies: [
      { name: "Depresión en la adolescencia", role: "principal", why: "Se presenta a menudo con irritabilidad." },
      { name: "Ciberacoso y consumo de cannabis", role: "asociada", why: "Factores." },
      { name: "Adolescencia normal, TDAH", role: "diferencial", why: "Confusiones." },
    ],
    reasoning: [
      "Causa: vulnerabilidad, separación de los padres y acoso.",
      "Mecanismo: alteración del ánimo con anhedonia e irritabilidad.",
      "Consecuencia: caída escolar, aislamiento y riesgo suicida.",
    ],
    epidemiology:
      "La depresión es frecuente en adolescentes y en varones suele expresarse como irritabilidad, conductas de riesgo y consumo. El suicidio es una de las principales causas de muerte en adolescentes en Argentina. Preguntar por suicidio no lo induce.",
    management: [
      "Entrevista a solas.",
      "Riesgo suicida.",
      "Psicoterapia.",
      "Familia y escuela.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Salud mental en la adolescencia.", "NICE — Depression in Children and Young People Guideline."],
    pearls: ["Irritabilidad puede ser depresión.", "Preguntá por suicidio.", "Confidencialidad con límites."],
    pitfalls: ["Cosas de la edad.", "Benzodiacepinas."],
    tribunal: [
      qa("¿Qué advertencia tienen los antidepresivos en adolescentes?", "Pueden aumentar la ideación suicida al inicio; requieren seguimiento cercano."),
      qa("¿Qué es el HEADSSS?", "Entrevista psicosocial adolescente: hogar, educación, actividades, drogas, sexualidad, suicidio y seguridad."),
      qa("¿Cuándo se rompe la confidencialidad?", "Ante riesgo para su vida o la de terceros, o situaciones de abuso."),
    ],
  },
};
