import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const sindromeNefrotico: ClinicalCase = {
  id: "sindrome-nefrotico-nino",
  level: 3,
  area: "Nefrourología",
  setting: "Consultorio",
  patient: { age: 4, ageUnit: "años", sex: "M", context: "Lo traen los padres." },
  frequency: "poco-frecuente",
  intro: "“Hace una semana se levanta con los ojos hinchados. Ahora tiene la panza grande y las piernas hinchadas, y el pis hace mucha espuma.”",
  vitals: { TA: "96/58 mmHg", FC: "100 lpm", "T°": "36,6 °C", Peso: "19,5 kg (hace un mes: 17 kg)" },
  anamnesis: [
    act("edema", "¿Cómo empezó la hinchazón?", "clave", "“Primero los párpados a la mañana, después las piernas y la panza.”", "Edema que empieza en párpados por la mañana y se generaliza: típico del síndrome nefrótico en niños."),
    act("orina", "¿Cómo es la orina? ¿Roja o como coca?", "clave", "“Con espuma, pero de color normal.”", "Espuma = proteinuria. Orina oscura con hematuria orientaría a síndrome nefrítico."),
    act("infeccion", "¿Tuvo anginas o lesiones en la piel en las últimas semanas?", "util", "“Un resfrío hace dos semanas.”", "Una faringitis o un impétigo previos orientarían a glomerulonefritis posestreptocócica."),
    act("dolor", "¿Tiene dolor de panza o fiebre?", "clave", "“No.”", "Fiebre con dolor abdominal en un nefrótico hace pensar en peritonitis primaria (complicación)."),
    act("vacunas", "¿Tiene las vacunas al día?", "util", "“Sí.”", "Importa porque recibirá corticoides y tiene riesgo de infecciones por neumococo."),
    act("dibujo", "¿Le gusta dibujar?", "neutro", "“Mucho.”", "No orienta."),
  ],
  exam: [
    act("edemas", "Edemas y ascitis", "clave", "Edema palpebral, edema con fóvea en piernas y escroto; ascitis moderada.", "Anasarca por hipoalbuminemia."),
    act("ta", "Presión arterial", "clave", "96/58, normal para la edad.", "La hipertensión orientaría a formas atípicas o nefríticas."),
    act("pulmonar", "Auscultación pulmonar", "util", "Hipoventilación bibasal leve.", "Pequeño derrame pleural."),
    act("perfusion", "Perfusión periférica", "util", "Buena perfusión.", "Algunos nefróticos tienen hipovolemia pese a los edemas."),
  ],
  studies: [
    study("Laboratorio", "proteinuria", "Índice proteína/creatinina en orina", "clave", "6,2 mg/mg (rango nefrótico > 2).", "Proteinuria masiva."),
    study("Laboratorio", "lab", "Albúmina, colesterol, función renal, ionograma, hemograma", "clave", "Albúmina 1,6 g/dl, colesterol 390 mg/dl, creatinina normal.", "Hipoalbuminemia e hiperlipidemia completan el síndrome."),
    study("Laboratorio", "orina", "Orina completa", "clave", "Proteínas +++, sin hematuria ni cilindros hemáticos.", "Sin hematuria: orienta a enfermedad de cambios mínimos."),
    study("Laboratorio", "complemento", "Complemento C3 y C4", "util", "Normales.", "Complemento bajo orientaría a glomerulonefritis posinfecciosa, lúpica o membranoproliferativa."),
    study("Otros", "biopsia", "Biopsia renal de entrada", "innecesario", "No se realizó.", "En niños de 1 a 10 años con cuadro típico se trata con corticoides sin biopsia; se biopsia si no responde o es atípico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nefrotico", "Síndrome nefrótico idiopático (probable enfermedad de cambios mínimos)", true, "Edemas, proteinuria masiva, hipoalbuminemia e hiperlipidemia, sin hematuria, hipertensión ni complemento bajo, en un niño de 4 años."),
      dx("nefritico", "Síndrome nefrítico (glomerulonefritis posestreptocócica)", false, "Hematuria, hipertensión, edemas leves, oliguria y C3 bajo."),
      dx("ic", "Insuficiencia cardíaca", false, "No explica la proteinuria masiva."),
      dx("hepatopatia", "Hepatopatía con hipoalbuminemia", false, "No habría proteinuria; hepatograma alterado."),
      dx("enteropatia", "Enteropatía perdedora de proteínas", false, "Hipoalbuminemia sin proteinuria."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("prednisona", "Prednisona 60 mg/m²/día por 4–6 semanas, luego días alternos con descenso", "clave", "La mayoría de los niños responde (corticosensibles), lo que confirma la sospecha de cambios mínimos."),
      mg("dieta", "Dieta normoproteica e hiposódica; líquidos según edemas", "clave", "Limita los edemas."),
      mg("alarma", "Pautas de alarma: fiebre, dolor abdominal, dolor o hinchazón de una pierna", "clave", "Detecta peritonitis primaria y trombosis, complicaciones del nefrótico."),
      mg("vacunas", "Completar vacunas inactivadas (antineumocócica) y control de recaídas con tira reactiva en casa", "util", "Previene infecciones y detecta recaídas temprano."),
      mg("diureticos", "Diuréticos en dosis altas para sacar los edemas rápido", "riesgoso", "Pueden causar hipovolemia, insuficiencia renal y trombosis."),
      mg("biopsia", "Biopsia antes de iniciar corticoides", "innecesario", "No está indicada en el cuadro típico."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome nefrótico idiopático en niño de 4 años, probable enfermedad de cambios mínimos.",
    pathologies: [
      { name: "Síndrome nefrótico por cambios mínimos", role: "principal", why: "Cuadro típico en niños pequeños." },
      { name: "Glomerulonefritis posestreptocócica", role: "diferencial", why: "Síndrome nefrítico." },
      { name: "Peritonitis primaria y trombosis", role: "diferencial", why: "Complicaciones." },
    ],
    reasoning: [
      "Causa: probablemente un factor circulante de origen inmune (relacionado con linfocitos T) que altera el filtro glomerular.",
      "Mecanismo: se pierden la carga negativa de la membrana basal y los pedicelos de los podocitos (fusión, visible solo en microscopía electrónica: “cambios mínimos”). La albúmina se escapa a la orina.",
      "Consecuencia: proteinuria masiva → hipoalbuminemia → caída de la presión oncótica → edemas; el hígado aumenta la síntesis de lipoproteínas (hiperlipidemia); se pierden inmunoglobulinas y anticoagulantes naturales (infecciones y trombosis).",
      "Por eso responde tan bien a los corticoides.",
    ],
    epidemiology:
      "El síndrome nefrótico idiopático afecta a 2–7 de cada 100.000 niños por año, con pico entre los 2 y 6 años, y es dos veces más frecuente en varones en la infancia. En el 80–90 % de los niños es por cambios mínimos y responde a corticoides; las recaídas son frecuentes.",
    management: [
      "Confirmar: proteinuria en rango nefrótico, hipoalbuminemia, edemas, hiperlipidemia.",
      "Prednisona sin biopsia en el cuadro típico entre 1 y 10 años.",
      "Dieta hiposódica, manejo cuidadoso de edemas.",
      "Biopsia si es corticorresistente, menor de 1 año, mayor de 10, con hematuria, hipertensión o complemento bajo.",
      "Vacunas, pautas de alarma y seguimiento de recaídas.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de tratamiento del síndrome nefrótico en la infancia.", "Sociedad Argentina de Nefrología — Recomendaciones de glomerulopatías."],
    pearls: ["Edema palpebral matutino + orina espumosa en un niño: nefrótico.", "Cambios mínimos: sin hematuria, presión normal, complemento normal.", "Se trata con corticoides sin biopsia."],
    pitfalls: ["Biopsiar de entrada.", "Diuréticos agresivos.", "Ignorar fiebre con dolor abdominal."],
  },
};
