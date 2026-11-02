import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const anorexiaNerviosa: ClinicalCase = {
  id: "anorexia-nerviosa",
  level: 2,
  area: "Salud mental",
  setting: "Consultorio",
  patient: { age: 16, ageUnit: "años", sex: "F", context: "Muy buena alumna. Hace danza clásica. Vino con la madre." },
  frequency: "poco-frecuente",
  intro: "“Bajó mucho de peso en el año, casi no come, hace ejercicio todo el día y hace cinco meses no le viene la menstruación. Ella dice que está bien.” (relata la madre)",
  vitals: { TA: "88/54 mmHg", FC: "46 lpm", FR: "14 rpm", "T°": "35,6 °C", Peso: "39 kg" },
  anamnesis: [
    act("privado", "Hablar a solas con la adolescente, con confidencialidad y sus límites", "clave", "Acepta. Dice: “Estoy gorda de la panza y los muslos.”", "La entrevista a solas es parte de la atención de adolescentes; distorsión de la imagen corporal."),
    act("conducta", "¿Qué comés en un día? ¿Contás calorías? ¿Vomitás o usás laxantes?", "clave", "“Una manzana y yogur. Cuento todo. A veces vomito si como de más.”", "Restricción grave con conductas purgativas."),
    act("ejercicio", "¿Cuánto ejercicio hacés?", "clave", "“Tres horas por día, más la danza.”", "Ejercicio compulsivo."),
    act("riesgo", "¿Pensaste en hacerte daño o en no vivir?", "clave", "“A veces me quiero desaparecer.”", "Ideación de muerte: frecuente y aumenta el riesgo."),
    act("mareos", "¿Te mareaste o desmayaste? ¿Palpitaciones?", "util", "“Me mareo al pararme.”", "Hipotensión ortostática y bradicardia: complicaciones."),
    act("libros", "¿Qué leés?", "neutro", "“Novelas juveniles.”", "No orienta, pero ayuda al vínculo."),
  ],
  exam: [
    act("imc", "Peso, talla e IMC", "clave", "IMC 14,8 (talla 1,62 m).", "Desnutrición grave."),
    act("signos", "Signos físicos", "clave", "Lanugo, piel seca, acrocianosis, callosidades en el dorso de la mano (signo de Russell), hipertrofia parotídea.", "Desnutrición y vómitos autoinducidos."),
    act("ortostatismo", "Signos vitales acostada y de pie", "clave", "La frecuencia sube 32 lpm al pararse.", "Inestabilidad hemodinámica: criterio de internación."),
  ],
  studies: [
    study("Laboratorio", "lab", "Ionograma, fósforo, magnesio, glucemia, función renal, hepatograma, hemograma", "clave", "K 2,9, fósforo 2,8, glucemia 62.", "Hipopotasemia por vómitos: riesgo de arritmias."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Bradicardia sinusal de 44, QTc 480 ms.", "QT prolongado: riesgo de arritmias graves."),
    study("Laboratorio", "tsh", "TSH, beta-HCG", "util", "TSH normal, beta-HCG negativa.", "Descarta hipertiroidismo y embarazo como causa de la amenorrea."),
    study("Imágenes", "rmn", "Resonancia de cerebro de rutina", "innecesario", "No se realizó.", "Sin síntomas neurológicos focales."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("an", "Anorexia nerviosa (tipo compulsivo-purgativo) con desnutrición grave e inestabilidad médica", true, "Restricción, miedo a engordar, distorsión de la imagen, IMC de 14,8, amenorrea, bradicardia, hipotermia, ortostatismo, hipopotasemia y QT largo."),
      dx("bulimia", "Bulimia nerviosa", false, "En la bulimia el peso suele ser normal; aquí el bajo peso es extremo."),
      dx("hipertiroidismo", "Hipertiroidismo", false, "Daría taquicardia y TSH baja."),
      dx("celiaquia", "Enfermedad celíaca", false, "No explica el miedo a engordar ni la conducta restrictiva."),
      dx("arfid", "Trastorno por evitación de la ingesta (ARFID)", false, "En el ARFID no hay preocupación por el peso ni la figura."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internacion", "Internación para estabilización médica (bradicardia menor de 50, hipotensión, ortostatismo, hipopotasemia, QT largo)", "clave", "Tiene criterios de inestabilidad médica."),
      mg("realimentacion", "Realimentación gradual con control de fósforo, potasio y magnesio", "clave", "Previene el síndrome de realimentación."),
      mg("equipo", "Equipo interdisciplinario (pediatría o clínica, salud mental, nutrición) con la familia", "clave", "El abordaje familiar es central en adolescentes."),
      mg("potasio", "Reponer potasio", "clave", "Previene arritmias."),
      mg("dieta-sola", "Indicar una dieta de 3000 calorías desde el primer día", "riesgoso", "Realimentar muy rápido puede producir síndrome de realimentación."),
      mg("esperar", "Esperar a que ella quiera tratarse", "riesgoso", "Hay riesgo de vida."),
    ],
  },
  debrief: {
    diagnosis: "Anorexia nerviosa de tipo compulsivo-purgativo con desnutrición grave (IMC 14,8), bradicardia, hipotensión ortostática, hipotermia, hipopotasemia y QT prolongado, en adolescente de 16 años.",
    pathologies: [
      { name: "Anorexia nerviosa", role: "principal", why: "Restricción con miedo a engordar y distorsión de la imagen corporal." },
      { name: "Desnutrición grave e inestabilidad médica", role: "asociada", why: "Complicaciones con riesgo de vida." },
      { name: "Bulimia, hipertiroidismo, celiaquía, ARFID", role: "diferencial", why: "Otras causas de pérdida de peso." },
    ],
    reasoning: [
      "Causa: interacción de factores genéticos, psicológicos (perfeccionismo) y socioculturales (ideal de delgadez, actividades que exigen bajo peso).",
      "Mecanismo: la restricción y la pérdida de peso alteran el eje hipotálamo-hipófiso-gonadal (amenorrea) y el sistema nervioso autónomo; la desnutrición refuerza la obsesión.",
      "Consecuencia: bradicardia, hipotensión, hipotermia, osteoporosis, alteraciones electrolíticas, arritmias y muerte; tiene la mayor mortalidad entre los trastornos mentales.",
    ],
    epidemiology:
      "La anorexia nerviosa afecta a alrededor del 0,5–1 % de las mujeres jóvenes, con inicio típico en la adolescencia; también ocurre en varones. Las actividades como danza, modelaje y algunos deportes aumentan el riesgo. Su mortalidad está entre las más altas de los trastornos psiquiátricos.",
    management: [
      "Entrevista empática con la adolescente a solas y con la familia.",
      "Evaluar criterios de internación (signos vitales, electrolitos, ECG, IMC, riesgo suicida).",
      "Realimentación gradual con control de electrolitos.",
      "Tratamiento interdisciplinario prolongado, con terapia basada en la familia.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso sobre trastornos de la conducta alimentaria en adolescentes.", "Ley 26.396 de Trastornos Alimentarios."],
    pearls: ["Bradicardia en una adolescente delgada no es “de deportista”.", "Cuidado con el síndrome de realimentación.", "Familia en el tratamiento."],
    pitfalls: ["Realimentar rápido.", "Atribuir la amenorrea solo al ejercicio."],
    tribunal: [
      qa("¿Qué es el síndrome de realimentación?", "Las alteraciones que aparecen al realimentar a una persona desnutrida: la insulina mete fósforo, potasio y magnesio en las células y bajan en sangre, con riesgo de arritmias, insuficiencia cardíaca, convulsiones y muerte; se previene con aporte gradual, tiamina y control de electrolitos."),
      qa("¿Cuáles son los criterios de internación en anorexia nerviosa?", "Frecuencia cardíaca menor de 50 de día o 45 de noche, presión menor de 90/45, ortostatismo, temperatura menor de 35,6 °C, alteraciones electrolíticas, arritmias o QT largo, IMC muy bajo o pérdida rápida, rechazo total de la ingesta, riesgo suicida o fracaso ambulatorio."),
      qa("¿Qué es la tríada de la atleta?", "La combinación de baja disponibilidad de energía (con o sin trastorno alimentario), alteraciones menstruales y baja densidad mineral ósea en mujeres deportistas; hoy se incluye en el concepto de deficiencia relativa de energía en el deporte (RED-S)."),
    ],
  },
};
