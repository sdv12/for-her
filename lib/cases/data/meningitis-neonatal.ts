import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const meningitisNeonatal: ClinicalCase = {
  id: "meningitis-neonatal-estreptococo-grupo-b",
  level: 3,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 18, ageUnit: "días", sex: "M", context: "Nació a término. Madre con cultivo para estreptococo positivo, sin profilaxis completa." },
  frequency: "frecuente",
  intro: "“Desde ayer no quiere tomar la teta, está decaído, duerme mucho y ahora tiene fiebre. La mollera parece hinchada.”",
  vitals: { FC: "178 lpm", FR: "62 rpm", "T°": "38,6 °C", "SatO₂": "95 %", Peso: "3,4 kg", Glucemia: "52 mg/dl" },
  anamnesis: [
    act("perinatal", "¿Cómo fue el parto? ¿Cultivo para estreptococo?", "clave", "“Positivo; me dieron poco antibiótico.”", "Factor de riesgo."),
    act("sintomas", "¿Cuándo empezó? ¿Convulsiones?", "clave", "“Ayer; se puso rígido una vez.”", "Convulsión."),
    act("contacto", "¿Herpes materno, lesiones?", "clave", "“No.”", "HSV."),
    act("alimentacion", "¿Cuánto come y moja pañales?", "util", "“Muy poco.”", "Hidratación."),
    act("vacunas", "¿Tiene BCG?", "util", "“Sí.”", "Base."),
    act("nombre", "¿Cómo lo llamaron?", "neutro", "“Bruno.”", "No orienta."),
  ],
  exam: [
    act("fontanela", "Fontanela y tono", "clave", "Abombada; hipotónico e irritable.", "HTE."),
    act("perfusion", "Perfusión", "clave", "Relleno de 4 segundos.", "Sepsis."),
    act("piel", "Piel y boca", "util", "Sin vesículas.", "HSV."),
  ],
  studies: [
    study("Otros", "lcr", "Punción lumbar, si está estable", "clave", "Neutrófilos 2.800; proteínas 340; glucosa 18; cocos gram positivos.", "Bacteriana."),
    study("Laboratorio", "cultivos", "Hemocultivo, urocultivo, PCR para HSV en LCR", "clave", "Streptococcus agalactiae.", "Confirma."),
    study("Laboratorio", "lab", "Hemograma, glucosa, ionograma, PCR", "clave", "Leucopenia, PCR alta.", "Sepsis."),
    study("Imágenes", "eco", "Ecografía transfontanelar", "util", "Ventriculitis leve.", "Complicaciones."),
    study("Otros", "esperar", "Esperar el resultado antes de los antibióticos", "riesgoso", "No se realizó.", "Muerte o secuelas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mening", "Meningitis neonatal tardía por estreptococo del grupo B", true, "Fontanela abombada, fiebre, LCR bacteriano y cultivo."),
      dx("hsv", "Encefalitis herpética neonatal", false, "LCR y cultivo bacteriano."),
      dx("lm", "Listeria", false, "Cocos gram positivos."),
      dx("itu", "ITU neonatal", false, "LCR alterado."),
      dx("fiebre", "Sobreabrigo", false, "Signos de sepsis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Ampicilina y cefotaxima, ajustando según cultivo", "clave", "Cubre EGB, E. coli y Listeria."),
      mg("aciclovir", "Aciclovir empírico hasta descartar HSV", "clave", "Hasta tener PCR."),
      mg("uti", "Terapia neonatal con soporte", "clave", "Grave."),
      mg("seguimiento", "Audición y neurodesarrollo", "clave", "Secuelas frecuentes."),
      mg("ceftriaxona", "Ceftriaxona en neonato con ictericia o calcio", "riesgoso", "Riesgo de kernicterus y precipitación."),
      mg("corticoide", "Dexametasona de rutina", "riesgoso", "Sin evidencia en neonatos."),
    ],
  },
  debrief: {
    diagnosis: "Meningitis neonatal tardía por Streptococcus agalactiae, en lactante de 18 días.",
    pathologies: [
      { name: "Meningitis neonatal", role: "principal", why: "Infección del SNC." },
      { name: "Sepsis neonatal tardía", role: "asociada", why: "Compromiso sistémico." },
      { name: "HSV, Listeria, ITU", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: S. agalactiae, de la madre o del entorno.",
      "Mecanismo: bacteriemia y paso de la barrera.",
      "Consecuencia: sepsis, convulsiones, hipoacusia y secuelas.",
    ],
    epidemiology:
      "Los gérmenes varían por edad: en neonatos predominan el estreptococo del grupo B, E. coli y Listeria; luego, neumococo y meningococo. La profilaxis intraparto reduce la forma precoz, pero no la tardía. Toda fiebre en menores de 28 días es una urgencia y requiere estudio completo.",
    management: [
      "Fiebre neonatal: estudio completo.",
      "Antibiótico sin demora.",
      "LCR.",
      "Seguimiento.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de meningitis.", "Ministerio de Salud de la Nación — Infecciones perinatales."],
    pearls: ["Fiebre en menor de 28 días: internar.", "Ampicilina para Listeria.", "Hipoacusia."],
    pitfalls: ["Dar ceftriaxona.", "No dar aciclovir."],
    tribunal: [
      qa("¿Qué gérmenes causan meningitis según edad?", "Neonato: EGB, E. coli, Listeria. Lactante y niño: neumococo, meningococo. Adulto mayor: neumococo y Listeria."),
      qa("¿Cuál es la diferencia entre sepsis neonatal precoz y tardía?", "Precoz: primeras 72 horas, vía vertical. Tardía: después, adquirida en el entorno."),
      qa("¿Por qué hay riesgo con ceftriaxona en neonatos?", "Desplaza bilirrubina y precipita con calcio EV."),
    ],
  },
};
