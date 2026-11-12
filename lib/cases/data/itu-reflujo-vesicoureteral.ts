import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ituReflujoVesicoureteral: ClinicalCase = {
  id: "infeccion-urinaria-reflujo-vesicoureteral",
  level: 2,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 3, ageUnit: "años", sex: "F", context: "Segunda pielonefritis en un año. Ecografía prenatal con riñón dilatado." },
  frequency: "frecuente",
  intro: "“Tiene fiebre alta desde ayer, vomita, está decaída y huele fuerte el pis.”",
  vitals: { FC: "148 lpm", FR: "28 rpm", "T°": "39,6 °C", "SatO₂": "98 %", Peso: "14 kg" },
  anamnesis: [
    act("previas", "¿Infecciones urinarias previas? ¿Cómo se estudiaron?", "clave", "“Una pielonefritis, sin estudios.”", "Recurrente."),
    act("prenatal", "¿Ecografías del embarazo?", "clave", "“Riñón dilatado.”", "Anomalía urológica."),
    act("habitos", "¿Constipación o retención?", "clave", "“Constipada.”", "Disfunción vesical e intestinal."),
    act("vacunas", "¿Vacunas al día?", "util", "“Sí.”", "Otras causas."),
    act("otros-focos", "¿Tos, diarrea, oídos?", "util", "“No.”", "Foco urinario."),
    act("jardin", "¿Va al jardín?", "neutro", "“Sí.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen y puño percusión", "clave", "Dolor lumbar izquierdo.", "Pielonefritis."),
    act("genital", "Genitales", "clave", "Sin vulvovaginitis.", "Excluye."),
    act("presion", "Presión arterial", "util", "Normal.", "Daño renal."),
  ],
  studies: [
    study("Laboratorio", "orina", "Orina por sondaje y urocultivo", "clave", "Piuria; E. coli.", "Confirma."),
    study("Imágenes", "eco", "Ecografía renal y vesical", "clave", "Dilatación pielocalicial izquierda.", "Anomalía."),
    study("Imágenes", "cuvm", "Cistouretrografía miccional tras la infección", "clave", "Reflujo vesicoureteral grado IV izquierdo.", "Por recurrencia y ecografía alterada."),
    study("Imágenes", "dmsa", "Centellograma DMSA a los 6 meses", "util", "Cicatriz polar.", "Daño."),
    study("Laboratorio", "bolsita", "Urocultivo con bolsita colectora", "riesgoso", "No se realizó.", "Alto riesgo de contaminación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("rvu", "Pielonefritis recurrente con reflujo vesicoureteral grado IV", true, "Segunda pielonefritis, dilatación prenatal y CUVM."),
      dx("cistitis", "Cistitis", false, "Fiebre alta y dolor lumbar."),
      dx("estenosis", "Estenosis pieloureteral", false, "CUVM muestra reflujo."),
      dx("vulvovaginitis", "Vulvovaginitis", false, "Urocultivo positivo."),
      dx("viral", "Fiebre viral", false, "Urocultivo positivo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Cefalosporina de tercera generación, oral si tolera o EV", "clave", "Pielonefritis."),
      mg("urologia", "Nefrourología pediátrica", "clave", "RVU alto grado."),
      mg("profilaxis", "Profilaxis antibiótica según grado", "clave", "Reduce recurrencias."),
      mg("constipacion", "Tratar la constipación", "util", "Disfunción."),
      mg("sin-estudio", "No estudiar", "riesgoso", "Cicatrices renales."),
      mg("quinolona", "Ciprofloxacina de primera elección", "riesgoso", "No es de primera en niños."),
    ],
  },
  debrief: {
    diagnosis: "Pielonefritis recurrente con reflujo vesicoureteral grado IV izquierdo, en niña de 3 años.",
    pathologies: [
      { name: "Reflujo vesicoureteral", role: "principal", why: "Paso retrógrado de orina." },
      { name: "Pielonefritis y cicatriz renal", role: "asociada", why: "Consecuencias." },
      { name: "Cistitis, estenosis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: unión ureterovesical incompetente.",
      "Mecanismo: la orina infectada asciende al riñón.",
      "Consecuencia: cicatrices, HTA y daño renal.",
    ],
    epidemiology:
      "El RVU se encuentra en cerca de un tercio de los niños con primera ITU febril. Los grados altos tienen más riesgo de cicatriz. La disfunción vesical e intestinal es un factor modificable. El estudio se indica ante ecografía anormal o recurrencia.",
    management: [
      "Urocultivo por sondaje.",
      "Ecografía.",
      "CUVM selectiva.",
      "Profilaxis y urología.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de infección urinaria.", "American Academy of Pediatrics — UTI Guideline."],
    pearls: ["Recurrencia: CUVM.", "Bolsita no.", "Tratar la constipación."],
    pitfalls: ["No estudiar.", "Cultivo contaminado."],
    tribunal: [
      qa("¿Cuáles son los grados del reflujo?", "Del I (uréter) al V (dilatación grave con tortuosidad)."),
      qa("¿Cuándo pedir CUVM?", "Tras la segunda ITU febril o con ecografía alterada."),
      qa("¿Qué complicación tardía tiene?", "Nefropatía por reflujo con HTA y enfermedad renal."),
    ],
  },
};
