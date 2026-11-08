import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ela: ClinicalCase = {
  id: "esclerosis-lateral-amiotrofica",
  level: 3,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 58, ageUnit: "años", sex: "M", context: "Docente de música. Sin antecedentes familiares neurológicos." },
  frequency: "raro",
  intro: "“Hace 8 meses se me cae la taza de la mano derecha, tengo calambres y veo como si la carne me saltara. Ahora a veces me trabo al hablar.”",
  vitals: { TA: "124/76 mmHg", FC: "76 lpm", FR: "18 rpm", "T°": "36,4 °C", "SatO₂": "96 %", Peso: "68 kg" },
  anamnesis: [
    act("evolucion", "¿Fue progresivo? ¿Dónde empezó?", "clave", "“Progresivo, mano derecha.”", "Inicio focal y progresión."),
    act("sensibilidad", "¿Hormigueo, dolor, problemas con la orina?", "clave", "“No.”", "No hay síntomas sensitivos ni esfinterianos."),
    act("bulbar", "¿Te atragantás, cambió tu voz? ¿Te falta el aire acostado?", "clave", "“Me atraganto con el agua.”", "Compromiso bulbar."),
    act("emocional", "¿Risa o llanto que no podés controlar?", "util", "“A veces lloro sin motivo.”", "Labilidad seudobulbar."),
    act("familia", "¿Familiares con cuadros similares?", "util", "“No.”", "Forma familiar."),
    act("instrumento", "¿Qué instrumento tocás?", "neutro", "“Piano.”", "No orienta."),
  ],
  exam: [
    act("inferior", "Motoneurona inferior", "clave", "Atrofia de mano derecha, fasciculaciones, debilidad.", "Motoneurona inferior."),
    act("superior", "Motoneurona superior", "clave", "Reflejos vivos, Hoffmann y Babinski.", "Combinación típica."),
    act("sensitivo", "Sensibilidad, ojos y lengua", "clave", "Sensibilidad normal; movimientos oculares normales; lengua atrófica con fasciculaciones.", "Respeta sensibilidad y oculomotores."),
  ],
  studies: [
    study("Otros", "emg", "Electromiograma y velocidad de conducción", "clave", "Denervación activa y crónica en varias regiones; conducción sensitiva normal.", "Confirma."),
    study("Imágenes", "rmn", "RM de cerebro y médula cervical", "clave", "Sin compresión.", "Descarta mielopatía."),
    study("Laboratorio", "lab", "TSH, calcio, B12, VIH, CK", "clave", "Normal; CK levemente elevada.", "Imitadores."),
    study("Otros", "espirometria", "Capacidad vital forzada y evaluación deglutoria", "clave", "CVF 72 %; disfagia leve.", "Define intervenciones."),
    study("Otros", "biopsia", "Biopsia muscular de rutina", "innecesario", "No se realizó.", "No se necesita."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ela", "Esclerosis lateral amiotrófica", true, "Motoneurona superior e inferior en varias regiones, sin alteración sensitiva, con estudios concordantes."),
      dx("miastenia", "Miastenia gravis", false, "Es fluctuante, con ptosis y sin atrofia ni fasciculaciones."),
      dx("mielopatia", "Mielopatía cervical", false, "RM normal y compromiso bulbar."),
      dx("neuropatia", "Neuropatía motora multifocal", false, "No explica los signos de motoneurona superior."),
      dx("miositis", "Miositis", false, "Es proximal y no da hiperreflexia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("riluzol", "Riluzol", "clave", "Prolonga algo la supervivencia."),
      mg("equipo", "Equipo multidisciplinario y cuidados paliativos desde el inicio", "clave", "Mejora la calidad de vida."),
      mg("respiratorio", "Control respiratorio y ventilación no invasiva oportuna", "clave", "Prolonga la vida."),
      mg("nutricion", "Fonoaudiología y gastrostomía oportuna", "clave", "Aspiración y desnutrición."),
      mg("corticoides", "Corticoides en altas dosis", "riesgoso", "Sin beneficio y con daño."),
      mg("ocultar", "No informar el diagnóstico a la persona", "riesgoso", "La persona tiene derecho a saber y planificar."),
    ],
  },
  debrief: {
    diagnosis: "Esclerosis lateral amiotrófica de inicio en miembro superior con compromiso bulbar, en varón de 58 años.",
    pathologies: [
      { name: "ELA", role: "principal", why: "Degeneración de motoneuronas." },
      { name: "Disfagia y riesgo respiratorio", role: "asociada", why: "Definen pronóstico." },
      { name: "Miastenia, mielopatía, neuropatía motora", role: "diferencial", why: "Imitadores." },
    ],
    reasoning: [
      "Causa: esporádica en la mayoría; familiar, cerca de 10 %.",
      "Mecanismo: degeneración de motoneuronas corticales y espinales.",
      "Consecuencia: debilidad progresiva, disfagia y falla respiratoria.",
    ],
    epidemiology:
      "Tiene una incidencia aproximada de 2 por 100.000 habitantes al año, con pico entre los 55 y 75 años. La supervivencia media es de 3 a 5 años, y la insuficiencia respiratoria es la causa de muerte más común. La ley argentina de muerte digna reconoce el derecho a decidir sobre las intervenciones.",
    management: [
      "Combinar neuronas superior e inferior.",
      "Excluir imitadores.",
      "Riluzol.",
      "Cuidados y decisiones anticipadas.",
    ],
    sources: ["Sociedad Neurológica Argentina — Enfermedad de motoneurona.", "European Federation of Neurological Societies — ALS Guideline."],
    pearls: ["Fasciculaciones con hiperreflexia.", "Respeta sensibilidad, ojos y esfínteres.", "Plan anticipado."],
    pitfalls: ["No buscar mielopatía.", "Ocultar el diagnóstico."],
    tribunal: [
      qa("¿Cómo diferencias motoneurona superior de inferior?", "Superior: espasticidad, hiperreflexia y Babinski. Inferior: atrofia, fasciculaciones e hiporreflexia."),
      qa("¿Qué es la Ley 26.742?", "Ley de derechos del paciente que reconoce el derecho a rechazar tratamientos y hacer directivas anticipadas."),
      qa("¿Cuál es el mecanismo del riluzol?", "Reduce la liberación de glutamato; prolonga la supervivencia unos meses."),
    ],
  },
};
