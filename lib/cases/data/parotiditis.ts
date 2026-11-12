import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const parotiditis: ClinicalCase = {
  id: "parotiditis-urliana-orquitis",
  level: 1,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 19, ageUnit: "años", sex: "M", context: "Estudiante universitario. Esquema de vacunas incompleto. Hay casos en su residencia." },
  frequency: "frecuente",
  intro: "“Hace 5 días se me hincharon las mejillas debajo de las orejas. Ahora me duele mucho un testículo.”",
  vitals: { TA: "118/72 mmHg", FC: "94 lpm", "T°": "38,6 °C" },
  anamnesis: [
    act("vacunas", "¿Tenés dos dosis de triple viral?", "clave", "“Creo que una.”", "Susceptible."),
    act("contactos", "¿Otros con lo mismo?", "clave", "“Compañeros de la residencia.”", "Brote."),
    act("testiculo", "¿Desde cuándo duele el testículo? ¿Fue brusco?", "clave", "“Desde ayer, progresivo.”", "Orquitis, no torsión."),
    act("cefalea", "¿Dolor de cabeza, rigidez de nuca, dolor abdominal?", "util", "“Algo de cabeza.”", "Meningitis y pancreatitis."),
    act("audicion", "¿Oís bien?", "util", "“Sí.”", "Hipoacusia."),
    act("carrera", "¿Qué estudiás?", "neutro", "“Ingeniería.”", "No orienta."),
  ],
  exam: [
    act("parotidas", "Parótidas", "clave", "Tumefacción bilateral que borra el ángulo mandibular; papila del conducto de Stenon enrojecida.", "Parotiditis."),
    act("testiculo-ex", "Testículo", "clave", "Derecho aumentado, doloroso; reflejo cremastérico presente.", "Orquitis; aleja torsión."),
    act("meninges", "Signos meníngeos", "util", "Negativos.", "Excluye meningitis."),
  ],
  studies: [
    study("Microbiología", "pcr", "PCR en saliva o IgM para paperas", "clave", "Positiva.", "Confirma y permite notificar."),
    study("Imágenes", "doppler", "Ecografía Doppler testicular", "clave", "Flujo aumentado.", "Excluye torsión."),
    study("Laboratorio", "amilasa", "Amilasa y lipasa", "util", "Amilasa alta, lipasa normal.", "Origen salival."),
    study("Otros", "antibiotico", "Antibiótico para la orquitis", "riesgoso", "No se realizó.", "Es viral."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("paperas", "Parotiditis urliana con orquitis", true, "Parótidas bilaterales, brote, vacunación incompleta, orquitis con flujo aumentado y PCR."),
      dx("torsion", "Torsión testicular", false, "Flujo aumentado, cremastérico presente."),
      dx("bacteriana", "Parotiditis bacteriana", false, "Bilateral y sin pus por Stenon."),
      dx("epididimitis", "Epididimitis por ITS", false, "Contexto de paperas."),
      dx("litiasis", "Litiasis salival", false, "Bilateral y fiebre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sintomatico", "Analgesia, frío y suspensorio escrotal", "clave", "Sintomático."),
      mg("aislamiento", "Aislamiento por 5 días desde la parotiditis", "clave", "Contagio."),
      mg("notificar", "Notificar y completar vacunas de contactos", "clave", "Brote."),
      mg("alarma", "Pautas: cefalea intensa, dolor abdominal, sordera", "util", "Complicaciones."),
      mg("antibiotico-mg", "Ciprofloxacina", "riesgoso", "No corresponde."),
      mg("cirugia", "Explorar quirúrgicamente el escroto", "riesgoso", "No es torsión."),
    ],
  },
  debrief: {
    diagnosis: "Parotiditis urliana bilateral con orquitis derecha, en varón de 19 años con vacunación incompleta.",
    pathologies: [
      { name: "Parotiditis urliana", role: "principal", why: "Infección por virus de las paperas." },
      { name: "Orquitis", role: "asociada", why: "Complicación pospuberal." },
      { name: "Torsión, parotiditis bacteriana", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: paramixovirus por gotas.",
      "Mecanismo: replicación en glándulas y diseminación.",
      "Consecuencia: parotiditis, orquitis, meningitis, pancreatitis.",
    ],
    epidemiology:
      "Hay brotes en adolescentes y adultos jóvenes con vacunación incompleta, sobre todo en residencias y universidades. La orquitis afecta a una parte de los varones pospuberales; la esterilidad es rara. La triple viral en dos dosis previene la mayoría.",
    management: [
      "Clínica y PCR.",
      "Excluir torsión.",
      "Sintomático.",
      "Notificar y vacunar.",
    ],
    sources: ["Ministerio de Salud de la Nación — Parotiditis: vigilancia.", "CDC — Mumps Clinical Overview."],
    pearls: ["Borra el ángulo mandibular.", "Orquitis tras la pubertad.", "Dos dosis de triple viral."],
    pitfalls: ["Antibióticos.", "No excluir torsión."],
    tribunal: [
      qa("¿Qué complicaciones tiene la parotiditis?", "Orquitis, ooforitis, meningitis aséptica, pancreatitis e hipoacusia neurosensorial."),
      qa("¿Qué vacuna la previene?", "La triple viral, a los 12 meses y a los 5 años."),
      qa("¿Cómo diferencias orquitis y torsión?", "Torsión: inicio brusco, cremastérico abolido y flujo disminuido. Orquitis: progresivo, flujo aumentado."),
    ],
  },
};
