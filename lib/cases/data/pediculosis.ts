import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pediculosis: ClinicalCase = {
  id: "pediculosis-capitis",
  level: 1,
  area: "Dermatología",
  setting: "CAPS",
  patient: { age: 7, ageUnit: "años", sex: "F", context: "Pelo largo. En la escuela mandaron una nota por piojos." },
  frequency: "muy-frecuente",
  intro: "“Se rasca la cabeza todo el tiempo. Ya le pusimos un shampoo dos veces y siguen. Ahora tiene granitos en la nuca.” (relata la madre)",
  vitals: { FC: "90 lpm", "T°": "36,4 °C", Peso: "23 kg" },
  anamnesis: [
    act("tratamiento", "¿Qué producto usaron y cómo?", "clave", "“Un shampoo, lo dejamos dos minutos y lo enjuagamos; repetimos al otro día.”", "Uso incorrecto: tiempo de contacto insuficiente y sin repetir a los 7–10 días."),
    act("convivientes", "¿Alguien más en la casa se rasca?", "clave", "“La hermana y yo.”", "Hay que revisar y tratar a todos los infestados a la vez."),
    act("liendrera", "¿Usaron peine fino?", "clave", "“No.”", "El peine fino es parte fundamental del tratamiento."),
    act("granitos", "¿Los granitos supuran o duelen?", "util", "“Algunos tienen costra amarilla.”", "Impetiginización por rascado."),
    act("caseros", "¿Usaron kerosene u otros productos caseros?", "util", "“La abuela quería ponerle kerosene.”", "Peligroso: quemaduras e intoxicación."),
    act("cancion", "¿Cuál es su canción favorita?", "neutro", "“Una de Tini.”", "No orienta."),
  ],
  exam: [
    act("cuero", "Examen del cuero cabelludo con peine fino", "clave", "Piojos vivos y liendres a menos de 1 cm del cuero cabelludo, sobre todo en nuca y detrás de las orejas.", "Infestación activa."),
    act("nuca", "Piel de la nuca", "util", "Excoriaciones con costras melicéricas.", "Impétigo secundario."),
    act("ganglios", "Ganglios", "util", "Adenopatías occipitales pequeñas.", "Por la sobreinfección."),
  ],
  studies: [
    study("Laboratorio", "lab", "Laboratorio", "innecesario", "No se realizó.", "No aporta."),
    study("Otros", "dermatoscopia", "Observación de una liendre con lupa si hay dudas", "util", "Liendre con embrión.", "Diferencia liendres de caspa."),
    study("Microbiología", "cultivo", "Cultivo de las lesiones de la nuca", "innecesario", "No se realizó.", "Impétigo localizado: diagnóstico clínico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pediculosis", "Pediculosis de la cabeza con impétigo secundario, con fracaso por uso incorrecto del tratamiento", true, "Prurito, piojos vivos y liendres cercanas al cuero cabelludo, convivientes afectados y producto mal aplicado."),
      dx("dermatitis", "Dermatitis seborreica", false, "Hay piojos vivos."),
      dx("tina", "Tiña de la cabeza", false, "No hay placa alopécica."),
      dx("escabiosis", "Escabiosis", false, "La sarna no afecta el cuero cabelludo en niños de esta edad."),
      dx("resistencia", "Resistencia segura a todos los tratamientos", false, "El fracaso se explica por el uso incorrecto."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("pediculicida", "Pediculicida (permetrina 1 % o dimeticona) aplicado según indicaciones, con el tiempo correcto, y repetir a los 7–10 días", "clave", "La repetición elimina los piojos que nacen de las liendres."),
      mg("peine", "Peine fino sobre el pelo húmedo con acondicionador cada 2–3 días por 2 semanas", "clave", "Retira piojos y liendres."),
      mg("familia", "Revisar a toda la familia y tratar a la vez a los infestados", "clave", "Evita la reinfestación."),
      mg("impetigo", "Tratar el impétigo con antibiótico tópico", "util", "Sobreinfección."),
      mg("kerosene", "Kerosene, vinagre puro o insecticidas para plantas", "riesgoso", "Quemaduras, intoxicaciones e incendios."),
      mg("faltar", "Que no vaya a la escuela hasta no tener ninguna liendre", "innecesario", "No se recomienda excluir de la escuela."),
    ],
  },
  debrief: {
    diagnosis: "Pediculosis de la cabeza con impétigo secundario en la nuca, con fracaso del tratamiento por aplicación incorrecta, en niña de 7 años con convivientes afectados.",
    pathologies: [
      { name: "Pediculosis capitis", role: "principal", why: "Infestación por Pediculus humanus capitis." },
      { name: "Impétigo secundario", role: "asociada", why: "Por el rascado." },
      { name: "Dermatitis seborreica, tiña, escabiosis", role: "diferencial", why: "Otras causas de prurito del cuero cabelludo." },
    ],
    reasoning: [
      "Causa: contagio por contacto directo cabeza con cabeza.",
      "Mecanismo: el piojo se alimenta de sangre y su saliva produce prurito; las hembras pegan liendres al pelo cerca del cuero cabelludo.",
      "Consecuencia: prurito, lesiones de rascado, sobreinfección, alteración del sueño.",
    ],
    epidemiology:
      "La pediculosis es muy frecuente en escolares de 3 a 12 años en Argentina, más en niñas y con pelo largo, sin relación con la higiene. Los fracasos de tratamiento suelen deberse a una mala técnica, falta de repetición o reinfestación.",
    management: [
      "Diagnóstico con piojos vivos.",
      "Pediculicida bien aplicado y repetido.",
      "Peine fino y tratamiento simultáneo de convivientes.",
      "Educación sin estigmatizar.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de pediculosis.", "Sociedad Argentina de Dermatología — Recomendaciones."],
    pearls: ["Repetir a los 7–10 días.", "Peine fino siempre.", "Tratar a todos los infestados a la vez."],
    pitfalls: ["Productos caseros peligrosos.", "Excluir de la escuela."],
    tribunal: [
      qa("¿Qué ciclo de vida tiene el piojo?", "Las liendres eclosionan en 7–10 días, las ninfas maduran en otros 7–10 días y los adultos viven unas 3–4 semanas; por eso se repite el tratamiento a los 7–10 días."),
      qa("¿Qué diferencia una liendre de la caspa?", "La liendre está adherida firmemente al pelo, con forma ovalada, y no se desprende al soplar; la caspa se desprende con facilidad."),
      qa("¿Qué es la dimeticona?", "Un pediculicida físico (silicona) que asfixia y deshidrata al piojo, sin resistencia descripta; es una opción segura y eficaz."),
    ],
  },
};
