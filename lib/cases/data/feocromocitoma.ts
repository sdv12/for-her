import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const feocromocitoma: ClinicalCase = {
  id: "feocromocitoma",
  level: 3,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 39, ageUnit: "años", sex: "F", context: "Hipertensa desde hace un año, mal controlada. Su madre tuvo un cáncer de tiroides." },
  frequency: "raro",
  intro: "“Me dan ataques: de golpe me late fuerte el corazón, me duele la cabeza, transpiro y me pongo pálida. Duran unos 20 minutos y me dijeron que son nervios.”",
  vitals: { TA: "186/108 mmHg", FC: "112 lpm", FR: "18 rpm", "T°": "36,8 °C", "SatO₂": "98 %", Glucemia: "128 mg/dl" },
  anamnesis: [
    act("triada", "¿Cefalea, palpitaciones y sudoración juntas? ¿Cada cuánto?", "clave", "“Las tres juntas, dos o tres veces por semana.”", "La tríada clásica en crisis es muy sugestiva."),
    act("gatillo", "¿Qué las desencadena? ¿Fármacos, comidas, esfuerzo?", "clave", "“Al agacharme; una vez, con metoclopramida.”", "Compresión abdominal y fármacos liberan catecolaminas."),
    act("familia", "¿Hay tumores de tiroides, suprarrenal o de riñón en la familia?", "clave", "“Mi mamá, un cáncer medular de tiroides.”", "Sugiere NEM 2: hasta un tercio de los casos es hereditario."),
    act("presion", "¿Cómo responde tu presión a los remedios? ¿Hipotensión al pararte?", "util", "“Baja de golpe al levantarme.”", "Hipotensión ortostática por volumen bajo."),
    act("drogas", "¿Cocaína, anfetaminas, descongestivos?", "util", "“No.”", "Simuladores."),
    act("gato", "¿Tenés gato?", "neutro", "“Sí.”", "No orienta."),
  ],
  exam: [
    act("general", "Aspecto, temperatura y ortostatismo", "clave", "Delgada, pálida, sudorosa; cae 25 mmHg al pararse.", "Exceso adrenérgico con contracción de volumen."),
    act("cuello", "Tiroides y cuello", "clave", "Nódulo tiroideo duro de 1,5 cm.", "Orienta a NEM 2: buscarlo cambia el manejo."),
    act("fondo", "Fondo de ojo y corazón", "util", "Retinopatía leve, taquicardia sin soplos.", "Daño de órgano."),
  ],
  studies: [
    study("Laboratorio", "metanefrinas", "Metanefrinas libres en plasma o fraccionadas en orina de 24 h", "clave", "Normetanefrina 6 veces el valor normal.", "Es la prueba inicial, muy sensible."),
    study("Imágenes", "tac", "TC o RM de suprarrenales, tras la bioquímica", "clave", "Masa suprarrenal derecha de 4,5 cm.", "La imagen se pide después de confirmar."),
    study("Laboratorio", "genetica", "Calcitonina, calcio y estudio genético (RET)", "clave", "Calcitonina elevada; mutación de RET.", "NEM 2A: define la familia."),
    study("Otros", "biopsia", "Biopsia de la masa suprarrenal", "riesgoso", "No se realizó.", "Puede precipitar una crisis hipertensiva mortal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("feo", "Feocromocitoma suprarrenal en el contexto de NEM 2A", true, "Tríada paroxística, HTA con ortostatismo, metanefrinas muy altas, masa suprarrenal y nódulo tiroideo con RET mutado."),
      dx("panico", "Crisis de pánico", false, "No explica presión de 186/108, metanefrinas altas ni la masa."),
      dx("conn", "Hiperaldosteronismo primario", false, "Da HTA sostenida con hipopotasemia, sin crisis adrenérgicas."),
      dx("hipertiroidismo", "Hipertiroidismo", false, "Da síntomas sostenidos, no crisis, y la masa no se explica."),
      dx("cocaina", "Consumo de simpaticomiméticos", false, "Lo niega y hay un tumor demostrado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("alfa", "Bloqueo alfa (fenoxibenzamina o doxazosina) por 7 a 14 días, con líquidos y sal", "clave", "Previene la crisis intraoperatoria y expande el volumen."),
      mg("beta-despues", "Betabloqueante solo después del bloqueo alfa, si hay taquicardia", "clave", "El orden importa."),
      mg("cirugia", "Adrenalectomía laparoscópica en centro especializado", "clave", "Es el tratamiento definitivo."),
      mg("familia", "Estudio familiar y tratar el carcinoma medular", "clave", "Primero se resuelve el feocromocitoma."),
      mg("beta-primero", "Betabloqueante de entrada para las palpitaciones", "riesgoso", "Con el receptor alfa libre, la vasoconstricción sin oposición causa crisis."),
      mg("ansiolitico", "Ansiolíticos y control por psicología", "riesgoso", "Deja sin tratar un tumor con riesgo vital."),
    ],
  },
  debrief: {
    diagnosis: "Feocromocitoma suprarrenal derecho en NEM 2A (mutación de RET) con carcinoma medular de tiroides probable, en mujer de 39 años.",
    pathologies: [
      { name: "Feocromocitoma", role: "principal", why: "Tumor productor de catecolaminas de la médula suprarrenal." },
      { name: "NEM 2A, carcinoma medular de tiroides", role: "asociada", why: "Síndrome hereditario." },
      { name: "Pánico, hipertiroidismo, consumo de drogas", role: "diferencial", why: "Otras causas de crisis adrenérgicas." },
    ],
    reasoning: [
      "Causa: tumor de células cromafines, a veces por mutaciones hereditarias.",
      "Mecanismo: liberación episódica de noradrenalina y adrenalina, con vasoconstricción y aumento de la frecuencia.",
      "Consecuencia: crisis hipertensivas, arritmias, miocardiopatía, ACV.",
    ],
    epidemiology:
      "Es una causa rara de hipertensión, presente en menos del 1 % de las personas hipertensas, con pico entre los 30 y los 50 años. Hasta un tercio tiene base genética. Se debe buscar en HTA paroxística, resistente, de inicio joven o con incidentaloma suprarrenal.",
    management: [
      "Confirmar con metanefrinas y recién después imagen.",
      "Bloqueo alfa previo y luego beta.",
      "Cirugía con equipo entrenado.",
      "Estudio genético y seguimiento de por vida.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Recomendaciones de feocromocitoma.", "Endocrine Society — Guía de feocromocitoma y paraganglioma."],
    pearls: ["Cefalea, palpitaciones y sudoración en crisis: pedí metanefrinas.", "Primero alfa, después beta.", "Nunca biopsiar sin descartarlo."],
    pitfalls: ["Etiquetarlo como nervios.", "Dar betabloqueante solo."],
    tribunal: [
      qa("¿Qué es la regla del 10 y por qué quedó vieja?", "Decía 10 % bilateral, extrasuprarrenal, maligno, familiar. Hoy se sabe que hasta un 30-40 % tiene base genética."),
      qa("¿Qué componentes tiene el NEM 2A y el 2B?", "2A: carcinoma medular, feocromocitoma e hiperparatiroidismo. 2B: carcinoma medular, feocromocitoma, neuromas mucosos y hábito marfanoide."),
      qa("¿Qué complicación posoperatoria hay que vigilar?", "Hipotensión por caída de catecolaminas e hipoglucemia de rebote."),
    ],
  },
};
