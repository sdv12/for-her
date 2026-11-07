import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const escarlatina: ClinicalCase = {
  id: "escarlatina",
  level: 1,
  area: "Pediatría",
  setting: "CAPS",
  patient: { age: 6, ageUnit: "años", sex: "F", context: "Va a primer grado, hay compañeros con anginas. Vacunas al día. Sin alergias." },
  frequency: "frecuente",
  intro: "“Ayer tuvo fiebre y dolor de garganta. Hoy le salió un sarpullido rasposo, como papel de lija.” (relata el padre)",
  vitals: { FC: "118 lpm", FR: "22 rpm", "T°": "38,9 °C", Peso: "21 kg" },
  anamnesis: [
    act("exantema", "¿Dónde empezó el sarpullido? ¿Cómo se siente?", "clave", "“En el cuello y las axilas; rasposo.”", "Exantema de textura típica."),
    act("garganta", "¿Tos o mocos? ¿Le duele para tragar?", "clave", "“No tiene tos; le duele tragar.”", "Sin síntomas catarrales: orienta a estreptococo."),
    act("alergia", "¿Alergia a la penicilina?", "clave", "“No.”", "Define el tratamiento."),
    act("vacunas", "¿Vacunas completas? ¿Contactos?", "util", "“Sí; compañeros con angina.”", "Sarampión y rubéola menos probables."),
    act("farmacos", "¿Tomó algún medicamento antes del sarpullido?", "util", "“Solo paracetamol.”", "Alergia a fármacos."),
    act("dibujo", "¿Qué le gusta dibujar?", "neutro", "“Caballos.”", "No orienta."),
  ],
  exam: [
    act("faringe", "Fauces y lengua", "clave", "Amígdalas rojas con exudado, petequias en paladar, lengua en frambuesa.", "Típico."),
    act("piel", "Piel", "clave", "Exantema micropapular que blanquea, líneas de Pastia en pliegues, palidez alrededor de la boca.", "Signos clásicos."),
    act("ganglios", "Ganglios", "util", "Cervicales anteriores dolorosos.", "Faringitis estreptocócica."),
  ],
  studies: [
    study("Microbiología", "test", "Test rápido de estreptococo o cultivo de fauces", "clave", "Positivo.", "Confirma antes de tratar."),
    study("Laboratorio", "lab", "Hemograma y ASTO de rutina", "innecesario", "No se realizó.", "No hacen falta; ASTO no diagnostica el cuadro agudo."),
    study("Laboratorio", "orina", "Orina a las 2 o 3 semanas solo si hay síntomas", "util", "No se pide de rutina.", "Si aparece edema o hematuria."),
    study("Imágenes", "rx", "Radiografía de tórax", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("escarlatina", "Escarlatina por Streptococcus pyogenes", true, "Faringitis exudativa, exantema en lija, lengua en frambuesa y test positivo."),
      dx("kawasaki", "Enfermedad de Kawasaki", false, "Requiere 5 días de fiebre con otros criterios."),
      dx("sarampion", "Sarampión", false, "Daría tos, coriza, conjuntivitis y Koplik."),
      dx("mono", "Mononucleosis", false, "Con test positivo, sin hepatoesplenomegalia ni adenopatías generalizadas."),
      dx("toxico", "Síndrome de shock tóxico", false, "No hay hipotensión ni falla de órganos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("amoxi", "Amoxicilina 10 días", "clave", "Previene fiebre reumática y reduce el contagio."),
      mg("escuela", "Volver a la escuela tras 24 horas de antibiótico", "clave", "Reduce el contagio."),
      mg("sintomas", "Paracetamol, líquidos e informar la descamación esperada", "util", "Tranquiliza."),
      mg("alarma", "Pautas de alarma: dolor articular, orina oscura, edemas", "clave", "Complicaciones posestreptocócicas."),
      mg("corticoide", "Corticoides de rutina", "innecesario", "No indicados."),
      mg("aspirina", "Aspirina para la fiebre", "riesgoso", "Riesgo de síndrome de Reye en niños."),
    ],
  },
  debrief: {
    diagnosis: "Escarlatina por estreptococo beta hemolítico del grupo A en niña de 6 años.",
    pathologies: [
      { name: "Escarlatina", role: "principal", why: "Faringitis con exantema por exotoxinas." },
      { name: "Riesgo de fiebre reumática y glomerulonefritis", role: "asociada", why: "Complicaciones." },
      { name: "Kawasaki, sarampión, mononucleosis", role: "diferencial", why: "Otras causas de fiebre y exantema." },
    ],
    reasoning: [
      "Causa: S. pyogenes productor de exotoxinas pirogénicas.",
      "Mecanismo: la toxina causa vasodilatación y exantema.",
      "Consecuencia: exantema, descamación; riesgo de complicaciones inmunes.",
    ],
    epidemiology:
      "Afecta sobre todo a niños de 3 a 12 años, en invierno y primavera, por contacto cercano en la escuela. Es poco común antes de los 3 años. El tratamiento con penicilina o amoxicilina hace que las complicaciones sean hoy poco frecuentes.",
    management: [
      "Confirmar con test.",
      "Amoxicilina 10 días.",
      "24 horas antes de volver a la escuela.",
      "Pautas de alarma.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Recomendaciones de faringitis.", "Ministerio de Salud de la Nación — Guía de infecciones respiratorias."],
    pearls: ["Piel en lija + lengua en frambuesa.", "Sin tos ni mocos: pensá en estreptococo.", "10 días de antibiótico."],
    pitfalls: ["Dar antibióticos sin test.", "Olvidar el control posestreptocócico."],
    tribunal: [
      qa("¿Qué son los criterios de Centor?", "Fiebre, exudado amigdalino, adenopatías cervicales anteriores dolorosas y ausencia de tos, con ajustes por edad."),
      qa("¿Cuáles son los criterios de Jones?", "Mayores: carditis, artritis, corea, eritema marginado, nódulos. Menores: fiebre, artralgias, reactantes altos, PR prolongado."),
      qa("¿Qué complicación no se previene con antibiótico?", "La glomerulonefritis posestreptocócica, a diferencia de la fiebre reumática."),
    ],
  },
};
