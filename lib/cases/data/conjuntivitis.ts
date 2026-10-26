import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const conjuntivitis: ClinicalCase = {
  id: "conjuntivitis-bacteriana",
  level: 1,
  area: "Oftalmología",
  setting: "CAPS",
  patient: { age: 5, ageUnit: "años", sex: "M", context: "Va al jardín. Lo trae la abuela." },
  frequency: "muy-frecuente",
  intro: "“Se despertó con los ojos pegados, no los podía abrir. Tiene lagañas amarillas y los ojos rojos, primero uno y ahora los dos.”",
  vitals: { "T°": "36,7 °C", Peso: "19 kg" },
  anamnesis: [
    act("vision", "¿Ve bien? ¿Le duele el ojo o le molesta la luz?", "clave", "“Ve bien, no se queja de dolor. Le pica un poco.”", "Dolor, fotofobia o baja de la visión son signos de alarma (queratitis, uveítis, glaucoma) que requieren derivación urgente."),
    act("secrecion", "¿Cómo es la secreción?", "clave", "“Espesa y amarilla, se le pegan las pestañas.”", "La secreción purulenta orienta a bacteriana; la acuosa, a viral; la mucosa con picazón intensa, a alérgica."),
    act("oido", "¿Tiene fiebre, dolor de oído o resfrío?", "util", "“Mocos sí. Fiebre no, el oído no.”", "Conjuntivitis más otitis (síndrome conjuntivitis-otitis) sugiere Haemophilus y se trata con antibiótico oral."),
    act("trauma", "¿Se pudo haber golpeado o entrado algo en el ojo?", "util", "“No.”", "Un cuerpo extraño o un trauma dan dolor y ojo rojo unilateral."),
    act("contactos", "¿Hay otros chicos con ojos rojos en el jardín o en la casa?", "util", "“La maestra dijo que hay varios.”", "Es muy contagiosa: orienta medidas de higiene."),
    act("lentes", "¿Usa anteojos?", "neutro", "“No.”", "No cambia la conducta."),
  ],
  exam: [
    act("agudeza", "Agudeza visual", "clave", "Normal en ambos ojos (cartilla con figuras).", "Una visión normal tranquiliza: la conjuntivitis no la altera."),
    act("ojo", "Inspección del ojo, la córnea y las pupilas", "clave", "Hiperemia conjuntival difusa bilateral, secreción mucopurulenta, córnea transparente, pupilas iguales y reactivas.", "La hiperemia periquerática (alrededor de la córnea), la córnea opaca o la pupila alterada sugieren patología grave."),
    act("preauricular", "Ganglio preauricular", "util", "No palpable.", "La adenopatía preauricular es típica de la conjuntivitis viral por adenovirus."),
    act("otoscopia", "Otoscopía", "util", "Membranas normales.", "Descarta el síndrome conjuntivitis-otitis."),
  ],
  studies: [
    study("Microbiología", "cultivo", "Cultivo de la secreción conjuntival", "innecesario", "Haemophilus influenzae no tipificable.", "No se pide en la conjuntivitis no complicada; se reserva para casos graves, recién nacidos o fallas de tratamiento."),
    study("Otros", "fluoresceina", "Tinción con fluoresceína", "util", "Sin captación corneal.", "Descarta úlcera o lesión de la córnea si hubiera dudas."),
    study("Laboratorio", "hemograma", "Hemograma", "innecesario", "Normal.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("bacteriana", "Conjuntivitis bacteriana aguda", true, "Ojo rojo bilateral con secreción purulenta y párpados pegados, sin dolor, fotofobia ni baja de visión."),
      dx("viral", "Conjuntivitis viral (adenovirus)", false, "Secreción acuosa, adenopatía preauricular, a veces faringitis y fiebre."),
      dx("alergica", "Conjuntivitis alérgica", false, "Picazón intensa, lagrimeo, secreción mucosa, estacional y bilateral desde el inicio."),
      dx("queratitis", "Queratitis", false, "Dolor, fotofobia, baja de visión y captación de fluoresceína."),
      dx("dacrio", "Dacriocistitis", false, "Tumefacción dolorosa en el ángulo interno del ojo, sobre el saco lagrimal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("higiene", "Limpieza con solución fisiológica y gasas, de adentro hacia afuera, una gasa por ojo", "clave", "Retira la secreción y alivia; es la base del tratamiento."),
      mg("colirio", "Colirio antibiótico (por ejemplo, tobramicina) por 5–7 días", "clave", "Acorta la duración y el contagio."),
      mg("contagio", "Lavado de manos, toallas propias y volver al jardín tras 24 h de tratamiento", "clave", "Corta la transmisión."),
      mg("alarma", "Pautas de alarma: dolor, molestia con la luz, baja de visión o hinchazón del párpado", "util", "Detecta complicaciones."),
      mg("corticoide", "Colirio con corticoide", "riesgoso", "Puede empeorar una queratitis herpética o fúngica y aumentar la presión ocular: no se usa sin evaluación oftalmológica."),
      mg("oral", "Amoxicilina oral", "innecesario", "Solo si se asocia a otitis (síndrome conjuntivitis-otitis)."),
    ],
  },
  debrief: {
    diagnosis: "Conjuntivitis bacteriana aguda bilateral no complicada en niño de 5 años.",
    pathologies: [
      { name: "Conjuntivitis bacteriana aguda", role: "principal", why: "Ojo rojo con secreción purulenta y visión normal." },
      { name: "Conjuntivitis viral y alérgica", role: "diferencial", why: "Las otras causas frecuentes de ojo rojo." },
      { name: "Queratitis, uveítis, glaucoma agudo", role: "diferencial", why: "Ojo rojo grave: dolor, fotofobia, baja de visión." },
    ],
    reasoning: [
      "Causa: en niños, Haemophilus influenzae no tipificable, neumococo y Moraxella; en adultos predomina el estafilococo.",
      "Mecanismo: las bacterias colonizan la conjuntiva (por las manos o las secreciones nasales) y desencadenan inflamación con vasodilatación y exudado de neutrófilos.",
      "Consecuencia: ojo rojo difuso, secreción purulenta que pega los párpados, sensación de arenilla. Como la córnea no se compromete, la visión es normal y no hay dolor real.",
      "El ojo rojo con dolor, fotofobia o baja de visión es otra cosa: siempre se busca.",
    ],
    epidemiology:
      "La conjuntivitis aguda es la causa más frecuente de ojo rojo en atención primaria. En niños menores de 6 años predomina la bacteriana y causa brotes en jardines; en adultos es más frecuente la viral. No hay diferencias por sexo. La conjuntivitis alérgica es más común en primavera.",
    management: [
      "Diferenciar el ojo rojo banal del grave (dolor, fotofobia, baja visión, pupila alterada, córnea opaca).",
      "Higiene ocular y colirio antibiótico en la bacteriana; en la viral, medidas de sostén.",
      "Antibiótico oral si hay otitis asociada.",
      "Medidas de prevención del contagio.",
      "Derivar si no mejora en 48–72 h, ante signos de alarma o en recién nacidos.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Recomendaciones sobre ojo rojo en pediatría.", "Consejo Argentino de Oftalmología — Guías de conjuntivitis."],
    pearls: ["Ojo rojo + visión normal + sin dolor = conjuntivitis.", "Conjuntivitis + otitis = Haemophilus: antibiótico oral.", "Nunca colirios con corticoide sin oftalmólogo."],
    pitfalls: ["No medir la agudeza visual.", "Indicar corticoides tópicos.", "Pedir cultivo de rutina."],
  },
};
