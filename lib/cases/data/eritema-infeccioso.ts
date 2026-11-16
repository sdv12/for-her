import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const eritemaInfeccioso: ClinicalCase = {
  id: "eritema-infeccioso",
  level: 2,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 7, ageUnit: "años", sex: "F", context: "Va a segundo grado. Su mamá está embarazada de 16 semanas. Septiembre." },
  frequency: "frecuente",
  intro: "La mamá: “Se le pusieron los cachetes rojísimos, como si le hubieran pegado. Y ahora tiene manchas en los brazos.”",
  vitals: { FC: "92 lpm", "T°": "36,9 °C", Peso: "23 kg" },
  anamnesis: [
    act("cara", "¿Cómo empezó?", "clave", "“Primero los cachetes rojos, y a los dos días manchas como encaje en los brazos.”", "Mejillas abofeteadas y exantema reticulado: quinta enfermedad."),
    act("fiebre", "¿Tuvo fiebre o estuvo resfriada antes?", "clave", "“Hace una semana un resfrío leve.”", "Pródromo leve; al aparecer el exantema ya no contagia."),
    act("estado", "¿Cómo está de ánimo?", "util", "“Re bien, juega.”", "Buen estado general."),
    act("escuela", "¿Hay otros chicos así en la escuela?", "util", "“Dos compañeritos.”", "Brotes escolares."),
    act("embarazo", "¿Hay embarazadas en la casa?", "clave", "“Yo, de 16 semanas.”", "El parvovirus B19 puede causar hidrops fetal."),
    act("anemia", "¿La nena tiene alguna enfermedad de la sangre?", "util", "“No.”", "En anemias hemolíticas causa crisis aplásica."),
  ],
  exam: [
    act("rostro", "Rostro", "clave", "Eritema intenso en ambas mejillas con palidez peribucal.", "Signo de la bofetada."),
    act("piel", "Miembros", "clave", "Exantema maculopapular reticulado en encaje en brazos y muslos.", "Típico."),
    act("general", "Estado general y ganglios", "util", "Bueno, sin adenopatías ni visceromegalias.", "Sin compromiso sistémico."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico en la niña", "clave", "Mejillas abofeteadas y exantema reticulado.", "No requiere estudios."),
    study("Laboratorio", "serologia-madre", "Serología IgG e IgM para parvovirus B19 en la madre", "clave", "IgG positiva, IgM negativa.", "Inmune: sin riesgo para el feto."),
    study("Laboratorio", "serologia-nena", "Serología a la niña", "innecesario", "No se pidió.", "No cambia nada en ella."),
    study("Laboratorio", "hemograma", "Hemograma a la niña sana", "innecesario", "No se pidió.", "Sin enfermedad hematológica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("quinta", "Eritema infeccioso (quinta enfermedad) por parvovirus B19", true, "Mejillas abofeteadas seguidas de exantema reticulado en encaje en una niña en buen estado durante un brote escolar."),
      dx("escarlatina", "Escarlatina", false, "Sin fiebre, faringitis ni lengua aframbuesada."),
      dx("sarampion", "Sarampión", false, "Sin fiebre alta, catarro ni Koplik."),
      dx("rubeola", "Rubéola", false, "Sin adenopatías retroauriculares."),
      dx("lupus", "Lupus", false, "Edad, cuadro agudo y exantema en encaje."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sintomatico", "Tratamiento sintomático", "clave", "Es autolimitada."),
      mg("escuela", "Puede ir a la escuela", "clave", "Con el exantema ya no contagia."),
      mg("madre", "Estudiar a la madre embarazada", "clave", "Riesgo de hidrops fetal."),
      mg("explicar", "Explicar que el exantema puede reaparecer con el sol o el calor por semanas", "util", "Evita consultas innecesarias."),
      mg("aislar", "Aislarla 10 días", "innecesario", "Ya no contagia."),
      mg("antibiotico", "Amoxicilina por si es escarlatina", "riesgoso", "Es viral y la amoxicilina puede dar exantema."),
    ],
  },
  debrief: {
    diagnosis: "Eritema infeccioso por parvovirus B19 en una niña de 7 años, con madre embarazada inmune.",
    pathologies: [
      { name: "Eritema infeccioso (parvovirus B19)", role: "principal", why: "Exantema inmunomediado tras la viremia." },
      { name: "Riesgo fetal en contactos embarazadas", role: "asociada", why: "Hidrops por anemia fetal." },
      { name: "Escarlatina, rubéola, sarampión", role: "diferencial", why: "Otros exantemas de la infancia." },
    ],
    reasoning: [
      "Causa: parvovirus B19, que infecta precursores eritroides.",
      "Mecanismo: el exantema aparece cuando se forman anticuerpos, al terminar la viremia.",
      "Consecuencia: cuadro benigno en niños sanos; crisis aplásica en hemolíticos e hidrops en fetos.",
    ],
    epidemiology:
      "Afecta sobre todo a niños de 5 a 15 años, con brotes escolares a fines del invierno y la primavera. El 50–60 % de los adultos ya es inmune. En embarazadas no inmunes infectadas antes de las 20 semanas, el riesgo de hidrops o pérdida fetal es del 5–10 %.",
    management: [
      "Diagnóstico clínico.",
      "Sin aislamiento.",
      "Estudiar a embarazadas expuestas.",
      "Seguimiento ecográfico si la embarazada se infecta.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Enfermedades exantemáticas.", "CDC — Parvovirus B19 and fifth disease."],
    pearls: ["Cachetes abofeteados + encaje.", "Con exantema, ya no contagia.", "Embarazada expuesta: serología."],
    pitfalls: ["Antibióticos.", "Olvidar a la embarazada."],
    tribunal: [
      qa("¿Por qué el parvovirus B19 es peligroso en el embarazo?", "Porque infecta los precursores eritroides fetales y puede causar anemia grave, hidrops y muerte fetal."),
      qa("¿Qué es una crisis aplásica transitoria?", "La detención de la eritropoyesis por parvovirus, grave en pacientes con anemias hemolíticas como esferocitosis o drepanocitosis."),
      qa("¿Qué manifestación da el parvovirus en adultos?", "Artralgias o artritis simétricas de manos, rodillas y muñecas, más frecuente en mujeres."),
    ],
  },
};
