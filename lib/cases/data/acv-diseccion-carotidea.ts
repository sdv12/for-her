import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const acvDiseccionCarotidea: ClinicalCase = {
  id: "acv-isquemico-diseccion-carotidea-joven",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 38, ageUnit: "años", sex: "M", context: "Sano. Hace 4 días fue al quiropráctico por dolor de cuello." },
  frequency: "poco-frecuente",
  intro: "“Desde ayer me duele el cuello y la cabeza del lado izquierdo. Hace una hora se me durmió la mano derecha y me cuesta hablar.”",
  vitals: { TA: "138/84 mmHg", FC: "76 lpm", FR: "16 rpm", "T°": "36,5 °C", "SatO₂": "98 %", Glucemia: "96 mg/dl", Glasgow: "15/15" },
  anamnesis: [
    act("hora", "¿A qué hora empezó la debilidad?", "clave", "“Hace una hora.”", "Ventana."),
    act("cuello", "¿Dolor de cuello? ¿Manipulación, trauma, deporte?", "clave", "“Quiropraxia hace 4 días.”", "Causa."),
    act("ojo", "¿Párpado caído o pupila chica?", "clave", "“Mi señora dice que tengo el ojo raro.”", "Horner."),
    act("riesgo", "¿Presión, colesterol, drogas, migraña?", "util", "“Nada.”", "Joven sin factores."),
    act("contraindicaciones", "¿Sangrados o cirugías?", "util", "“No.”", "Trombólisis."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy carpintero.”", "No orienta."),
  ],
  exam: [
    act("nihss", "NIHSS", "clave", "Paresia braquial derecha y afasia leve: 5.", "Territorio carotídeo izquierdo."),
    act("horner", "Ojos", "clave", "Ptosis y miosis izquierdas.", "Horner ipsilateral."),
    act("soplo", "Cuello", "util", "Sin soplo.", "Base."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de cerebro sin contraste", "clave", "Sin sangrado.", "Habilita trombólisis."),
    study("Imágenes", "angio", "AngioTC de vasos de cuello", "clave", "Disección de carótida interna izquierda con estenosis.", "Causa."),
    study("Imágenes", "rmn", "RM con difusión", "util", "Infarto pequeño.", "Confirma."),
    study("Otros", "manipular", "Masaje cervical para el dolor", "riesgoso", "No se realizó.", "Empeora la disección."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("diseccion", "ACV isquémico por disección de carótida interna izquierda", true, "Joven, manipulación cervical, dolor, Horner y angioTC."),
      dx("migrana", "Migraña con aura", false, "Hay disección y foco."),
      dx("hemorragico", "ACV hemorrágico", false, "TC sin sangre."),
      dx("embolico", "ACV cardioembólico", false, "Hay disección."),
      dx("conversivo", "Trastorno conversivo", false, "Hay signos objetivos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("trombolisis", "Trombólisis EV en ventana si no hay contraindicaciones", "clave", "Disección cervical no la contraindica."),
      mg("antitrombotico", "Antiagregación o anticoagulación después", "clave", "Prevención."),
      mg("unidad", "Unidad de ACV", "clave", "Cuidados."),
      mg("evitar", "Evitar manipulaciones cervicales", "clave", "Prevención."),
      mg("quiropraxia", "Volver al quiropráctico", "riesgoso", "Peligroso."),
      mg("esperar", "Esperar porque es joven", "riesgoso", "Pierde la ventana."),
    ],
  },
  debrief: {
    diagnosis: "ACV isquémico por disección de carótida interna izquierda tras manipulación cervical, con Horner, en varón de 38 años.",
    pathologies: [
      { name: "Disección carotídea", role: "principal", why: "Desgarro de la pared." },
      { name: "ACV isquémico", role: "asociada", why: "Consecuencia." },
      { name: "Migraña, cardioembolia", role: "diferencial", why: "Otras causas en jóvenes." },
    ],
    reasoning: [
      "Causa: trauma menor o manipulación del cuello.",
      "Mecanismo: hematoma de la pared y trombo.",
      "Consecuencia: embolia o hipoperfusión cerebral.",
    ],
    epidemiology:
      "La disección arterial cervical es una de las causas principales de ACV en menores de 50 años. Se asocia a traumatismos menores, deportes y manipulación del cuello. El dolor cervical con Horner es una pista importante.",
    management: [
      "Código ACV.",
      "AngioTC.",
      "Reperfusión.",
      "Antitrombóticos.",
    ],
    sources: ["Sociedad Neurológica Argentina — ACV en jóvenes.", "ESO — Guideline on Cervical Artery Dissection."],
    pearls: ["Joven con ACV y dolor cervical: disección.", "Horner ipsilateral.", "Trombólisis posible."],
    pitfalls: ["Pensar que es migraña.", "No hacer angioTC."],
    tribunal: [
      qa("¿Qué es el síndrome de Horner?", "Ptosis, miosis y anhidrosis por lesión de la vía simpática."),
      qa("¿Cuáles son las causas de ACV en jóvenes?", "Disección, cardioembolia (foramen oval, endocarditis), trombofilias, drogas y vasculitis."),
      qa("¿Qué es el foramen oval permeable?", "Comunicación entre aurículas que permite embolia paradojal."),
    ],
  },
};
