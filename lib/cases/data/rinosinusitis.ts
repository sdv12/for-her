import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const rinosinusitis: ClinicalCase = {
  id: "rinosinusitis-aguda",
  level: 1,
  area: "Respiratorio",
  setting: "Consultorio",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "Abogada. Quiere un antibiótico porque el lunes tiene una audiencia." },
  frequency: "muy-frecuente",
  intro: "“Hace cinco días estoy con mocos verdes, la nariz tapada y me duele la cara cuando me agacho. Siempre que me pasa me dan antibiótico.”",
  vitals: { TA: "116/74 mmHg", FC: "78 lpm", "T°": "37,4 °C" },
  anamnesis: [
    act("duracion", "¿Cuántos días lleva? ¿Mejoró y volvió a empeorar?", "clave", "“Cinco días, y hoy estoy un poco mejor que ayer.”", "Menos de 10 días y en mejoría: casi seguro viral. Más de 10 días sin mejora o un doble empeoramiento sugieren bacteriana."),
    act("fiebre", "¿Tuvo fiebre alta?", "clave", "“No, algo de temperatura el primer día.”", "Fiebre ≥ 39 °C con secreción purulenta por 3–4 días es criterio de rinosinusitis bacteriana grave."),
    act("alarma", "¿Tiene hinchazón alrededor del ojo, visión doble, dolor de cabeza muy intenso o rigidez de cuello?", "clave", "“No.”", "Son signos de complicación orbitaria o intracraneal: urgencia."),
    act("color", "¿El color del moco le preocupa?", "util", "“Sí, verde, por eso pensé en infección.”", "El color verde o amarillo no distingue viral de bacteriana: se debe a las enzimas de los neutrófilos."),
    act("alergia", "¿Tiene alergias o pólipos nasales?", "util", "“Rinitis alérgica en primavera.”", "La rinitis alérgica predispone a sinusitis."),
    act("ciudad", "¿Dónde vive?", "neutro", "“En el centro.”", "No orienta."),
  ],
  exam: [
    act("rinoscopia", "Rinoscopía anterior", "clave", "Mucosa congestiva, secreción mucopurulenta, sin pólipos.", "Compatible con rinosinusitis; no distingue la causa."),
    act("senos", "Palpación de senos y región periorbitaria", "clave", "Leve dolor maxilar a la presión; sin edema ni eritema periorbitario.", "Descarta complicaciones orbitarias."),
    act("faringe", "Fauces y oídos", "util", "Descarga posterior; tímpanos normales.", "Busca otros focos."),
    act("pulmon", "Auscultación pulmonar", "neutro", "Normal.", "No aporta a este cuadro."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de senos paranasales", "innecesario", "Engrosamiento mucoso maxilar bilateral.", "El resfrío común también engrosa la mucosa: la radiografía no distingue viral de bacteriana y no está indicada."),
    study("Imágenes", "tc", "Tomografía de senos paranasales", "innecesario", "No se realizó.", "Solo ante sospecha de complicaciones o en la sinusitis crónica antes de cirugía."),
    study("Laboratorio", "hemograma", "Hemograma y PCR", "innecesario", "Normales.", "No cambian la conducta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("viral", "Rinosinusitis aguda viral", true, "Cinco días de síntomas nasales con dolor facial, en mejoría, sin fiebre alta ni complicaciones."),
      dx("bacteriana", "Rinosinusitis aguda bacteriana", false, "Requiere más de 10 días sin mejoría, doble empeoramiento o cuadro grave con fiebre alta."),
      dx("alergica", "Rinitis alérgica", false, "Estornudos, prurito y rinorrea acuosa estacional, sin dolor facial ni secreción purulenta."),
      dx("dental", "Sinusitis de origen dental", false, "Unilateral, con olor fétido y antecedente dental."),
      dx("orbitaria", "Celulitis orbitaria", false, "Edema y eritema periorbitario, dolor con los movimientos oculares, proptosis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("lavados", "Lavados nasales con solución salina", "clave", "Mejoran el drenaje y los síntomas."),
      mg("analgesia", "Paracetamol o ibuprofeno para el dolor", "clave", "Alivio sintomático."),
      mg("explicar", "Explicar que es viral, la duración esperada y cuándo volver (más de 10 días, empeoramiento, fiebre alta, signos oculares)", "clave", "La mayoría se resuelve en 7–10 días; explicar evita el antibiótico innecesario."),
      mg("corticoide-nasal", "Corticoide nasal", "util", "Puede aliviar, sobre todo con rinitis alérgica de base."),
      mg("amoxi", "Amoxicilina por 10 días “por las dudas”", "innecesario", "No acorta un cuadro viral, genera efectos adversos y resistencia."),
      mg("oxi", "Descongestivo nasal tópico (oximetazolina) por tres semanas", "riesgoso", "Más de 3–5 días produce rinitis medicamentosa (efecto rebote)."),
    ],
  },
  debrief: {
    diagnosis: "Rinosinusitis aguda viral (resfrío con compromiso sinusal), sin criterios de sobreinfección bacteriana.",
    pathologies: [
      { name: "Rinosinusitis aguda viral", role: "principal", why: "Menos de 10 días, en mejoría, sin fiebre alta." },
      { name: "Rinosinusitis bacteriana", role: "diferencial", why: "Según duración, curso y gravedad." },
      { name: "Rinitis alérgica", role: "asociada", why: "Predisponente." },
      { name: "Complicaciones orbitarias e intracraneales", role: "diferencial", why: "Raras pero graves." },
    ],
    reasoning: [
      "Causa: virus respiratorios (rinovirus, coronavirus estacionales, influenza).",
      "Mecanismo: la inflamación de la mucosa nasal se extiende a los senos y obstruye los ostium; el moco se acumula.",
      "Consecuencia: congestión, rinorrea (que se vuelve espesa y verdosa por los neutrófilos) y dolor facial. Solo en una minoría (0,5–2 %) se sobreinfecta con bacterias.",
      "Por eso el criterio para antibiótico es temporal y clínico, no el color del moco ni una radiografía.",
    ],
    epidemiology:
      "Es uno de los motivos más frecuentes de prescripción inadecuada de antibióticos en adultos. Los adultos tienen 2 a 4 resfríos por año. Es algo más frecuente en mujeres (quizás por mayor contacto con niños) y en personas con rinitis alérgica.",
    management: [
      "Diagnóstico clínico: duración, curso y gravedad.",
      "Viral: tratamiento sintomático (lavados, analgésicos, corticoide nasal).",
      "Bacteriana (más de 10 días, doble empeoramiento o grave): amoxicilina o amoxicilina-clavulánico.",
      "Sin imágenes salvo complicaciones o cuadros crónicos.",
      "Derivar urgente ante signos orbitarios o neurológicos.",
    ],
    sources: [
      "Sociedad Argentina de Infectología — Recomendaciones de uso apropiado de antimicrobianos en infecciones respiratorias altas.",
      "Ministerio de Salud de la Nación — Estrategia nacional de control de la resistencia antimicrobiana.",
    ],
    pearls: ["El moco verde no es sinónimo de bacteria.", "Menos de 10 días y mejorando: viral.", "Descongestivos tópicos: no más de 3–5 días."],
    pitfalls: ["Dar antibiótico por presión de la paciente.", "Pedir radiografía de senos.", "Usar descongestivos tópicos por semanas."],
  },
};
