import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const mielomaHipercalcemia: ClinicalCase = {
  id: "mieloma-multiple-hipercalcemia",
  level: 3,
  area: "Hematología",
  setting: "Guardia",
  patient: { age: 69, ageUnit: "años", sex: "M", context: "Jubilado. Lo trae el hijo." },
  frequency: "poco-frecuente",
  intro: "“Hace meses le duele la espalda y está muy cansado. En los últimos días toma mucha agua, orina mucho, está constipado y hoy está confundido.” (relata el hijo)",
  vitals: { TA: "108/66 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "36,8 °C" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor de espalda? ¿Lo despierta de noche?", "clave", "“Constante, empeora de noche, no mejora con reposo.”", "Dolor óseo de reposo y nocturno en un mayor: bandera roja (tumor, mieloma, metástasis)."),
    act("sed", "¿Tiene mucha sed y orina mucho?", "clave", "“Toma litros de agua.”", "La hipercalcemia produce diabetes insípida nefrogénica (poliuria y polidipsia)."),
    act("constipacion", "¿Está constipado, con náuseas?", "util", "“Constipado y sin hambre.”", "Síntomas digestivos de la hipercalcemia."),
    act("infecciones", "¿Tuvo infecciones seguidas?", "util", "“Dos neumonías este año.”", "La inmunoparesia del mieloma favorece infecciones."),
    act("farmacos", "¿Toma diuréticos tiazídicos, calcio o vitamina D?", "clave", "“No.”", "Causas farmacológicas de hipercalcemia."),
    act("peso", "¿Bajó de peso?", "util", "“Unos cinco kilos.”", "Síndrome constitucional."),
    act("pesca", "¿Qué le gusta hacer?", "neutro", "“La huerta.”", "No orienta."),
  ],
  exam: [
    act("columna", "Palpación de la columna", "clave", "Dolor a la percusión de vértebras lumbares.", "Sugiere lesiones óseas."),
    act("conciencia", "Estado de conciencia", "clave", "Somnoliento, desorientado en tiempo.", "Encefalopatía por hipercalcemia."),
    act("hidratacion", "Hidratación", "clave", "Mucosas secas, signo del pliegue.", "La poliuria lleva a deshidratación, que empeora la hipercalcemia."),
    act("palidez", "Palidez", "util", "Palidez cutánea.", "Anemia."),
  ],
  studies: [
    study("Laboratorio", "calcio", "Calcio total, albúmina, calcio iónico, fósforo y PTH", "clave", "Calcio 13,8 mg/dl, albúmina 3,2, PTH suprimida.", "Hipercalcemia grave con PTH baja: no es hiperparatiroidismo, orienta a causa maligna."),
    study("Laboratorio", "lab", "Hemograma, función renal, proteínas totales", "clave", "Hb 9,2 normocítica, creatinina 2,1, proteínas totales 9,8 con albúmina baja (brecha proteica).", "Anemia, insuficiencia renal y aumento de globulinas: perfil de mieloma."),
    study("Laboratorio", "proteinograma", "Proteinograma electroforético, inmunofijación y cadenas livianas libres", "clave", "Pico monoclonal IgG kappa.", "Confirma una gammapatía monoclonal."),
    study("Imágenes", "oseas", "Radiografías óseas o tomografía de baja dosis", "util", "Lesiones líticas en sacabocado en cráneo y vértebras, aplastamiento de L2.", "Lesiones típicas del mieloma."),
    study("Otros", "medula", "Punción de médula ósea", "util", "35 % de células plasmáticas clonales.", "Confirma el diagnóstico."),
    study("Imágenes", "centello", "Centellograma óseo", "innecesario", "No se realizó.", "Las lesiones líticas del mieloma no captan: puede ser normal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mieloma", "Mieloma múltiple con hipercalcemia grave, insuficiencia renal, anemia y lesiones óseas (criterios CRAB)", true, "Dolor óseo, hipercalcemia con PTH baja, anemia, insuficiencia renal, pico monoclonal, lesiones líticas y plasmocitosis medular."),
      dx("hpt", "Hiperparatiroidismo primario", false, "Da hipercalcemia leve con PTH elevada; acá la PTH está suprimida."),
      dx("metastasis", "Metástasis óseas de un tumor sólido", false, "También dan hipercalcemia con PTH baja, pero no explican el pico monoclonal."),
      dx("mgus", "Gammapatía monoclonal de significado incierto", false, "Pico monoclonal sin daño de órganos (sin CRAB) y con menos del 10 % de plasmocitos."),
      dx("vitd", "Intoxicación por vitamina D", false, "No toma suplementos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hidratacion", "Hidratación enérgica con solución fisiológica", "clave", "Primera medida: corrige la deshidratación y aumenta la excreción renal de calcio."),
      mg("bifosfonato", "Bifosfonato endovenoso (zoledronato o pamidronato, ajustado a función renal) y calcitonina", "clave", "Los bifosfonatos inhiben la resorción ósea (efecto en 2–4 días); la calcitonina actúa en horas."),
      mg("hemato", "Derivación a hematología para tratamiento del mieloma", "clave", "El tratamiento de la enfermedad de base controla la hipercalcemia a largo plazo."),
      mg("evitar", "Evitar AINE, contraste iodado y nefrotóxicos", "util", "Empeoran la insuficiencia renal."),
      mg("tiazida", "Hidroclorotiazida para la poliuria", "riesgoso", "Las tiazidas aumentan la reabsorción de calcio y empeoran la hipercalcemia."),
      mg("furosemida-sola", "Furosemida de entrada sin hidratar", "riesgoso", "En un paciente deshidratado empeora la hipovolemia; solo se usa tras reponer volumen si hay sobrecarga."),
    ],
  },
  debrief: {
    diagnosis: "Mieloma múltiple IgG kappa con hipercalcemia grave sintomática, insuficiencia renal, anemia y lesiones líticas.",
    pathologies: [
      { name: "Mieloma múltiple", role: "principal", why: "Proliferación clonal de células plasmáticas." },
      { name: "Hipercalcemia grave", role: "asociada", why: "Resorción ósea por el mieloma." },
      { name: "Hiperparatiroidismo y metástasis óseas", role: "diferencial", why: "Otras causas de hipercalcemia." },
    ],
    reasoning: [
      "Causa: clon de células plasmáticas en la médula ósea que produce una inmunoglobulina monoclonal.",
      "Mecanismo: las células del mieloma activan los osteoclastos (RANKL) e inhiben los osteoblastos; las cadenas livianas dañan los túbulos renales.",
      "Consecuencia (CRAB): hipercalcemia (Calcium), insuficiencia renal (Renal), anemia (Anemia) y lesiones óseas líticas con fracturas (Bone); además, infecciones por inmunoparesia.",
    ],
    epidemiology:
      "El mieloma es la segunda neoplasia hematológica más frecuente después de los linfomas. La edad media al diagnóstico es de 65–70 años, es algo más frecuente en varones y casi nunca ocurre antes de los 40. La hipercalcemia está presente en alrededor de un cuarto de los casos al diagnóstico.",
    management: [
      "Hipercalcemia: hidratación, bifosfonatos o denosumab, calcitonina; diálisis en casos extremos.",
      "Mieloma: proteinograma, inmunofijación, cadenas livianas, médula ósea e imágenes.",
      "Tratamiento hematológico específico y trasplante autólogo en candidatos.",
      "Prevención de fracturas, infecciones y daño renal.",
    ],
    sources: ["Sociedad Argentina de Hematología — Guías de diagnóstico y tratamiento: mieloma múltiple."],
    pearls: ["CRAB: calcio, riñón, anemia, hueso.", "Hipercalcemia con PTH baja = pensar en cáncer.", "Primero hidratar."],
    pitfalls: ["Dar tiazidas.", "Pedir centellograma óseo para el mieloma."],
    tribunal: [
      qa("¿Cuáles son las causas de hipercalcemia?", "El 90 % son hiperparatiroidismo primario (ambulatorio, leve, PTH alta) y cáncer (hospitalario, grave, PTH baja: metástasis óseas, PTHrP, mieloma). Otras: vitamina D, tiazidas, litio, granulomatosis, inmovilización."),
      qa("¿Qué síntomas da la hipercalcemia?", "“Huesos, cálculos, quejidos y gemidos psíquicos”: dolor óseo, litiasis renal, dolor abdominal, constipación, náuseas, poliuria, deshidratación, confusión, debilidad y acortamiento del QT."),
      qa("¿Qué diferencia una gammapatía monoclonal de significado incierto de un mieloma?", "En la gammapatía de significado incierto hay un pico monoclonal menor de 3 g/dl, menos del 10 % de plasmocitos y sin daño de órganos (CRAB); se vigila. El mieloma tiene daño de órganos o marcadores de alto riesgo y se trata."),
    ],
  },
};
