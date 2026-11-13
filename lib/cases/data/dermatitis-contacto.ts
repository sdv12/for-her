import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const dermatitisContacto: ClinicalCase = {
  id: "dermatitis-contacto-alergica",
  level: 1,
  area: "Dermatología",
  setting: "Consultorio",
  patient: { age: 39, ageUnit: "años", sex: "M", context: "Albañil. Trabaja con cemento y usa guantes de goma." },
  frequency: "muy-frecuente",
  intro: "“Hace meses tengo las manos rojas, con ampollitas que pican mucho y se agrietan. En vacaciones mejoré.”",
  vitals: { TA: "124/78 mmHg", FC: "72 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("trabajo", "¿Con qué materiales trabaja?", "clave", "“Cemento, cal y guantes de goma.”", "Cromo y gomas: alérgenos."),
    act("vacaciones", "¿Mejora cuando no trabaja?", "clave", "“En vacaciones casi se fue.”", "Relación laboral."),
    act("prurito", "¿Pica o arde?", "clave", "“Pica muchísimo.”", "Alérgica."),
    act("atopia", "¿Asma, rinitis o eccema de chico?", "util", "“No.”", "Atopia."),
    act("cremas", "¿Qué se pone?", "util", "“Una crema que me dio un amigo.”", "Sensibilización a tópicos."),
    act("equipo", "¿Juega al fútbol?", "neutro", "“Los sábados.”", "No orienta."),
  ],
  exam: [
    act("manos", "Manos", "clave", "Eritema, vesículas, liquenificación y fisuras en dorso de manos y muñecas, bien delimitado al área del guante.", "Eccema de contacto."),
    act("pies", "Pies", "clave", "Sin lesiones interdigitales.", "Excluye tiña."),
    act("otras", "Otras áreas", "util", "Sin lesiones.", "Localizado."),
  ],
  studies: [
    study("Otros", "parche", "Prueba del parche (pruebas epicutáneas)", "clave", "Positiva para dicromato de potasio y tiuram.", "Cromo del cemento y aceleradores de goma."),
    study("Microbiología", "koh", "Examen micológico directo", "util", "Negativo.", "Excluye tiña."),
    study("Laboratorio", "ige", "IgE total", "innecesario", "No se realizó.", "No es mediada por IgE."),
    study("Otros", "biopsia", "Biopsia de piel", "innecesario", "No se realizó.", "Diagnóstico clínico y por parche."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dca", "Dermatitis de contacto alérgica ocupacional por cromo y gomas", true, "Eccema de manos que mejora fuera del trabajo, con parche positivo a cromo y tiuram."),
      dx("irritativa", "Dermatitis de contacto irritativa pura", false, "El parche es positivo y hay prurito vesicular."),
      dx("tina", "Tiña de manos", false, "Micológico negativo y bilateral."),
      dx("psoriasis", "Psoriasis palmar", false, "Lesiones eccematosas y relación laboral."),
      dx("dishidrosis", "Dishidrosis", false, "Hay alérgeno identificado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("evitar", "Evitar el alérgeno: guantes de nitrilo con algodón debajo", "clave", "Principal medida."),
      mg("corticoide", "Corticoide tópico potente por pocas semanas", "clave", "Brote."),
      mg("emolientes", "Emolientes frecuentes", "clave", "Barrera."),
      mg("art", "Informar a la ART como enfermedad profesional", "util", "Derecho laboral."),
      mg("corticoide-cronico", "Corticoide potente indefinido sin cambiar la exposición", "riesgoso", "Atrofia y no resuelve."),
      mg("crema-casera", "Seguir con la crema del amigo", "riesgoso", "Puede sensibilizar más."),
    ],
  },
  debrief: {
    diagnosis: "Dermatitis de contacto alérgica ocupacional por cromo del cemento y gomas, en albañil de 39 años.",
    pathologies: [
      { name: "Dermatitis de contacto alérgica", role: "principal", why: "Hipersensibilidad tipo IV." },
      { name: "Enfermedad profesional", role: "asociada", why: "Relación con el trabajo." },
      { name: "Irritativa, tiña", role: "diferencial", why: "Otros eccemas de manos." },
    ],
    reasoning: [
      "Causa: cromo hexavalente del cemento y aditivos de los guantes de goma.",
      "Mecanismo: sensibilización de linfocitos T y reacción retardada a la reexposición.",
      "Consecuencia: eccema crónico de manos que limita el trabajo.",
    ],
    epidemiology:
      "El eccema de manos es la enfermedad profesional cutánea más frecuente. En la construcción, el cromo del cemento es el alérgeno clásico. La prueba del parche identifica el alérgeno y cambia el pronóstico.",
    management: [
      "Historia laboral.",
      "Parche.",
      "Evitar.",
      "Corticoide y emolientes.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Dermatitis de contacto.", "European Society of Contact Dermatitis — Guideline for Diagnostic Patch Testing."],
    pearls: ["Mejora en vacaciones.", "Cemento: cromo.", "Parche."],
    pitfalls: ["Corticoides sin evitar el alérgeno.", "No pensar en lo laboral."],
    tribunal: [
      qa("¿Qué tipo de hipersensibilidad es?", "Tipo IV, mediada por linfocitos T, retardada."),
      qa("¿Cuál es el alérgeno más frecuente en la población general?", "El níquel, de bijouterie, hebillas y botones."),
      qa("¿Cómo se lee el parche?", "A las 48 y 96 horas, buscando eritema, pápulas y vesículas en el sitio del alérgeno."),
    ],
  },
};
