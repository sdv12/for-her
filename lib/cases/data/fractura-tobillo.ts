import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fracturaTobillo: ClinicalCase = {
  id: "fractura-tobillo-bimaleolar",
  level: 2,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 54, ageUnit: "años", sex: "F", context: "Diabética tipo 2. Se torció el pie bajando del colectivo." },
  frequency: "frecuente",
  intro: "“Pisé mal el escalón, sentí un crac y no puedo apoyar. El tobillo se hinchó enseguida.”",
  vitals: { TA: "138/84 mmHg", FC: "94 lpm", "T°": "36,5 °C", Glucemia: "168 mg/dl" },
  anamnesis: [
    act("mecanismo", "¿Cómo se dobló el pie?", "clave", "“Para afuera, con todo el peso.”", "Rotación externa."),
    act("apoyo", "¿Pudo dar cuatro pasos?", "clave", "“Ni uno.”", "Criterio de Ottawa."),
    act("sensibilidad", "¿Hormigueo o frialdad en el pie?", "clave", "“No.”", "Compromiso neurovascular."),
    act("diabetes", "¿Cómo controla la diabetes?", "util", "“Metformina, más o menos.”", "Cicatrización y neuropatía."),
    act("tabaco", "¿Fuma?", "util", "“No.”", "Consolidación."),
    act("trabajo", "¿A qué se dedica?", "neutro", "“Soy cocinera.”", "No orienta directamente."),
  ],
  exam: [
    act("ottawa", "Palpación de maléolos (borde posterior) y base del quinto metatarsiano", "clave", "Dolor en el borde posterior de ambos maléolos.", "Reglas de Ottawa positivas."),
    act("neurovascular", "Pulsos, relleno y sensibilidad", "clave", "Pulsos presentes, sensibilidad conservada.", "Sin compromiso."),
    act("piel", "Piel", "util", "Edema importante, sin flictenas ni herida.", "Fractura cerrada."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tobillo frente, perfil y mortaja", "clave", "Fractura bimaleolar con desplazamiento lateral del astrágalo.", "Inestable."),
    study("Imágenes", "rx-pierna", "Radiografía de pierna completa", "util", "Sin fractura de peroné proximal.", "Excluye Maisonneuve."),
    study("Laboratorio", "prequirurgico", "Laboratorio prequirúrgico y HbA1c", "util", "HbA1c 7,8 %.", "Riesgo quirúrgico."),
    study("Imágenes", "rm", "RM de tobillo urgente", "innecesario", "No se realizó.", "La radiografía alcanza."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("bimaleolar", "Fractura bimaleolar inestable de tobillo con subluxación del astrágalo", true, "Mecanismo rotacional, imposibilidad de apoyo, dolor en ambos maléolos y radiografía."),
      dx("esguince", "Esguince grave", false, "Hay fractura en la radiografía."),
      dx("maleolo-aislado", "Fractura aislada del maléolo externo estable", false, "Hay compromiso de ambos maléolos y la mortaja está abierta."),
      dx("aquiles", "Rotura del tendón de Aquiles", false, "Hay fractura."),
      dx("charcot", "Pie de Charcot", false, "Trauma agudo con fractura."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reduccion", "Reducción cerrada e inmovilización con valva", "clave", "Protege la piel y el paquete neurovascular."),
      mg("cirugia", "Reducción abierta y osteosíntesis cuando baje el edema", "clave", "Fractura inestable."),
      mg("elevacion", "Elevación, hielo y analgesia", "clave", "Edema."),
      mg("tromboprofilaxis", "Tromboprofilaxis según riesgo durante la inmovilización", "util", "Prevención de TVP."),
      mg("bota-y-alta", "Bota de yeso cerrada y alta sin control", "riesgoso", "Síndrome compartimental y mala consolidación."),
      mg("apoyo-temprano", "Indicar apoyo completo inmediato", "riesgoso", "Desplazamiento."),
    ],
  },
  debrief: {
    diagnosis: "Fractura bimaleolar inestable de tobillo con subluxación del astrágalo, en mujer diabética de 54 años.",
    pathologies: [
      { name: "Fractura bimaleolar", role: "principal", why: "Lesión inestable de la mortaja." },
      { name: "Diabetes", role: "asociada", why: "Mayor riesgo de complicaciones." },
      { name: "Esguince, Maisonneuve", role: "diferencial", why: "Otras lesiones del tobillo." },
    ],
    reasoning: [
      "Causa: rotación externa del pie con carga.",
      "Mecanismo: fractura de ambos maléolos que abre la mortaja.",
      "Consecuencia: inestabilidad y riesgo de artrosis si no se reduce.",
    ],
    epidemiology:
      "Las fracturas de tobillo son de las más frecuentes en guardia. Las reglas de Ottawa evitan radiografías innecesarias en esguinces. En diabéticos aumentan las complicaciones de la herida y la mala consolidación.",
    management: [
      "Ottawa.",
      "Radiografía.",
      "Reducción e inmovilización.",
      "Cirugía.",
    ],
    sources: ["Asociación Argentina de Ortopedia y Traumatología — Fracturas de tobillo.", "AO Foundation — Surgery Reference: Malleoli."],
    pearls: ["Reglas de Ottawa.", "Mortaja abierta: inestable.", "Palpá el peroné proximal."],
    pitfalls: ["Yeso cerrado con edema.", "Omitir Maisonneuve."],
    tribunal: [
      qa("¿Qué son las reglas de Ottawa del tobillo?", "Indican radiografía si hay dolor en el borde posterior de un maléolo o no puede dar cuatro pasos."),
      qa("¿Qué es la fractura de Maisonneuve?", "Fractura del peroné proximal con lesión de la sindesmosis y del lado medial del tobillo."),
      qa("¿Qué clasificación se usa?", "La de Weber, según la altura de la fractura del peroné respecto a la sindesmosis."),
    ],
  },
};
