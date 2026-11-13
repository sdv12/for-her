import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const nefropatiaIga: ClinicalCase = {
  id: "nefropatia-iga",
  level: 3,
  area: "Nefrourología",
  setting: "Consultorio",
  patient: { age: 24, ageUnit: "años", sex: "M", context: "Estudiante de Ingeniería. Sano." },
  frequency: "poco-frecuente",
  intro: "“Cada vez que me agarra un resfrío, al día siguiente hago pis color coca-cola. Ya me pasó tres veces.”",
  vitals: { TA: "142/90 mmHg", FC: "72 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("relacion", "¿Cuánto tiempo después del resfrío aparece?", "clave", "“Uno o dos días.”", "Sinfaringítica: típica de IgA."),
    act("episodios", "¿Cuántas veces y cómo se fue?", "clave", "“Tres veces; se va sola en unos días.”", "Hematuria macroscópica recurrente."),
    act("edemas", "¿Hinchazón o espuma en la orina?", "clave", "“Algo de espuma.”", "Proteinuria."),
    act("dolor", "¿Dolor al orinar o cólico?", "util", "“No.”", "Excluye litiasis e infección."),
    act("familia", "¿Familia con enfermedad renal o sordera?", "util", "“No.”", "Alport."),
    act("deporte", "¿Hace deporte?", "neutro", "“Juego al vóley.”", "No orienta."),
  ],
  exam: [
    act("ta", "Presión arterial repetida", "clave", "142/90 y 140/88.", "Hipertensión."),
    act("edema", "Edemas", "clave", "Ausentes.", "No es nefrótico."),
    act("piel", "Piel y articulaciones", "util", "Sin púrpura.", "Excluye Schönlein-Henoch."),
  ],
  studies: [
    study("Laboratorio", "orina", "Sedimento con hematíes dismórficos y proteinuria de 24 horas", "clave", "Hematíes dismórficos y acantocitos; proteinuria 1,4 g/día.", "Origen glomerular."),
    study("Laboratorio", "renal", "Creatinina, complemento, ASTO", "clave", "Creatinina 1,1; C3 y C4 normales; ASTO normal.", "Complemento normal."),
    study("Otros", "biopsia", "Biopsia renal", "util", "Depósitos mesangiales de IgA.", "Confirma y da pronóstico."),
    study("Imágenes", "cistoscopia", "Cistoscopia", "innecesario", "No se realizó.", "Hematuria glomerular en joven."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("iga", "Nefropatía por IgA (enfermedad de Berger)", true, "Hematuria macroscópica 1 a 2 días después de infecciones, complemento normal y depósitos de IgA."),
      dx("gn-postestrep", "Glomerulonefritis postestreptocócica", false, "Aparece a las 2 o 3 semanas y baja el C3."),
      dx("alport", "Síndrome de Alport", false, "Sin antecedentes familiares ni sordera."),
      dx("litiasis", "Litiasis renal", false, "Hematuria glomerular sin dolor."),
      dx("cancer-vejiga", "Tumor vesical", false, "Joven y con hematíes dismórficos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ieca", "IECA o ARA II a dosis máxima tolerada", "clave", "Bajan la proteinuria y la presión."),
      mg("seguimiento", "Control de proteinuria, creatinina y presión", "clave", "Pronóstico."),
      mg("habitos", "Dieta con poca sal y no fumar", "clave", "Protección renal."),
      mg("isglt2", "Inhibidor de SGLT2 si persiste la proteinuria", "util", "Nefroprotección."),
      mg("aines", "AINE para los síntomas de los resfríos", "riesgoso", "Nefrotóxicos."),
      mg("amigdalectomia", "Amigdalectomía de rutina", "innecesario", "Sin beneficio claro en nuestro medio."),
    ],
  },
  debrief: {
    diagnosis: "Nefropatía por IgA con hematuria macroscópica recurrente, proteinuria e hipertensión, en varón de 24 años.",
    pathologies: [
      { name: "Nefropatía por IgA", role: "principal", why: "Glomerulonefritis primaria más frecuente." },
      { name: "Hipertensión y proteinuria", role: "asociada", why: "Marcadores de mal pronóstico." },
      { name: "GN postestreptocócica, Alport", role: "diferencial", why: "Otras hematurias glomerulares." },
    ],
    reasoning: [
      "Causa: IgA1 con glicosilación anómala.",
      "Mecanismo: inmunocomplejos que se depositan en el mesangio y se activan con las infecciones mucosas.",
      "Consecuencia: hematuria, proteinuria y, en parte de los pacientes, enfermedad renal crónica.",
    ],
    epidemiology:
      "Es la glomerulonefritis primaria más frecuente en el mundo, sobre todo en varones jóvenes. Hasta un tercio progresa a enfermedad renal crónica en 20 años. La proteinuria persistente y la hipertensión empeoran el pronóstico.",
    management: [
      "Sedimento.",
      "Biopsia.",
      "IECA o ARA II.",
      "Seguimiento.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Glomerulopatías.", "KDIGO — Clinical Practice Guideline for Glomerular Diseases."],
    pearls: ["Hematuria a 1 o 2 días del resfrío.", "Complemento normal.", "La proteinuria marca el pronóstico."],
    pitfalls: ["Confundirla con postestreptocócica.", "AINE."],
    tribunal: [
      qa("¿En qué se diferencia de la glomerulonefritis postestreptocócica?", "La IgA aparece a 1 o 2 días con C3 normal; la postestreptocócica a 2 o 3 semanas con C3 bajo."),
      qa("¿Qué es un hematíe dismórfico?", "Glóbulo rojo deformado al atravesar el glomérulo, que indica origen glomerular."),
      qa("¿Qué enfermedad sistémica comparte el mecanismo?", "La vasculitis por IgA, o Schönlein-Henoch."),
    ],
  },
};
