import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const osteoporosis: ClinicalCase = {
  id: "osteoporosis-posmenopausica",
  level: 2,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 67, ageUnit: "años", sex: "F", context: "Menopausia a los 44. Fumadora. Su madre se fracturó la cadera. Hace un mes se fracturó la muñeca al caer de su altura." },
  frequency: "muy-frecuente",
  intro: "“Me caí en la vereda y me quebré la muñeca. El traumatólogo me dijo que viniera a ver por los huesos.”",
  vitals: { TA: "128/78 mmHg", FC: "74 lpm", "T°": "36,4 °C", Peso: "51 kg" },
  anamnesis: [
    act("fractura", "¿Cómo fue la fractura?", "clave", "“Me tropecé caminando, caí de parada.”", "Fractura por fragilidad."),
    act("riesgo", "¿Menopausia, fracturas en la familia, corticoides?", "clave", "“Menopausia temprana y mi mamá se quebró la cadera.”", "Factores de riesgo."),
    act("habitos", "¿Fuma, toma alcohol, consume lácteos?", "clave", "“Fumo diez por día; poca leche.”", "Modificables."),
    act("altura", "¿Perdió altura o tiene dolor de espalda?", "util", "“Me dicen que estoy más bajita.”", "Fracturas vertebrales silentes."),
    act("caidas", "¿Se cae seguido?", "util", "“Dos veces este año.”", "Riesgo de caída."),
    act("nietos", "¿Con quién vive?", "neutro", "“Sola, con mi perro.”", "No orienta."),
  ],
  exam: [
    act("columna", "Columna y altura", "clave", "Cifosis dorsal; perdió 4 cm de altura.", "Sospecha de fracturas vertebrales."),
    act("marcha", "Marcha y equilibrio", "clave", "Levantarse y caminar en 15 segundos.", "Riesgo de caída."),
    act("dientes", "Boca y dientes", "util", "Buen estado.", "Antes de bifosfonatos."),
  ],
  studies: [
    study("Imágenes", "dmo", "Densitometría de columna y cadera", "clave", "T-score de cadera −2,9; de columna −3,1.", "Osteoporosis."),
    study("Laboratorio", "lab", "Calcio, fósforo, vitamina D, creatinina, TSH, FAL", "clave", "Vitamina D 14 ng/ml; resto normal.", "Causas secundarias y déficit."),
    study("Imágenes", "rx-columna", "Radiografía de columna dorsolumbar", "util", "Aplastamiento de D12.", "Fractura vertebral silente."),
    study("Imágenes", "centellograma", "Centellograma óseo", "innecesario", "No se realizó.", "Sin sospecha tumoral."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("osteoporosis", "Osteoporosis posmenopáusica establecida con fracturas por fragilidad e hipovitaminosis D", true, "Fractura de muñeca y vertebral con caída de su altura y T-score menor de −2,5."),
      dx("osteopenia", "Osteopenia", false, "T-score menor de −2,5 y fracturas."),
      dx("osteomalacia", "Osteomalacia", false, "Calcio, fósforo y FAL normales."),
      dx("mieloma", "Mieloma múltiple", false, "Sin anemia, hipercalcemia ni insuficiencia renal."),
      dx("hiperpara", "Hiperparatiroidismo primario", false, "Calcio normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("bifosfonato", "Bifosfonato (alendronato semanal o zoledronato anual)", "clave", "Reduce fracturas."),
      mg("vitd-calcio", "Vitamina D y calcio en la dieta", "clave", "Déficit y base del tratamiento."),
      mg("caidas", "Prevención de caídas y ejercicio de fuerza y equilibrio", "clave", "La caída produce la fractura."),
      mg("tabaco", "Dejar de fumar", "util", "Factor de riesgo."),
      mg("reposo", "Reposo y evitar caminar", "riesgoso", "Más pérdida ósea y debilidad."),
      mg("solo-calcio", "Solo calcio sin tratamiento antirresortivo", "riesgoso", "Insuficiente con fracturas."),
    ],
  },
  debrief: {
    diagnosis: "Osteoporosis posmenopáusica establecida con fractura de muñeca y vertebral por fragilidad e hipovitaminosis D, en mujer de 67 años.",
    pathologies: [
      { name: "Osteoporosis posmenopáusica", role: "principal", why: "Pérdida de masa y calidad ósea." },
      { name: "Fracturas por fragilidad y déficit de vitamina D", role: "asociada", why: "Consecuencia y agravante." },
      { name: "Osteomalacia, mieloma", role: "diferencial", why: "Otras causas de fragilidad." },
    ],
    reasoning: [
      "Causa: déficit estrogénico precoz, tabaco, genética y poca vitamina D.",
      "Mecanismo: la resorción ósea supera a la formación.",
      "Consecuencia: fracturas de muñeca, vértebra y cadera.",
    ],
    epidemiology:
      "Una de cada tres mujeres posmenopáusicas tiene osteoporosis. La fractura de muñeca suele ser la primera y anuncia la de cadera. En Argentina el déficit de vitamina D es frecuente, sobre todo en el sur y en invierno.",
    management: [
      "Densitometría.",
      "Causas secundarias.",
      "Antirresortivo.",
      "Caídas.",
    ],
    sources: ["Sociedad Argentina de Osteoporosis — Guías de diagnóstico, prevención y tratamiento.", "Bone Health and Osteoporosis Foundation — Clinician's Guide."],
    pearls: ["Fractura por caída de su altura: osteoporosis.", "Buscá fracturas vertebrales.", "Prevení caídas."],
    pitfalls: ["Tratar la fractura y no el hueso.", "Solo calcio."],
    tribunal: [
      qa("¿Qué es el T-score?", "Desvíos estándar respecto de la masa ósea pico de adultos jóvenes; menor de −2,5 es osteoporosis."),
      qa("¿Cómo se toma el alendronato?", "En ayunas, con un vaso de agua, sentada o parada 30 minutos, sin otros alimentos."),
      qa("¿Qué efecto adverso raro tienen los bifosfonatos?", "Osteonecrosis de mandíbula y fractura atípica de fémur."),
    ],
  },
};
