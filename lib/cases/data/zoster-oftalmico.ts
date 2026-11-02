import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const zosterOftalmico: ClinicalCase = {
  id: "herpes-zoster-oftalmico",
  level: 2,
  area: "Oftalmología",
  setting: "Guardia",
  patient: { age: 67, ageUnit: "años", sex: "M", context: "Diabético. Nunca recibió la vacuna contra el zoster." },
  frequency: "frecuente",
  intro: "“Hace tres días me ardía la frente del lado derecho y ahora me salieron ampollitas en la frente y la punta de la nariz. El ojo derecho está rojo y me molesta la luz.”",
  vitals: { TA: "138/84 mmHg", FC: "82 lpm", "T°": "37,4 °C", Glucemia: "198 mg/dl" },
  anamnesis: [
    act("vision", "¿Ves borroso? ¿Te duele el ojo?", "clave", "“Veo un poco borroso y me molesta mucho la luz.”", "Síntomas de compromiso ocular: urgencia oftalmológica."),
    act("prodromo", "¿Empezó con dolor o ardor antes de las ampollas?", "clave", "“Tres días de ardor.”", "Pródromo neurítico típico."),
    act("inmuno", "¿Tomás corticoides o tenés alguna enfermedad de las defensas?", "util", "“Solo diabetes.”", "Factor de riesgo."),
    act("contactos", "¿Hay embarazadas, bebés o inmunodeprimidos en tu casa?", "util", "“Mi nuera embarazada nos visita.”", "Las vesículas contagian varicela a susceptibles."),
    act("varicela", "¿Tuviste varicela de chico?", "util", "“Sí.”", "Reactivación del virus latente."),
    act("perro", "¿Tenés mascotas?", "neutro", "“Un perro.”", "No orienta."),
  ],
  exam: [
    act("hutchinson", "Piel de la nariz y la frente", "clave", "Vesículas sobre base eritematosa en la frente derecha y la punta de la nariz.", "Signo de Hutchinson: compromiso de la rama nasociliar, alto riesgo ocular."),
    act("ojo", "Ojo: agudeza, inyección, córnea con fluoresceína", "clave", "Inyección ciliar, lesiones dendriformes en la córnea, agudeza 6/10.", "Queratitis herpética: requiere oftalmología."),
    act("par-craneal", "Pares craneales", "util", "Normales.", "Descarta parálisis oculomotoras."),
  ],
  studies: [
    study("Otros", "lampara", "Evaluación oftalmológica con lámpara de hendidura y presión intraocular", "clave", "Queratitis y uveítis anterior leve, presión 24 mmHg.", "Define el tratamiento ocular."),
    study("Laboratorio", "glucemia", "Glucemia y HbA1c", "util", "HbA1c 8,6 %.", "Mal control."),
    study("Microbiología", "pcr", "PCR de las vesículas de rutina", "innecesario", "No se realizó.", "El diagnóstico es clínico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hzo", "Herpes zoster oftálmico con signo de Hutchinson, queratitis y uveítis anterior", true, "Vesículas en el territorio de V1 con compromiso de la punta nasal, ojo rojo con fotofobia, lesiones corneales y uveítis."),
      dx("celulitis", "Celulitis periorbitaria", false, "Hay vesículas en dermatoma y lesiones corneales."),
      dx("conjuntivitis", "Conjuntivitis viral", false, "No explica las vesículas en dermatoma ni la uveítis."),
      dx("herpes-simple", "Herpes simple", false, "No sigue un dermatoma con este pródromo; se diferencia por la clínica."),
      dx("glaucoma", "Glaucoma agudo", false, "La presión está levemente alta por la uveítis, no hay cierre angular."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antiviral", "Valaciclovir o aciclovir oral por 7–10 días de inmediato", "clave", "Reduce complicaciones oculares y la neuralgia, aun después de las 72 h si hay compromiso ocular."),
      mg("oftalmo", "Derivación urgente a oftalmología", "clave", "La queratitis y la uveítis requieren tratamiento específico y seguimiento."),
      mg("analgesia", "Analgesia adecuada", "clave", "Dolor intenso."),
      mg("aislamiento", "Cubrir las lesiones y evitar contacto con la embarazada hasta que formen costras", "util", "Puede contagiar varicela."),
      mg("vacuna", "Vacuna recombinante contra el zoster después del episodio", "util", "Previene recurrencias."),
      mg("corticoide-solo", "Colirio con corticoide sin antiviral ni oftalmólogo", "riesgoso", "Puede empeorar la queratitis viral."),
    ],
  },
  debrief: {
    diagnosis: "Herpes zoster oftálmico derecho con signo de Hutchinson, queratitis y uveítis anterior, en varón diabético de 67 años no vacunado.",
    pathologies: [
      { name: "Herpes zoster oftálmico", role: "principal", why: "Reactivación del VVZ en la rama oftálmica del trigémino." },
      { name: "Queratitis y uveítis herpética", role: "asociada", why: "Compromiso ocular." },
      { name: "Celulitis, conjuntivitis, herpes simple", role: "diferencial", why: "Otras causas de ojo rojo con lesiones." },
    ],
    reasoning: [
      "Causa: reactivación del virus varicela zoster latente en el ganglio de Gasser, con la edad o inmunosupresión.",
      "Mecanismo: el virus baja por la rama oftálmica (V1); si afecta la rama nasociliar (punta de la nariz), inerva también el globo ocular.",
      "Consecuencia: vesículas, dolor, queratitis, uveítis, glaucoma, pérdida visual y neuralgia posherpética.",
    ],
    epidemiology:
      "El herpes zoster afecta a una de cada tres personas en su vida, sobre todo después de los 50 años; el oftálmico es el 10–20 % de los casos. Sin tratamiento, la mitad desarrolla compromiso ocular.",
    management: [
      "Antiviral precoz.",
      "Evaluación oftalmológica urgente ante signo de Hutchinson o síntomas oculares.",
      "Analgesia y prevención de neuralgia.",
      "Vacunación en mayores de 50 o inmunosuprimidos.",
    ],
    sources: ["Consejo Argentino de Oftalmología — Recomendaciones sobre herpes zoster oftálmico.", "Sociedad Argentina de Infectología — Recomendaciones de vacunación contra zoster."],
    pearls: ["Vesículas en la punta de la nariz = riesgo ocular.", "Antiviral ya.", "Oftalmólogo urgente."],
    pitfalls: ["Corticoide tópico sin antiviral.", "No derivar a oftalmología."],
    tribunal: [
      qa("¿Qué es el signo de Hutchinson?", "Vesículas en la punta, el dorso o el ala de la nariz en un herpes zoster, por compromiso de la rama nasociliar del nervio oftálmico; predice compromiso ocular."),
      qa("¿Qué es la neuralgia posherpética?", "El dolor que persiste más de 90 días después del zoster en el dermatoma afectado; es más frecuente en mayores; se trata con gabapentinoides, antidepresivos tricíclicos o lidocaína tópica."),
      qa("¿Qué vacunas contra el zoster hay?", "La recombinante adyuvantada (2 dosis, inactivada, apta para inmunosuprimidos y muy eficaz) y la atenuada (ya casi en desuso, contraindicada en inmunosupresión)."),
    ],
  },
};
