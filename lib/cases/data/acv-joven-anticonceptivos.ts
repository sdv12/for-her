import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const acvJovenAnticonceptivos: ClinicalCase = {
  id: "acv-isquemico-joven-anticonceptivos",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "Migraña con aura, fumadora y anticonceptivos combinados. Empezó hace una hora y media." },
  frequency: "poco-frecuente",
  intro: "“De golpe no pude mover el brazo y la pierna derechos y no me salen bien las palabras. Es diferente de mis migrañas.”",
  vitals: { TA: "142/88 mmHg", FC: "84 lpm", FR: "16 rpm", "T°": "36,6 °C", "SatO₂": "98 %", Glucemia: "96 mg/dl", Glasgow: "14/15" },
  anamnesis: [
    act("hora", "¿A qué hora exacta empezó?", "clave", "“Hace una hora y media; la última vez bien fue a las 9.”", "Define la ventana de trombólisis."),
    act("migrana", "¿Se parece a tus auras? ¿Avanzó de a poco?", "clave", "“No: fue de golpe, con pérdida de fuerza.”", "El aura progresa en minutos y da síntomas positivos."),
    act("contra", "¿Cirugías, sangrados, anticoagulantes, embarazo, golpes recientes?", "clave", "“No.”", "Contraindicaciones."),
    act("cuello", "¿Dolor de cuello o trauma, masajes o gimnasio?", "clave", "“Me duele el cuello desde que entrené ayer.”", "Disección arterial, causa frecuente en jóvenes."),
    act("fuma", "¿Fumás? ¿Anticonceptivos?", "util", "“Sí.”", "Migraña con aura + estrógenos + tabaco: riesgo mayor."),
    act("perro", "¿Tenés perro?", "neutro", "“Sí.”", "No orienta."),
  ],
  exam: [
    act("nihss", "Examen neurológico (NIHSS)", "clave", "Hemiparesia derecha, afasia, NIHSS 9.", "Territorio de arteria cerebral media izquierda."),
    act("cardiaco", "Corazón y pulsos", "util", "Sin soplos, ritmo regular.", "Busca fuente embólica."),
    act("cuello", "Cuello y piel", "util", "Dolor cervical izquierdo; sin livedo.", "Disección y otras causas."),
  ],
  studies: [
    study("Imágenes", "tac", "TC sin contraste urgente", "clave", "Sin sangrado.", "Excluye hemorragia antes de trombolizar."),
    study("Imágenes", "angio", "AngioTC de cuello y cerebro", "clave", "Disección de carótida interna izquierda; oclusión distal.", "Causa y candidata a trombectomía."),
    study("Laboratorio", "lab", "Glucemia, plaquetas, coagulación, beta-hCG", "clave", "Normales; beta-hCG negativa.", "Se excluyen simuladores y contraindicaciones."),
    study("Laboratorio", "trombofilia", "Estudio de anticuerpos antifosfolípidos, más adelante", "util", "Pendiente.", "Causas en jóvenes."),
    study("Imágenes", "rmn-demora", "Resonancia completa que demore el tratamiento", "riesgoso", "No se realizó.", "Cada minuto pierde tejido: con TC y angioTC se decide."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("acv", "ACV isquémico de arteria cerebral media izquierda por disección carotídea, en ventana", true, "Déficit súbito, con TC sin sangrado y angioTC con disección y oclusión."),
      dx("aura", "Migraña con aura", false, "Las auras progresan, dan síntomas positivos y no dan afasia con hemiparesia persistente."),
      dx("todd", "Parálisis de Todd", false, "Sin crisis previa."),
      dx("hemorragia", "ACV hemorrágico", false, "TC sin sangrado."),
      dx("conversion", "Trastorno funcional", false, "Hay signos objetivos y oclusión."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("trombolisis", "Trombólisis EV dentro de 4,5 horas", "clave", "La disección extracraneal no la contraindica."),
      mg("trombectomia", "Trombectomía si hay oclusión de vaso grande", "clave", "Mejora mucho el pronóstico."),
      mg("unidad", "Unidad de ACV, y luego antiagregación o anticoagulación", "clave", "Evita complicaciones y recurrencia."),
      mg("hormonas", "Suspender estrógenos y tabaco", "clave", "Reduce el riesgo; método sin estrógenos."),
      mg("esperar", "Tratarla como migraña con analgésicos", "riesgoso", "Pierde tiempo crítico."),
      mg("presion", "Bajar la presión a 120/80 mmHg de entrada", "riesgoso", "Reduce la perfusión; solo se trata por debajo de 185/110 para trombólisis."),
    ],
  },
  debrief: {
    diagnosis: "ACV isquémico de arteria cerebral media izquierda por disección carotídea, en mujer de 34 años con migraña con aura, tabaquismo y anticonceptivos combinados.",
    pathologies: [
      { name: "ACV isquémico", role: "principal", why: "Oclusión arterial." },
      { name: "Disección carotídea", role: "asociada", why: "Causa frecuente en jóvenes." },
      { name: "Migraña con aura, Todd, ACV hemorrágico", role: "diferencial", why: "Simuladores." },
    ],
    reasoning: [
      "Causa: desgarro de la íntima carotídea, con trombo y embolia distal.",
      "Mecanismo: la oclusión de la cerebral media deja una penumbra isquémica rescatable.",
      "Consecuencia: hemiparesia, afasia; sin reperfusión, infarto establecido.",
    ],
    epidemiology:
      "Entre el 10 y el 15 % de los ACV isquémicos afecta a personas de menos de 50 años. La disección es una de sus causas principales. En mujeres jóvenes, la migraña con aura, el tabaco y los estrógenos aumentan el riesgo, por lo que esa combinación se desaconseja.",
    management: [
      "Código ACV: hora de inicio, glucemia, TC.",
      "Trombólisis y trombectomía según criterios.",
      "Unidad de ACV.",
      "Buscar causa y prevención secundaria.",
    ],
    sources: ["Sociedad Neurológica Argentina — Recomendaciones de ACV.", "Ministerio de Salud de la Nación — Guía de ACV isquémico."],
    pearls: ["Déficit súbito y negativo: ACV hasta demostrar lo contrario.", "Joven con dolor de cuello: disección.", "Migraña con aura: no usar estrógenos."],
    pitfalls: ["Etiquetarlo como migraña.", "Perder la ventana."],
    tribunal: [
      qa("¿Cuáles son las contraindicaciones de la trombólisis?", "Hemorragia, cirugía o trauma grave recientes, ACV en 3 meses, presión mayor de 185/110, plaquetas bajas, anticoagulación activa, sangrado activo."),
      qa("¿Qué causas de ACV en jóvenes hay?", "Disección, cardioembolia y foramen oval permeable, síndrome antifosfolipídico, drogas, vasculitis."),
      qa("¿Qué signos da el territorio de la cerebral media?", "Hemiparesia y hemianestesia contralateral, mayor en cara y brazo, y afasia si es dominante, o negligencia si no."),
    ],
  },
};
