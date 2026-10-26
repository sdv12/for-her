import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const tecAnticoagulado: ClinicalCase = {
  id: "tec-leve-anticoagulado",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 74, ageUnit: "años", sex: "M", context: "Toma acenocumarol por fibrilación auricular." },
  frequency: "frecuente",
  intro: "“Me resbalé en el baño hace tres horas y me golpeé la cabeza contra el lavatorio. Me duele un poco, pero estoy bien. Mi hija insistió en traerme.”",
  vitals: { TA: "152/88 mmHg", FC: "82 lpm, irregular", FR: "16 rpm", "SatO₂": "96 %", Glasgow: "15" },
  anamnesis: [
    act("anticoag", "¿Qué anticoagulante toma y cuándo fue su último control de RIN?", "clave", "“Acenocumarol. El RIN de hace dos semanas dio 2,8.”", "La anticoagulación es por sí sola indicación de tomografía en un traumatismo de cráneo, aunque el paciente esté bien."),
    act("perdida", "¿Perdió el conocimiento? ¿Recuerda todo?", "clave", "“No me desmayé. Me acuerdo de todo.”", "La pérdida de conciencia y la amnesia aumentan el riesgo de lesión intracraneal."),
    act("sintomas", "¿Tiene vómitos, dolor de cabeza que empeora, somnolencia o debilidad?", "clave", "“Me duele la cabeza y vomité una vez.”", "Vómitos y cefalea progresiva son signos de alarma."),
    act("caida", "¿Se mareó antes de caerse?", "util", "“No, me resbalé.”", "Descarta síncope como causa."),
    act("alcohol", "¿Toma alcohol?", "util", "“Un vaso de vino.”", "El alcohol y la interacción con el acenocumarol aumentan el riesgo de sangrado."),
    act("equipo", "¿De qué equipo es?", "neutro", "“Talleres.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico y pupilas", "clave", "Glasgow 15, sin foco, pupilas iguales y reactivas.", "Un examen normal no descarta un hematoma en anticoagulados."),
    act("craneo", "Inspección del cráneo", "clave", "Hematoma subgaleal parietal derecho, sin hundimiento ni otorragia.", "Busca fractura de base (hematoma periorbitario, retroauricular, otorragia, rinorraquia)."),
    act("cervical", "Columna cervical", "util", "Sin dolor a la palpación.", "Descarta lesión cervical asociada."),
  ],
  studies: [
    study("Imágenes", "tc", "Tomografía de cerebro sin contraste", "clave", "Hematoma subdural agudo parietal derecho de 7 mm, sin desplazamiento de la línea media.", "Indicada en todo anticoagulado con traumatismo de cráneo."),
    study("Laboratorio", "rin", "RIN, hemograma y plaquetas", "clave", "RIN 3,6; plaquetas 210.000.", "Define la reversión de la anticoagulación."),
    study("Imágenes", "rx", "Radiografía de cráneo", "innecesario", "No se realizó.", "No muestra lesiones intracraneales; fue reemplazada por la tomografía."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Fibrilación auricular con respuesta adecuada.", "Basal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hsd", "Hematoma subdural agudo traumático en paciente anticoagulado", true, "Traumatismo de cráneo con acenocumarol, RIN 3,6, cefalea y vómitos, con tomografía que muestra hematoma subdural."),
      dx("leve", "Traumatismo de cráneo leve sin lesión", false, "La tomografía muestra un hematoma."),
      dx("epidural", "Hematoma epidural", false, "Es biconvexo (lente), por lesión arterial, típico con fractura temporal y intervalo lúcido."),
      dx("hsa", "Hemorragia subaracnoidea traumática", false, "Sangre en surcos y cisternas, no una colección en semiluna."),
      dx("contusion", "Contusión cerebral", false, "Lesión del parénquima, no una colección extraaxial."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reversion", "Revertir la anticoagulación: vitamina K endovenosa más concentrado de complejo protrombínico (o plasma)", "clave", "Detener el crecimiento del hematoma es la prioridad; la vitamina K sola tarda horas."),
      mg("neuroqx", "Interconsulta con neurocirugía e internación con controles neurológicos", "clave", "Define si es quirúrgico y vigila el deterioro."),
      mg("tc-control", "Tomografía de control en 6–24 h o ante cualquier deterioro", "clave", "Detecta la expansión del hematoma."),
      mg("reiniciar", "Decidir más adelante, con neurocirugía, cuándo reiniciar la anticoagulación", "util", "Balance entre el riesgo de sangrado y el de ACV."),
      mg("alta", "Alta con pautas de alarma porque está con Glasgow 15", "riesgoso", "Un anticoagulado con hematoma puede deteriorarse en horas: requiere internación."),
      mg("aspirina", "Pasar de acenocumarol a aspirina", "innecesario", "No es un tratamiento del hematoma y no protege adecuadamente contra el ACV en la FA."),
    ],
  },
  debrief: {
    diagnosis: "Hematoma subdural agudo traumático parietal derecho en paciente de 74 años anticoagulado con acenocumarol (RIN 3,6).",
    pathologies: [
      { name: "Hematoma subdural agudo", role: "principal", why: "Colección en semiluna tras un traumatismo." },
      { name: "Sobreanticoagulación", role: "asociada", why: "RIN por encima del rango (2–3)." },
      { name: "Hematoma epidural y contusión", role: "diferencial", why: "Otras lesiones traumáticas." },
    ],
    reasoning: [
      "Causa: traumatismo de cráneo en un adulto mayor anticoagulado.",
      "Mecanismo: el movimiento del cerebro dentro del cráneo estira y rompe las venas puente que van de la corteza a los senos durales; con la atrofia cerebral del anciano, esas venas están más tensas. La anticoagulación impide que el sangrado se detenga.",
      "Consecuencia: el sangrado venoso se acumula entre la duramadre y la aracnoides (semiluna) y puede crecer en horas, con aumento de la presión intracraneal.",
      "Por eso el anticoagulado con un golpe en la cabeza se estudia con tomografía aunque esté asintomático.",
    ],
    epidemiology:
      "Los traumatismos de cráneo leves son una consulta muy frecuente en guardia, y en adultos mayores se deben sobre todo a caídas. El hematoma subdural es más frecuente en varones y en mayores de 65 años, y su riesgo se multiplica con los anticoagulantes, los antiagregantes y el alcohol. El uso creciente de anticoagulantes en la fibrilación auricular aumentó estos casos.",
    management: [
      "Traumatismo de cráneo en anticoagulado: tomografía siempre.",
      "Si hay sangrado: revertir de inmediato (vitamina K y complejo protrombínico para antagonistas de la vitamina K; antídotos específicos para los anticoagulantes directos).",
      "Neurocirugía: evacuación si el hematoma es grande, hay desplazamiento o deterioro.",
      "Internación con controles neurológicos y tomografía de control.",
      "Revisar la indicación y el control de la anticoagulación y prevenir caídas.",
    ],
    sources: [
      "Asociación Argentina de Neurocirugía — Recomendaciones de manejo del traumatismo de cráneo leve.",
      "Grupo Cooperativo Argentino de Hemostasia y Trombosis — Reversión de anticoagulantes.",
    ],
    pearls: ["Anticoagulado + golpe en la cabeza = tomografía.", "Subdural: semiluna, venoso. Epidural: lente, arterial.", "Revertir rápido: vitamina K + complejo protrombínico."],
    pitfalls: ["Dar el alta por un Glasgow 15.", "Usar solo vitamina K.", "Pedir radiografía de cráneo."],
  },
};
