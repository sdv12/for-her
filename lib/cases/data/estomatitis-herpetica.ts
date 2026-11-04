import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const estomatitisHerpetica: ClinicalCase = {
  id: "gingivoestomatitis-herpetica",
  level: 1,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 18, ageUnit: "meses", sex: "M", context: "Va a la guardería. Su papá tuvo un herpes labial la semana pasada." },
  frequency: "frecuente",
  intro: "“Hace tres días tiene fiebre alta, está muy molesto, babea mucho y no quiere comer ni tomar. Tiene la boca llena de llagas.” (relata la madre)",
  vitals: { FC: "142 lpm", FR: "28 rpm", "T°": "38,9 °C", Peso: "11 kg" },
  anamnesis: [
    act("liquidos", "¿Cuánto toma? ¿Cuántos pañales moja?", "clave", "“Casi nada; dos pañales en el día.”", "El rechazo de líquidos por dolor puede deshidratarlo: criterio de internación."),
    act("contacto", "¿Alguien tuvo ampollas en los labios?", "clave", "“El papá, la semana pasada, y lo besa mucho.”", "Contagio del virus herpes simple 1."),
    act("inicio", "¿Cómo empezó?", "util", "“Fiebre y después las llagas.”", "Primoinfección herpética."),
    act("ojos", "¿Tiene los ojos rojos o lesiones en los dedos?", "clave", "“Se chupa los dedos y tiene una ampolla.”", "Autoinoculación (panadizo herpético); vigilar los ojos."),
    act("piel", "¿Tiene dermatitis atópica?", "util", "“No.”", "En atópicos puede dar eccema herpético grave."),
    act("guarderia", "¿En qué sala está?", "neutro", "“Deambuladores.”", "No orienta."),
  ],
  exam: [
    act("boca", "Boca y encías", "clave", "Encías rojas, edematosas y sangrantes, múltiples úlceras en lengua, paladar y labios con vesículas peribucales.", "Gingivoestomatitis herpética."),
    act("hidratacion", "Hidratación", "clave", "Mucosas secas, llanto sin lágrimas.", "Deshidratación leve a moderada."),
    act("ganglios", "Ganglios", "util", "Adenopatías submaxilares dolorosas.", "Frecuentes."),
  ],
  studies: [
    study("Microbiología", "pcr", "PCR de las lesiones si hay dudas", "util", "Positiva para VHS-1.", "Confirma, aunque el diagnóstico es clínico."),
    study("Laboratorio", "hemograma", "Hemograma de rutina", "innecesario", "No se realizó.", "No cambia la conducta."),
    study("Microbiología", "exudado", "Exudado de fauces para estreptococo", "innecesario", "No se realizó.", "El cuadro es típico de herpes."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("herpes", "Gingivoestomatitis herpética (primoinfección por VHS-1) con deshidratación por rechazo de líquidos", true, "Fiebre, encías inflamadas y sangrantes, úlceras orales múltiples y vesículas peribucales, con contacto con herpes labial."),
      dx("herpangina", "Herpangina", false, "Afecta el paladar blando y las amígdalas, sin gingivitis."),
      dx("mano-pie-boca", "Enfermedad mano-pie-boca", false, "Daría lesiones en manos y pies, sin gingivitis intensa."),
      dx("aftas", "Aftas recurrentes", false, "No dan fiebre alta ni gingivitis en un lactante."),
      dx("candidiasis", "Candidiasis oral", false, "Placas blancas que se desprenden, sin úlceras ni fiebre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aciclovir", "Aciclovir oral si consulta en los primeros 3–4 días", "clave", "Acorta la duración de las lesiones y la fiebre."),
      mg("hidratacion", "Hidratación: líquidos fríos en pequeñas cantidades; sonda o EV si no logra tomar", "clave", "Evitar la deshidratación."),
      mg("analgesia", "Paracetamol o ibuprofeno en horario antes de comer", "clave", "El dolor impide alimentarse."),
      mg("higiene", "Lavado de manos, evitar que comparta utensilios, cuidar los ojos", "util", "Contagio y autoinoculación."),
      mg("corticoide", "Corticoides orales", "riesgoso", "Pueden empeorar la infección viral."),
      mg("lidocaina-viscosa", "Lidocaína viscosa en grandes cantidades", "riesgoso", "Riesgo de toxicidad y de aspiración en niños pequeños."),
    ],
  },
  debrief: {
    diagnosis: "Gingivoestomatitis herpética (primoinfección por VHS-1) con rechazo de líquidos y deshidratación leve a moderada, en lactante de 18 meses.",
    pathologies: [
      { name: "Gingivoestomatitis herpética", role: "principal", why: "Primoinfección por VHS-1." },
      { name: "Deshidratación", role: "asociada", why: "Por dolor al tragar." },
      { name: "Herpangina, mano-pie-boca, aftas", role: "diferencial", why: "Otras estomatitis." },
    ],
    reasoning: [
      "Causa: virus herpes simple 1, por contacto con saliva de un adulto con herpes.",
      "Mecanismo: la primoinfección produce vesículas que se ulceran en la mucosa oral y encías; el virus queda latente en el ganglio trigeminal.",
      "Consecuencia: fiebre, dolor intenso, rechazo de alimentos y líquidos; recurrencias posteriores como herpes labial.",
    ],
    epidemiology:
      "La gingivoestomatitis herpética es la forma más frecuente de primoinfección por herpes en niños de 6 meses a 5 años. La deshidratación por rechazo de líquidos es el motivo principal de internación.",
    management: [
      "Diagnóstico clínico.",
      "Aciclovir temprano, analgesia e hidratación.",
      "Internar si no tolera líquidos.",
      "Higiene y prevención de contagios.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Infecciones por virus herpes en pediatría.", "Sociedad Argentina de Infectología Pediátrica — Recomendaciones."],
    pearls: ["Encías rojas sangrantes + úlceras = herpes.", "Hidratar y analgesia.", "Cuidar los ojos."],
    pitfalls: ["Antibióticos sin indicación.", "No evaluar la hidratación."],
    tribunal: [
      qa("¿Qué diferencia la herpangina de la gingivoestomatitis herpética?", "La herpangina (enterovirus, verano) da vesículas y úlceras en el paladar blando, úvula y pilares, sin gingivitis; la herpética afecta encías, lengua y labios con gingivitis intensa."),
      qa("¿Qué es el eccema herpético?", "La diseminación del herpes simple sobre piel con dermatitis atópica, con vesículas umbilicadas y erosiones extensas y fiebre; requiere aciclovir, a veces EV."),
      qa("¿Qué es la queratitis herpética?", "La infección de la córnea por herpes con úlceras dendríticas; se sospecha ante ojo rojo, dolor y fotofobia en un paciente con herpes, y requiere oftalmología. No se usan corticoides tópicos sin indicación."),
    ],
  },
};
