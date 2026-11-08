import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerRenal: ClinicalCase = {
  id: "cancer-renal-celulas-claras",
  level: 2,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 62, ageUnit: "años", sex: "M", context: "Tabaquista, obeso e hipertenso. Mecánico. Hace poco orinó con sangre." },
  frequency: "frecuente",
  intro: "“Una vez oriné rojo, sin dolor. Hace semanas me duele el costado derecho y bajé 5 kilos. Pensé que era el riñón frío.”",
  vitals: { TA: "146/90 mmHg", FC: "82 lpm", "T°": "37,4 °C", "SatO₂": "97 %", Peso: "88 kg" },
  anamnesis: [
    act("hematuria", "¿Sangre con coágulos? ¿Dolió?", "clave", "“Con coágulos, no dolió.”", "Hematuria indolora: tumor hasta demostrar lo contrario."),
    act("riesgo", "¿Fumás, obesidad, diálisis, familia?", "clave", "“Fumo desde los 18.”", "Factores."),
    act("sistemico", "¿Fiebre, sudor, pérdida de peso?", "clave", "“Febrícula.”", "Síntomas constitucionales."),
    act("varicocele", "¿Bulto en el escroto reciente?", "util", "“Una várice.”", "Varicocele derecho de aparición tardía."),
    act("oseo", "¿Dolor de huesos, tos?", "util", "“No.”", "Metástasis."),
    act("taller", "¿Qué autos arreglás?", "neutro", "“Autos viejos.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Flanco", "clave", "Masa palpable en flanco derecho.", "Tríada clásica con dolor y hematuria."),
    act("genital", "Escroto", "clave", "Varicocele derecho que no cede al acostarse.", "Sugiere trombo en la vena."),
    act("edemas", "Edemas y circulación", "util", "Edema leve de piernas.", "Posible compromiso de cava."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de abdomen y pelvis con contraste y de tórax", "clave", "Masa de 8 cm en riñón derecho, realce, trombo en vena renal; sin metástasis.", "Diagnóstico y estadificación."),
    study("Laboratorio", "lab", "Hemograma, calcio, función renal, hepatograma, LDH", "clave", "Hto 53 %; Ca 11,2.", "Síndromes paraneoplásicos."),
    study("Laboratorio", "orina", "Orina y citología", "util", "Hematuria.", "Excluye otros."),
    study("Otros", "biopsia-rutina", "Biopsia percutánea de rutina", "innecesario", "No se realizó.", "Con imagen típica operable no suele hacer falta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("renal", "Carcinoma de células renales localmente avanzado con trombo en vena renal", true, "Hematuria, dolor, masa, varicocele y TC."),
      dx("litiasis", "Litiasis renal", false, "No explica la masa ni el realce."),
      dx("quiste", "Quiste renal", false, "No realza."),
      dx("urotelial", "Carcinoma urotelial", false, "Es intraluminal; aquí la masa es parenquimatosa."),
      dx("pielonefritis", "Pielonefritis xantogranulomatosa", false, "No hay infección crónica."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("nefrectomia", "Nefrectomía radical con extracción del trombo", "clave", "Tratamiento con intención curativa."),
      mg("comite", "Comité de urología y oncología", "clave", "Plan según riesgo."),
      mg("tabaco", "Dejar de fumar, controlar presión y peso", "clave", "Factores modificables."),
      mg("sistemico", "Inmunoterapia o terapia dirigida si hay metástasis", "util", "Enfermedad avanzada."),
      mg("quimio", "Quimioterapia convencional", "riesgoso", "Es quimiorresistente."),
      mg("antibiotico", "Tratar como infección y control en 6 meses", "riesgoso", "Demora."),
    ],
  },
  debrief: {
    diagnosis: "Carcinoma de células renales de células claras, con trombo en vena renal, eritrocitosis e hipercalcemia paraneoplásicas, en varón de 62 años.",
    pathologies: [
      { name: "Carcinoma renal", role: "principal", why: "Tumor maligno del parénquima." },
      { name: "Eritrocitosis, hipercalcemia", role: "asociada", why: "Paraneoplásicos." },
      { name: "Litiasis, quiste, urotelial", role: "diferencial", why: "Otras masas o hematuria." },
    ],
    reasoning: [
      "Causa: tabaco, obesidad, HTA, alteración del gen VHL.",
      "Mecanismo: proliferación con angiogénesis, y tendencia a invadir venas.",
      "Consecuencia: hematuria, trombo, síndromes paraneoplásicos, metástasis.",
    ],
    epidemiology:
      "Representa cerca del 3 % de los cánceres del adulto y predomina en varones de 60 a 70 años. Argentina tiene una de las incidencias más altas de la región. La mayoría se diagnostica de manera incidental en imágenes; la tríada clásica aparece en una minoría, y suele indicar enfermedad avanzada.",
    management: [
      "Toda hematuria indolora se estudia.",
      "TC.",
      "Cirugía.",
      "Tratamiento sistémico en metástasis.",
    ],
    sources: ["Instituto Nacional del Cáncer — Tumores urológicos.", "European Association of Urology — Renal Cell Carcinoma Guidelines."],
    pearls: ["Hematuria indolora: tumor hasta probar lo contrario.", "Varicocele derecho tardío.", "No responde a quimioterapia."],
    pitfalls: ["Atribuirlo a piedra sin imagen.", "No estudiar hematuria aislada."],
    tribunal: [
      qa("¿Cuál es la tríada clásica del cáncer renal?", "Hematuria, dolor en flanco y masa palpable; está presente en una minoría."),
      qa("¿Qué síndromes paraneoplásicos da?", "Eritrocitosis, hipercalcemia, HTA, fiebre y síndrome de Stauffer."),
      qa("¿Qué síndrome hereditario se asocia?", "Von Hippel-Lindau, por mutación del gen VHL."),
    ],
  },
};
