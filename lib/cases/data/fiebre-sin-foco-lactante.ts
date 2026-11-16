import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fiebreSinFocoLactante: ClinicalCase = {
  id: "fiebre-sin-foco-lactante",
  level: 3,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 5, ageUnit: "meses", sex: "F", context: "Vacunas completas para la edad. Sin antecedentes. Va a la guardería." },
  frequency: "muy-frecuente",
  intro: "El papá: “Tiene 39,6 desde ayer. No tiene mocos, ni tos, ni diarrea. Come un poco menos.”",
  vitals: { FC: "158 lpm", FR: "40 rpm", "SatO₂": "98 %", "T°": "39,4 °C", Peso: "7 kg" },
  anamnesis: [
    act("tiempo", "¿Desde cuándo la fiebre?", "clave", "“Hace 24 horas.”", "Fiebre sin foco de menos de 72 horas."),
    act("sintomas", "¿Mocos, tos, diarrea, vómitos, manchas?", "clave", "“Nada.”", "Sin foco clínico."),
    act("orina", "¿Cómo moja los pañales? ¿Huelen distinto?", "clave", "“Moja bien, huele fuerte.”", "La ITU es la infección bacteriana grave más frecuente en lactantes con fiebre sin foco."),
    act("vacunas", "¿Tiene las vacunas al día?", "clave", "“Sí, todas.”", "Con neumococo y Hib la bacteriemia oculta es rara."),
    act("estado", "¿Cómo está entre los picos de fiebre?", "clave", "“Cuando le baja, juega y se ríe.”", "Buen aspecto: bajo riesgo de enfermedad grave."),
    act("hermanos", "¿Alguien enfermo en casa?", "util", "“No.”", "Contactos."),
  ],
  exam: [
    act("aspecto", "Aspecto y triángulo de evaluación pediátrica", "clave", "Buen aspecto, reactiva, rosada.", "Sin aspecto tóxico."),
    act("foco", "Examen completo buscando foco (oídos, faringe, pulmones, piel, fontanela, articulaciones)", "clave", "Sin foco.", "Confirma fiebre sin foco."),
    act("meningeo", "Signos meníngeos y fontanela", "util", "Fontanela normotensa.", "Sin signos meníngeos (poco útiles a esta edad)."),
  ],
  studies: [
    study("Laboratorio", "orina", "Orina completa y urocultivo por sondaje o punción suprapúbica", "clave", "Leucocituria, nitritos positivos; urocultivo: E. coli más de 50.000 UFC/ml.", "Encontró el foco."),
    study("Laboratorio", "lab", "Hemograma, PCR o procalcitonina", "util", "Leucocitos 17.000, PCR 48 mg/l.", "Estratifica el riesgo."),
    study("Microbiología", "hemocultivo", "Hemocultivo", "util", "Negativo.", "Indicado según riesgo."),
    study("Microbiología", "bolsita", "Urocultivo por bolsita colectora", "riesgoso", "No se usó.", "Alta contaminación: da falsos positivos."),
    study("Otros", "puncion-lumbar", "Punción lumbar de rutina", "innecesario", "No se hizo.", "Lactante mayor de 3 meses con buen aspecto y foco urinario."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("itu-febril", "Fiebre sin foco aparente en un lactante, por infección urinaria febril", true, "Lactante de 5 meses con fiebre sin foco clínico, buen aspecto y orina patológica con urocultivo positivo por sondaje."),
      dx("viral", "Síndrome febril viral", false, "La orina explica la fiebre."),
      dx("bacteriemia", "Bacteriemia oculta", false, "Hemocultivo negativo y con foco urinario."),
      dx("meningitis", "Meningitis", false, "Buen aspecto y foco urinario."),
      dx("exantema-subito", "Exantema súbito", false, "La orina es patológica."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb-oral", "Antibiótico oral (cefalexina o amoxicilina-clavulánico) ajustado al antibiograma, 7–10 días", "clave", "Lactante mayor de 3 meses con buen aspecto y tolerancia oral."),
      mg("antitermico", "Paracetamol o ibuprofeno", "clave", "Confort."),
      mg("control", "Control en 48 horas", "clave", "Debe estar afebril."),
      mg("eco", "Ecografía renal y vesical", "util", "Recomendada en la primera ITU febril del lactante."),
      mg("internar", "Internar para antibiótico endovenoso", "innecesario", "Con buen aspecto y tolerancia oral no hace falta."),
      mg("sin-atb", "Esperar sin antibiótico a que sea viral", "riesgoso", "Riesgo de daño renal."),
    ],
  },
  debrief: {
    diagnosis: "Fiebre sin foco aparente por infección urinaria febril (pielonefritis) a E. coli, en una lactante de 5 meses con buen aspecto.",
    pathologies: [
      { name: "Infección urinaria febril", role: "principal", why: "Causa bacteriana más frecuente de fiebre sin foco en lactantes." },
      { name: "Fiebre sin foco", role: "asociada", why: "Forma de presentación." },
      { name: "Bacteriemia oculta, meningitis", role: "diferencial", why: "Infecciones bacterianas graves." },
    ],
    reasoning: [
      "Causa: ascenso de bacterias intestinales por la uretra.",
      "Mecanismo: en lactantes la pielonefritis da fiebre sin síntomas urinarios claros.",
      "Consecuencia: si no se trata, cicatrices renales.",
    ],
    epidemiology:
      "La fiebre sin foco es uno de los motivos de consulta más frecuentes en menores de 3 años. La ITU es la infección bacteriana grave más común en ellos: entre el 5 y el 7 % de los lactantes febriles sin foco, más en niñas y varones no circuncidados. Con las vacunas, la bacteriemia oculta es menor del 1 %.",
    management: [
      "Evaluar aspecto y edad.",
      "Orina por técnica estéril en todo lactante con fiebre sin foco.",
      "Laboratorio según riesgo.",
      "Tratar la causa.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Fiebre sin foco en menores de 3 años.", "AAP — Febrile infants 8 to 60 days old; UTI clinical practice guideline."],
    pearls: ["Fiebre sin foco en lactante: pedí orina.", "Nunca bolsita para cultivo.", "Buen aspecto + mayor de 3 meses: antibiótico oral."],
    pitfalls: ["Rotularla como viral sin orina.", "Cultivo por bolsita."],
    tribunal: [
      qa("¿Qué es la fiebre sin foco?", "Fiebre de menos de 72 horas en un menor de 3 años en el que la historia y el examen no encuentran la causa."),
      qa("¿Qué diferencia el manejo en menores de 3 meses?", "Mayor riesgo de infección bacteriana grave: requieren laboratorio, hemocultivo, orina y muchas veces punción lumbar e internación."),
      qa("¿Por qué no sirve el urocultivo por bolsita?", "Porque se contamina con la flora perineal y da hasta un 85 % de falsos positivos."),
    ],
  },
};
