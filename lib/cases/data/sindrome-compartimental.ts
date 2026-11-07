import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sindromeCompartimental: ClinicalCase = {
  id: "sindrome-compartimental-agudo",
  level: 3,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 22, ageUnit: "años", sex: "M", context: "Fractura cerrada de tibia en accidente de moto hace 6 horas. Inmovilizado con yeso cerrado." },
  frequency: "frecuente",
  intro: "“El dolor es cada vez peor, los calmantes no me hacen nada. Siento hormigueo en el pie y la pierna me aprieta.”",
  vitals: { TA: "128/78 mmHg", FC: "108 lpm", FR: "20 rpm", "T°": "36,8 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor comparado con lo que esperabas?", "clave", "“Mucho más fuerte; la morfina no me calmó.”", "Dolor desproporcionado: el primer signo y el más importante."),
    act("parestesias", "¿Sentís hormigueo o que se duerme?", "clave", "“Sí, entre el dedo gordo y el segundo.”", "Compromete el nervio peroneo profundo del compartimento anterior."),
    act("tiempo", "¿Hace cuánto empezó?", "clave", "“Hace dos horas.”", "El tiempo es músculo: hay pocas horas."),
    act("anticoag", "¿Tomás anticoagulantes?", "util", "“No.”", "Aumentan el riesgo."),
    act("alergias", "¿Alergias o última comida?", "util", "“Ninguna; comí hace 7 horas.”", "Preparación para el quirófano."),
    act("casco", "¿Llevabas casco?", "neutro", "“Sí.”", "No cambia este problema."),
  ],
  exam: [
    act("yeso", "Abrir el yeso y examinar la pierna", "clave", "Yeso muy ajustado; pierna tensa, leñosa a la palpación.", "Hay que retirar el vendaje y el yeso de inmediato."),
    act("estiramiento", "Estiramiento pasivo de los dedos", "clave", "Dolor intenso al extender pasivamente los dedos.", "Signo más sensible de isquemia muscular."),
    act("pulso", "Pulsos, relleno y sensibilidad", "clave", "Pulso pedio presente, relleno normal, hipoestesia en primer espacio.", "El pulso presente NO descarta: su pérdida es tardía."),
  ],
  studies: [
    study("Otros", "presion", "Medición de presión compartimental, si hay dudas o paciente no colabora", "util", "Presión diferencial (diastólica menos compartimental) de 22 mmHg.", "Menos de 30 mmHg apoya la fasciotomía."),
    study("Laboratorio", "cpk", "CPK, función renal, potasio, orina", "clave", "CPK 8.200, creatinina normal, K 4,8, orina oscura.", "Busca rabdomiólisis."),
    study("Imágenes", "rmn", "Resonancia antes de decidir", "riesgoso", "No se realizó.", "El diagnóstico es clínico y demorar causa necrosis."),
    study("Imágenes", "doppler", "Doppler arterial como prueba definitiva", "innecesario", "Flujo presente.", "El flujo arterial conservado no descarta el síndrome."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("compartimental", "Síndrome compartimental agudo del compartimento anterior de la pierna", true, "Dolor desproporcionado, dolor al estiramiento pasivo, pierna leñosa e hipoestesia, con pulso presente, tras una fractura de tibia."),
      dx("dolor-fractura", "Dolor propio de la fractura", false, "No cede con opioides y aumenta con el estiramiento."),
      dx("tvp", "Trombosis venosa profunda", false, "No da hipoestesia en el territorio del peroneo ni pierna leñosa aguda."),
      dx("vascular", "Lesión arterial aguda", false, "Pulsos presentes y buen relleno."),
      dx("nervio", "Lesión nerviosa aislada", false, "No explicaría el dolor intenso y la tensión."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("abrir", "Abrir yeso y vendajes, pierna a la altura del corazón", "clave", "Reduce la presión externa; elevar el miembro disminuye la perfusión."),
      mg("fasciotomia", "Fasciotomía quirúrgica urgente de los compartimentos", "clave", "Es el tratamiento definitivo; idealmente antes de 6 horas."),
      mg("rabdo", "Hidratación EV y control de rabdomiólisis y potasio", "clave", "Protege el riñón."),
      mg("elevar", "Elevar la pierna por encima del corazón", "riesgoso", "Disminuye la presión de perfusión."),
      mg("mas-morfina", "Aumentar opioides y esperar a que desaparezca el pulso", "riesgoso", "El pulso se pierde tarde, con daño ya irreversible."),
      mg("hielo", "Hielo y control a las 12 horas", "riesgoso", "Pierde el tiempo crítico."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome compartimental agudo de pierna tras fractura de tibia, con yeso cerrado, en varón de 22 años.",
    pathologies: [
      { name: "Síndrome compartimental agudo", role: "principal", why: "Aumento de presión dentro de una fascia inextensible." },
      { name: "Rabdomiólisis", role: "asociada", why: "Por necrosis muscular." },
      { name: "Lesión arterial, TVP, dolor de la fractura", role: "diferencial", why: "Otras causas de dolor tras un trauma." },
    ],
    reasoning: [
      "Causa: fractura con edema y hemorragia, más un yeso ajustado.",
      "Mecanismo: la presión compartimental supera la de perfusión capilar y causa isquemia de músculo y nervio.",
      "Consecuencia: necrosis, contractura de Volkmann, déficit neurológico, rabdomiólisis e insuficiencia renal.",
    ],
    epidemiology:
      "Se asocia sobre todo a fracturas de tibia y de antebrazo en varones jóvenes, y los siniestros en moto son una causa muy frecuente en Argentina. También puede aparecer en quemaduras, aplastamientos y reperfusión. Es una urgencia que debe sospecharse en toda fractura.",
    management: [
      "Sospechar ante dolor desproporcionado.",
      "Retirar vendajes y yesos.",
      "Fasciotomía urgente; no esperar la pérdida de pulso.",
      "Controlar CPK y función renal.",
    ],
    sources: ["Asociación Argentina de Ortopedia y Traumatología — Recomendaciones de urgencias.", "ATLS — Curso de soporte vital avanzado en trauma."],
    pearls: ["Dolor desproporcionado y al estiramiento pasivo: lo primero.", "Pulso presente no descarta.", "No elevar el miembro."],
    pitfalls: ["Subir la analgesia sin revisar.", "Esperar las 5 P."],
    tribunal: [
      qa("¿Cuáles son las 5 P?", "Pain (dolor), parestesias, palidez, parálisis y ausencia de pulso (pulselessness); las últimas son tardías."),
      qa("¿Qué presión indica fasciotomía?", "Una presión diferencial (diastólica menos compartimental) menor de 30 mmHg apoya el diagnóstico, siempre junto con la clínica."),
      qa("¿Qué es la contractura de Volkmann?", "La secuela por necrosis y fibrosis muscular isquémica del antebrazo, con mano en garra, clásicamente tras fracturas supracondíleas."),
    ],
  },
};
