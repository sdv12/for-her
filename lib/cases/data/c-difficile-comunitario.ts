import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cDifficileComunitario: ClinicalCase = {
  id: "c-difficile-comunitario-joven",
  level: 2,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 29, ageUnit: "años", sex: "F", context: "Puérpera de 3 semanas. Recibió amoxicilina-clavulánico por una mastitis hace 2 semanas. Toma omeprazol." },
  frequency: "frecuente",
  intro: "“Tengo diarrea acuosa siete veces por día hace cuatro días, con cólicos y algo de fiebre.”",
  vitals: { TA: "112/70 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "37,9 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("atb", "¿Tomaste antibióticos en los últimos 3 meses?", "clave", "“Amoxicilina-clavulánico hace dos semanas.”", "Factor principal."),
    act("deposiciones", "¿Cuántas y cómo?", "clave", "“Siete, líquidas, con olor fuerte.”", "Diarrea significativa."),
    act("ibp", "¿Tomás omeprazol?", "clave", "“Sí, desde el embarazo.”", "Factor de riesgo."),
    act("sangre", "¿Sangre en la materia fecal?", "util", "“No.”", "Otras colitis."),
    act("contactos", "¿Alguien más con diarrea?", "util", "“No.”", "Brote."),
    act("bebe", "¿Cómo está el bebé?", "neutro", "“Bien, con lactancia.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor difuso leve sin defensa ni distensión.", "Sin megacolon."),
    act("hidratacion", "Hidratación", "clave", "Mucosas algo secas.", "Deshidratación leve."),
    act("general", "Estado general", "util", "Bueno.", "Base."),
  ],
  studies: [
    study("Laboratorio", "toxina", "GDH y toxina A/B o PCR de C. difficile", "clave", "Positivas.", "Confirma."),
    study("Laboratorio", "lab", "Hemograma, creatinina, albúmina", "clave", "Leucocitos 11.000; creatinina normal; albúmina normal.", "No grave."),
    study("Laboratorio", "coprocultivo", "Coprocultivo", "util", "Negativo.", "Diferencial."),
    study("Laboratorio", "test-cura", "Repetir el test al terminar para confirmar curación", "innecesario", "No se realizó.", "Puede seguir positivo sin enfermedad."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cdi-no-grave", "Infección por Clostridioides difficile no grave, asociada a antibióticos, en paciente joven de la comunidad", true, "Antibiótico reciente, IBP, diarrea acuosa con toxina positiva, leucocitos menores de 15.000 y creatinina normal."),
      dx("viral", "Gastroenteritis viral", false, "Toxina positiva y antibiótico reciente."),
      dx("efecto-adverso", "Diarrea simple por clavulánico", false, "Toxina positiva y fiebre."),
      dx("cu", "Colitis ulcerosa", false, "Sin sangre y causa clara."),
      dx("grave", "C. difficile grave", false, "Leucocitos y creatinina normales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("vanco-oral", "Vancomicina oral o fidaxomicina por 10 días", "clave", "Primera línea."),
      mg("suspender-ibp", "Suspender el omeprazol si no es necesario", "clave", "Reduce recurrencia."),
      mg("higiene", "Lavado de manos con agua y jabón (el alcohol no mata esporas)", "clave", "Transmisión."),
      mg("lactancia", "Seguir la lactancia", "util", "Compatible."),
      mg("loperamida", "Loperamida", "riesgoso", "Riesgo de megacolon."),
      mg("vanco-ev", "Vancomicina EV", "riesgoso", "No llega a la luz intestinal."),
    ],
  },
  debrief: {
    diagnosis: "Infección por Clostridioides difficile no grave asociada a amoxicilina-clavulánico, en puérpera de 29 años.",
    pathologies: [
      { name: "Infección por C. difficile", role: "principal", why: "Colitis por toxinas." },
      { name: "Antibiótico e IBP", role: "asociada", why: "Factores de riesgo." },
      { name: "Gastroenteritis viral, CU", role: "diferencial", why: "Otras diarreas." },
    ],
    reasoning: [
      "Causa: alteración de la microbiota por antibióticos.",
      "Mecanismo: colonización y producción de toxinas A y B.",
      "Consecuencia: diarrea, colitis y, en casos graves, megacolon.",
    ],
    epidemiology:
      "Ya no es solo intrahospitalaria: cada vez hay más casos comunitarios en jóvenes, incluidas puérperas. Casi cualquier antibiótico puede desencadenarla. Las recurrencias son frecuentes.",
    management: [
      "Antibiótico previo.",
      "Toxina o PCR.",
      "Vancomicina oral.",
      "Higiene y retirar IBP.",
    ],
    sources: ["Sociedad Argentina de Infectología — Infección por Clostridioides difficile.", "IDSA/SHEA — Clinical Practice Guideline for Clostridioides difficile Infection."],
    pearls: ["Diarrea tras antibiótico: pedí toxina.", "Vancomicina oral, no EV.", "Agua y jabón."],
    pitfalls: ["Loperamida.", "Alcohol en gel solo."],
    tribunal: [
      qa("¿Qué define una infección grave?", "Leucocitos mayores de 15.000 o creatinina mayor de 1,5."),
      qa("¿Qué se usa en recurrencias múltiples?", "Trasplante de microbiota fecal o bezlotoxumab."),
      qa("¿Por qué no sirve el alcohol en gel?", "Porque no destruye las esporas."),
    ],
  },
};
