import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const bloqueoAv: ClinicalCase = {
  id: "bloqueo-av-completo",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 78, ageUnit: "años", sex: "M", context: "Hipertenso. Toma atenolol. Nació en Santiago del Estero." },
  frequency: "poco-frecuente",
  intro: "“Me desmayé dos veces esta semana, de golpe, sin aviso. Me caí en la cocina. Estoy muy cansado y me mareo al caminar.”",
  vitals: { TA: "168/58 mmHg", FC: "34 lpm", FR: "18 rpm", "T°": "36,4 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("sincope", "¿Cómo fueron los desmayos? ¿Tuviste aviso?", "clave", "“De golpe, sin aviso, en segundos me recuperé.”", "Síncope súbito sin pródromo: sugiere causa arrítmica (Stokes-Adams)."),
    act("farmacos", "¿Qué remedios tomás? ¿Cambió la dosis?", "clave", "“Atenolol, y me lo aumentaron hace un mes.”", "Los betabloqueantes pueden empeorar un trastorno de conducción."),
    act("chagas", "¿Te hiciste estudios de Chagas?", "clave", "“No, pero mi mamá tenía.”", "El Chagas es una causa frecuente de bloqueos en Argentina."),
    act("dolor", "¿Dolor de pecho o falta de aire?", "util", "“No.”", "Descarta isquemia como causa."),
    act("golpe", "¿Te golpeaste la cabeza al caer?", "util", "“La frente, sin perder más el conocimiento.”", "Lesiones por el síncope."),
    act("radio", "¿Escuchás radio?", "neutro", "“Chacarera.”", "No orienta."),
  ],
  exam: [
    act("pulso", "Pulso y auscultación", "clave", "Bradicardia regular a 34, primer ruido de intensidad variable, ondas a en cañón en el cuello.", "Disociación auriculoventricular."),
    act("perfusion", "Perfusión y estado mental", "clave", "Lúcido, perfusión conservada.", "Estable por ahora."),
    act("congestion", "Signos de insuficiencia cardíaca", "util", "Rales bibasales leves.", "Bajo gasto por bradicardia."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Ondas P a 80 lpm sin relación con QRS anchos a 34 lpm.", "Bloqueo AV completo (tercer grado) con escape ventricular."),
    study("Laboratorio", "lab", "Potasio, troponina, TSH, función renal, serología para Chagas", "clave", "K normal, troponina normal, Chagas reactivo.", "Descarta causas reversibles y orienta a Chagas."),
    study("Imágenes", "eco", "Ecocardiograma", "util", "Leve dilatación del ventrículo izquierdo, trastornos segmentarios.", "Miocardiopatía chagásica."),
    study("Otros", "holter", "Holter de 24 h antes de decidir", "innecesario", "No se realizó.", "El bloqueo completo ya está documentado."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("bav3", "Bloqueo AV completo sintomático (síncope de Stokes-Adams) por miocardiopatía chagásica, agravado por betabloqueante", true, "Síncopes súbitos, bradicardia de 34, disociación AV en el ECG, ondas a en cañón, Chagas reactivo y aumento de atenolol."),
      dx("vasovagal", "Síncope vasovagal", false, "Sin pródromo ni desencadenante, con bloqueo completo."),
      dx("bav1", "Bloqueo AV de primer grado", false, "No hay relación entre P y QRS."),
      dx("mobitz1", "Bloqueo AV de segundo grado Mobitz I", false, "No hay alargamiento progresivo del PR; hay disociación completa."),
      dx("hiperk", "Hiperpotasemia", false, "Potasio normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("marcapasos", "Marcapasos definitivo", "clave", "El bloqueo AV completo sintomático no reversible es indicación de marcapasos."),
      mg("transitorio", "Monitoreo, parches de marcapaseo transcutáneo listos y marcapasos transitorio si se descompensa", "clave", "Riesgo de asistolia."),
      mg("suspender", "Suspender el atenolol", "clave", "Empeora la conducción."),
      mg("atropina", "Atropina si hay inestabilidad", "util", "Suele ser poco eficaz en bloqueos infranodales; se usan isoproterenol o marcapaseo."),
      mg("alta", "Alta y control con Holter ambulatorio", "riesgoso", "Riesgo de muerte súbita."),
      mg("betabloqueante-mas", "Aumentar el atenolol por la hipertensión", "riesgoso", "Empeora el bloqueo."),
    ],
  },
  debrief: {
    diagnosis: "Bloqueo auriculoventricular completo sintomático con síncopes de Stokes-Adams, por miocardiopatía chagásica, agravado por betabloqueante, en varón de 78 años.",
    pathologies: [
      { name: "Bloqueo AV completo", role: "principal", why: "Ningún impulso auricular llega a los ventrículos." },
      { name: "Miocardiopatía chagásica", role: "asociada", why: "Causa del daño del sistema de conducción." },
      { name: "Síncope vasovagal, hiperpotasemia, bloqueos menores", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: fibrosis del sistema de conducción por Chagas o por degeneración con la edad; los betabloqueantes empeoran.",
      "Mecanismo: el nodo AV o el haz de His no conducen; el ventrículo late con un ritmo de escape lento.",
      "Consecuencia: bajo gasto, síncopes, insuficiencia cardíaca y muerte súbita.",
    ],
    epidemiology:
      "Los bloqueos AV de alto grado son más frecuentes en mayores por degeneración del sistema de conducción. En Argentina, la miocardiopatía chagásica es una causa importante de bloqueos y de implante de marcapasos.",
    management: [
      "ECG en todo síncope.",
      "Buscar causas reversibles (fármacos, potasio, isquemia, hipotiroidismo).",
      "Inestable: atropina, isoproterenol, marcapaseo transcutáneo o transitorio.",
      "Marcapasos definitivo si no es reversible.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de marcapasos y estimulación cardíaca.", "Ministerio de Salud de la Nación — Guía de atención al paciente con Chagas."],
    pearls: ["Síncope sin aviso = arritmia.", "Ondas a en cañón = disociación AV.", "Chagas causa bloqueos."],
    pitfalls: ["Atribuirlo a vasovagal.", "Seguir con el betabloqueante."],
    tribunal: [
      qa("¿Cómo se clasifican los bloqueos AV?", "Primer grado: PR mayor de 200 ms, todas conducen. Segundo grado Mobitz I: PR que se alarga hasta que una P no conduce (benigno, nodal). Mobitz II: P no conducidas sin alargamiento previo (infranodal, riesgo de progresar). Tercer grado: disociación completa."),
      qa("¿Qué alteraciones del ECG produce el Chagas?", "Bloqueo de rama derecha con hemibloqueo anterior izquierdo (lo más típico), extrasístoles ventriculares, bloqueos AV, fibrilación auricular, ondas Q y bajo voltaje."),
      qa("¿Qué es el síncope de Stokes-Adams?", "Un síncope brusco y breve por una pausa o bradicardia extrema (bloqueo AV completo o asistolia), sin pródromo, con recuperación rápida, a veces con convulsiones por hipoxia cerebral."),
    ],
  },
};
