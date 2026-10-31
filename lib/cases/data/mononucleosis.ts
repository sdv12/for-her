import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const mononucleosis: ClinicalCase = {
  id: "mononucleosis-infecciosa",
  level: 1,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 17, ageUnit: "años", sex: "M", context: "Juega al rugby. Volvió del viaje de egresados hace tres semanas." },
  frequency: "frecuente",
  intro: "“Hace una semana tengo fiebre, la garganta muy inflamada y estoy agotado. Me dieron amoxicilina y ahora me salió un sarpullido en todo el cuerpo.”",
  vitals: { FC: "98 lpm", "T°": "38,4 °C", TA: "118/72 mmHg" },
  anamnesis: [
    act("cansancio", "¿Cómo está de energía?", "clave", "“Muerto, duermo todo el día.”", "La astenia marcada es característica de la mononucleosis."),
    act("amoxicilina", "¿Cuándo empezó el sarpullido respecto de la amoxicilina?", "clave", "“Al tercer día de tomarla.”", "Exantema por aminopenicilinas: aparece en la mayoría de los pacientes con mononucleosis (no es alergia verdadera)."),
    act("contacto", "¿Estuvo con alguien enfermo? ¿Compartió bebidas o besos?", "util", "“En el viaje compartimos de todo.”", "Se transmite por saliva (“enfermedad del beso”)."),
    act("abdomen", "¿Le duele la panza del lado izquierdo?", "util", "“Un poco.”", "La esplenomegalia puede dar dolor en hipocondrio izquierdo."),
    act("deporte", "¿Cuándo tiene el próximo partido?", "clave", "“El sábado.”", "Riesgo de rotura esplénica con deportes de contacto."),
    act("tragar", "¿Puede tragar y respirar bien?", "clave", "“Me cuesta tragar pero respiro bien.”", "La obstrucción de la vía aérea por amígdalas gigantes es una complicación rara pero grave."),
    act("musica", "¿Qué música escucha?", "neutro", "“Cuarteto.”", "No orienta."),
  ],
  exam: [
    act("fauces", "Fauces", "clave", "Amígdalas muy hipertróficas con exudado blanco grisáceo, petequias en el paladar.", "Faringoamigdalitis exudativa, parecida a la estreptocócica."),
    act("ganglios", "Ganglios", "clave", "Adenopatías cervicales posteriores y anteriores, también axilares, poco dolorosas.", "Las adenopatías cervicales posteriores y generalizadas sugieren mononucleosis."),
    act("bazo", "Palpación de bazo e hígado", "clave", "Polo de bazo palpable, hígado a 1 cm.", "Esplenomegalia en la mitad de los casos."),
    act("piel", "Piel", "util", "Exantema maculopapular generalizado.", "Exantema por amoxicilina."),
    act("ojos", "Párpados", "util", "Edema palpebral leve.", "Signo de Hoagland, frecuente al inicio."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma con frotis", "clave", "Leucocitos 14.000 con 60 % de linfocitos y 15 % de linfocitos atípicos.", "Linfocitosis con más del 10 % de atípicos es típica."),
    study("Laboratorio", "monotest", "Monotest (anticuerpos heterófilos) o serología para Epstein-Barr (VCA IgM)", "clave", "Monotest positivo.", "Confirma el diagnóstico (puede ser negativo la primera semana o en niños pequeños)."),
    study("Laboratorio", "hepatograma", "Hepatograma", "util", "Transaminasas levemente elevadas.", "La hepatitis leve es frecuente."),
    study("Imágenes", "eco", "Ecografía abdominal de rutina", "innecesario", "No se realizó.", "No cambia la conducta; la restricción deportiva se indica igual."),
    study("Microbiología", "exudado", "Exudado de fauces para estreptococo", "neutro", "Negativo.", "Puede coexistir con estreptococo; útil si hay dudas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mono", "Mononucleosis infecciosa por virus de Epstein-Barr", true, "Fiebre, faringoamigdalitis exudativa, adenopatías posteriores, esplenomegalia, astenia, linfocitos atípicos y monotest positivo; exantema por amoxicilina."),
      dx("estrepto", "Faringitis estreptocócica", false, "No da adenopatías generalizadas ni esplenomegalia, y el exudado es negativo."),
      dx("alergia", "Alergia a la penicilina", false, "El exantema por aminopenicilinas en la mononucleosis no es una alergia verdadera."),
      dx("cmv", "Síndrome mononucleósico por citomegalovirus", false, "Da faringitis y adenopatías más leves y monotest negativo."),
      dx("vih", "Síndrome retroviral agudo", false, "Puede parecerse; se descarta con el test si hay riesgo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sosten", "Tratamiento sintomático: paracetamol, hidratación, reposo relativo", "clave", "Es autolimitada; no hay tratamiento específico."),
      mg("deporte", "No hacer deportes de contacto ni esfuerzos por al menos 3–4 semanas", "clave", "Previene la rotura esplénica, que es más frecuente en las primeras 3 semanas."),
      mg("suspender", "Suspender la amoxicilina y explicar que no es alergia a la penicilina", "clave", "No hay infección bacteriana y evita etiquetarlo como alérgico."),
      mg("alarma", "Pautas de alarma: dolor abdominal brusco, dificultad para respirar o tragar", "util", "Detecta rotura esplénica u obstrucción de la vía aérea."),
      mg("corticoides", "Corticoides de rutina", "innecesario", "Solo si hay obstrucción de la vía aérea, anemia hemolítica o plaquetopenia graves."),
      mg("aciclovir", "Aciclovir", "innecesario", "No modifica la evolución clínica."),
    ],
  },
  debrief: {
    diagnosis: "Mononucleosis infecciosa por virus de Epstein-Barr con esplenomegalia y exantema por amoxicilina, en adolescente de 17 años.",
    pathologies: [
      { name: "Mononucleosis infecciosa", role: "principal", why: "Primoinfección por virus de Epstein-Barr." },
      { name: "Esplenomegalia con riesgo de rotura", role: "asociada", why: "Restricción deportiva." },
      { name: "Faringitis estreptocócica y síndrome retroviral agudo", role: "diferencial", why: "Cuadros parecidos." },
    ],
    reasoning: [
      "Causa: virus de Epstein-Barr, transmitido por saliva.",
      "Mecanismo: infecta el epitelio faríngeo y los linfocitos B; la respuesta de linfocitos T citotóxicos (los linfocitos atípicos) produce la inflamación del tejido linfoide.",
      "Consecuencia: faringoamigdalitis, adenopatías, esplenomegalia, hepatitis leve y astenia prolongada; el exantema con amoxicilina se debe a una reacción inmune transitoria.",
    ],
    epidemiology:
      "La infección por Epstein-Barr es casi universal: en la infancia suele ser leve, y cuando ocurre en la adolescencia o en adultos jóvenes (15 a 24 años) produce la mononucleosis típica. No hay diferencias importantes por sexo.",
    management: [
      "Sospechar ante fiebre, faringitis, adenopatías posteriores y astenia.",
      "Hemograma con linfocitos atípicos y monotest o serología.",
      "Sostén, restricción deportiva y pautas de alarma.",
      "Evitar aminopenicilinas; corticoides solo en complicaciones.",
    ],
    sources: ["Sociedad Argentina de Infectología — Recomendaciones sobre síndrome mononucleósico.", "Sociedad Argentina de Pediatría — Comité de Infectología."],
    pearls: ["Faringitis + adenopatías posteriores + esplenomegalia = mononucleosis.", "Amoxicilina → exantema.", "Nada de rugby por 3–4 semanas."],
    pitfalls: ["Etiquetarlo como alérgico a la penicilina.", "Permitirle jugar al rugby."],
    tribunal: [
      qa("¿Qué es un síndrome mononucleósico y qué lo causa?", "Fiebre, faringitis, adenopatías y linfocitosis atípica. La causa más frecuente es el virus de Epstein-Barr; también citomegalovirus, toxoplasma, VIH agudo y otros."),
      qa("¿Qué complicaciones tiene la mononucleosis?", "Rotura esplénica, obstrucción de la vía aérea, anemia hemolítica, plaquetopenia, hepatitis, complicaciones neurológicas (Guillain-Barré, encefalitis) y, a largo plazo, asociación con algunos linfomas y carcinoma nasofaríngeo."),
      qa("¿Por qué el monotest puede ser negativo?", "Porque los anticuerpos heterófilos aparecen en la primera o segunda semana y son menos frecuentes en menores de 4 años; en esos casos se piden anticuerpos específicos (VCA IgM)."),
    ],
  },
};
