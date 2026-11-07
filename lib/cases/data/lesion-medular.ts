import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const lesionMedular: ClinicalCase = {
  id: "lesion-medular-cervical",
  level: 4,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 20, ageUnit: "años", sex: "M", context: "Se tiró de cabeza a un río poco profundo hace una hora, en un asado. Lo sacaron sus amigos sin inmovilizar." },
  frequency: "poco-frecuente",
  intro: "“Me tiré de cabeza, me golpeé y no puedo mover las piernas ni los brazos. Me cuesta respirar.”",
  vitals: { TA: "84/48 mmHg", FC: "52 lpm", FR: "26 rpm", "T°": "35,6 °C", "SatO₂": "91 %", Glasgow: "15/15" },
  anamnesis: [
    act("mecanismo", "¿Cómo fue? ¿Perdiste el conocimiento?", "clave", "“De cabeza al río; no me desmayé.”", "Compresión axial en flexión: fractura cervical."),
    act("sensibilidad", "¿Qué sentís en el cuerpo?", "clave", "“Nada de los hombros para abajo.”", "Nivel sensitivo: lesión medular."),
    act("alcohol", "¿Tomaste alcohol o drogas?", "util", "“Cuatro cervezas.”", "Se trata igual."),
    act("ample", "¿Alergias y medicación?", "util", "“Nada.”", "AMPLE."),
    act("cuello", "¿Te duele el cuello?", "clave", "“Muchísimo.”", "Punto de la lesión."),
    act("amigos", "¿Quiénes estaban?", "neutro", "“Amigos.”", "No orienta."),
  ],
  exam: [
    act("abcde", "ABCDE con restricción de movilidad cervical y alineado en bloque", "clave", "Vía aérea permeable, respiración abdominal paradojal.", "Lesión alta: riesgo de falla."),
    act("neuro", "Neurológico: fuerza, sensibilidad, reflejos, tono anal", "clave", "Sin fuerza desde C6, nivel sensitivo C5-C6, arreflexia, tono anal ausente.", "Lesión completa en shock medular."),
    act("shock", "Perfusión", "clave", "Hipotensión con bradicardia, piel caliente y seca.", "Shock neurogénico."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de columna cervical", "clave", "Fractura-luxación C5-C6.", "Ve la fractura."),
    study("Imágenes", "rmn", "RM de columna", "clave", "Sección medular parcial, edema y hematoma.", "Evalúa lesión medular."),
    study("Imágenes", "efast", "eFAST", "clave", "Negativo.", "Excluye otra fuente de shock."),
    study("Imágenes", "rx-flexion", "Radiografías dinámicas en flexión y extensión", "riesgoso", "No se realizó.", "Pueden empeorar la lesión."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("medular", "Lesión medular cervical C5-C6 completa con shock neurogénico", true, "Tetraplejía, nivel sensitivo, hipotensión con bradicardia y fractura-luxación."),
      dx("hipovolemico", "Shock hipovolémico", false, "Daría taquicardia y piel fría; eFAST negativo."),
      dx("central", "Síndrome medular central", false, "Afecta más los brazos, con sensibilidad parcial."),
      dx("tec", "TEC grave", false, "Glasgow 15."),
      dx("conversivo", "Trastorno funcional", false, "Hay lesión estructural."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("inmovilizar", "Restricción de movilidad cervical, traslado en bloque", "clave", "Previene daño secundario."),
      mg("via-aerea", "Asegurar vía aérea temprana, con cuidado, y soporte ventilatorio", "clave", "Por parálisis de intercostales y edema."),
      mg("presion", "Líquidos y vasopresores con PAM de 85-90 mmHg por 5 a 7 días; atropina si hay bradicardia", "clave", "Mejora la perfusión medular."),
      mg("descompresion", "Neurocirugía: reducción y estabilización tempranas", "clave", "Mejor en las primeras 24 horas."),
      mg("corticoides", "Metilprednisolona en altas dosis de rutina", "riesgoso", "No demostró beneficio claro, y aumenta complicaciones."),
      mg("cuidados", "Prevenir úlceras, trombosis, retención y disreflexia", "util", "Mejora la evolución."),
    ],
  },
  debrief: {
    diagnosis: "Lesión medular cervical completa C5-C6 con shock neurogénico tras zambullida en aguas poco profundas, en varón de 20 años.",
    pathologies: [
      { name: "Lesión medular", role: "principal", why: "Sección medular traumática." },
      { name: "Shock neurogénico", role: "asociada", why: "Pérdida del tono simpático." },
      { name: "Shock hipovolémico, síndrome central, TEC", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: flexocompresión al golpear con la cabeza en el fondo.",
      "Mecanismo: daño primario por la fractura y secundario por isquemia y edema.",
      "Consecuencia: pérdida motora y sensitiva; hipotensión con bradicardia.",
    ],
    epidemiology:
      "Predomina en varones jóvenes, con siniestros viales, caídas, y zambullidas en verano, muchas veces con alcohol. Es una causa evitable de discapacidad permanente. Las campañas de prevención y el rescate correcto reducen el daño.",
    management: [
      "Sospechar y proteger la columna.",
      "Vía aérea y hemodinamia.",
      "TC, RM y cirugía temprana.",
      "Rehabilitación y prevención de complicaciones.",
    ],
    sources: ["ATLS — Curso de soporte vital avanzado en trauma.", "Asociación Argentina de Neurocirugía — Recomendaciones."],
    pearls: ["Hipotensión con bradicardia en trauma: neurogénico.", "Zambullida: flexocompresión.", "No hacer radiografías dinámicas en agudo."],
    pitfalls: ["Atribuir la hipotensión solo a sangrado sin buscar.", "Movilizar sin inmovilizar."],
    tribunal: [
      qa("¿Qué diferencia shock neurogénico de medular?", "El neurogénico es hemodinámico: hipotensión y bradicardia. El medular es neurológico: pérdida transitoria de reflejos bajo la lesión."),
      qa("¿Qué son los síndromes medulares incompletos?", "Central (brazos), anterior (motor con vibración conservada), Brown-Séquard (motor y propiocepción ipsilateral; dolor contralateral)."),
      qa("¿Qué es la escala ASIA?", "Clasifica la lesión de A (completa) a E (normal)."),
    ],
  },
};
