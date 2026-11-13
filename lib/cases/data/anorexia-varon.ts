import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const anorexiaVaron: ClinicalCase = {
  id: "anorexia-nerviosa-varon",
  level: 3,
  area: "Salud mental",
  setting: "Consultorio",
  patient: { age: 17, ageUnit: "años", sex: "M", context: "Corredor de fondo en un club. Lo trae el papá preocupado." },
  frequency: "poco-frecuente",
  intro: "“Bajó 14 kilos en seis meses, corre todos los días dos veces y solo come pollo y verdura. Se enoja si le decimos algo.” (relata el padre)",
  vitals: { TA: "88/52 mmHg", FC: "42 lpm", "T°": "35,8 °C", Peso: "49 kg (talla 1,78 m)" },
  anamnesis: [
    act("imagen", "¿Cómo te ves? ¿Qué te preocupa del cuerpo?", "clave", "“Todavía tengo panza, quiero estar más definido.”", "Alteración de la imagen corporal."),
    act("ejercicio", "¿Qué pasa si no podés entrenar?", "clave", "“Me siento culpable y como menos.”", "Ejercicio compensatorio."),
    act("restriccion", "¿Qué comés en un día?", "clave", "“Pechuga y verdura, nada de harinas.”", "Restricción."),
    act("purgas", "¿Vomitás o usás laxantes?", "util", "“No.”", "Subtipo restrictivo."),
    act("animo", "¿Cómo está tu ánimo?", "util", "“Irritable, no salgo con amigos.”", "Comorbilidad."),
    act("musica", "¿Qué música escuchás?", "neutro", "“Rock nacional.”", "No orienta."),
  ],
  exam: [
    act("imc", "IMC y signos de desnutrición", "clave", "IMC 15,5; lanugo, acrocianosis.", "Desnutrición grave."),
    act("ortostatismo", "Ortostatismo", "clave", "FC sube de 42 a 78 al pararse.", "Inestabilidad."),
    act("cardio", "Auscultación", "util", "Bradicardia regular.", "Adaptación o riesgo."),
  ],
  studies: [
    study("Laboratorio", "lab", "Ionograma, fósforo, magnesio, glucemia, función renal, hepatograma", "clave", "Fósforo 2,8; glucemia 62; hepatograma levemente alterado.", "Riesgo de síndrome de realimentación."),
    study("Electrofisiología", "ecg", "ECG", "clave", "Bradicardia sinusal de 40, QTc 470.", "Riesgo arrítmico."),
    study("Laboratorio", "testosterona", "Testosterona y TSH", "util", "Testosterona baja; T3 baja.", "Hipogonadismo funcional."),
    study("Imágenes", "rm", "RM de cerebro de rutina", "innecesario", "No se realizó.", "Sin signos neurológicos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("anorexia", "Anorexia nerviosa restrictiva con ejercicio compensatorio, con inestabilidad médica", true, "Pérdida de peso marcada, restricción, distorsión de la imagen, ejercicio compulsivo, bradicardia e hipotensión."),
      dx("dismorfia", "Dismorfia muscular", false, "Hay restricción con bajo peso extremo."),
      dx("atleta", "Bradicardia del atleta sin trastorno", false, "IMC 15,5 y ortostatismo."),
      dx("celiaquia", "Celiaquía", false, "Restricción voluntaria y distorsión de la imagen."),
      dx("hipertiroidismo", "Hipertiroidismo", false, "Bradicardia y T3 baja."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internar", "Internación por inestabilidad médica", "clave", "FC menor de 50, hipotensión e hipoglucemia."),
      mg("realimentacion", "Realimentación con control diario de fósforo, potasio y magnesio", "clave", "Prevenir el síndrome de realimentación."),
      mg("equipo", "Equipo interdisciplinario con terapia basada en la familia", "clave", "Tratamiento de elección en adolescentes."),
      mg("deporte", "Suspender el entrenamiento hasta recuperar estabilidad", "util", "Gasto y riesgo."),
      mg("alta-dieta", "Alta con una dieta impresa", "riesgoso", "No trata el trastorno y hay riesgo vital."),
      mg("realimentacion-rapida", "Realimentación rápida sin controles", "riesgoso", "Hipofosfatemia, arritmias y muerte."),
    ],
  },
  debrief: {
    diagnosis: "Anorexia nerviosa restrictiva con ejercicio compensatorio e inestabilidad médica, en varón de 17 años.",
    pathologies: [
      { name: "Anorexia nerviosa", role: "principal", why: "Trastorno de la conducta alimentaria." },
      { name: "Desnutrición con bradicardia e hipoglucemia", role: "asociada", why: "Inestabilidad médica." },
      { name: "Dismorfia muscular, bradicardia del atleta", role: "diferencial", why: "Confusiones en varones deportistas." },
    ],
    reasoning: [
      "Causa: interacción de vulnerabilidad, presión deportiva e ideales corporales.",
      "Mecanismo: restricción y ejercicio que llevan a un estado catabólico.",
      "Consecuencia: bradicardia, hipotensión, hipoglucemia, osteopenia y riesgo de muerte.",
    ],
    epidemiology:
      "Hasta un cuarto de los casos de anorexia son varones, pero se diagnostican tarde porque no se sospecha. En varones la preocupación suele ser por estar definido o musculoso. Los deportes con exigencia de peso son un factor de riesgo.",
    management: [
      "Sospecharlo en varones.",
      "Criterios de internación.",
      "Realimentación segura.",
      "Terapia familiar.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Trastornos de la conducta alimentaria.", "Society for Adolescent Health and Medicine — Medical Management of Restrictive Eating Disorders."],
    pearls: ["En varones, quiere estar definido.", "FC menor de 50 de día: internar.", "Fósforo en la realimentación."],
    pitfalls: ["Rotular atleta.", "Alta con dieta."],
    tribunal: [
      qa("¿Qué es el síndrome de realimentación?", "Caída de fósforo, potasio y magnesio al reiniciar la nutrición, con arritmias e insuficiencia cardíaca."),
      qa("¿Qué criterios de internación hay en adolescentes?", "FC menor de 50 de día, TA menor de 90/45, hipotermia, ortostatismo, alteraciones electrolíticas o rechazo a comer."),
      qa("¿Qué es la terapia basada en la familia?", "Abordaje en que los padres toman el control de la alimentación para restaurar el peso."),
    ],
  },
};
