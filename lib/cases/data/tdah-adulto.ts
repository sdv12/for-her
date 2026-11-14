import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tdahAdulto: ClinicalCase = {
  id: "tdah-adulto",
  level: 2,
  area: "Salud mental",
  setting: "Consultorio",
  patient: { age: 31, ageUnit: "años", sex: "F", context: "Diseñadora. Diagnosticaron TDAH a su hijo de 7 años hace poco." },
  frequency: "frecuente",
  intro: "“Cuando le explicaron a mi hijo lo del TDAH me reconocí en todo. Pierdo cosas, dejo todo a medias y siempre llego tarde.”",
  vitals: { TA: "116/72 mmHg", FC: "76 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("infancia", "¿Cómo eras en la escuela?", "clave", "“Distraída, en las nubes, los boletines decían que hablaba mucho.”", "Inicio antes de los 12."),
    act("ambitos", "¿Te pasa en el trabajo y en tu casa?", "clave", "“En todos lados.”", "Más de un ámbito."),
    act("impacto", "¿Cómo te afecta?", "clave", "“Perdí dos trabajos por entregar tarde.”", "Deterioro funcional."),
    act("animo", "¿Ánimo bajo, ansiedad o consumo?", "util", "“Ansiedad, y fumo marihuana para calmarme.”", "Comorbilidades."),
    act("sueno", "¿Cómo dormís?", "util", "“Mal, me acuesto tarde.”", "Diferencial."),
    act("diseno", "¿Qué diseñás?", "neutro", "“Logos.”", "No orienta."),
  ],
  exam: [
    act("mental", "Examen mental", "clave", "Cambia de tema, sin síntomas psicóticos ni maníacos.", "Base."),
    act("cardio", "Presión y FC", "clave", "Normales.", "Antes de estimulantes."),
    act("tiroides", "Tiroides", "util", "Normal.", "Excluye."),
  ],
  studies: [
    study("Otros", "escalas", "Escala ASRS y entrevista estructurada con información de la infancia", "clave", "Positivo.", "Diagnóstico clínico."),
    study("Laboratorio", "tsh", "TSH", "util", "Normal.", "Diferencial."),
    study("Otros", "tamizaje", "Tamizaje de depresión, bipolaridad y consumo", "clave", "Ansiedad leve; consumo de cannabis.", "Comorbilidades."),
    study("Imágenes", "rm", "RM de cerebro o EEG", "innecesario", "No se realizó.", "No diagnostica TDAH."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tdah", "Trastorno por déficit de atención e hiperactividad del adulto, presentación inatenta", true, "Síntomas desde la infancia, en varios ámbitos, con deterioro funcional y antecedente familiar."),
      dx("ansiedad", "Ansiedad generalizada", false, "Inicio en la infancia y patrón atencional."),
      dx("bipolar", "Trastorno bipolar", false, "Sin episodios afectivos."),
      dx("cannabis", "Efecto del cannabis solo", false, "Síntomas desde antes del consumo."),
      dx("depresion", "Depresión", false, "Patrón crónico desde la infancia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("psicoeducacion", "Psicoeducación y estrategias de organización", "clave", "Base."),
      mg("farmaco", "Metilfenidato o atomoxetina con control", "clave", "Eficaces en adultos."),
      mg("cannabis", "Abordar el consumo de cannabis", "clave", "Comorbilidad."),
      mg("tcc", "Terapia cognitivo-conductual", "util", "Funcionalidad."),
      mg("benzo", "Benzodiacepinas para la ansiedad", "riesgoso", "Empeoran atención."),
      mg("sin-evaluar-bipolar", "Estimulantes sin evaluar bipolaridad", "riesgoso", "Riesgo de manía."),
    ],
  },
  debrief: {
    diagnosis: "Trastorno por déficit de atención e hiperactividad del adulto, presentación inatenta, con ansiedad y consumo de cannabis, en mujer de 31 años.",
    pathologies: [
      { name: "TDAH del adulto", role: "principal", why: "Trastorno del neurodesarrollo." },
      { name: "Ansiedad y cannabis", role: "asociada", why: "Comorbilidades frecuentes." },
      { name: "Bipolaridad, depresión", role: "diferencial", why: "Otros cuadros." },
    ],
    reasoning: [
      "Causa: alta heredabilidad.",
      "Mecanismo: alteración de redes frontoestriatales y de dopamina.",
      "Consecuencia: inatención, desorganización y problemas laborales.",
    ],
    epidemiology:
      "Afecta a alrededor del 2 a 4 % de los adultos. Muchas mujeres se diagnostican tarde, a veces al diagnosticar a un hijo. Se requiere inicio en la infancia.",
    management: [
      "Historia infantil.",
      "Comorbilidades.",
      "Psicoeducación y fármacos.",
      "Seguimiento.",
    ],
    sources: ["Asociación de Psiquiatras Argentinos — TDAH en adultos.", "NICE — Attention Deficit Hyperactivity Disorder Guideline."],
    pearls: ["Debe empezar en la infancia.", "Mujeres: forma inatenta.", "Buscá comorbilidades."],
    pitfalls: ["Benzodiacepinas.", "Estimulantes sin descartar bipolaridad."],
    tribunal: [
      qa("¿Qué presentaciones tiene el TDAH?", "Inatenta, hiperactiva-impulsiva y combinada."),
      qa("¿Qué fármaco no estimulante se usa?", "Atomoxetina, un inhibidor de la recaptación de noradrenalina."),
      qa("¿Por qué se pregunta por la infancia?", "Porque el diagnóstico requiere síntomas antes de los 12 años."),
    ],
  },
};
