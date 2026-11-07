import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const antifosfolipidico: ClinicalCase = {
  id: "sindrome-antifosfolipidico",
  level: 4,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 31, ageUnit: "años", sex: "F", context: "Perdió tres embarazos entre las semanas 10 y 14. Hace un año tuvo una trombosis en la pierna, sin causa." },
  frequency: "poco-frecuente",
  intro: "“Quiero volver a buscar un hijo, pero perdí tres embarazos y tuve un coágulo en la pierna. Nadie me explicó por qué.”",
  vitals: { TA: "118/72 mmHg", FC: "72 lpm", "T°": "36,4 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("perdidas", "¿En qué semana fueron las pérdidas? ¿Latido fetal visto?", "clave", "“Semanas 10, 12 y 14, con latido.”", "Pérdidas fetales de 10 semanas o más: criterio clínico."),
    act("trombosis", "¿Cómo fue la trombosis? ¿Reposo, cirugía o viajes?", "clave", "“Sin nada de eso; estaba tomando pastillas anticonceptivas.”", "Trombosis no provocada en una persona joven."),
    act("lupus", "¿Dolor articular, sol, llagas, Raynaud?", "clave", "“Algo de dolor en las manos.”", "Buscar lupus asociado."),
    act("otros", "¿Tuviste ACV, migraña o problemas de plaquetas?", "util", "“Plaquetas algo bajas.”", "Manifestaciones asociadas."),
    act("familia", "¿Trombosis en la familia?", "util", "“No.”", "Trombofilias hereditarias."),
    act("ocupacion", "¿De qué trabajás?", "neutro", "“Soy peluquera.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Livedo reticularis en piernas.", "Hallazgo típico."),
    act("piernas", "Miembros inferiores", "util", "Edema leve residual en la izquierda.", "Secuela de trombosis."),
    act("articular", "Articulaciones y mucosas", "util", "Sin artritis ni úlceras.", "Evalúa lupus."),
  ],
  studies: [
    study("Laboratorio", "anticuerpos", "Anticoagulante lúpico, anticardiolipina y anti-beta2 glicoproteína I", "clave", "Los tres positivos a título alto, repetidos a las 12 semanas.", "Triple positividad: alto riesgo; se requiere repetir para confirmar."),
    study("Laboratorio", "kptt", "Coagulograma y hemograma", "clave", "KPTT prolongado que no corrige con plasma; plaquetas 110.000.", "El anticoagulante lúpico prolonga el KPTT in vitro, pero causa trombosis."),
    study("Laboratorio", "ana", "ANA y anti-DNA, complemento", "clave", "ANA 1/160, anti-DNA negativo.", "Descarta lupus definido."),
    study("Otros", "cariotipo", "Solo cariotipo de la pareja como explicación", "innecesario", "Normal.", "Se pide en pérdidas recurrentes, pero no explica la trombosis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("saf", "Síndrome antifosfolipídico primario, trombótico y obstétrico", true, "Trombosis no provocada, pérdidas fetales y anticuerpos positivos persistentes."),
      dx("lupus", "Lupus eritematoso sistémico", false, "No cumple criterios ni tiene anti-DNA positivo."),
      dx("leiden", "Factor V Leiden", false, "No explica el KPTT ni los anticuerpos."),
      dx("hemofilia", "Coagulopatía hemorrágica", false, "El KPTT está prolongado, pero no sangra: tiene trombosis."),
      dx("incompetencia", "Incompetencia cervical", false, "Da pérdidas tardías sin dolor, sin trombosis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("warfarina", "Anticoagulación indefinida con antagonistas de la vitamina K, RIN 2 a 3", "clave", "Previene recurrencias en SAF trombótico."),
      mg("embarazo", "Planificar: al buscar embarazo, cambiar a heparina de bajo peso con aspirina a dosis bajas", "clave", "Warfarina es teratogénica; el esquema mejora los nacidos vivos."),
      mg("sin-estrogenos", "Contraindicar anticonceptivos con estrógenos", "clave", "Aumentan la trombosis."),
      mg("factores", "Control de factores de riesgo vascular y consejería", "util", "Reduce eventos."),
      mg("doac", "Apixabán o rivaroxabán de primera línea con triple positividad", "riesgoso", "Tienen más eventos arteriales en este grupo."),
      mg("aspirina", "Solo aspirina con antecedente de trombosis", "riesgoso", "No alcanza para prevenir recurrencia."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome antifosfolipídico primario con trombosis venosa y pérdidas fetales recurrentes, triple positivo, en mujer de 31 años.",
    pathologies: [
      { name: "Síndrome antifosfolipídico", role: "principal", why: "Trombofilia autoinmune adquirida." },
      { name: "Pérdidas de embarazo y trombosis", role: "asociada", why: "Manifestaciones clínicas." },
      { name: "Lupus, trombofilias hereditarias, incompetencia cervical", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: autoanticuerpos contra proteínas ligadas a fosfolípidos.",
      "Mecanismo: activan endotelio, plaquetas y complemento, y alteran la placenta.",
      "Consecuencia: trombosis arterial y venosa, pérdidas fetales, preeclampsia y restricción de crecimiento.",
    ],
    epidemiology:
      "Es una causa adquirida importante de trombofilia en personas jóvenes, sobre todo mujeres, y se asocia con lupus en cerca de un tercio de los casos. Explica una parte de las pérdidas recurrentes de embarazo y de los ACV en jóvenes.",
    management: [
      "Sospechar ante trombosis en jóvenes o pérdidas recurrentes.",
      "Dos determinaciones separadas por 12 semanas.",
      "Anticoagulación con warfarina en la forma trombótica.",
      "Heparina y aspirina durante el embarazo.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Recomendaciones de síndrome antifosfolipídico.", "Sociedad Argentina de Hematología — Guías de trombofilia."],
    pearls: ["KPTT largo + trombosis: anticoagulante lúpico.", "Confirmar a las 12 semanas.", "Warfarina no en el embarazo."],
    pitfalls: ["Usar anticonceptivos con estrógenos.", "Confiar en una sola determinación."],
    tribunal: [
      qa("¿Qué criterios obstétricos tiene?", "Una o más muertes fetales de 10 semanas o más; uno o más partos prematuros antes de las 34 semanas por preeclampsia o insuficiencia placentaria; o tres o más abortos consecutivos antes de las 10 semanas."),
      qa("¿Por qué el anticoagulante lúpico prolonga el KPTT y causa trombosis?", "Porque interfiere con los fosfolípidos del reactivo in vitro, mientras que en el cuerpo activa la coagulación y el endotelio."),
      qa("¿Qué es el SAF catastrófico?", "Una forma rara con trombosis de pequeños vasos en al menos 3 órganos en una semana; tiene alta mortalidad."),
    ],
  },
};
