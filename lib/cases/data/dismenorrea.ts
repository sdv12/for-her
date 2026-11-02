import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const dismenorrea: ClinicalCase = {
  id: "dismenorrea-primaria",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "CAPS",
  patient: { age: 16, ageUnit: "años", sex: "F", context: "Menarca a los 12. Viene con su mamá." },
  frequency: "muy-frecuente",
  intro: "“Cada vez que me viene me duele muchísimo la panza, falto al colegio uno o dos días. Mi mamá dice que es normal.”",
  vitals: { TA: "108/68 mmHg", FC: "76 lpm", "T°": "36,5 °C", Peso: "54 kg" },
  anamnesis: [
    act("privado", "Hablar a solas con la adolescente con confidencialidad", "clave", "Acepta; no tiene relaciones sexuales por ahora.", "La entrevista a solas es un derecho y permite preguntar sobre sexualidad."),
    act("dolor", "¿Cuándo empieza el dolor y cuánto dura?", "clave", "“Empieza con el sangrado y dura dos días; tipo cólico abajo, a veces a la espalda y las piernas.”", "Dolor cólico que empieza con la menstruación y dura 48–72 h: dismenorrea primaria."),
    act("inicio", "¿Desde cuándo te pasa?", "clave", "“Desde el año de la primera menstruación.”", "Inicio poco después de la menarca, con ciclos ovulatorios."),
    act("alarma", "¿Dolor fuera de la menstruación, dolor en las relaciones, sangrado abundante o empeoramiento progresivo?", "util", "“No.”", "Sin elementos de dismenorrea secundaria (endometriosis)."),
    act("medicacion", "¿Qué tomás?", "util", "“Paracetamol cuando ya duele mucho.”", "Tratamiento tardío e insuficiente."),
    act("deporte", "¿Hacés deporte?", "neutro", "“Handball.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Examen abdominal", "clave", "Normal, sin masas.", "Sin patología orgánica evidente."),
    act("desarrollo", "Desarrollo puberal", "util", "Tanner 5.", "Desarrollo normal."),
    act("tacto", "Tacto vaginal", "innecesario", "No se realizó.", "No es necesario en una adolescente sin relaciones con cuadro típico."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía pelviana transabdominal si hay dudas o no responde", "util", "Normal.", "Descarta malformaciones o masas."),
    study("Imágenes", "rmn", "Resonancia de pelvis", "innecesario", "No se realizó.", "No está indicada en la dismenorrea primaria típica."),
    study("Laboratorio", "lab", "Laboratorio hormonal", "innecesario", "No se realizó.", "No cambia la conducta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("primaria", "Dismenorrea primaria moderada", true, "Dolor cólico que empieza con la menstruación y dura 2 días, desde poco después de la menarca, sin elementos de enfermedad pelviana y con examen normal."),
      dx("endometriosis", "Endometriosis", false, "Se sospecha con dolor progresivo, fuera de la menstruación o en las relaciones, o falta de respuesta al tratamiento."),
      dx("epi", "Enfermedad pelviana inflamatoria", false, "No tiene relaciones ni fiebre."),
      dx("malformacion", "Malformación obstructiva", false, "Menstrúa normalmente y la ecografía es normal."),
      dx("normal", "Molestia normal que no requiere tratamiento", false, "La hace faltar a la escuela: requiere tratamiento."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aine", "AINE (ibuprofeno o naproxeno) desde el día anterior o el inicio del sangrado, en horario fijo por 2–3 días", "clave", "Inhiben las prostaglandinas: primera línea."),
      mg("anticonceptivos", "Si no mejora, anticonceptivos hormonales (también útiles como método si los necesita)", "clave", "Reducen el dolor al disminuir el endometrio y las prostaglandinas."),
      mg("medidas", "Calor local y actividad física", "util", "Alivian."),
      mg("seguimiento", "Control a los 3 meses; estudiar endometriosis si no responde", "clave", "La falta de respuesta orienta a dismenorrea secundaria."),
      mg("normalizar", "Decirle que es normal y que se aguante", "riesgoso", "Invalida el dolor y retrasa diagnósticos."),
      mg("opioides", "Opioides", "innecesario", "No están indicados."),
    ],
  },
  debrief: {
    diagnosis: "Dismenorrea primaria moderada con ausentismo escolar, tratada en forma tardía e insuficiente, en adolescente de 16 años.",
    pathologies: [
      { name: "Dismenorrea primaria", role: "principal", why: "Dolor menstrual sin patología pelviana." },
      { name: "Impacto escolar", role: "asociada", why: "Ausentismo." },
      { name: "Endometriosis, EPI, malformaciones", role: "diferencial", why: "Causas de dismenorrea secundaria." },
    ],
    reasoning: [
      "Causa: ciclos ovulatorios con producción de prostaglandinas en el endometrio.",
      "Mecanismo: las prostaglandinas aumentan las contracciones y la isquemia del miometrio.",
      "Consecuencia: dolor cólico pelviano, a veces con náuseas, diarrea y cefalea.",
    ],
    epidemiology:
      "La dismenorrea afecta a la mayoría de las adolescentes y es una de las principales causas de ausentismo escolar en mujeres. La mayoría es primaria, pero una proporción tiene endometriosis no diagnosticada, sobre todo si no responde a AINE.",
    management: [
      "Entrevista y descartar signos de dismenorrea secundaria.",
      "AINE en horario fijo desde el inicio.",
      "Anticonceptivos hormonales si no alcanza.",
      "Estudiar endometriosis si falla el tratamiento.",
    ],
    sources: ["Sociedad Argentina de Ginecología Infanto Juvenil — Consenso de dismenorrea.", "Ley 26.150 de Educación Sexual Integral."],
    pearls: ["AINE temprano y en horario fijo.", "Si no responde: pensar endometriosis.", "No normalizar el dolor."],
    pitfalls: ["Decir que es normal.", "Tomar analgésicos tarde."],
    tribunal: [
      qa("¿Qué diferencia la dismenorrea primaria de la secundaria?", "La primaria empieza poco después de la menarca, con ciclos ovulatorios, sin patología pelviana, y responde a AINE. La secundaria se debe a una causa orgánica (endometriosis, adenomiosis, miomas, EPI, DIU), suele empezar más tarde o empeorar progresivamente."),
      qa("¿Qué derechos tienen los adolescentes en la consulta?", "Según el Código Civil y Comercial y la Ley 26.529, desde los 13 años pueden consentir por sí mismos tratamientos no invasivos y que no impliquen riesgo grave, y tienen derecho a la confidencialidad y a la información."),
      qa("¿Cuándo sospechar endometriosis en una adolescente?", "Ante dismenorrea que no responde a AINE y anticonceptivos, dolor pelviano crónico, dispareunia, dolor al defecar o al orinar durante la menstruación, o antecedentes familiares."),
    ],
  },
};
