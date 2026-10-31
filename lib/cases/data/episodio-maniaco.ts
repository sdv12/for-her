import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const episodioManiaco: ClinicalCase = {
  id: "episodio-maniaco-bipolar",
  level: 3,
  area: "Salud mental",
  setting: "Guardia",
  patient: { age: 24, ageUnit: "años", sex: "M", context: "Estudiante de ingeniería. Lo traen la madre y un amigo." },
  frequency: "poco-frecuente",
  intro: "“Hace diez días casi no duerme, habla sin parar, gastó todos los ahorros en equipos de música, dice que va a inventar una app que va a cambiar el mundo y hoy se peleó con la policía.” (relata la madre)",
  vitals: { TA: "138/84 mmHg", FC: "104 lpm", "T°": "36,8 °C", Glucemia: "96 mg/dl" },
  anamnesis: [
    act("sueno", "¿Cuánto duerme?", "clave", "“Dos o tres horas y dice que no está cansado.”", "La disminución de la necesidad de dormir (sin cansancio) es muy característica de la manía."),
    act("previos", "¿Tuvo episodios de tristeza profunda antes?", "clave", "“El año pasado estuvo meses en la cama, sin ganas de nada.”", "Un episodio depresivo previo y uno maníaco actual: trastorno bipolar tipo I."),
    act("sustancias", "¿Consumió cocaína, anfetaminas, alcohol u otras drogas?", "clave", "“Dice que no; los amigos tampoco lo vieron.”", "Los estimulantes producen cuadros parecidos y deben descartarse."),
    act("medicacion", "¿Toma algún medicamento, por ejemplo antidepresivos o corticoides?", "clave", "“El psiquiatra le dio sertralina hace dos meses por la depresión.”", "Los antidepresivos sin estabilizador pueden precipitar un viraje maníaco en bipolares."),
    act("familia", "¿Alguien de la familia tuvo algo parecido?", "util", "“Un tío estuvo internado varias veces.”", "El trastorno bipolar tiene fuerte carga hereditaria."),
    act("riesgo", "¿Dijo que quería hacerse daño o dañar a alguien? ¿Manejó?", "clave", "“Manejó a toda velocidad.”", "Las conductas de riesgo definen la gravedad y la indicación de internación."),
    act("musica", "¿Qué música escucha?", "neutro", "“Rock nacional.”", "No orienta."),
  ],
  exam: [
    act("mental", "Examen del estado mental", "clave", "Hiperactivo, discurso acelerado y difícil de interrumpir, fuga de ideas, ánimo eufórico e irritable, ideas de grandeza, sin alucinaciones, sin conciencia de enfermedad.", "Síndrome maníaco."),
    act("neuro", "Examen neurológico y físico", "clave", "Sin foco, sin signos de intoxicación (pupilas normales, sin temblor ni sudoración).", "Descarta causas orgánicas."),
    act("tiroides", "Tiroides", "util", "Normal.", "El hipertiroidismo puede dar síntomas parecidos."),
  ],
  studies: [
    study("Laboratorio", "toxicos", "Tóxicos en orina", "clave", "Negativos.", "Descarta inducción por estimulantes."),
    study("Laboratorio", "lab", "Hemograma, glucemia, ionograma, función renal, hepatograma, TSH", "clave", "Normales.", "Descartan causas orgánicas y son la base antes de iniciar litio o valproato."),
    study("Imágenes", "tc", "Tomografía de cerebro de rutina", "innecesario", "No se realizó.", "En un primer episodio típico en un joven sin signos neurológicos no está indicada de rutina."),
    study("Electrofisiología", "eeg", "Electroencefalograma", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("bipolar", "Episodio maníaco (trastorno bipolar tipo I), probablemente precipitado por antidepresivo", true, "Más de una semana de euforia e irritabilidad con menor necesidad de dormir, verborrea, fuga de ideas, grandiosidad y conductas de riesgo, con depresión previa, sin tóxicos."),
      dx("hipomania", "Episodio hipomaníaco", false, "Es más leve, dura al menos 4 días, sin deterioro grave ni necesidad de internación."),
      dx("cocaina", "Intoxicación por estimulantes", false, "Daría signos simpaticomiméticos y tóxicos positivos."),
      dx("esquizofrenia", "Primer episodio de esquizofrenia", false, "Predominan alucinaciones, delirios y desorganización sin la elevación del ánimo."),
      dx("hipertiroidismo", "Hipertiroidismo", false, "TSH normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internacion", "Internación por riesgo (conductas peligrosas, sin conciencia de enfermedad), según la Ley 26.657", "clave", "Hay riesgo cierto e inminente para sí y terceros."),
      mg("suspender", "Suspender la sertralina", "clave", "Los antidepresivos pueden mantener o empeorar la manía."),
      mg("estabilizador", "Estabilizador del ánimo (litio o valproato) y/o antipsicótico atípico", "clave", "Tratamiento del episodio maníaco agudo."),
      mg("familia", "Psicoeducación de la familia y seguimiento a largo plazo", "util", "El trastorno bipolar es crónico y la adherencia previene recaídas."),
      mg("bzd-solo", "Solo benzodiacepinas y alta", "riesgoso", "No trata la manía y lo deja en riesgo."),
      mg("mas-antidepresivo", "Aumentar la sertralina porque “estaba deprimido”", "riesgoso", "Empeora la manía."),
    ],
  },
  debrief: {
    diagnosis: "Episodio maníaco grave en trastorno bipolar tipo I, probablemente precipitado por antidepresivo sin estabilizador, en varón de 24 años.",
    pathologies: [
      { name: "Trastorno bipolar tipo I", role: "principal", why: "Episodio maníaco con depresión previa." },
      { name: "Intoxicación por estimulantes e hipertiroidismo", role: "diferencial", why: "Causas orgánicas a descartar." },
      { name: "Esquizofrenia", role: "diferencial", why: "Otra psicosis del adulto joven." },
    ],
    reasoning: [
      "Causa: trastorno con fuerte carga genética, con disparadores (antidepresivos, falta de sueño, estrés, sustancias).",
      "Mecanismo: alteración de la regulación de los circuitos del ánimo y de los ritmos circadianos.",
      "Consecuencia: episodios de manía (euforia o irritabilidad, menor sueño, aceleración, grandiosidad, conductas de riesgo) que alternan con depresiones.",
    ],
    epidemiology:
      "El trastorno bipolar afecta a alrededor del 1–2 % de la población. El tipo I es igual de frecuente en varones y mujeres; comienza en general entre los 15 y 25 años, y suele debutar con una depresión. Tiene alto riesgo de suicidio.",
    management: [
      "Descartar causas orgánicas y sustancias.",
      "Evaluar el riesgo y decidir la internación según la Ley 26.657.",
      "Suspender antidepresivos; estabilizadores y antipsicóticos atípicos.",
      "Tratamiento de mantenimiento, psicoeducación y seguimiento.",
    ],
    sources: ["Ministerio de Salud de la Nación — Lineamientos para la atención de la urgencia en salud mental.", "Asociación de Psiquiatras Argentinos — Guías de trastorno bipolar.", "Ley Nacional de Salud Mental 26.657."],
    pearls: ["Duerme poco y no está cansado: manía.", "Depresión + antidepresivo + viraje = pensar en bipolar.", "Litio: controlar niveles, función renal y tiroides."],
    pitfalls: ["Seguir con el antidepresivo.", "No descartar sustancias."],
    tribunal: [
      qa("¿Qué diferencia el trastorno bipolar tipo I del tipo II?", "Tipo I: al menos un episodio maníaco (con o sin depresiones). Tipo II: episodios hipomaníacos y al menos un episodio depresivo mayor, sin manía."),
      qa("¿Qué efectos adversos tiene el litio?", "Temblor, poliuria (diabetes insípida nefrogénica), hipotiroidismo, aumento de peso, alteración renal y toxicidad con niveles altos (vómitos, ataxia, confusión); es teratogénico (anomalía de Ebstein). Se controlan niveles séricos."),
      qa("¿Qué es el viraje maníaco?", "La aparición de un episodio maníaco o hipomaníaco durante el tratamiento con antidepresivos en una persona con trastorno bipolar; por eso no se usan antidepresivos sin estabilizador."),
    ],
  },
};
