import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const faringitisAlergia: ClinicalCase = {
  id: "faringitis-estreptococica-alergia-penicilina",
  level: 1,
  area: "Infectología",
  setting: "CAPS",
  patient: { age: 14, ageUnit: "años", sex: "F", context: "A los 8 años tuvo una reacción con amoxicilina: se le hinchó la cara y le costó respirar." },
  frequency: "muy-frecuente",
  intro: "“Desde ayer me duele mucho la garganta, me cuesta tragar y tengo fiebre. No tengo tos ni mocos.”",
  vitals: { FC: "102 lpm", FR: "18 rpm", "T°": "38,9 °C", Peso: "50 kg" },
  anamnesis: [
    act("alergia", "¿Qué te pasó exactamente con la amoxicilina?", "clave", "“A la hora se me hinchó la cara y me costó respirar, me pusieron una inyección.”", "Reacción inmediata grave (anafilaxia): contraindica todos los betalactámicos de primera línea, incluidas las cefalosporinas de primera generación."),
    act("tos", "¿Tenés tos, mocos, disfonía o conjuntivitis?", "clave", "“No.”", "La ausencia de síntomas virales suma puntos para estreptococo."),
    act("contactos", "¿Alguien en tu casa o escuela tuvo anginas?", "util", "“Mi hermano la semana pasada.”", "Contacto con estreptococo."),
    act("complicaciones", "¿Podés abrir bien la boca? ¿Te cambió la voz?", "clave", "“Sí, normal.”", "Descarta absceso periamigdalino (trismus, voz de papa caliente)."),
    act("orina", "¿Tuviste orina oscura o hinchazón?", "util", "“No.”", "Descarta glomerulonefritis por episodios previos."),
    act("instrumento", "¿Tocás algún instrumento?", "neutro", "“La guitarra.”", "No orienta."),
  ],
  exam: [
    act("fauces", "Examen de fauces", "clave", "Amígdalas hipertróficas con exudado blanquecino, petequias en el paladar.", "Compatible con faringitis estreptocócica."),
    act("ganglios", "Ganglios cervicales", "clave", "Adenopatías cervicales anteriores dolorosas.", "Criterio de Centor."),
    act("simetria", "Simetría de la úvula y del paladar", "util", "Simétricos.", "Sin absceso periamigdalino."),
  ],
  studies: [
    study("Microbiología", "rapido", "Test rápido de estreptococo o cultivo de fauces", "clave", "Positivo para Streptococcus pyogenes.", "Confirma el diagnóstico y justifica el antibiótico."),
    study("Laboratorio", "asto", "ASTO", "innecesario", "No se realizó.", "No sirve para diagnosticar la faringitis aguda."),
    study("Laboratorio", "hemograma", "Hemograma", "innecesario", "No se realizó.", "No cambia la conducta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ebhga", "Faringoamigdalitis estreptocócica en adolescente con antecedente de anafilaxia a la amoxicilina", true, "Fiebre, odinofagia, exudado, adenopatías dolorosas, sin tos, con test rápido positivo."),
      dx("viral", "Faringitis viral", false, "No hay síntomas virales y el test es positivo."),
      dx("mono", "Mononucleosis", false, "Habría adenopatías posteriores, esplenomegalia y cansancio; el test es positivo para estreptococo."),
      dx("absceso", "Absceso periamigdalino", false, "No hay trismus ni desviación de la úvula."),
      dx("alergia-falsa", "No es alérgica, se puede dar amoxicilina", false, "La reacción fue inmediata con compromiso respiratorio: es una alergia grave probable."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("macrolido", "Azitromicina por 5 días (o clindamicina)", "clave", "Alternativas para alergia grave a betalactámicos; la resistencia a macrólidos obliga a vigilar la respuesta."),
      mg("sintomaticos", "Paracetamol o ibuprofeno y líquidos", "clave", "Alivio del dolor y la fiebre."),
      mg("registro", "Registrar la alergia en la historia clínica y derivar a alergia para estudio", "util", "Puede confirmarse o descartarse; muchas alergias referidas no son reales, pero esta es de alto riesgo."),
      mg("escuela", "Volver a la escuela 24 h después de iniciado el antibiótico", "util", "Deja de contagiar."),
      mg("amoxicilina", "Amoxicilina con un antihistamínico", "riesgoso", "Riesgo de anafilaxia."),
      mg("cefalexina", "Cefalexina", "riesgoso", "Tras una reacción inmediata grave no se recomiendan cefalosporinas de primera generación sin evaluación."),
    ],
  },
  debrief: {
    diagnosis: "Faringoamigdalitis aguda por estreptococo betahemolítico del grupo A en adolescente de 14 años con antecedente de anafilaxia a la amoxicilina.",
    pathologies: [
      { name: "Faringoamigdalitis estreptocócica", role: "principal", why: "Test rápido positivo con clínica compatible." },
      { name: "Alergia grave a betalactámicos", role: "asociada", why: "Cambia la elección del antibiótico." },
      { name: "Faringitis viral, mononucleosis, absceso", role: "diferencial", why: "Otras causas de odinofagia." },
    ],
    reasoning: [
      "Causa: Streptococcus pyogenes, transmitido por gotas.",
      "Mecanismo: coloniza y lesiona el epitelio faríngeo y genera una respuesta inflamatoria intensa.",
      "Consecuencia: odinofagia, fiebre, exudado; sin tratamiento, complicaciones supurativas y no supurativas (fiebre reumática, glomerulonefritis).",
    ],
    epidemiology:
      "El estreptococo causa alrededor del 20–30 % de las faringitis en niños de 5 a 15 años y menos en adultos. Entre el 5 y el 10 % de las personas refiere alergia a la penicilina, aunque la mayoría no la tiene al estudiarla; las reacciones inmediatas graves son las que contraindican su uso.",
    management: [
      "Sospecha clínica (Centor o McIsaac) y confirmación con test rápido o cultivo.",
      "Primera elección: amoxicilina o penicilina por 10 días.",
      "Alergia no grave: cefalexina; alergia grave inmediata: azitromicina o clindamicina.",
      "Registrar y estudiar la alergia.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de faringitis aguda.", "Sociedad Argentina de Infectología — Recomendaciones de uso de antibióticos."],
    pearls: ["Confirmar antes de tratar.", "Anafilaxia previa = macrólido o clindamicina.", "No toda “alergia” es alergia: estudiar."],
    pitfalls: ["Dar amoxicilina con antihistamínico.", "No preguntar qué tipo de reacción tuvo."],
    tribunal: [
      qa("¿Cuáles son los criterios de Centor modificados (McIsaac)?", "Fiebre mayor de 38 °C, ausencia de tos, adenopatías cervicales anteriores dolorosas, exudado o hipertrofia amigdalina, y edad (3 a 14 años suma 1, 45 o más resta 1); con 2 o más se hace test rápido o cultivo."),
      qa("¿Qué complicaciones tiene la faringitis estreptocócica?", "Supurativas: absceso periamigdalino y retrofaríngeo, otitis, sinusitis, adenitis. No supurativas: fiebre reumática (prevenible con el antibiótico), glomerulonefritis posestreptocócica (no prevenible) y escarlatina."),
      qa("¿Cómo se clasifican las reacciones alérgicas a fármacos?", "Inmediatas (en la primera hora, mediadas por IgE: urticaria, angioedema, anafilaxia) y tardías (horas o días, mediadas por células T: exantemas, DRESS, Stevens-Johnson); las inmediatas graves y las tardías graves contraindican el fármaco."),
    ],
  },
};
