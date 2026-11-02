import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const artrosisRodilla: ClinicalCase = {
  id: "artrosis-rodilla",
  level: 1,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 66, ageUnit: "años", sex: "F", context: "Obesidad. Hipertensa. Trabajó de pie toda la vida." },
  frequency: "muy-frecuente",
  intro: "“Me duelen las dos rodillas al caminar y al subir escaleras, sobre todo la derecha. A la mañana están duras un rato y después mejoran.”",
  vitals: { TA: "136/84 mmHg", FC: "74 lpm", "T°": "36,4 °C", Peso: "84 kg" },
  anamnesis: [
    act("dolor", "¿El dolor es con el movimiento o en reposo?", "clave", "“Con el movimiento, mejora al descansar.”", "Dolor mecánico."),
    act("rigidez", "¿Cuánto dura la rigidez a la mañana?", "clave", "“Unos 15 minutos.”", "Menos de 30 minutos: artrosis (en las artritis inflamatorias dura más de una hora)."),
    act("funcion", "¿Qué cosas dejaste de hacer?", "util", "“Ya no camino al mercado.”", "Impacto funcional y riesgo de sedentarismo."),
    act("aine", "¿Qué tomás para el dolor?", "clave", "“Diclofenac todos los días.”", "Riesgo renal, cardiovascular y digestivo, más con hipertensión."),
    act("signos-inflamatorios", "¿Se hinchó, se puso roja o tuvo fiebre?", "util", "“A veces se hincha un poco.”", "Derrames leves son frecuentes en la artrosis."),
    act("nietos", "¿Cuida a sus nietos?", "neutro", "“Los martes.”", "No orienta."),
  ],
  exam: [
    act("rodillas", "Examen de las rodillas", "clave", "Crepitación, engrosamiento óseo, genu varo, leve derrame en la derecha, sin calor.", "Signos de artrosis."),
    act("cadera", "Cadera y columna", "util", "Movilidad de cadera normal.", "Descarta dolor referido de cadera."),
    act("marcha", "Marcha y fuerza del cuádriceps", "util", "Cuádriceps débil.", "Objetivo de la rehabilitación."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de rodillas de pie", "util", "Pinzamiento del compartimento medial, osteofitos, esclerosis subcondral.", "Confirma; no siempre es necesaria si la clínica es típica."),
    study("Laboratorio", "lab", "Función renal antes de seguir con AINE", "clave", "Creatinina 1,2 (filtrado 46).", "Enfermedad renal: los AINE están desaconsejados."),
    study("Imágenes", "rmn", "Resonancia de rodilla", "innecesario", "No se realizó.", "No cambia el manejo de la artrosis."),
    study("Laboratorio", "fr", "Factor reumatoideo y anticuerpos de rutina", "innecesario", "No se realizó.", "Sin elementos de artritis inflamatoria."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("artrosis", "Artrosis de rodillas, a predominio medial, con uso crónico de AINE y enfermedad renal", true, "Dolor mecánico en mayor de 50 con rigidez matinal breve, crepitación, engrosamiento óseo y radiografía compatible."),
      dx("ar", "Artritis reumatoidea", false, "Rigidez breve, sin sinovitis de pequeñas articulaciones."),
      dx("gota", "Gota", false, "No hay crisis agudas inflamatorias."),
      dx("menisco", "Lesión de menisco aislada", false, "El cuadro es bilateral, crónico y degenerativo."),
      dx("cadera", "Dolor referido de cadera", false, "La cadera es normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ejercicio", "Ejercicio de fortalecimiento del cuádriceps y kinesiología", "clave", "Es el tratamiento con mejor evidencia."),
      mg("peso", "Descenso de peso", "clave", "Cada kilo menos reduce la carga sobre la rodilla."),
      mg("aine-cambio", "Suspender el diclofenac diario; paracetamol o AINE tópicos, y analgésicos solo si hace falta", "clave", "Por su enfermedad renal e hipertensión."),
      mg("infiltracion", "Infiltración con corticoide en brotes con derrame", "util", "Alivio temporal."),
      mg("artroscopia", "Artroscopía de lavado", "innecesario", "No tiene beneficio en la artrosis."),
      mg("opioides-fuertes", "Opioides potentes a largo plazo", "riesgoso", "Más riesgos que beneficios."),
    ],
  },
  debrief: {
    diagnosis: "Artrosis bilateral de rodillas de predominio medial, con obesidad, debilidad del cuádriceps y uso crónico de AINE en una paciente hipertensa con enfermedad renal.",
    pathologies: [
      { name: "Artrosis de rodilla", role: "principal", why: "Degeneración del cartílago con remodelado óseo." },
      { name: "Efectos adversos de los AINE", role: "asociada", why: "Enfermedad renal e hipertensión." },
      { name: "Artritis reumatoidea, gota, menisco", role: "diferencial", why: "Otras causas de dolor de rodilla." },
    ],
    reasoning: [
      "Causa: edad, obesidad, sobrecarga mecánica y alineación en varo.",
      "Mecanismo: el cartílago se desgasta, el hueso subcondral se esclerosa y forma osteofitos; hay inflamación leve.",
      "Consecuencia: dolor mecánico, rigidez breve, crepitación, deformidad y pérdida de función.",
    ],
    epidemiology:
      "La artrosis es la enfermedad articular más frecuente y una causa principal de discapacidad en adultos mayores. La de rodilla es más frecuente en mujeres después de los 50 años y se asocia fuertemente a la obesidad.",
    management: [
      "Diagnóstico clínico; radiografía si hay dudas.",
      "Ejercicio, descenso de peso y educación.",
      "Analgesia con el menor riesgo según comorbilidades.",
      "Reemplazo articular si el dolor y la limitación son graves pese al tratamiento.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Guías de artrosis.", "Recomendaciones OARSI de artrosis de rodilla."],
    pearls: ["Dolor mecánico + rigidez menor de 30 minutos = artrosis.", "Ejercicio y peso primero.", "Cuidado con los AINE en mayores."],
    pitfalls: ["AINE crónicos sin controlar la función renal.", "Artroscopía de lavado."],
    tribunal: [
      qa("¿Qué diferencia el dolor mecánico del inflamatorio?", "Mecánico: aumenta con el uso, mejora con el reposo, rigidez menor de 30 minutos (artrosis). Inflamatorio: aumenta con el reposo, mejora con el movimiento, rigidez de más de una hora, con signos inflamatorios (artritis)."),
      qa("¿Qué hallazgos radiográficos tiene la artrosis?", "Pinzamiento asimétrico del espacio articular, osteofitos, esclerosis del hueso subcondral y quistes subcondrales."),
      qa("¿Qué riesgos tienen los AINE?", "Sangrado y úlcera digestiva, insuficiencia renal, hipertensión, retención de líquidos, insuficiencia cardíaca y eventos cardiovasculares; más en mayores y con anticoagulantes o corticoides."),
    ],
  },
};
