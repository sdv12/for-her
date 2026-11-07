import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hsaMujerJoven: ClinicalCase = {
  id: "hemorragia-subaracnoidea-mujer-joven",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 38, ageUnit: "años", sex: "F", context: "Fumadora, hipertensa. Sin migrañas. Hace 5 días tuvo una cefalea llamativa que se calmó." },
  frequency: "frecuente",
  intro: "“Estaba levantando a mi hijo y sentí un dolor de cabeza como un martillazo, el peor de mi vida. Vomité y me duele la nuca.”",
  vitals: { TA: "172/96 mmHg", FC: "62 lpm", FR: "18 rpm", "T°": "37,1 °C", "SatO₂": "98 %", Glasgow: "15/15" },
  anamnesis: [
    act("trueno", "¿Cuánto tardó en llegar al máximo?", "clave", "“Un segundo.”", "Cefalea en trueno: alarma."),
    act("centinela", "¿Tuviste otro dolor parecido en estos días?", "clave", "“Hace 5 días, menos fuerte.”", "Cefalea centinela."),
    act("riesgo", "¿Fumás, presión, cocaína, familiares con aneurismas o poliquistosis?", "clave", "“Fumo y mi hermana murió de un aneurisma.”", "Factores."),
    act("foco", "¿Visión doble, debilidad, convulsión?", "util", "“Veo doble.”", "Tercer par."),
    act("anticoag", "¿Anticoagulantes?", "util", "“No.”", "Hemorragia."),
    act("hijo", "¿Cuántos años tiene tu hijo?", "neutro", "“Tres.”", "No orienta."),
  ],
  exam: [
    act("meninges", "Rigidez de nuca", "clave", "Rigidez marcada.", "Irritación meníngea."),
    act("pares", "Pares craneales", "clave", "Ptosis y midriasis derechas.", "Tercer par: aneurisma de comunicante posterior."),
    act("fondo", "Fondo de ojo", "util", "Hemorragia subhialoidea.", "Muy específica."),
  ],
  studies: [
    study("Imágenes", "tc", "TC sin contraste urgente", "clave", "Sangre en cisternas basales.", "Muy sensible en las primeras horas."),
    study("Imágenes", "angio", "AngioTC o angiografía digital", "clave", "Aneurisma de comunicante posterior derecha de 7 mm.", "Ubica la causa."),
    study("Otros", "lcr", "Punción lumbar si TC negativa pero alta sospecha", "util", "No hizo falta.", "Xantocromía tras 12 horas."),
    study("Electrofisiología", "ecg", "ECG y troponina", "util", "T invertidas; troponina levemente elevada.", "Corazón neurogénico."),
    study("Otros", "analgesia-alta", "Dar analgesia y alta sin imagen", "riesgoso", "No se realizó.", "Es la peor omisión ante una cefalea en trueno."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hsa", "Hemorragia subaracnoidea aneurismática (Hunt y Hess II) con paresia del tercer par", true, "Cefalea en trueno, centinela, rigidez, tercer par, y sangre en TC."),
      dx("migrana", "Migraña", false, "No debuta así, sin antecedentes, con rigidez."),
      dx("meningitis", "Meningitis", false, "Sin fiebre, y con sangre en TC."),
      dx("venosa", "Trombosis venosa cerebral", false, "La TC muestra sangre en cisternas."),
      dx("rcvs", "Síndrome de vasoconstricción reversible", false, "Puede dar trueno, pero hay aneurisma."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("uti", "Terapia intensiva con neurocirugía", "clave", "Mejora el pronóstico."),
      mg("aneurisma", "Asegurar el aneurisma (coil o clip) en menos de 24 horas", "clave", "Evita el resangrado."),
      mg("nimodipina", "Nimodipina oral", "clave", "Reduce el déficit por vasoespasmo."),
      mg("presion", "Controlar presión, analgesia, y evitar esfuerzo hasta asegurar", "clave", "Reduce resangrado."),
      mg("aines", "Aspirina para el dolor", "riesgoso", "Aumenta el sangrado."),
      mg("vigilar", "Vigilar hidrocefalia y sodio", "util", "Complicaciones."),
    ],
  },
  debrief: {
    diagnosis: "Hemorragia subaracnoidea por aneurisma de comunicante posterior derecha con paresia del tercer par, en mujer de 38 años.",
    pathologies: [
      { name: "Hemorragia subaracnoidea", role: "principal", why: "Rotura de aneurisma." },
      { name: "Riesgo de resangrado y vasoespasmo", role: "asociada", why: "Complicaciones." },
      { name: "Migraña, meningitis, trombosis venosa", role: "diferencial", why: "Otras causas de cefalea." },
    ],
    reasoning: [
      "Causa: aneurisma sacular, con tabaco e HTA.",
      "Mecanismo: la rotura lleva sangre a presión al espacio subaracnoideo.",
      "Consecuencia: cefalea, HTE, hidrocefalia, vasoespasmo e isquemia.",
    ],
    epidemiology:
      "Afecta sobre todo a personas de 40 a 60 años y es más frecuente en mujeres. Fumar y la HTA son los principales factores modificables. Tiene alta mortalidad, y una proporción de pacientes muere antes de llegar. La cefalea centinela es una oportunidad perdida.",
    management: [
      "Cefalea en trueno: TC y angioTC.",
      "Asegurar el aneurisma.",
      "Nimodipina y cuidados.",
      "Tamizaje a familiares si corresponde.",
    ],
    sources: ["Sociedad Neurológica Argentina — Recomendaciones de hemorragia subaracnoidea.", "AHA/ASA — Guía de hemorragia subaracnoidea aneurismática."],
    pearls: ["El peor dolor de mi vida, de golpe.", "Tercer par con midriasis: comunicante posterior.", "TC negativa con alta sospecha: LCR."],
    pitfalls: ["Etiquetarla como migraña.", "Dar aspirina."],
    tribunal: [
      qa("¿Qué complicaciones aparecen?", "Resangrado (primeras horas), hidrocefalia, vasoespasmo (días 3 a 14), hiponatremia, convulsiones."),
      qa("¿Qué es la clasificación de Hunt y Hess?", "Del I (síntomas mínimos) al V (coma), según la gravedad clínica."),
      qa("¿Qué enfermedades se asocian a aneurismas?", "Poliquistosis renal, coartación de aorta, Ehlers-Danlos."),
    ],
  },
};
