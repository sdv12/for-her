import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const enuresis: ClinicalCase = {
  id: "enuresis",
  level: 1,
  area: "Pediatría",
  setting: "Consultorio",
  patient: { age: 8, ageUnit: "años", sex: "M", context: "Tercer grado. Lo invitaron a un campamento de la escuela y no quiere ir." },
  frequency: "muy-frecuente",
  intro: "La mamá: “Se sigue haciendo pis en la cama casi todas las noches. De día nunca.”",
  vitals: { TA: "100/62 mmHg", FC: "84 lpm", Peso: "28 kg" },
  anamnesis: [
    act("siempre", "¿Alguna vez estuvo seco de noche por 6 meses?", "clave", "“Nunca.”", "Enuresis primaria."),
    act("dia", "¿Tiene escapes, urgencia o se aguanta de día?", "clave", "“No, de día perfecto.”", "Monosintomática: sin síntomas diurnos."),
    act("constipacion", "¿Cómo hace caca?", "clave", "“Todos los días, normal.”", "La constipación es una causa tratable."),
    act("sed", "¿Toma mucha agua, adelgazó, ronca?", "clave", "“Toma normal, no ronca.”", "Descarta diabetes, diabetes insípida y apneas."),
    act("familia", "¿El papá o la mamá tuvieron lo mismo?", "util", "“El papá hasta los 10.”", "Fuerte carácter hereditario."),
    act("castigo", "¿Cómo reaccionan en casa?", "clave", "“A veces el padre lo reta.”", "El castigo empeora; hay que desculpabilizar."),
  ],
  exam: [
    act("general", "Examen general y genitales", "clave", "Normal, sin fimosis ni alteraciones.", "Sin causa orgánica."),
    act("columna", "Región lumbosacra", "clave", "Sin fosita, mechón ni lipoma.", "Descarta disrafia oculta."),
    act("neuro", "Neurológico de miembros inferiores", "util", "Normal.", "Descarta vejiga neurogénica."),
  ],
  studies: [
    study("Laboratorio", "orina", "Orina completa con densidad y glucosuria", "clave", "Normal, sin glucosa, densidad 1.022.", "Único estudio necesario: descarta diabetes, ITU y poliuria."),
    study("Otros", "diario", "Diario miccional y calendario de noches secas", "clave", "Volumen nocturno aumentado.", "Orienta a poliuria nocturna."),
    study("Imágenes", "eco", "Ecografía renal y vesical", "innecesario", "No se pidió.", "En la enuresis monosintomática no aporta."),
    study("Imágenes", "cistouretrografia", "Cistouretrografía miccional", "riesgoso", "No se hizo.", "Invasiva y con radiación sin indicación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("enuresis-primaria", "Enuresis nocturna primaria monosintomática", true, "Más de 5 años, nunca seco de noche, sin síntomas diurnos, examen y orina normales, antecedente paterno."),
      dx("enuresis-secundaria", "Enuresis secundaria", false, "Nunca tuvo 6 meses seco."),
      dx("vejiga-hiperactiva", "Vejiga hiperactiva", false, "No hay síntomas diurnos."),
      dx("diabetes", "Diabetes mellitus", false, "Sin glucosuria ni polidipsia."),
      dx("disrafia", "Vejiga neurogénica por disrafia", false, "Columna y neurológico normales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("desculpabilizar", "Explicar que no es culpa del niño y suspender castigos", "clave", "Base del tratamiento."),
      mg("medidas", "Orinar antes de dormir, reducir líquidos 1–2 horas antes y tomar más de día", "clave", "Medidas generales."),
      mg("alarma", "Alarma de enuresis por 2–3 meses", "clave", "Tratamiento con mayor curación duradera."),
      mg("desmopresina", "Desmopresina para el campamento o si la alarma no es posible", "util", "Efecto rápido; restringir líquidos por riesgo de hiponatremia."),
      mg("calendario", "Calendario de noches secas con refuerzo positivo", "util", "Motivación."),
      mg("despertar", "Despertarlo varias veces por la noche", "innecesario", "No enseña a despertar solo y altera el sueño."),
      mg("panal", "Volver a ponerle pañales", "riesgoso", "Humilla y no ayuda."),
    ],
  },
  debrief: {
    diagnosis: "Enuresis nocturna primaria monosintomática, en un niño de 8 años con antecedente paterno.",
    pathologies: [
      { name: "Enuresis nocturna primaria monosintomática", role: "principal", why: "Desajuste entre producción nocturna, capacidad vesical y despertar." },
      { name: "Poliuria nocturna", role: "asociada", why: "Déficit relativo de vasopresina nocturna." },
      { name: "Vejiga hiperactiva, constipación, diabetes", role: "diferencial", why: "Causas tratables." },
    ],
    reasoning: [
      "Causa: maduración más lenta con fuerte carga hereditaria.",
      "Mecanismo: poliuria nocturna, capacidad vesical nocturna baja y umbral de despertar alto.",
      "Consecuencia: escapes nocturnos con impacto en la autoestima.",
    ],
    epidemiology:
      "Afecta al 10 % de los niños de 7 años y al 1–2 % de los adolescentes. Es más frecuente en varones. Si un padre la tuvo, el riesgo es del 40 %; si los dos, del 70 %. Cada año se cura sola en el 15 %.",
    management: [
      "Desculpabilizar.",
      "Orina completa.",
      "Medidas y diario miccional.",
      "Alarma o desmopresina desde los 6–7 años.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de enuresis.", "International Children's Continence Society — Management of monosymptomatic enuresis."],
    pearls: ["No es culpa del chico.", "Orina completa alcanza.", "Alarma cura, desmopresina tapa."],
    pitfalls: ["Castigar.", "Pedir estudios invasivos."],
    tribunal: [
      qa("¿Qué es la enuresis monosintomática?", "La que ocurre solo de noche, sin síntomas urinarios diurnos como urgencia, escapes o retención."),
      qa("¿Cuál es el riesgo de la desmopresina?", "La hiponatremia por intoxicación hídrica si no se restringen los líquidos después de tomarla."),
      qa("¿Cuándo se considera secundaria y qué implica?", "Cuando reaparece después de 6 meses seco; obliga a buscar estrés, diabetes, ITU, constipación o abuso."),
    ],
  },
};
