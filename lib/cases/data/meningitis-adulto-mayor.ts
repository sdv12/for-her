import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const meningitisAdultoMayor: ClinicalCase = {
  id: "meningitis-neumococica-adulto-mayor",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 71, ageUnit: "años", sex: "M", context: "Diabético, alcohol diario. Tuvo otitis la semana pasada. Nunca recibió la vacuna antineumocócica." },
  frequency: "poco-frecuente",
  intro: "“Desde ayer tiene fiebre y dolor de cabeza; hoy está confundido, no nos reconoce y le molesta la luz.” (relata la hija)",
  vitals: { TA: "142/84 mmHg", FC: "118 lpm", FR: "22 rpm", "T°": "39,6 °C", "SatO₂": "95 %", Glucemia: "212 mg/dl", Glasgow: "11/15" },
  anamnesis: [
    act("inicio", "¿Cómo empezó y cuánto tiempo lleva?", "clave", "“Ayer fiebre y dolor de cabeza; hoy está así.”", "Evolución aguda: meningitis bacteriana."),
    act("foco", "¿Tuvo otitis, sinusitis o neumonía reciente? ¿Golpe de cabeza o cirugía?", "clave", "“Otitis la semana pasada.”", "Foco parameníngeo: neumococo."),
    act("alergia", "¿Es alérgico a algún antibiótico?", "clave", "“No.”", "Antes del tratamiento empírico."),
    act("convulsion", "¿Convulsionó?", "util", "“No.”", "Complicaciones."),
    act("inmuno", "¿Tiene alguna inmunosupresión?", "util", "“Diabetes y toma alcohol todos los días.”", "Mayor riesgo; en mayores de 50 se cubre también Listeria."),
    act("trabajo", "¿A qué se dedicaba?", "neutro", "“Ferroviario.”", "No orienta."),
  ],
  exam: [
    act("meningeo", "Rigidez de nuca, Kernig, Brudzinski", "clave", "Rigidez de nuca franca.", "Síndrome meníngeo."),
    act("neuro", "Foco neurológico y fondo de ojo", "clave", "Sin foco; fondo de ojo no evaluable.", "Con Glasgow bajo se hace TC antes de la punción, sin demorar el antibiótico."),
    act("piel", "Piel", "util", "Sin petequias.", "Menos probable meningococo."),
    act("oido", "Otoscopía", "util", "Otitis media derecha con otorrea.", "Foco."),
  ],
  studies: [
    study("Microbiología", "hemocultivos", "Hemocultivos antes del antibiótico", "clave", "Neumococo.", "Se toman en minutos sin retrasar el tratamiento."),
    study("Imágenes", "tc", "Tomografía de cerebro antes de la punción (por alteración de conciencia)", "util", "Sin lesiones ni edema.", "Permite punzar con seguridad."),
    study("Otros", "puncion", "Punción lumbar", "clave", "LCR turbio, 2.400 leucocitos con 90 % de neutrófilos, glucosa 18 mg/dl (glucemia 212), proteínas 320; diplococos gram positivos.", "Meningitis bacteriana por neumococo."),
    study("Otros", "esperar-tc", "Esperar la tomografía y la punción para dar el antibiótico", "riesgoso", "No se realizó.", "El antibiótico y la dexametasona van antes: cada hora de demora aumenta la mortalidad."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("meningitis", "Meningitis bacteriana aguda por neumococo con foco otógeno", true, "Fiebre, cefalea, confusión y rigidez de nuca tras otitis, con LCR purulento, glucorraquia muy baja y diplococos gram positivos."),
      dx("viral", "Meningitis viral", false, "El LCR es purulento con glucosa baja."),
      dx("encefalitis", "Encefalitis herpética", false, "LCR con neutrófilos y bacterias; sin foco temporal."),
      dx("delirium", "Delirium por infección urinaria", false, "Hay síndrome meníngeo y LCR patológico."),
      dx("hsa", "Hemorragia subaracnoidea", false, "Tomografía normal, fiebre y LCR purulento."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Ceftriaxona más vancomicina, más ampicilina por ser mayor de 50 años, de inmediato", "clave", "Cubre neumococo resistente y Listeria."),
      mg("dexametasona", "Dexametasona antes o con la primera dosis de antibiótico", "clave", "Reduce mortalidad y secuelas en la meningitis neumocócica."),
      mg("uti", "Terapia intensiva y control neurológico", "clave", "Riesgo de complicaciones."),
      mg("orl", "Evaluar el foco otológico con ORL", "util", "Control del foco."),
      mg("vacuna", "Vacuna antineumocócica después", "util", "Prevención."),
      mg("aciclovir-solo", "Solo aciclovir", "riesgoso", "No trata la meningitis bacteriana."),
    ],
  },
  debrief: {
    diagnosis: "Meningitis bacteriana aguda por neumococo de foco otógeno con bacteriemia, en varón de 71 años diabético y con consumo de alcohol, sin vacunación antineumocócica.",
    pathologies: [
      { name: "Meningitis neumocócica", role: "principal", why: "Infección purulenta de las meninges." },
      { name: "Otitis media", role: "asociada", why: "Foco de origen." },
      { name: "Meningitis viral, encefalitis, delirium, HSA", role: "diferencial", why: "Otras causas de fiebre y confusión." },
    ],
    reasoning: [
      "Causa: neumococo que llega a las meninges desde el oído o por la sangre.",
      "Mecanismo: inflamación purulenta del espacio subaracnoideo, edema cerebral y vasculitis.",
      "Consecuencia: cefalea, fiebre, rigidez, confusión; convulsiones, sordera, déficit y muerte.",
    ],
    epidemiology:
      "En adultos, el neumococo es la principal causa de meningitis bacteriana; los mayores de 65 años, diabéticos, alcohólicos e inmunodeprimidos tienen más riesgo y mayor mortalidad. La vacuna antineumocócica está indicada en el Calendario para mayores de 65 y adultos con factores de riesgo.",
    management: [
      "Hemocultivos y antibiótico con dexametasona sin demora.",
      "TC antes de la punción solo si hay indicación (alteración de conciencia, foco, convulsiones, inmunosupresión).",
      "Esquema empírico según edad.",
      "Terapia intensiva y control del foco.",
    ],
    sources: ["Sociedad Argentina de Infectología — Consenso de meningitis bacteriana.", "Calendario Nacional de Vacunación (vacuna antineumocócica en adultos)."],
    pearls: ["Antibiótico antes que la tomografía.", "Dexametasona con la primera dosis.", "Mayor de 50: sumar ampicilina."],
    pitfalls: ["Esperar estudios para tratar.", "Olvidar Listeria."],
    tribunal: [
      qa("¿Qué diferencia el LCR bacteriano del viral?", "Bacteriano: turbio, cientos a miles de leucocitos con predominio de neutrófilos, glucosa baja (menos del 40 % de la glucemia) y proteínas altas. Viral: claro, pocos leucocitos con linfocitos, glucosa normal y proteínas normales o algo altas."),
      qa("¿Cuál es el tratamiento empírico de la meningitis según la edad?", "Menores de 1 mes: ampicilina más cefotaxima o gentamicina. De 1 mes a 50 años: ceftriaxona más vancomicina. Mayores de 50 o inmunodeprimidos: ceftriaxona más vancomicina más ampicilina."),
      qa("¿Qué vacunas antineumocócicas reciben los adultos?", "Las conjugadas (13 o 20 valente) y la polisacárida 23 valente, según el esquema vigente, en mayores de 65 años y en adultos con factores de riesgo (diabetes, enfermedad cardíaca, pulmonar, renal o hepática, alcoholismo, tabaquismo, inmunosupresión)."),
    ],
  },
};
