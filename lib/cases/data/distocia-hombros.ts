import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const distociaHombros: ClinicalCase = {
  id: "distocia-hombros",
  level: 4,
  area: "Ginecología y obstetricia",
  setting: "Internación",
  patient: { age: 36, ageUnit: "años", sex: "F", context: "Embarazo de 40 semanas. Diabetes gestacional con insulina, obesidad. Peso fetal estimado 4.300 g." },
  frequency: "poco-frecuente",
  intro: "En la sala de partos: salió la cabeza, se retrajo contra el periné y el hombro no sale con la tracción suave.",
  vitals: { TA: "128/80 mmHg", FC: "108 lpm" },
  anamnesis: [
    act("tortuga", "¿Qué pasó con la cabeza fetal al salir?", "clave", "Se retrajo contra el periné (signo de la tortuga).", "Signo típico de distocia de hombros."),
    act("factores", "¿Qué factores de riesgo tenía?", "clave", "Diabetes gestacional, obesidad, macrosomía estimada, segundo período prolongado.", "Factores clásicos."),
    act("hora", "¿Cuánto tiempo pasó desde la salida de la cabeza?", "clave", "45 segundos.", "Cada minuto cuenta para la hipoxia fetal."),
    act("anteriores", "¿Partos previos?", "util", "Uno, de 3.900 g sin problemas.", "Antecedente de distocia aumenta el riesgo."),
    act("anestesia", "¿Tiene peridural?", "util", "Sí.", "Facilita maniobras."),
    act("musica", "¿Qué música eligió para el parto?", "neutro", "Una lista de rock nacional.", "No orienta."),
  ],
  exam: [
    act("cabeza", "Posición de la cabeza", "clave", "Cabeza fetal fuera, sin rotación externa, retraída.", "El hombro anterior está trabado detrás del pubis."),
    act("cordon", "Cordón alrededor del cuello", "util", "No hay circular.", "No es esa la causa."),
    act("perine", "Periné", "util", "Episiotomía previa no realizada.", "Puede ampliarse para maniobras internas."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico en el parto", "clave", "Cabeza fuera, hombros que no salen con tracción suave.", "No hay tiempo para estudios."),
    study("Imágenes", "eco-urgente", "Ecografía para ubicar el hombro", "riesgoso", "No se hizo.", "Pierde minutos críticos."),
    study("Laboratorio", "gases-cordon", "Gases de cordón después del nacimiento", "util", "pH 7,18.", "Evalúa la hipoxia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("distocia", "Distocia de hombros", true, "Signo de la tortuga y falla de la tracción suave para liberar los hombros, con macrosomía y diabetes."),
      dx("circular", "Circular de cordón ajustado", false, "No hay circular."),
      dx("desproporcion", "Desproporción cefalopélvica", false, "La cabeza ya salió."),
      dx("hidrocefalia", "Hidrocefalia fetal", false, "La cabeza salió y es el hombro lo que no pasa."),
      dx("inercia", "Inercia uterina", false, "El problema es mecánico en los hombros."),
    ],
  },
  management: {
    prompt: "¿Qué hacés?",
    options: [
      mg("ayuda", "Pedir ayuda, avisar a neonatología y anestesia y anotar la hora", "clave", "Primer paso del algoritmo."),
      mg("mcroberts", "Maniobra de McRoberts: hiperflexionar los muslos sobre el abdomen", "clave", "Resuelve cerca de la mitad."),
      mg("suprapubica", "Presión suprapúbica sobre el hombro anterior", "clave", "Asociada a McRoberts, más del 60 %."),
      mg("internas", "Si falla: maniobras internas (Rubin, Woods) o extraer el brazo posterior", "clave", "Siguientes pasos."),
      mg("no-pujar", "Indicar a la madre que deje de pujar durante las maniobras", "util", "Evita impactar más el hombro."),
      mg("fundica", "Presión en el fondo uterino", "riesgoso", "Impacta más el hombro y puede romper el útero."),
      mg("traccion-fuerte", "Tracción fuerte de la cabeza hacia abajo", "riesgoso", "Causa lesión del plexo braquial."),
    ],
  },
  debrief: {
    diagnosis: "Distocia de hombros en un parto de término con macrosomía y diabetes gestacional, en una mujer de 36 años.",
    pathologies: [
      { name: "Distocia de hombros", role: "principal", why: "Hombro anterior trabado detrás de la sínfisis." },
      { name: "Macrosomía por diabetes gestacional", role: "asociada", why: "Hombros más anchos que la cabeza." },
      { name: "Lesión del plexo braquial", role: "asociada", why: "Complicación neonatal a evitar." },
    ],
    reasoning: [
      "Causa: desproporción entre los hombros fetales y la pelvis, favorecida por macrosomía.",
      "Mecanismo: el hombro anterior se impacta detrás de la sínfisis púbica.",
      "Consecuencia: hipoxia fetal, lesión del plexo braquial, fractura de clavícula y hemorragia posparto o desgarros maternos.",
    ],
    epidemiology:
      "Complica entre el 0,2 y el 3 % de los partos vaginales. Aumenta con el peso fetal mayor de 4.000 g, la diabetes, la obesidad, el parto instrumental y la distocia previa. La mitad ocurre en recién nacidos de peso normal: no es completamente previsible.",
    management: [
      "Pedir ayuda y registrar tiempos.",
      "McRoberts y presión suprapúbica.",
      "Maniobras internas o brazo posterior.",
      "Nunca presión fúndica ni tracción excesiva.",
    ],
    sources: ["FASGO — Distocia de hombros.", "RCOG — Shoulder Dystocia (Green-top Guideline No. 42)."],
    pearls: ["Signo de la tortuga.", "McRoberts + suprapúbica primero.", "Nunca empujar el fondo."],
    pitfalls: ["Presión fúndica.", "Tracción fuerte de la cabeza."],
    tribunal: [
      qa("¿Qué es la maniobra de McRoberts?", "La hiperflexión de los muslos de la madre sobre el abdomen, que rota la sínfisis y aplana el promontorio."),
      qa("¿Qué lesión neonatal es la más típica de la distocia de hombros?", "La parálisis braquial superior de Erb-Duchenne (C5-C6), con el brazo en 'propina de mozo'."),
      qa("¿Por qué está prohibida la presión fúndica?", "Porque impacta más el hombro contra el pubis y aumenta el riesgo de lesión fetal y rotura uterina."),
    ],
  },
};
