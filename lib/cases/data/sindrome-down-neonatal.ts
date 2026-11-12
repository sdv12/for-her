import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sindromeDownNeonatal: ClinicalCase = {
  id: "sindrome-down-neonatal",
  level: 2,
  area: "Pediatría",
  setting: "Internación",
  patient: { age: 1, ageUnit: "días", sex: "F", context: "Madre de 41 años. Sin estudios prenatales completos." },
  frequency: "frecuente",
  intro: "En la recepción notan a la recién nacida con tono bajo y rasgos particulares. La madre pregunta: “¿Está todo bien?”",
  vitals: { FC: "148 lpm", FR: "48 rpm", "T°": "36,6 °C", "SatO₂": "94 %", Peso: "2,9 kg" },
  anamnesis: [
    act("edad", "¿Edad materna y controles?", "clave", "“41 años, pocos controles.”", "Riesgo."),
    act("alimentacion", "¿Pudo prenderse a la teta?", "clave", "“Le cuesta.”", "Hipotonía."),
    act("vomitos", "¿Vomitó? ¿Eliminó meconio?", "clave", "“Sí, meconio; sin vómitos.”", "Atresia duodenal."),
    act("familia", "¿Familiares con cromosomopatías?", "util", "“No.”", "Translocación."),
    act("embarazo", "¿Ecografías del embarazo?", "util", "“Una sola.”", "Diagnóstico prenatal."),
    act("nombre", "¿Ya tiene nombre?", "neutro", "“Julia.”", "No orienta."),
  ],
  exam: [
    act("fenotipo", "Rasgos y tono", "clave", "Hipotonía, fisuras palpebrales oblicuas, pliegue palmar único, separación entre primer y segundo dedo del pie.", "Fenotipo."),
    act("corazon", "Corazón y saturación", "clave", "Soplo; saturación de 94 %.", "Cardiopatía."),
    act("abdomen", "Abdomen y ano", "util", "Normal.", "Malformaciones."),
  ],
  studies: [
    study("Laboratorio", "cariotipo", "Cariotipo", "clave", "47,XX,+21.", "Confirma y define riesgo de recurrencia."),
    study("Imágenes", "eco", "Ecocardiograma", "clave", "Canal auriculoventricular.", "Cardiopatía."),
    study("Laboratorio", "tsh", "TSH, hemograma", "clave", "Normales; policitemia leve.", "Asociaciones."),
    study("Otros", "otoemisiones", "Otoemisiones y fondo de ojo", "util", "Pendientes.", "Audición y cataratas."),
    study("Otros", "esperar", "Esperar a los 6 meses para evaluar el corazón", "riesgoso", "No se realizó.", "Cardiopatías graves."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("down", "Síndrome de Down (trisomía 21 libre) con canal auriculoventricular", true, "Fenotipo, cariotipo y ecocardiograma."),
      dx("hipotiroidismo", "Hipotiroidismo congénito", false, "TSH normal."),
      dx("sepsis", "Sepsis neonatal", false, "Sin infección."),
      dx("edwards", "Trisomía 18", false, "Cariotipo con trisomía 21."),
      dx("hipotonia", "Hipotonía central inespecífica", false, "Hay diagnóstico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("comunicar", "Comunicar con cuidado, en privado y con información", "clave", "Derecho y vínculo."),
      mg("cardio", "Cardiología infantil para cirugía", "clave", "Canal AV."),
      mg("lactancia", "Apoyo a la lactancia", "clave", "Hipotonía."),
      mg("seguimiento", "Seguimiento según guías: tiroides, audición, visión, estimulación", "clave", "Prevención."),
      mg("pronostico", "Decir que no va a poder hacer nada", "riesgoso", "Falso y dañino."),
      mg("sin-eco", "No hacer ecocardiograma", "riesgoso", "Cardiopatía grave."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de Down por trisomía 21 libre con canal auriculoventricular, en recién nacida.",
    pathologies: [
      { name: "Síndrome de Down", role: "principal", why: "Trisomía 21." },
      { name: "Canal auriculoventricular", role: "asociada", why: "Cardiopatía típica." },
      { name: "Hipotiroidismo, sepsis", role: "diferencial", why: "Hipotonía." },
    ],
    reasoning: [
      "Causa: no disyunción meiótica materna, asociada a la edad.",
      "Mecanismo: copia extra de genes del cromosoma 21.",
      "Consecuencia: discapacidad intelectual variable, cardiopatía y otras comorbilidades.",
    ],
    epidemiology:
      "Es la cromosomopatía más frecuente, con cerca de 1 cada 700 nacimientos. Alrededor de la mitad tiene cardiopatía, sobre todo canal AV. La expectativa de vida superó los 60 años con atención adecuada.",
    management: [
      "Sospecha clínica.",
      "Cariotipo.",
      "Ecocardiograma.",
      "Comunicación y seguimiento.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Guía de atención de niños con síndrome de Down.", "American Academy of Pediatrics — Health Supervision for Children with Down Syndrome."],
    pearls: ["Hipotonía y pliegue palmar.", "Eco a todos.", "Comunicar con respeto."],
    pitfalls: ["No hacer eco.", "Comunicar mal."],
    tribunal: [
      qa("¿Qué cardiopatía es típica?", "Canal auriculoventricular completo, seguido por CIV y CIA."),
      qa("¿Qué complicaciones tiene a lo largo de la vida?", "Hipotiroidismo, leucemia, apnea, celiaquía, inestabilidad atlantoaxial y Alzheimer precoz."),
      qa("¿Qué tamizaje prenatal se ofrece?", "Translucencia nucal, marcadores séricos y ADN fetal en sangre materna."),
    ],
  },
};
