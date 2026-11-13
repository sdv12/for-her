import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fisuraAnal: ClinicalCase = {
  id: "fisura-anal",
  level: 1,
  area: "Cirugía",
  setting: "Consultorio",
  patient: { age: 33, ageUnit: "años", sex: "F", context: "Puérpera de 2 meses. Constipada desde el embarazo." },
  frequency: "muy-frecuente",
  intro: "“Cada vez que voy de cuerpo siento como un vidrio cortándome, el dolor me dura una hora y veo sangre roja en el papel.”",
  vitals: { TA: "110/70 mmHg", FC: "78 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor y cuánto dura?", "clave", "“Cortante al evacuar y sigue un rato largo.”", "Dolor típico de fisura."),
    act("sangre", "¿Cómo es el sangrado?", "clave", "“Poquito, rojo, en el papel.”", "Sangrado distal."),
    act("habito", "¿Cómo son las deposiciones?", "clave", "“Duras, cada tres días.”", "Constipación: causa."),
    act("alarma", "¿Bajó de peso, diarrea, fiebre o úlceras en la boca?", "util", "“No.”", "Fisura atípica: Crohn."),
    act("lactancia", "¿Amamanta?", "util", "“Sí.”", "Elección de fármacos."),
    act("bebe", "¿Cómo se llama el bebé?", "neutro", "“Lola.”", "No orienta."),
  ],
  exam: [
    act("inspeccion", "Inspección anal separando suavemente los glúteos", "clave", "Fisura en la línea media posterior con colgajo centinela.", "Fisura anal."),
    act("tacto", "Tacto rectal", "clave", "Diferido por el dolor; esfínter hipertónico.", "Espasmo esfinteriano."),
    act("hemorroides", "Hemorroides", "util", "Sin trombosis.", "Diferencial."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma", "util", "Hb 12,1.", "Sangrado leve."),
    study("Otros", "anoscopia", "Anoscopia diferida si persiste", "util", "Sin otras lesiones.", "Completar el examen."),
    study("Imágenes", "colonoscopia", "Colonoscopia", "innecesario", "No se realizó.", "Joven sin alarma y con causa clara."),
    study("Otros", "tacto-forzado", "Tacto rectal forzado en la primera consulta", "riesgoso", "No se realizó.", "Dolor intenso y rechazo al seguimiento."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fisura", "Fisura anal crónica posterior por constipación", true, "Dolor cortante defecatorio prolongado, sangrado rojo escaso, fisura posterior con colgajo centinela."),
      dx("hemorroides", "Hemorroides internas", false, "No duelen así y se ve la fisura."),
      dx("absceso", "Absceso perianal", false, "Sin tumefacción ni fiebre."),
      dx("crohn", "Fisura por Crohn", false, "Posterior, típica, sin síntomas sistémicos."),
      dx("cancer", "Cáncer anal", false, "Lesión típica en joven."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("fibra", "Fibra, agua y ablandador de heces", "clave", "Tratar la causa."),
      mg("banos", "Baños de asiento tibios", "clave", "Relajan el esfínter."),
      mg("relajante", "Nitroglicerina o diltiazem tópico", "clave", "Esfinterotomía química."),
      mg("toxina", "Toxina botulínica o esfinterotomía si no cura en 8 semanas", "util", "Segundo escalón."),
      mg("dilatacion", "Dilatación anal forzada", "riesgoso", "Incontinencia."),
      mg("opioides", "Opioides para el dolor", "riesgoso", "Empeoran la constipación."),
    ],
  },
  debrief: {
    diagnosis: "Fisura anal crónica posterior por constipación, en mujer puérpera de 33 años.",
    pathologies: [
      { name: "Fisura anal", role: "principal", why: "Desgarro del anodermo." },
      { name: "Constipación posparto", role: "asociada", why: "Causa." },
      { name: "Hemorroides, Crohn", role: "diferencial", why: "Otras causas de dolor y sangrado." },
    ],
    reasoning: [
      "Causa: heces duras que desgarran el anodermo.",
      "Mecanismo: espasmo del esfínter interno que reduce el flujo sanguíneo en la línea media posterior.",
      "Consecuencia: isquemia que impide la cicatrización y la cronifica.",
    ],
    epidemiology:
      "La fisura anal es una de las causas más frecuentes de dolor anal. Es común en el posparto y en adultos jóvenes constipados. Las fisuras laterales o múltiples obligan a pensar en Crohn, VIH, sífilis o cáncer.",
    management: [
      "Inspección.",
      "Fibra y baños.",
      "Relajante tópico.",
      "Cirugía si no cura.",
    ],
    sources: ["Sociedad Argentina de Coloproctología — Fisura anal.", "ASCRS — Clinical Practice Guidelines for Anal Fissures."],
    pearls: ["Dolor cortante que dura después de evacuar.", "Línea media posterior.", "El espasmo perpetúa."],
    pitfalls: ["Tacto forzado.", "Dilatación forzada."],
    tribunal: [
      qa("¿Qué signos marcan una fisura crónica?", "Colgajo centinela, papila hipertrófica y fibras del esfínter visibles en el fondo."),
      qa("¿Qué efecto adverso tiene la nitroglicerina tópica?", "Cefalea, que muchas veces lleva a abandonar el tratamiento."),
      qa("¿Qué fisura obliga a estudiar?", "La lateral, múltiple o indolora, por Crohn, VIH, sífilis o cáncer."),
    ],
  },
};
