import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const urticaria: ClinicalCase = {
  id: "urticaria-aguda",
  level: 1,
  area: "Alergia e inmunología",
  setting: "Guardia",
  patient: { age: 9, ageUnit: "años", sex: "F", context: "Sana. Tuvo un resfrío la semana pasada." },
  frequency: "muy-frecuente",
  intro: "“Se llenó de ronchas que le pican muchísimo, aparecen y desaparecen por todo el cuerpo desde esta mañana.” (relata la madre)",
  vitals: { TA: "104/64 mmHg", FC: "92 lpm", FR: "18 rpm", "T°": "36,7 °C", "SatO₂": "99 %" },
  anamnesis: [
    act("respiratorio", "¿Le cuesta respirar, se le hinchó la lengua o la garganta, tiene la voz ronca?", "clave", "“No, respira bien.”", "Descarta compromiso de la vía aérea, que convertiría el cuadro en anafilaxia."),
    act("digestivo", "¿Tuvo vómitos, dolor de panza o se desmayó?", "clave", "“No.”", "El compromiso de dos sistemas sugiere anafilaxia."),
    act("desencadenante", "¿Comió algo nuevo, tomó remedios o la picó algo?", "clave", "“Le di ibuprofeno ayer por el dolor de garganta.”", "Infecciones virales, fármacos (AINE, antibióticos) y alimentos son los desencadenantes más comunes."),
    act("duracion", "¿Cada roncha cuánto dura?", "clave", "“Unas horas y aparece en otro lado.”", "Lesiones que duran menos de 24 h y dejan piel sana: típicas de urticaria."),
    act("antes", "¿Le pasó antes?", "util", "“Nunca.”", "Primer episodio; menos de seis semanas define urticaria aguda."),
    act("atopia", "¿Tiene asma o alergias?", "util", "“Rinitis.”", "Terreno atópico."),
    act("escuela", "¿En qué grado está?", "neutro", "“En cuarto.”", "No orienta."),
  ],
  exam: [
    act("piel", "Examen de la piel", "clave", "Ronchas eritematoedematosas, de bordes netos, migratorias, que blanquean a la presión, en tronco y miembros.", "Habones típicos de urticaria."),
    act("via-aerea", "Boca, lengua, voz y auscultación", "clave", "Sin edema de lengua ni úvula; buena entrada de aire, sin sibilancias.", "Sin compromiso respiratorio."),
    act("angioedema", "Buscar angioedema en párpados y labios", "util", "Leve edema palpebral.", "El angioedema sin compromiso de vía aérea no cambia el manejo."),
  ],
  studies: [
    study("Laboratorio", "ige", "IgE total y panel de alergenos", "innecesario", "No se realizó.", "En la urticaria aguda con causa probable no se piden estudios."),
    study("Laboratorio", "hemograma", "Hemograma y eritrosedimentación", "innecesario", "No se realizó.", "No cambia el tratamiento."),
    study("Otros", "observacion", "Observación clínica y reevaluación", "util", "Sin progresión en 1 h.", "Confirma que no evoluciona a anafilaxia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("urticaria", "Urticaria aguda con angioedema palpebral, sin anafilaxia, probablemente posviral o por AINE", true, "Habones pruriginosos migratorios de menos de 24 h, sin compromiso respiratorio, digestivo ni hemodinámico, tras un cuadro viral y la toma de ibuprofeno."),
      dx("anafilaxia", "Anafilaxia", false, "No hay compromiso de otro sistema: respiratorio, cardiovascular ni digestivo."),
      dx("eritema-multiforme", "Eritema multiforme", false, "Tendría lesiones fijas en diana, que duran días."),
      dx("vasculitis", "Urticaria vasculitis", false, "Las lesiones durarían más de 24 h, dolerían y dejarían manchas."),
      dx("exantema", "Exantema viral", false, "Los exantemas no son ronchas migratorias que desaparecen en horas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antihistaminico", "Antihistamínico H1 de segunda generación (cetirizina, loratadina, desloratadina) a dosis plenas", "clave", "Tratamiento de primera línea; menos sedación que los de primera generación."),
      mg("evitar", "Evitar AINE y el desencadenante sospechado; usar paracetamol si hace falta", "clave", "Los AINE desencadenan o agravan la urticaria."),
      mg("alarma", "Pautas de alarma: dificultad para respirar, hinchazón de lengua, vómitos o desmayo, consultar de inmediato", "clave", "Reconocer la anafilaxia a tiempo."),
      mg("corticoide", "Corticoide oral por pocos días si los síntomas son intensos", "util", "Curso breve opcional en casos refractarios."),
      mg("adrenalina", "Adrenalina intramuscular", "innecesario", "Sin anafilaxia no está indicada."),
      mg("dieta", "Dieta de exclusión de muchos alimentos", "innecesario", "Sin relación clara con un alimento solo genera restricciones."),
    ],
  },
  debrief: {
    diagnosis: "Urticaria aguda con angioedema palpebral leve, sin criterios de anafilaxia, posiblemente desencadenada por infección viral y AINE, en niña de 9 años.",
    pathologies: [
      { name: "Urticaria aguda", role: "principal", why: "Habones migratorios de menos de seis semanas de evolución." },
      { name: "Angioedema palpebral", role: "asociada", why: "Edema de la dermis profunda, sin vía aérea comprometida." },
      { name: "Anafilaxia, eritema multiforme, urticaria vasculitis", role: "diferencial", why: "Se descartan por la clínica." },
    ],
    reasoning: [
      "Causa: infecciones virales (la más común en niños), fármacos (AINE, antibióticos), alimentos o picaduras.",
      "Mecanismo: los mastocitos de la piel se activan (por IgE o en forma directa, como con los AINE) y liberan histamina.",
      "Consecuencia: vasodilatación y aumento de la permeabilidad en la dermis superficial (habón) o profunda (angioedema), con prurito intenso.",
    ],
    epidemiology:
      "Hasta un 20 % de las personas tiene urticaria alguna vez en la vida. En niños, la mayoría de las urticarias agudas son desencadenadas por infecciones virales y se resuelven en días a semanas. Es una consulta muy frecuente en la guardia pediátrica.",
    management: [
      "Descartar anafilaxia (vía aérea, respiración, circulación, síntomas digestivos).",
      "Antihistamínicos H1 de segunda generación; pueden aumentarse hasta 4 veces la dosis.",
      "Evitar desencadenantes y AINE.",
      "Si dura más de seis semanas: urticaria crónica, con otro abordaje.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de urticaria en pediatría.", "Asociación Argentina de Alergia e Inmunología Clínica — Guía de urticaria."],
    pearls: ["Habón que dura menos de 24 h y deja la piel sana.", "Siempre descartar anafilaxia.", "Antihistamínico de segunda generación."],
    pitfalls: ["Dar adrenalina a toda urticaria.", "Pedir estudios alérgicos en la aguda."],
    tribunal: [
      qa("¿Cuándo una urticaria es anafilaxia?", "Cuando se suma compromiso respiratorio (disnea, sibilancias, estridor), cardiovascular (hipotensión, síncope) o digestivo persistente (vómitos, dolor abdominal), o cuando hay hipotensión tras un alérgeno conocido; requiere adrenalina IM."),
      qa("¿Qué diferencia la urticaria aguda de la crónica?", "La duración: la aguda dura menos de seis semanas y suele tener un desencadenante; la crónica persiste más de seis semanas y suele ser espontánea, a veces autoinmune."),
      qa("¿Qué es el angioedema hereditario?", "Un déficit del inhibidor de C1 que produce angioedema sin habones ni prurito, que no responde a antihistamínicos, corticoides ni adrenalina, y puede comprometer la vía aérea; se trata con concentrado de C1 inhibidor o icatibant."),
    ],
  },
};
