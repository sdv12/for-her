import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const molaHidatiforme: ClinicalCase = {
  id: "mola-hidatiforme-completa",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 19, ageUnit: "años", sex: "F", context: "Embarazo de 11 semanas por fecha, sin ecografía todavía." },
  frequency: "poco-frecuente",
  intro: "“Sangro hace una semana. Vomito todo el día y la panza está más grande de lo que me dijeron.”",
  vitals: { TA: "142/92 mmHg", FC: "104 lpm", FR: "18 rpm", "T°": "36,7 °C", "SatO₂": "99 %", Peso: "57 kg" },
  anamnesis: [
    act("sangrado", "¿Cómo es el sangrado? ¿Salió algo?", "clave", "“Oscuro; salieron como uvitas.”", "Vesículas típicas."),
    act("vomitos", "¿Vómitos intensos?", "clave", "“Muchísimos.”", "hCG alta."),
    act("tiroides", "¿Palpitaciones, temblores, calor?", "clave", "“Sí, temblores.”", "hCG estimula TSHR."),
    act("previo", "¿Mola o abortos previos?", "util", "“Primero.”", "Riesgo."),
    act("edad", "¿Edad de la pareja? ¿Métodos?", "util", "“No me cuidaba.”", "Anticoncepción."),
    act("celu", "¿Tenés mascota?", "neutro", "“Un loro.”", "No orienta."),
  ],
  exam: [
    act("utero", "Altura uterina", "clave", "Útero de 16 semanas; sin latidos.", "Mayor que la edad gestacional."),
    act("tacto", "Especuloscopía", "clave", "Sangrado oscuro, cuello cerrado.", "Exclusión."),
    act("tiroides-ex", "Tiroides y signos", "util", "Temblor fino, taquicardia.", "Hipertiroidismo."),
  ],
  studies: [
    study("Laboratorio", "hcg", "Beta-hCG cuantitativa", "clave", "520.000 mUI/ml.", "Muy elevada."),
    study("Imágenes", "eco", "Ecografía transvaginal", "clave", "Patrón en copos de nieve, sin embrión; quistes tecaluteínicos.", "Característico."),
    study("Laboratorio", "lab", "Hemograma, grupo, TSH, función hepática", "clave", "TSH suprimida; Hb 9,8; O positivo.", "Comorbilidades."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Normal.", "Basal por metástasis."),
    study("Imágenes", "pet", "PET-TC de entrada", "innecesario", "No se realizó.", "No hace falta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mola", "Enfermedad trofoblástica gestacional: mola hidatiforme completa", true, "Útero grande, hCG muy alta, vesículas, y patrón en copos de nieve."),
      dx("hiperemesis", "Hiperemesis gravídica", false, "No explica el útero ni la eco."),
      dx("aborto", "Aborto incompleto", false, "No hay restos típicos ni embrión."),
      dx("preeclampsia", "Preeclampsia", false, "Antes de 20 semanas pensá en mola."),
      dx("ectopico", "Embarazo ectópico", false, "Hay contenido en el útero."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aspiracion", "Evacuación por aspiración con preparación para hemorragia", "clave", "Tratamiento de elección."),
      mg("seguimiento", "Seguimiento semanal con beta-hCG hasta negativizar, y luego mensual", "clave", "Detecta neoplasia trofoblástica."),
      mg("anticoncepcion", "Anticoncepción efectiva durante el seguimiento", "clave", "Un embarazo confunde la hCG."),
      mg("tiroides", "Betabloqueante si hay hipertiroidismo", "util", "Antes del procedimiento."),
      mg("misoprostol", "Misoprostol para inducción", "riesgoso", "Aumenta embolización trofoblástica."),
      mg("sin-seguir", "Alta sin más controles", "riesgoso", "Riesgo de coriocarcinoma."),
    ],
  },
  debrief: {
    diagnosis: "Mola hidatiforme completa con hiperemesis e hipertiroidismo por hCG, en mujer de 19 años.",
    pathologies: [
      { name: "Mola hidatiforme", role: "principal", why: "Enfermedad trofoblástica gestacional." },
      { name: "Hipertiroidismo, hiperemesis, HTA temprana", role: "asociada", why: "Por hCG." },
      { name: "Hiperemesis, aborto, ectópico", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: fecundación anormal; óvulo sin ADN materno en la completa.",
      "Mecanismo: proliferación trofoblástica sin embrión.",
      "Consecuencia: hCG muy alta, y riesgo de neoplasia.",
    ],
    epidemiology:
      "Afecta a cerca de 1 de cada 1.000 embarazos, más en adolescentes y mayores de 40. Cerca del 15 al 20 % de las molas completas evoluciona a neoplasia trofoblástica, que tiene tasa de curación muy alta si el seguimiento es correcto.",
    management: [
      "Sospecha y eco.",
      "Evacuación.",
      "Seguimiento de hCG.",
      "Anticoncepción.",
    ],
    sources: ["FASGO — Consenso sobre enfermedad trofoblástica gestacional.", "FIGO — Cancer Report: Gestational Trophoblastic Disease."],
    pearls: ["Vesículas en racimo.", "Preeclampsia antes de las 20 semanas: mola.", "hCG hasta negativizar."],
    pitfalls: ["Alta sin controles.", "No dar anticoncepción."],
    tribunal: [
      qa("¿En qué se diferencian mola completa y parcial?", "Completa: 46,XX paterno, sin embrión, hCG muy alta. Parcial: triploide, con restos fetales."),
      qa("¿Por qué hay hipertiroidismo?", "La hCG tiene similitud con TSH y estimula su receptor."),
      qa("¿Cómo se trata la neoplasia trofoblástica?", "Metotrexato o actinomicina D; si es de alto riesgo, poliquimioterapia."),
    ],
  },
};
