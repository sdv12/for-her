import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const meningitisNeumococica: ClinicalCase = {
  id: "meningitis-neumococica-adulto",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 46, ageUnit: "años", sex: "M", context: "Alcoholismo. Esplenectomía por trauma hace años. Otitis derecha la semana pasada." },
  frequency: "frecuente",
  intro: "“Tiene fiebre alta, dolor de cabeza muy fuerte, vomita y no le soporta la luz. Está confundido.” (relata la hermana)",
  vitals: { TA: "108/64 mmHg", FC: "118 lpm", FR: "22 rpm", "T°": "39,7 °C", "SatO₂": "95 %", Glasgow: "12/15" },
  anamnesis: [
    act("tiempo", "¿Desde cuándo?", "clave", "“Desde ayer.”", "Agudo."),
    act("foco", "¿Otitis, sinusitis, neumonía?", "clave", "“Otitis la semana pasada.”", "Foco."),
    act("inmuno", "¿Bazo, alcohol, vacunas?", "clave", "“Sin bazo, toma mucho, sin vacunas.”", "Riesgo de neumococo."),
    act("alergia", "¿Alergia a penicilina?", "util", "“No.”", "Empírico."),
    act("convulsion", "¿Convulsionó?", "util", "“No.”", "Complicación."),
    act("trabajo", "¿Qué hace?", "neutro", "“Es pintor.”", "No orienta."),
  ],
  exam: [
    act("meninges", "Rigidez y Kernig", "clave", "Rigidez de nuca, Kernig positivo.", "Meningitis."),
    act("oido", "Otoscopía", "clave", "Otitis media supurada derecha.", "Foco."),
    act("piel", "Piel", "util", "Sin petequias.", "Meningococo."),
  ],
  studies: [
    study("Laboratorio", "hemocultivos", "Hemocultivos antes del antibiótico", "clave", "Diplococos gram positivos.", "Sin demorar el antibiótico."),
    study("Imágenes", "tc", "TC antes de la punción por deterioro de conciencia", "clave", "Sin efecto de masa; ocupación del oído medio.", "Seguridad."),
    study("Otros", "lcr", "Punción lumbar", "clave", "Turbio; 2.400 neutrófilos; glucosa 15; proteínas 290; Gram positivo.", "Bacteriana."),
    study("Otros", "demorar", "Demorar el antibiótico hasta la TC", "riesgoso", "No se realizó.", "Aumenta la mortalidad."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("neumococo", "Meningitis bacteriana por neumococo secundaria a otitis, en paciente esplenectomizado", true, "Fiebre, rigidez, LCR bacteriano, Gram positivo y foco otológico."),
      dx("viral", "Meningitis viral", false, "LCR bacteriano."),
      dx("tbc", "Meningitis tuberculosa", false, "Es aguda con neutrófilos."),
      dx("meningococo", "Meningococcemia", false, "Gram positivos, sin petequias."),
      dx("absceso", "Absceso cerebral", false, "TC sin efecto de masa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("dexa", "Dexametasona antes o con la primera dosis de antibiótico", "clave", "Reduce mortalidad y secuelas en neumococo."),
      mg("atb", "Ceftriaxona más vancomicina", "clave", "Cubre neumococo resistente."),
      mg("orl", "Otorrinolaringología por el foco", "clave", "Control del foco."),
      mg("vacunas", "Vacunas antineumocócicas y por asplenia", "util", "Prevención."),
      mg("demora", "Esperar el resultado del LCR", "riesgoso", "Mortal."),
      mg("aislamiento", "Profilaxis antibiótica a todos los contactos", "innecesario", "No se indica en neumococo."),
    ],
  },
  debrief: {
    diagnosis: "Meningitis bacteriana por neumococo secundaria a otitis media, en varón de 46 años con asplenia y alcoholismo.",
    pathologies: [
      { name: "Meningitis neumocócica", role: "principal", why: "Infección bacteriana del SNC." },
      { name: "Asplenia y alcoholismo", role: "asociada", why: "Riesgo." },
      { name: "Viral, TBC, meningococo", role: "diferencial", why: "Otras meningitis." },
    ],
    reasoning: [
      "Causa: neumococo desde el oído.",
      "Mecanismo: invasión meníngea con respuesta inflamatoria.",
      "Consecuencia: edema cerebral, hipoacusia y muerte.",
    ],
    epidemiology:
      "El neumococo es la causa principal de meningitis bacteriana en adultos. La asplenia, el alcoholismo y la otitis o sinusitis aumentan el riesgo. La mortalidad es alta y las secuelas, como sordera, son frecuentes.",
    management: [
      "Hemocultivos y antibiótico.",
      "Dexametasona.",
      "TC si hay alteración.",
      "Foco y vacunas.",
    ],
    sources: ["Sociedad Argentina de Infectología — Meningitis bacteriana.", "ESCMID — Guideline on Acute Bacterial Meningitis."],
    pearls: ["Antibiótico antes que imágenes.", "Dexametasona.", "Buscar foco."],
    pitfalls: ["Demorar.", "No cubrir resistencia."],
    tribunal: [
      qa("¿Cuándo pedir TC antes de punción?", "Con alteración de conciencia, foco, papiledema, convulsiones o inmunosupresión."),
      qa("¿Cómo se ve el LCR en meningitis bacteriana?", "Turbio, neutrófilos, glucosa baja y proteínas altas."),
      qa("¿Qué vacunas necesita una persona sin bazo?", "Antineumocócica, antimeningocócica y anti-Haemophilus."),
    ],
  },
};
