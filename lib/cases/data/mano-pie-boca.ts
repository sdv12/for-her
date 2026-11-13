import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const manoPieBoca: ClinicalCase = {
  id: "enfermedad-mano-pie-boca",
  level: 1,
  area: "Pediatría",
  setting: "CAPS",
  patient: { age: 2, ageUnit: "años", sex: "F", context: "Va al jardín maternal, donde hay otros nenes con ampollitas." },
  frequency: "muy-frecuente",
  intro: "“Tiene fiebre desde ayer, no quiere comer porque le duele la boca y le salieron granitos en las manos y los pies.”",
  vitals: { FC: "128 lpm", FR: "26 rpm", "T°": "38,4 °C", Peso: "12 kg" },
  anamnesis: [
    act("lesiones", "¿Dónde aparecieron los granitos?", "clave", "“Manos, plantas y la cola.”", "Distribución típica."),
    act("boca", "¿Come y toma?", "clave", "“Toma agua de a poco, no quiere comer.”", "Riesgo de deshidratación."),
    act("diuresis", "¿Moja pañales?", "clave", "“Sí, cinco hoy.”", "Hidratación conservada."),
    act("jardin", "¿Hay casos en el jardín?", "util", "“Varios.”", "Brote."),
    act("alarma", "¿Está muy dormida, vomita o tiene sacudidas?", "util", "“No.”", "Compromiso neurológico."),
    act("juguete", "¿Qué le gusta?", "neutro", "“Los títeres.”", "No orienta."),
  ],
  exam: [
    act("boca-ex", "Boca", "clave", "Vesículas y úlceras pequeñas en lengua y paladar blando.", "Enantema."),
    act("piel", "Piel", "clave", "Vesículas ovaladas grisáceas en palmas y plantas, pápulas en glúteos.", "Exantema típico."),
    act("hidratacion", "Hidratación", "util", "Mucosas húmedas, alerta.", "Sin deshidratación."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Suficiente.", "Clínica típica."),
    study("Otros", "neuro", "Pautas de alarma neurológica", "clave", "Explicadas.", "Complicaciones raras."),
    study("Laboratorio", "pcr-enterovirus", "PCR de enterovirus", "innecesario", "No se realizó.", "Solo en casos graves o brotes."),
    study("Laboratorio", "hemograma", "Hemograma", "innecesario", "No se realizó.", "No cambia la conducta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mpb", "Enfermedad mano-pie-boca por enterovirus", true, "Fiebre, enantema con úlceras, vesículas en palmas, plantas y glúteos, en contexto de brote en el jardín."),
      dx("varicela", "Varicela", false, "Lesiones en distintos estadios en tronco, no en palmas y plantas."),
      dx("gingivoestomatitis", "Gingivoestomatitis herpética", false, "Afecta encías y no da lesiones en manos y pies."),
      dx("herpangina", "Herpangina aislada", false, "Hay lesiones en manos y pies."),
      dx("sarampion", "Sarampión", false, "Exantema maculopapular y Koplik."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hidratacion", "Hidratación con líquidos frescos y comidas blandas", "clave", "Evita deshidratación."),
      mg("antitermico", "Paracetamol o ibuprofeno para fiebre y dolor", "clave", "Confort."),
      mg("pautas", "Pautas de alarma: no toma, no orina, somnolencia, sacudidas", "clave", "Complicaciones."),
      mg("higiene", "Lavado de manos y cuidado con pañales", "util", "Transmisión fecal-oral prolongada."),
      mg("aciclovir", "Aciclovir", "innecesario", "No es herpes."),
      mg("anestesico-oral", "Benzocaína o lidocaína viscosa oral en dosis repetidas", "riesgoso", "Riesgo de toxicidad y metahemoglobinemia en niños pequeños."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad mano-pie-boca por enterovirus, sin deshidratación, en niña de 2 años.",
    pathologies: [
      { name: "Enfermedad mano-pie-boca", role: "principal", why: "Infección por coxsackie o enterovirus." },
      { name: "Hipoingesta por dolor", role: "asociada", why: "Riesgo de deshidratación." },
      { name: "Varicela, gingivoestomatitis", role: "diferencial", why: "Otros exantemas vesiculares." },
    ],
    reasoning: [
      "Causa: coxsackievirus A16, A6 o enterovirus 71.",
      "Mecanismo: replicación en orofaringe e intestino con diseminación a piel y mucosas.",
      "Consecuencia: enantema doloroso y exantema vesicular autolimitado.",
    ],
    epidemiology:
      "Es muy frecuente en menores de 5 años, con brotes en jardines en primavera y verano. Se transmite por saliva, vesículas y materia fecal, que sigue eliminando virus por semanas. Puede dejar caída de uñas semanas después.",
    management: [
      "Clínica.",
      "Hidratación.",
      "Analgesia.",
      "Pautas de alarma.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Enfermedades exantemáticas.", "CDC — Hand, Foot, and Mouth Disease for Healthcare Professionals."],
    pearls: ["Palmas, plantas y boca.", "Lo que importa es la hidratación.", "Puede caerse alguna uña después."],
    pitfalls: ["Antivirales.", "Anestésicos orales repetidos."],
    tribunal: [
      qa("¿Qué complicación neurológica puede dar el enterovirus 71?", "Encefalitis de tronco, meningitis aséptica y parálisis flácida aguda."),
      qa("¿Hasta cuándo excluís del jardín?", "Hasta que no tenga fiebre y esté en condiciones; la exclusión prolongada no frena el brote."),
      qa("¿Qué es la onicomadesis?", "Desprendimiento de uñas semanas después de la infección, benigno."),
    ],
  },
};
