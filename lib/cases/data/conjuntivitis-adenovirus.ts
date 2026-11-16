import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const conjuntivitisAdenovirus: ClinicalCase = {
  id: "conjuntivitis-adenovirus",
  level: 1,
  area: "Oftalmología",
  setting: "Guardia",
  patient: { age: 31, ageUnit: "años", sex: "F", context: "Maestra de jardín. Varios chicos de la sala tuvieron ojo rojo. No usa lentes de contacto." },
  frequency: "muy-frecuente",
  intro: "“Empezó en un ojo, ahora en los dos. Lagrimeo, arena y los párpados hinchados.”",
  vitals: { TA: "118/72 mmHg", FC: "76 lpm", "T°": "37,3 °C" },
  anamnesis: [
    act("secrecion", "¿Cómo es la secreción?", "clave", "“Acuosa, mucho lagrimeo.”", "Secreción serosa: viral."),
    act("vision", "¿Ve bien? ¿Dolor fuerte o le molesta la luz?", "clave", "“Veo bien, sin dolor fuerte.”", "Descarta queratitis, uveítis y glaucoma."),
    act("contactos", "¿Alguien cerca con lo mismo?", "clave", "“Los chicos del jardín.”", "Brote: muy contagiosa."),
    act("garganta", "¿Dolor de garganta o fiebre?", "util", "“Un poco de garganta.”", "Fiebre faringoconjuntival."),
    act("lentes", "¿Usa lentes de contacto?", "util", "“No.”", "Cambia la conducta."),
    act("canciones", "¿Qué canciones les canta?", "neutro", "“De María Elena Walsh.”", "No orienta."),
  ],
  exam: [
    act("ojo", "Conjuntiva y córnea con fluoresceína", "clave", "Hiperemia difusa, folículos tarsales, sin tinción corneal.", "Conjuntivitis folicular sin queratitis."),
    act("ganglio", "Ganglio preauricular", "clave", "Palpable y doloroso.", "Típico de adenovirus."),
    act("pupila", "Pupilas y agudeza visual", "util", "Normales, 10/10.", "Sin signos de gravedad."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Conjuntivitis folicular con adenopatía preauricular.", "No requiere estudios."),
    study("Microbiología", "cultivo", "Cultivo de secreción", "innecesario", "No se tomó.", "Solo en casos atípicos o graves."),
    study("Otros", "test-rapido", "Test rápido de adenovirus", "util", "Positivo.", "Opcional."),
    study("Otros", "corticoide-colirio", "Colirio con corticoide para el enrojecimiento", "riesgoso", "No se indicó.", "Prolonga la eliminación viral y empeora si es herpes."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("adenovirus", "Conjuntivitis viral por adenovirus (queratoconjuntivitis epidémica)", true, "Secreción acuosa bilateral, folículos, adenopatía preauricular y brote en el jardín."),
      dx("bacteriana", "Conjuntivitis bacteriana", false, "La secreción sería purulenta y sin adenopatía."),
      dx("alergica", "Conjuntivitis alérgica", false, "Sin prurito intenso y con adenopatía."),
      dx("herpetica", "Queratitis herpética", false, "Sin dendritas con fluoresceína."),
      dx("uveitis", "Uveítis anterior", false, "Sin dolor ni fotofobia intensa, visión normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("lagrimas", "Lágrimas artificiales frías y compresas frías", "clave", "Síntomas."),
      mg("higiene", "Lavado de manos, toallas propias, no tocarse los ojos", "clave", "Muy contagiosa."),
      mg("licencia", "Licencia laboral mientras haya secreción (unos 7–10 días)", "clave", "Trabaja con niños."),
      mg("control", "Consultar si baja la visión o hay dolor", "util", "Infiltrados corneales."),
      mg("atb", "Colirio antibiótico", "innecesario", "Es viral."),
      mg("compartir", "Seguir trabajando sin restricciones", "riesgoso", "Propaga el brote."),
    ],
  },
  debrief: {
    diagnosis: "Queratoconjuntivitis epidémica por adenovirus, en una maestra de jardín de 31 años.",
    pathologies: [
      { name: "Conjuntivitis por adenovirus", role: "principal", why: "Causa más frecuente de conjuntivitis infecciosa." },
      { name: "Brote institucional", role: "asociada", why: "Transmisión por manos y objetos." },
      { name: "Bacteriana, alérgica, herpética", role: "diferencial", why: "Otras conjuntivitis." },
    ],
    reasoning: [
      "Causa: adenovirus.",
      "Mecanismo: contagio por manos y fómites, muy resistente en superficies.",
      "Consecuencia: conjuntivitis de 1–3 semanas, a veces con infiltrados corneales.",
    ],
    epidemiology:
      "Los adenovirus causan entre el 65 y el 90 % de las conjuntivitis virales. Producen brotes en escuelas, jardines y consultorios oftalmológicos. El contagio dura mientras hay ojo rojo y lagrimeo.",
    management: [
      "Diagnóstico clínico.",
      "Sintomático.",
      "Higiene y aislamiento laboral.",
      "Derivar si hay alarma.",
    ],
    sources: ["Consejo Argentino de Oftalmología — Conjuntivitis.", "American Academy of Ophthalmology — Conjunctivitis Preferred Practice Pattern."],
    pearls: ["Acuosa + preauricular = adenovirus.", "Muy contagiosa: manos.", "No antibióticos ni corticoides."],
    pitfalls: ["Antibióticos por las dudas.", "Corticoides tópicos."],
    tribunal: [
      qa("¿Qué signos de alarma tiene un ojo rojo?", "Disminución de la agudeza visual, dolor intenso, fotofobia, pupila anormal, opacidad corneal y lentes de contacto."),
      qa("¿Qué es la fiebre faringoconjuntival?", "Fiebre, faringitis y conjuntivitis por adenovirus, frecuente en niños y en brotes de piletas."),
      qa("¿Cómo se diferencia la conjuntivitis bacteriana?", "Por la secreción purulenta que pega los párpados al despertar y la ausencia de adenopatía preauricular."),
    ],
  },
};
