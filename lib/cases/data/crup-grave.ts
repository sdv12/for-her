import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const crupGrave: ClinicalCase = {
  id: "laringitis-grave-lactante",
  level: 2,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 11, ageUnit: "meses", sex: "F", context: "Mayo. Resfriada hace dos días. Vacunas completas." },
  frequency: "frecuente",
  intro: "“A la noche empezó con tos como de perro, ronca, y ahora hace un ruido fuerte al respirar aunque esté quieta. Está muy inquieta.” (relata la madre)",
  vitals: { FC: "168 lpm", FR: "52 rpm", "T°": "38,1 °C", "SatO₂": "93 %", Peso: "9 kg" },
  anamnesis: [
    act("estridor", "¿El ruido es solo cuando llora o también en reposo?", "clave", "“También quieta, dormida.”", "Estridor en reposo: laringitis moderada a grave."),
    act("prodromo", "¿Tuvo mocos antes?", "clave", "“Dos días de mocos y poca fiebre.”", "Pródromo viral típico (parainfluenza)."),
    act("babeo", "¿Babea, no puede tragar, está tóxica o con fiebre muy alta?", "clave", "“No babea, traga bien.”", "Descarta epiglotitis y absceso."),
    act("atragantamiento", "¿Se atragantó con algo?", "util", "“No.”", "Descarta cuerpo extraño."),
    act("previos", "¿Le pasó antes?", "util", "“No.”", "Primer episodio."),
    act("mascota", "¿Tienen mascotas?", "neutro", "“Un perro.”", "No orienta."),
  ],
  exam: [
    act("estridor-ex", "Estridor y tiraje", "clave", "Estridor inspiratorio en reposo, tiraje supraesternal e intercostal.", "Score de Westley moderado a grave."),
    act("conciencia", "Estado de conciencia y color", "clave", "Inquieta, sin cianosis.", "La agitación o somnolencia son signos de hipoxia."),
    act("garganta-no", "No examinar la garganta con baja lengua si hay dudas de epiglotitis", "util", "No se forzó el examen.", "Manipular puede precipitar una obstrucción."),
  ],
  studies: [
    study("Otros", "oximetria", "Oximetría", "clave", "93 %.", "Monitoreo."),
    study("Imágenes", "rx-cuello", "Radiografía de cuello de rutina", "innecesario", "No se realizó.", "El diagnóstico es clínico; la radiografía molesta y demora."),
    study("Laboratorio", "lab", "Laboratorio y gases", "riesgoso", "No se realizó.", "Las punciones agitan a la niña y pueden empeorar la obstrucción."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("crup", "Laringotraqueítis viral (crup) moderada a grave", true, "Tos perruna, disfonía y estridor en reposo con tiraje tras pródromo catarral, sin babeo ni aspecto tóxico."),
      dx("epiglotitis", "Epiglotitis", false, "Habría fiebre alta, babeo, posición en trípode, voz apagada y aspecto tóxico, sin tos perruna."),
      dx("cuerpo-extrano", "Cuerpo extraño", false, "Sin atragantamiento y con pródromo viral."),
      dx("traqueitis", "Traqueítis bacteriana", false, "Aspecto tóxico con secreciones purulentas que no responde a adrenalina."),
      dx("crup-leve", "Crup leve", false, "Hay estridor en reposo y tiraje."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("dexametasona", "Dexametasona oral o IM (0,15–0,6 mg/kg)", "clave", "Reduce la inflamación; efecto en horas."),
      mg("adrenalina", "Adrenalina nebulizada", "clave", "Efecto rápido en el crup moderado a grave."),
      mg("observar", "Observar 3–4 h después de la adrenalina por efecto rebote", "clave", "El efecto dura unas 2 h."),
      mg("calma", "Mantenerla en brazos de la madre, oxígeno si satura menos de 92 %", "util", "La agitación empeora la obstrucción."),
      mg("vapor", "Vapor caliente", "innecesario", "No tiene eficacia demostrada y hay riesgo de quemaduras."),
      mg("atb", "Antibióticos", "innecesario", "Es viral."),
    ],
  },
  debrief: {
    diagnosis: "Laringotraqueítis viral (crup) moderada a grave con estridor en reposo, en lactante de 11 meses.",
    pathologies: [
      { name: "Crup viral", role: "principal", why: "Inflamación subglótica por virus." },
      { name: "Obstrucción de vía aérea alta", role: "asociada", why: "Estridor en reposo." },
      { name: "Epiglotitis, cuerpo extraño, traqueítis bacteriana", role: "diferencial", why: "Otras causas de estridor." },
    ],
    reasoning: [
      "Causa: virus parainfluenza (y otros) en otoño e invierno.",
      "Mecanismo: edema de la subglotis, la parte más estrecha de la vía aérea del lactante.",
      "Consecuencia: tos perruna, disfonía, estridor y, si es grave, falla respiratoria.",
    ],
    epidemiology:
      "El crup afecta sobre todo a niños de 6 meses a 3 años, más a varones, con pico en otoño. Es una consulta nocturna muy frecuente en guardias pediátricas de Argentina; la mayoría es leve, pero los menores de 1 año tienen más riesgo de formas graves.",
    management: [
      "Evaluar gravedad (score de Westley).",
      "Corticoide a todos.",
      "Adrenalina nebulizada si hay estridor en reposo, con observación.",
      "Internar si no responde o requiere adrenalina repetida.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de laringitis aguda (crup).", "Ministerio de Salud de la Nación — Guía de infecciones respiratorias agudas."],
    pearls: ["Estridor en reposo = adrenalina.", "Dexametasona a todos.", "No agitar al niño."],
    pitfalls: ["Hacer estudios que lo agiten.", "Alta inmediata tras adrenalina."],
    tribunal: [
      qa("¿Qué diferencia el crup de la epiglotitis?", "Crup: inicio gradual con pródromo, tos perruna, disfonía, fiebre moderada, aspecto no tóxico. Epiglotitis: inicio brusco, fiebre alta, aspecto tóxico, babeo, disfagia, posición en trípode, sin tos perruna; hoy es rara por la vacuna contra Haemophilus."),
      qa("¿Qué es el score de Westley?", "Una escala de gravedad del crup que puntúa conciencia, cianosis, estridor, entrada de aire y tiraje: leve 0–2, moderado 3–7, grave 8–11, falla respiratoria inminente 12 o más."),
      qa("¿Qué es el crup espasmódico?", "Episodios nocturnos recurrentes de tos perruna y estridor sin fiebre ni pródromo viral, en niños con terreno atópico, que ceden en horas."),
    ],
  },
};
