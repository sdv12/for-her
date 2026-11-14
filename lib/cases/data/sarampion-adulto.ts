import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sarampionAdulto: ClinicalCase = {
  id: "sarampion-adulto-importado",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 29, ageUnit: "años", sex: "M", context: "Volvió hace 12 días de un viaje por Europa. No sabe si está vacunado." },
  frequency: "raro",
  intro: "“Hace cuatro días tengo fiebre alta, tos, ojos rojos y moco, y hoy me salieron manchas en la cara que bajan al cuerpo.”",
  vitals: { TA: "118/72 mmHg", FC: "104 lpm", FR: "22 rpm", "T°": "39,4 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("viaje", "¿Viajaste y dónde?", "clave", "“Europa, en zonas con brotes.”", "Caso importado."),
    act("vacunas", "¿Tenés dos dosis de vacuna contra sarampión?", "clave", "“No sé, no tengo carnet.”", "Susceptible."),
    act("secuencia", "¿Primero catarro y fiebre, y después las manchas?", "clave", "“Sí.”", "Pródromo típico."),
    act("contactos", "¿Con quién estuviste desde que volviste?", "util", "“Trabajo en un jardín de infantes.”", "Contactos de riesgo."),
    act("embarazo-contacto", "¿Convivís con embarazadas o bebés?", "util", "“Mi hermana embarazada vive conmigo.”", "Contacto de riesgo."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy profe de música.”", "No orienta."),
  ],
  exam: [
    act("exantema", "Piel", "clave", "Exantema maculopapular confluente desde la cara hacia el tronco.", "Sarampión."),
    act("koplik", "Mucosa oral", "clave", "Manchas de Koplik.", "Patognomónicas."),
    act("pulmon", "Pulmón", "util", "Rales en base derecha.", "Neumonía."),
  ],
  studies: [
    study("Laboratorio", "igm-pcr", "IgM y PCR de sarampión en sangre, orina e hisopado", "clave", "Positivas.", "Confirma."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Infiltrado intersticial basal derecho.", "Neumonía."),
    study("Laboratorio", "hemograma", "Hemograma y transaminasas", "util", "Linfopenia y transaminasas leves.", "Típico."),
    study("Otros", "sala-comun", "Dejarlo en la sala de espera común", "riesgoso", "No se hizo.", "Contagio aéreo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sarampion", "Sarampión importado con neumonía en adulto no vacunado", true, "Fiebre, tos, coriza, conjuntivitis, Koplik, exantema cefalocaudal tras viaje y PCR positiva."),
      dx("rubeola", "Rubéola", false, "Sin Koplik y es más leve."),
      dx("dengue", "Dengue", false, "Catarro, Koplik y viaje a Europa."),
      dx("alergia", "Reacción medicamentosa", false, "Pródromo catarral típico."),
      dx("escarlatina", "Escarlatina", false, "Adulto, Koplik y PCR positiva."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aislamiento", "Aislamiento respiratorio aéreo hasta 4 días después del exantema", "clave", "Muy contagioso."),
      mg("notificar", "Notificación inmediata y búsqueda de contactos", "clave", "Eliminación del sarampión."),
      mg("vitamina-a", "Vitamina A", "clave", "Reduce complicaciones."),
      mg("contactos-mg", "Vacuna o gammaglobulina a contactos según edad y embarazo", "util", "Hermana embarazada: gammaglobulina."),
      mg("atb-rutina", "Antibióticos de rutina sin sobreinfección", "riesgoso", "No trata el virus."),
      mg("vacuna-embarazada", "Vacunar a la hermana embarazada", "riesgoso", "Vacuna a virus vivo contraindicada en el embarazo."),
    ],
  },
  debrief: {
    diagnosis: "Sarampión importado con neumonía en adulto de 29 años no vacunado.",
    pathologies: [
      { name: "Sarampión", role: "principal", why: "Virus muy contagioso, aéreo." },
      { name: "Neumonía", role: "asociada", why: "Complicación frecuente en adultos." },
      { name: "Rubéola, dengue", role: "diferencial", why: "Otros exantemas febriles." },
    ],
    reasoning: [
      "Causa: virus del sarampión en un adulto susceptible.",
      "Mecanismo: replicación respiratoria y viremia con inmunosupresión transitoria.",
      "Consecuencia: exantema, neumonía y encefalitis en casos graves.",
    ],
    epidemiology:
      "Argentina eliminó la circulación endémica, pero hay casos importados y brotes por baja cobertura. Los adultos nacidos después de 1965 sin dos dosis son susceptibles. Cada caso es una emergencia de salud pública.",
    management: [
      "Sospechar con viaje.",
      "Aislar.",
      "Notificar.",
      "Contactos.",
    ],
    sources: ["Ministerio de Salud de la Nación — Sarampión: guía para el equipo de salud.", "OPS — Plan de acción para la sostenibilidad de la eliminación del sarampión."],
    pearls: ["Fiebre, tos, coriza, conjuntivitis.", "Koplik.", "Aislar ya."],
    pitfalls: ["Sala común.", "No notificar."],
    tribunal: [
      qa("¿Qué es la panencefalitis esclerosante subaguda?", "Complicación neurológica tardía y mortal años después del sarampión."),
      qa("¿Qué profilaxis tiene un contacto susceptible?", "Vacuna en las primeras 72 horas o gammaglobulina hasta los 6 días si no puede vacunarse."),
      qa("¿Quiénes deben tener dos dosis?", "Toda persona nacida después de 1965 mayor de 5 años."),
    ],
  },
};
