import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const abscesoPerianal: ClinicalCase = {
  id: "absceso-perianal",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 35, ageUnit: "años", sex: "M", context: "Diabético, mal control. Trabaja sentado todo el día (chofer)." },
  frequency: "frecuente",
  intro: "“Hace tres días tengo un bulto al lado del ano, cada vez más grande y caliente. No me puedo sentar del dolor y anoche tuve fiebre.”",
  vitals: { TA: "128/82 mmHg", FC: "102 lpm", "T°": "38,3 °C", Glucemia: "248 mg/dl" },
  anamnesis: [
    act("evolucion", "¿Cómo evolucionó el bulto?", "clave", "“Empezó como un granito y fue creciendo, ahora late.”", "Colección en evolución."),
    act("fiebre", "¿Tuviste fiebre o escalofríos?", "clave", "“Fiebre anoche.”", "Infección sistémica."),
    act("diabetes", "¿Cómo está tu diabetes?", "clave", "“Mal, no me controlo.”", "Riesgo de infecciones graves (gangrena de Fournier)."),
    act("intestinal", "¿Diarrea crónica, sangre o pérdida de peso?", "util", "“No.”", "Descarta enfermedad de Crohn."),
    act("previos", "¿Te pasó antes?", "util", "“No.”", "Primer episodio."),
    act("ruta", "¿Qué ruta hacés?", "neutro", "“Urbana.”", "No orienta."),
  ],
  exam: [
    act("perianal", "Inspección y palpación perianal", "clave", "Tumoración de 4 cm a la derecha del ano, roja, caliente, muy dolorosa y fluctuante.", "Absceso perianal."),
    act("extension", "Buscar extensión al periné, escroto y crepitación", "clave", "Sin extensión ni crepitación.", "Descarta Fournier."),
    act("tacto", "Tacto rectal suave si se tolera", "util", "Dolor en el lado derecho, sin masa interna.", "Descarta absceso más profundo."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, glucemia, función renal", "util", "Leucocitos 15.000.", "Infección."),
    study("Imágenes", "tc", "Tomografía de pelvis en un absceso superficial evidente", "innecesario", "No se realizó.", "Se reserva para abscesos profundos, sospecha de Fournier o inmunosupresión grave."),
    study("Microbiología", "cultivo", "Cultivo del pus en diabético", "util", "Flora mixta.", "Guía si requiere antibióticos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("absceso", "Absceso perianal en paciente diabético mal controlado", true, "Tumoración perianal roja, caliente, dolorosa y fluctuante con fiebre, sin extensión."),
      dx("hemorroide", "Trombosis hemorroidal", false, "No es fluctuante ni da fiebre."),
      dx("fournier", "Gangrena de Fournier", false, "Sin crepitación, necrosis ni extensión al periné."),
      dx("quiste-pilonidal", "Quiste pilonidal infectado", false, "Ese se ubica en el surco interglúteo, no al lado del ano."),
      dx("crohn", "Enfermedad de Crohn perianal", false, "Sin síntomas intestinales; igual se considera si recurre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("drenaje", "Drenaje quirúrgico", "clave", "El tratamiento del absceso es drenarlo."),
      mg("atb", "Antibióticos por ser diabético con fiebre o celulitis", "util", "Indicados en inmunosupresión, diabetes o celulitis extensa."),
      mg("glucemia", "Control de la glucemia", "clave", "Mejora la cicatrización y la respuesta."),
      mg("seguimiento", "Seguimiento por la posible fístula", "util", "Un tercio desarrolla fístula anal."),
      mg("atb-solo", "Solo antibióticos sin drenar", "riesgoso", "No resuelve la colección y puede extenderse."),
      mg("esperar-fluctue", "Esperar a que se abra solo", "riesgoso", "Riesgo de extensión y de Fournier en diabéticos."),
    ],
  },
  debrief: {
    diagnosis: "Absceso perianal derecho en varón diabético de 35 años con mal control metabólico.",
    pathologies: [
      { name: "Absceso perianal", role: "principal", why: "Infección de una glándula anal con colección." },
      { name: "Diabetes mal controlada", role: "asociada", why: "Factor de riesgo." },
      { name: "Hemorroides, Fournier, quiste pilonidal, Crohn", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: obstrucción e infección de una glándula anal (criptoglandular).",
      "Mecanismo: la infección se extiende por los espacios perianales y forma una colección.",
      "Consecuencia: dolor intenso, fiebre; si no se drena, extensión, fístula o fascitis necrotizante.",
    ],
    epidemiology:
      "El absceso perianal es una consulta frecuente en guardias de cirugía, más en varones de 20 a 40 años; diabetes, obesidad, inmunosupresión y enfermedad de Crohn son factores de riesgo. Alrededor de un tercio deja una fístula.",
    management: [
      "Diagnóstico clínico.",
      "Drenaje quirúrgico.",
      "Antibióticos en grupos de riesgo.",
      "Seguimiento por fístula.",
    ],
    sources: ["Sociedad Argentina de Coloproctología — Recomendaciones sobre absceso y fístula anal.", "Sociedad Argentina de Cirugía — Infecciones de partes blandas."],
    pearls: ["Absceso = drenar.", "Diabéticos: buscar Fournier.", "Seguir por fístula."],
    pitfalls: ["Solo antibióticos.", "Esperar."],
    tribunal: [
      qa("¿Qué es la gangrena de Fournier?", "Una fascitis necrotizante del periné y genitales, polimicrobiana, más en varones diabéticos, con dolor intenso, crepitación, necrosis y sepsis; requiere desbridamiento quirúrgico urgente y antibióticos."),
      qa("¿Qué es una fístula anal?", "Un trayecto entre el canal anal y la piel perianal, secuela frecuente de un absceso, con supuración crónica; se trata con cirugía según su relación con los esfínteres."),
      qa("¿Qué es el quiste pilonidal?", "Una infección de folículos y pelos en el surco interglúteo, frecuente en varones jóvenes velludos y sedentarios; el absceso se drena y la enfermedad crónica se opera."),
    ],
  },
};
